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
}());
