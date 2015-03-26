(function () {
  /**
   * Item model
   *
   * @param {Object} attributes
   */
  window.ItemModel = function (attributes) {
    attributes = attributes || {};
    this.attributes = attributes;
  };

  /**
   * Homemade function to get a nested attribute without triggering an error
   *
   * @param  {String} path
   * @return {Mixed} The attribute, or null
   */
  ItemModel.prototype.get = function (path) {
    path = path.split('.');
    var result = this.attributes,
      i;

    for (i = 0; i < path.length; i++) {
      if (!result[path[i]]) {
        return null;
      }

      result = result[path[i]];
    }

    return result;
  };
}());
