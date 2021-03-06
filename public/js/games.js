//= require lib/boardGameGeek.js

PLAYHISTORY.games = {
  ownedGames: [],

  init: function() {
    var self = this;
    PLAYHISTORY.games.ownedGames = $('#ownedGames').data('games');
    $.each(PLAYHISTORY.games.ownedGames, function(index, game) {
      self.displayOwnedGame(game, false);
    });

    $('#gamesTabs a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    });

    $('.removeGameButton').click(self.removeGame);
  },

  displayOwnedGame: function(game, newGame) {
    var $row = $('<tr>');//, { id: 'game-' + gameId, class: 'result' });
    $row.append($('<td>', { class: 'gameLink' }).append($('<a>', { href: this.boardGameGeekUrl({type:'boardgame', id: game.bggId}), text: game.name})));
    $row.append($('<td>', { text: game.yearPublished }));
    $row.append($('<td>', { class: 'gameThumbnail' }).append($('<img>', { src: game.imageUrl })));
    $row.append($('<td>').append($('<button>', {
      class: 'removeGameButton btn btn-danger',
      text: 'Remove from Collection',
      'data-bgg-id': game.bggId
    })));
    if (newGame) {
      $('#ownedGamesTable tbody').prepend($row);
    } else {
      $('#ownedGamesTable tbody').append($row);
    }
  },
  // TODO: Cache results if people go back to page from external site?

  searchBoardGameGeek: function() {
    var self = this;
    boardGameGeek.search($('#gameSearch').val(), function(data) {
      var x = data;
      $('.result').remove();
      if (data.items && data.items.item) {
        if (data.items.item.length >= 0) {
          $.each(data.items.item, function(index, game) {
            self.displayGame(game);
          });
        // Handle case where only a single item is returned
        } else if (data.items.item.id) {
          self.displayGame(data.items.item);
        }

      } else if (data.error) {
        $('#searchResults tbody').append($('<tr>', { class: 'result' }).append($('<td>', { text: JSON.stringify(data.error) })));
      } else {
        // Use templates....
        $row = $('<tr>', { class: 'result' });
        $row.append($('<td>', { text: "No results found" }));
        $row.append($('<td>', { class: 'gameThumbnail' }));
        $('#searchResults tbody').append($row);
      }

      $('.addGameButton').click(self.addGame);
    });
  },

  boardGameGeekUrl: function(game) {
    var base = 'http://boardgamegeek.com/';
    return  base + game.type + '/' + game.id
  },

  displayGame: function(game) {
    var yearPublished = game.yearpublished ? game.yearpublished.value : '';
    var $row = $('<tr>', { id: 'game-' + game.id, class: 'result' });
    $row.append($('<td>', { class: 'gameLink' }).append($('<a>', { href: this.boardGameGeekUrl(game), text: game.name.value })));
    $row.append($('<td>', { text: yearPublished }));
    $row.append($('<td>', { class: 'gameThumbnail' }));
    if (this.alreadyOwned(parseInt(game.id))) {
      $row.append($('<td>', { text: "Already in Collection" }));
    } else {
      $row.append($('<td>').append($('<button>', {
        class: 'addGameButton btn btn-primary',
        text: 'Add to Collection',
        'data-bgg-id': game.id,
        'data-name': game.name.value,
        'data-year-published': yearPublished
      })));
    }
    $('#searchResults tbody').append($row);

    boardGameGeek.getGame(game.id, function(data) {
      if (data.items.item.thumbnail) {
        $('#game-' + data.items.item.id + ' .gameThumbnail').append($('<img>', { src: data.items.item.thumbnail }));
        $('#game-' + data.items.item.id + ' .addGameButton').data('image-url', data.items.item.thumbnail)
      }
    });
  },

  addGame: function(event) {
    var self = this;
    $.post( "account/games/add", { _csrf: $('#csrf').val(), game: {
      bggId: $(self).data('bgg-id'),
      name: $(self).data('name'),
      imageUrl: $(self).data('image-url'),
      yearPublished: $(self).data('year-published')
    }}, function( data ) {
      var parent = $(self).parent();
      parent.empty();
      parent.text('Added to Collection');

      PLAYHISTORY.games.ownedGames.push(data);
      PLAYHISTORY.games.displayOwnedGame(data, true);
      $('.removeGameButton').click(PLAYHISTORY.games.removeGame);
    });
  },

  removeGame: function(event) {
    var self = this;
    $.post( "account/games/remove", {
      _csrf: $('#csrf').val(),
      bggId: $(self).data('bgg-id')
    }, function( data ) {
      $(self).parent().parent().remove()
    });
  },

  alreadyOwned: function(bggId) {
    var gameOwned = $.grep(PLAYHISTORY.games.ownedGames, function(game) {
      return (game.bggId === bggId);
    });
    return gameOwned.length != 0;
  }
}
