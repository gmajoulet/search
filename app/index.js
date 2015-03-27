$(document).on('ready', function () {
  class App {
    constructor ($el) {
      this.$el = $el;
      this.renderer = new Renderer();
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

    /**
     * Get all the DOM as a string so it's inserted at once
     * By limiting all the interactions DOM <-> JS, we're waaaay faster
     *
     * @param  {Array} collection
     */
    render (collection) {
      var dom = collection.getVirtualDOM();
      $('[data-name=search_results]').html(dom);
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
});
