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

  },

  createPlay:function() {

  }
}
