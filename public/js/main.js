window.PLAYHISTORY = PLAYHISTORY = {
  common: {
    init: function() {
      var x = 'cat';
    }
  }
}

UTIL = {
  exec: function(controller, action) {
    var ns = PLAYHISTORY;
    action = (action === undefined) ? "init" : action;

    if (controller !== "" && ns[controller] && typeof ns[controller][action] == "function") {
      ns[controller][action]();
    }
  },

  init: function() {
    var body       = document.body,
        controller = body.getAttribute("data-controller"),
        action     = body.getAttribute("data-action");

    UTIL.exec("common");
    UTIL.exec(controller);
    UTIL.exec(controller, action);
  }
}

$(UTIL.init);

// $(document).ready(function() {
//   UTIL.init();

//   boardGameGeek.getGame(68448, function(data) {
//     var x = data;
//   });

// });
