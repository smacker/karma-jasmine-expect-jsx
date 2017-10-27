describe('example-test', () => {
  it('karma + jasmine should work', () => {
    expect(window.example.add(1, 1)).toEqual(2);
  });

  it('jsx', () => {
    class TestComponent extends React.Component {}

    // pass
    expect(<div />).toEqualJSX(<div />);
    expect(<TestComponent />).toEqualJSX(<TestComponent />);

    expect(<div />).not.toEqualJSX(<span />);
    expect(<TestComponent />).not.toEqualJSX(<span />);

    // fail
    expect(<div class="test" />).toEqualJSX(<div />);
    expect(<div class="test" />).toEqualJSX(<div class="hello" />);
  });
});
