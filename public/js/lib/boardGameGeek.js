boardGameGeek = {
  getGame: function(id, successCallback) {
    this.fetchJSON(this.proxyItemUrl(id), successCallback);
  },

  search: function(query, successCallback) {
    this.fetchJSON(this.proxySearchUrl(query), successCallback);
  },

  fetchJSON: function(url, successCallback) {
    $.ajax({
      url: url,
      success: function(result) {
        successCallback(result.query ? result.query.results : result);
      },
      dataType: 'jsonp'
    });
  },

  proxyUrl: function (url) {
    var root = 'https://query.yahooapis.com/v1/public/yql?q=';
    var yql = 'select * from xml where url="' + url + '"';
    var proxy_url = root + encodeURIComponent(yql) + '&format=json&diagnostics=false';
    return proxy_url;
  },

  proxySearchUrl: function(query) {
    // Escape the query so that it makes it to the server without being unescaped
    var escapeQuery = encodeURIComponent(query);
    return this.proxyUrl('http://www.boardgamegeek.com/xmlapi2/search?type=boardgame,boardgameexpension&query=' + escapeQuery);
  },

  proxyItemUrl: function(id) {
    return this.proxyUrl('http://www.boardgamegeek.com/xmlapi2/thing?id=' + id);
  }
}
