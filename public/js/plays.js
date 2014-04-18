PLAYHISTORY.plays = {
  init: function() {
    $('#playsTabs a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    });

    $.each($('#ownedGames').data('games'), function(index, game) {
      $('#gameSelect').append($('<option>', { value: game.bggId, text: game.name + ': ' + game.yearPublished }));
    });

    $('.input-group.date').datepicker({
      autoclose: true,
      todayHighlight: true
    });

    $.each($('#pastPlays').data('plays'), function(index, play) {
      PLAYHISTORY.plays.renderPlay(play);
    });
  },

  renderPlay: function(play) {
    var date = new Date(play.date);
    var $row = $('<tr>', { id: 'play-' + play.id });
    $row.append($('<td>', { text: play.game.name }));//{ class: 'gameLink' }).append($('<a>', { href: this.boardGameGeekUrl({type:'boardgame', id: game.bggId}), text: game.name})));
    $row.append($('<td>', { text: date.toDateString() }));
    var $playersColumn = $('<td>');
    $.each(play.players, function(index, player) {
      $playersColumn.append($('<span>', { class: 'playerSpan', text: player.email }));
    });
    $row.append($playersColumn);
    $('#pastPlaysTable').append($row);
  },

  createPlay: function() {
    $('#formInfo').empty();
    var playErrors = this.validatePlay();
    if (playErrors.length === 0) {
      $.post( "plays", {
        _csrf: $('#csrf').val(),
        bggId: $('#gameSelect').val(),
        date: $('#date').val(),
        players: $('#playersSelect').val().concat($('#user').data('user')._id)
      }, function( data ) {
        var play = data;
        $('#gameSelect').val('');
        $('#date').val('');
        $('#playersSelect').val('');
        $('#formInfo').text('Play saved!');
        PLAYHISTORY.plays.renderPlay(play);
      });
    } else {
      $errorUl = $('<ul>');
      $.each(playErrors, function(index, error) {
        $errorUl.append($('<li>', { text: error }));
      });
      $('#formInfo').append($('<div>', { class: 'alert alert-danger' }).append($errorUl));
    }

  },

  validatePlay: function() {
    var errors = [];
    $('.has-error').removeClass('has-error');
    if (!$('#playersSelect').val()) {
      $('#playersSelectGroup').addClass('has-error');
      errors.push("Must select at least one other player.");
    }

    if (!$('#gameSelect').val()) {
      $('#gameSelectGroup').addClass('has-error');
      errors.push("Must select a game.");
    }

    if (!$('#date').val()) {
      $('#dateGroup').addClass('has-error');
      errors.push("Must select a date.");
    }

    return errors;
  }
}
