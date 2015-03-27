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

QUnit.test('should find the Renderer class', function (assert) {
  assert.ok('function' === typeof Renderer);
});
