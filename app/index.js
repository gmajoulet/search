(function () {
  class App {
    constructor ($el) {
      this.$el = $el;
      this.startListening();
    }

    /**
     * Binding needed events
     *
     * @return {App}
     */
    startListening () {
      this.$('[data-name=search_form]').on('submit', this.onSearch.bind(this));

      return this;
    }

    /**
     * On search form submit callback
     * @param  {Event} event
     */
    onSearch (event) {
      event.preventDefault();
      var query = this.$('[data-name=search_input]').val();

      this.search(query);
    }

    /**
     * Instanciates a new ItemCollection if needed
     *
     * @param  {String} query
     */
    search (query) {
      var collection = new ItemCollection();

      collection.fetch(query)
        .done(function () {
          this.render(collection);
        }.bind(this));
    }

    render (collection) {
      // Render the collection
    }

    /**
     * Search in the app scope only
     *
     * @param  {String} query
     * @return {jQuery object}
     */
    $ (query) {
      return $(query, this.$el);
    }
  }

  // Start the app
  new App($('body'));
}());
