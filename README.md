Nextjs Template
=======

[Nextjs](https://github.com/zeit/next.js) already provide a very easy way to use react to create a universal app. However, there are still much to setup if you want to put your app to a production environment. I have spent some time myself to come up with a project template which is able to suit my business needs.

This project template is actually a simple universal webapp with 2 screens. Hope it will be a useful example for those who are interested to build your next webapp with Nextjs.

In the following sections, I have listed the design philosophy in this project template.

## Getting Started

To run this example, simply do:
```sh
npm run dev
```

## Design Philosophy

### 💡 Rule: Need a clear layout structure

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
```

### 💡 Rule: Error Page has to be customized

Nextjs allow us to define our own error page. The custom error page is located at [/pages/_error.js](https://github.com/stanleyfok/nextjs-template/blob/master/pages/_error.js). It looks very similar to the normal pages as you can also define it's own Meta or Layout.

### 💡 Rule: Config file cannot expose parameters from other environments

In a universal application, every files will be exposed to the frontend. You can actually define your config file like this, to contains all parameters under different environment:

```js
export default {
  dev: { apiHost: 'http://localhost:3001/' },
  staging: { apiHost: 'https://www.myinternalsite.com/' },
  production: { apiHost: 'https://www.mysite.com/' },
}
```

However, the problem is that this would leak internal information to the public, which maybe protentially a security issue. 

To solve this problem, the babel plugin [transform define](https://www.npmjs.com/package/babel-plugin-transform-define) is used. It helps to rewrite a variable to its actual value during compile time. The variables which can be replaced during compiled time are defined at [global-config.js](https://github.com/stanleyfok/nextjs-template/blob/master/global-config.js)

#### Related Files

 * [configs/config.js](https://github.com/stanleyfok/nextjs-template/blob/master/configs/config.js)
 * [global-config.js](https://github.com/stanleyfok/nextjs-template/blob/master/global-config.js)

### 💡 Rule: Routes pattern has to be SEO friendly

[Custom server and routing](https://github.com/zeit/next.js#custom-server-and-routing) are needed because we need to support dynamic routing like '/articles/123' for better SEO. The routing config file is just a simple object, having each row in the following format:

```
'[http method] [pattern]': '[actual nextjs page path]'
```

This is how it actually looks in our example:
```js
module.exports = {
  'GET /': '/index',
  'GET /shows/:id': '/show',
};
```

The [server.js](https://github.com/stanleyfok/nextjs-template/blob/master/server.js) takes this routing file and tell Express engine how to response when seeing the http method and patterns.

#### Related Files

 * [configs/routes.js](https://github.com/stanleyfok/nextjs-template/blob/master/configs/routes.js)
 * [server.js](https://github.com/stanleyfok/nextjs-template/blob/master/server.js)

### 💡 Rule: Hot Reload should be supported during development

Hot Reload is important for frontend development as the changes can be reflected in a very quick manner. Hot reload feature is already supported by the latest version of Nextjs. Any changes on the source files would trigger rebuilding the application automatically.

### 💡 Rule: Need to leaverage CDN for CSS and JS

to write after more testing

### 💡 Rule: Code Linting is required

Linters are added into this project template to enhance code quality:

#### JS

For javascript, [eslint](https://eslint.org/) is used, extending rules from [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) and [react/recommended](https://github.com/yannickcr/eslint-plugin-react)

```sh
#To check js syntax
npm run eslint

#To try fixing js syntax
npm run eslint-fix
```

#### SCSS

For scss, [sass-lint](https://www.npmjs.com/package/sass-lint) is used.
```sh
#To check scss syntax
npm run sasslint
```

### 💡 Rule: Analyzer

It is always a good practice to run the (webpack-bundle-analyzer)[https://github.com/webpack-contrib/webpack-bundle-analyzer] to understand how to optimize your app. To learn some optimization skills on Nextjs, please refer to:

* [Lazy Loading Modules](https://learnnextjs.com/excel/lazy-loading-modules)
* [Lazy Loading Components](https://learnnextjs.com/excel/lazy-loading-components)

```sh
#To check scss syntax
npm run analyze
```

### 💡 Rule: Test Driven Development is encouraged

to do

### 💡 Rule: Using Dockerfile for development and deployment strategy

to add

## To do

Not yet know
