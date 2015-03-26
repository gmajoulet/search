(function () {
  /**
   * Collection of items
   * Used so it's easier to work on the list and its rendering with virtual DOM
   *
   * @param {Array} items
   */
  window.ItemCollection = function (items) {
    items = items || [];

    this.items = items;
    this.totalItems = items.length;
    this.fetchedItems = items.length;
  };

  /**
   * Items collection getter
   *
   * @return {Array} Items
   */
  ItemCollection.prototype.getItems = function () {
    return this.items;
  };

  /**
   * Builds the URL to fetch the collection
   * Here we can add some smart logic/cache/whatever
   *
   * @param  {String} query
   * @return {String}
   */
  ItemCollection.prototype.getFetchUrl = function (query) {
    query = query || '';

    return 'http://api.deezer.com/search/track?output=jsonp&q=' + query;
  };

  /**
   * Fetches the data or the next data if it's the same query
   *
   * @param  {String} query
   * @return {Deferred}
   */
  ItemCollection.prototype.fetch = function (query) {
    var url = this.getFetchUrl(query);

    // It's actually a deferred but I like to call those promise-like objects promise
    var promise = $.ajax({
      url: url,
      dataType: 'jsonp'
    });

    promise.done(this.handleResponse.bind(this));

    return promise;
  };

  /**
   * Handles the response: adds the data to the collection items, get the total items available
   * on the API
   *
   * @param  {Object} response
   */
  ItemCollection.prototype.handleResponse = function (response) {
    // @Todo
  };

  ItemCollection.prototype.render = function () {};
}());
