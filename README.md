Nextjs template
=======

[Nextjs](https://github.com/zeit/next.js) already provide a very easy way to use react to create a universal app. However, there are still much to setup if you want to put your app to a production environment. This project template is actually a simple universal webapp, compiled from my own web development experience and standard. Hope it will be helpful for anyone going to use nextjs.

## Concept

* babel, webpack, when?

## Page Structure

Every page in the same project actually shares the same structure. I make good use of some Nextjs features and some custom components to organize the page:

#### pages/_document.js

This is provided by the Nextjs framework. It defines root skeleton of any page. For example, it contains markup like <html>, <head>, <body>

#### components/Layout.js

This is a custom component, which is more about look and feel structure of any page. For a typical webpage, we usually need a define the header, the footer and where to show the main content.

#### components/Meta.js

This components is representing the meta data to be placed in the <head> section. In this example, I have only added page title and page description. You can extend it to hold more meta fields, for example, the [facebook open graph markup](https://developers.facebook.com/docs/sharing/webmasters/#markup)

#### Individual Page

This is where we define the actual page content. A page needs to include the Meta component and Layout component. The Meta components defines those requires meta fields, such as page title and description, while the Layout component indicates the look and feel of the page.

Also, thanks for React16, we are able to return an array of elements. Here is how it looks in the render method for a page:
```js
render() {
  return [
    <Meta
      key="0"
      title="Page Title"
      description="Page Descriptipn"
    />,
    <Layout key="1">
      <p>Hello World</p>
    </Layout>,
  ];
}
````

## Server Custom Routing

## CSS Handling

### Hot reload

## Configs

### Config file

### Routes

## Custom Error Page

## Code Quality

Linter is in-corporate into this project template to enhance code quality

### JS

For javascript, [eslint](https://eslint.org/) is used, extending rules from [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) and [react/recommended](https://github.com/yannickcr/eslint-plugin-react)

### CSS

For css, [sass-lint](https://www.npmjs.com/package/sass-lint) is used
