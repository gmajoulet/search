/**
 * Sinon FakeServer to handle AJAX requests
 * We interecpt requests and answer to the XHRs with our data
 * Doesn't work in this very special case because it's a JSONP call... :((
 */
var server = sinon.fakeServer.create();
server.autoRespond = true;

/**
 * Auto respond to this request with dummy data
 */
server.respondWith('GET', 'http://api.deezer.com/search/track?output=jsonp&q=foo', function (xhr) {
  xhr.respond(201, {}, JSON.stringify({ data: [1, 2, 3], next: 'nextUrl', total: 100 }));
});

/**
 * Let's start the tests
 */

QUnit.test('should find the ItemModel class', function (assert) {
  assert.ok('function' === typeof ItemModel);
});

QUnit.test('should test the ItemModel.get method', function (assert) {
  var model = new ItemModel({ foo: { bar: 'baz' } });
  // Should return the value (object). As a JSON because it's easier to check
  assert.ok(JSON.stringify({ bar: 'baz' }) === JSON.stringify(model.get('foo')));
  // Should return the nested value
  assert.ok('baz' === model.get('foo.bar'));
  // Should not fail
  assert.ok(null === model.get('foo.bar.baz'));
  assert.ok(null === model.get('qux'));
});

QUnit.test('should find the ItemCollection class', function (assert) {
  assert.ok('function' === typeof ItemCollection);
});

QUnit.test('should test the ItemCollection getItems method', function (assert) {
  var collection = new ItemCollection([1, 2, 3, 4]);
  assert.ok(4 === collection.getItems().length);
});

QUnit.test('should test the ItemCollection getFetchUrl method', function (assert) {
  var collection = new ItemCollection();
  assert.ok('http://api.deezer.com/search/track?output=jsonp&q=foo' === collection.getFetchUrl('foo'));
  // Should not fail if no query is passed
  assert.ok('http://api.deezer.com/search/track?output=jsonp&q=' === collection.getFetchUrl());
});

QUnit.test('should test the ItemCollection fetch method', function (assert) {
  var done = assert.async();
  var collection = new ItemCollection();

  // No items for now
  assert.ok(0 === collection.getItems().length);

  collection.fetch('foo')
    .done(function () {
      assert.ok(25 === collection.getItems().length);
      done();
    });
});

QUnit.test('should find the Renderer class', function (assert) {
  assert.ok('function' === typeof Renderer);
});
