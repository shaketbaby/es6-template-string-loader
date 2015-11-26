
## Why
I am a fan of the css-modules, but it is not so easy to use it together with Angular.

This loader, together with babel-loader, makes it fairly easy to do that.
There are certainly other use cases for this loader too.

## Usage

```
  npm install --save-dev es6-template-string-loader
```

Add the following to Webpack's config file:

```javascript
  loaders: [
    { test: /\.css$/, loader: "style!css?modules" },
    { test: /\.html$/, loader: "babel!es6-template-string" }
  ]

```

In CSS file, foo.css

```css
.foo {
  color: blue;
}
```

In HTML template, foo.html

```html
  <div class="${this.foo}"></div>
```

In the JS file that define the directive, foo.js
```javascript
  import styles from "foo.css";
  import template from "foo.html";

  ngApp.directive("foo", function() {
    return {
      scope: {},
      restrict: 'E',
      template: template(styles)
      controller: function() {

      }
    };
  });
```

Or, if you don't like to use this, then you can specify a different name by using context parameter

```javascript
  loaders: [
    { test: /\.css$/, loader: "style!css?modules" },
    { test: /\.html$/, loader: "babel!es6-template-string?context=styles" }
  ]

```

Then, you would be able to use `styles` in the HTML template

```html
  <div class="${styles.foo}"></div>
```

If you use babel 6, make sure to add the required loaders params, like this:
```javascript
  loaders: [
    { test: /\.css$/, loader: "style!css?modules" },
    { test: /\.html$/, loader: "babel?presets[]=es2015!es6-template-string" }
  ]
```
