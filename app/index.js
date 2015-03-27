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
      $(window).on('scroll', this.onScroll.bind(this));

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
     * On event scroll, should we auto fetch more data?
     *
     * @param  {Object} event
     */
    onScroll (event) {
      // If there is no result collection, step out
      if (!this.currentCollection) {
        return;
      }

      var pixelsLeft = $(document).height() - $(window).height() - $(window).scrollTop();

      // If we have more than one screen left before reaching the bottom of the page
      if (pixelsLeft > $(window).height() || this.currentCollection.fetching) {
        return;
      }

      this.currentCollection.fetch()
        .done(function () {
          this.render(this.currentCollection);
        }.bind(this))
        .fail(function (err) {
          if ('no_more_data' === err) {
            this.$('[data-name=search_no_more_data]').show();
          }
        }.bind(this));
    }

    /**
     * Instanciates a new ItemCollection if needed
     *
     * @param  {String} query
     */
    search (query) {
      var collection = new ItemCollection();
      this.currentCollection = collection;

      collection.fetch(query)
        .done(function () {
          this.render(collection);
        }.bind(this));
    }

    /**
     * Get all the DOM as a string so it's inserted at once
     * By limiting all the interactions DOM <-> JS, we're waaaay faster
     * We could go even faster by only getting the new elements DOM and appending it
     * But it requires a lot more code
     *
     * @param  {Array} collection
     */
    render (collection) {
      var dom = collection.getVirtualDOM();
      $('[data-name=search_results]').html(dom);
      this.$('[data-name=search_no_more_data]').hide();
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
