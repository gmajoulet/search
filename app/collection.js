/**
 * Collection of items
 * Used so it's easier to work on the list and its rendering with virtual DOM
 *
 * @param {Array} items
 */
class ItemCollection {
  constructor (items) {
    items = items || [];

    this.renderer = new Renderer;
    this.items = items;
    this.totalItems = items.length;
    this.fetchedItems = items.length;
    this.query = '';
  }

  /**
   * Items collection getter
   *
   * @return {Array} Items
   */
  getItems () {
    return this.items;
  }

  getQuery () {
    return this.query || '';
  }

  setQuery (query) {
    this.query = query;
    return this;
  }

  /**
   * Builds the URL to fetch the collection
   * Here we can add some smart logic/cache/whatever
   *
   * @param  {String} query
   * @return {String}
   */
  getFetchUrl () {
    // If we already have the next URL
    if (this.nextUrl) {
      return this.nextUrl;
    }

    return 'http://api.deezer.com/search/track?output=jsonp&q=' + this.getQuery();
  }

  /**
   * Fetches the data or the next data if it's the same query
   *
   * @param  {String} query
   * @return {Deferred}
   */
  fetch () {
    // If there is no more data to fetch
    if (this.totalItems && (this.totalItems <= this.getItems().length)) {
      return new $.Deferred().reject('no_more_data');
    }

    this.fetching = true;

    var url = this.getFetchUrl();

    // It's actually a deferred but I like to call those promise-like objects promise
    var promise = $.ajax({
      url: url,
      dataType: 'jsonp'
    });

    promise.done(function () {
      this.handleResponse.apply(this, arguments);
      this.fetching = false;
    }.bind(this));

    return promise;
  }

  /**
   * Handles the response: adds the data to the collection items, get the total items available
   * on the API
   *
   * @param  {Object} response
   */
  handleResponse (response) {
    response = response || {};
    this.items = this.items.concat(response && response.data);
    this.totalItems = response.total;
    this.nextUrl = response.next || null;
  }

  /**
   * Get all the DOM as a string so it's inserted at once
   * By limiting all the interactions DOM <-> JS, we're waaaay faster
   *
   * @param  {Array} collection
   */
  getVirtualDOM () {
    var dom = '';

    this.getItems().map(function (item) {
      dom += this.renderer.getTemplate('template_item', item);
    }.bind(this));

    return dom;
  }
};
