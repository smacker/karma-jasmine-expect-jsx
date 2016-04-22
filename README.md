# karma-jasmine-expect-jsx

> A [Karma](http://karma-runner.github.io/) plugin to inject [jasmine-expect-jsx](https://github.com/smacker/jasmine-expect-jsx) for [Jasmine](http://jasmine.github.io/).

## Installation

### npm

```bash
npm install karma-jasmine-expect-jsx --save-dev
```

## Integration

### Karma

Just include `'jasmine-expect-jsx'` in the `frameworks` section of your config.
If you want colored output add `'jasmine-expect-jsx'` in reporters section before others.

```javascript
module.exports = function(config) {
    config.set({
        frameworks: [
            'jasmine',
            'jasmine-expect-jsx'
        ],
        reporters: [
            'jasmine-expect-jsx',
            'spec'
        ],
        files: [
            'src/**/*.js',
            'src/**/*.spec.js'
        ]
    });
};
```

## Usage

The following tests are all passing:

```javascript
class TestComponent extends React.Component {}

// equalJSX
expect(<div />).toEqualJSX(<div />);
expect(<TestComponent />).toEqualJSX(<TestComponent />);

expect(<div />).not.toEqualJSX(<span />);
expect(<TestComponent />).not.toEqualJSX(<span />);

// includeJSX
expect(<div><span>Hello World!</span></div>).toIncludeJSX(<span>Hello World!</span>);
expect(<TestComponent />).toIncludeJSX(<SomeSubComponent />); // assuming <SomeSubComponent /> is rendered by TestComponent's render

expect(<div><span>Hello World!</span></div>).not.toIncludeJSX(<span>Hello World!</span>);
expect(<TestComponent />).not.toIncludeJSX(<SomeSubComponent />); // assuming <SomeSubComponent /> is not rendered by TestComponent's render
```
