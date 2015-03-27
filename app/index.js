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

      this.fetchCollection()
        .done(this.renderCollection);
    }

    /**
     * Instanciates a new ItemCollection if needed
     *
     * @param  {String} query
     */
    search (query) {
      query = query || '';

      /**
       * We should cache the collections by query
       */
      this.currentCollection = new ItemCollection();
      this.currentCollection.setQuery(query);

      this.fetchCollection()
        .done(this.renderCollection);
    }

    /**
     * Fetches the collection for the given query
     * If the user is scrolling, the collection didn't change and the query is already
     * set, so we don't need to pass it again
     * If we fetch it for the first time (new Collection after a new search) we need to set the query
     *
     * @param  {String} query
     * @return {Deferred}
     */
    fetchCollection () {
      // If we're not working on any collection, step out
      if (!this.currentCollection) {
        return;
      }

      return this.currentCollection.fetch()
        .done(function () {
          this.renderCollection(this.currentCollection);
        }.bind(this))
        .fail(function (err) {
          if ('no_more_data' === err) {
            this.$('[data-name=search_no_more_data]').show();
          }
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
    renderCollection () {
      // If we're not working on any collection, step out
      if (!this.currentCollection) {
        return;
      }

      var dom = this.currentCollection.getVirtualDOM();
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
