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
    $('#formInfo').text('');
    if (this.validPlay()) {
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
      $('#formInfo').text('Invalid data');
    }

  },

  validPlay: function() {
    if ($('#playersSelect').val()){
      return true;  
    } else {
      return false;
    }
    
  }
}
