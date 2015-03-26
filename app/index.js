(function () {
  var collection = new ItemCollection();

  collection.fetch('popof')
    .done(function () {
      console.log(collection.getItems());
    });
}());
