/**
 * Collection of items
 * Used so it's easier to work on the list and its rendering with virtual DOM
 *
 * @param {Array} items
 */
class ItemCollection {
  constructor (items) {
    items = items || [];

    this.items = items;
    this.totalItems = items.length;
    this.fetchedItems = items.length;
  }

  /**
   * Items collection getter
   *
   * @return {Array} Items
   */
  getItems () {
    return this.items;
  }

  /**
   * Builds the URL to fetch the collection
   * Here we can add some smart logic/cache/whatever
   *
   * @param  {String} query
   * @return {String}
   */
  getFetchUrl (query) {
    query = query || '';

    // If we already have the next URL
    if (this.nextUrl) {
      return this.nextUrl;
    }

    return 'http://api.deezer.com/search/track?output=jsonp&q=' + query;
  }

  /**
   * Fetches the data or the next data if it's the same query
   *
   * @param  {String} query
   * @return {Deferred}
   */
  fetch (query) {
    var url = this.getFetchUrl(query);

    // It's actually a deferred but I like to call those promise-like objects promise
    var promise = $.ajax({
      url: url,
      dataType: 'jsonp'
    });

    promise.done(this.handleResponse.bind(this));

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
    this.nextUrl = response.next;
  }

  render () {}
};
