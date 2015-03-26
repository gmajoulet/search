(function () {
  class App {
    constructor () {
      this.startListening();
    }

    /**
     * Binding needed events
     *
     * @return {App}
     */
    startListening () {
      return this;
    }
  }

  // Start the app
  new App();
}());
