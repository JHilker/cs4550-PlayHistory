//= require lib/boardGameGeek.js

PLAYHISTORY.games = {
  init: function() {},
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
        $('#searchResults').append($('<tr>', { class: 'result' }).append($('<td>', { text: JSON.stringify(data.error) })));
      } else {
        // Use templates....
        $row = $('<tr>', { class: 'result' });
        $row.append($('<td>', { text: "No results found" }));
        $row.append($('<td>', { class: 'gameThumbnail' }));
        $('#searchResults').append($row);
      }
    });
  },

  boardGameGeekUrl: function(game) {
    var base = 'http://boardgamegeek.com/';
    return  base + game.type + '/' + game.id
  },

  displayGame: function(game) {
    var $row = $('<tr>', { id: 'game-' + game.id, class: 'result' });
    $row.append($('<td>', { class: 'gameLink' }).append($('<a>', { href: this.boardGameGeekUrl(game), text: game.name.value })));
    $row.append($('<td>', { class: 'gameThumbnail' }));
    $('#searchResults').append($row);

    boardGameGeek.getGame(game.id, function(data) {
      if (data.items.item.thumbnail) {
        $('#game-' + data.items.item.id + ' .gameThumbnail').append($('<img>', { src: data.items.item.thumbnail }));
      }
    });
  }
}
