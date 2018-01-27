Nextjs Template
=======

[Nextjs](https://github.com/zeit/next.js) already provide a very easy way to use react to create a universal app. However, there are still much to setup if you want to put your app to a production environment. I have spent some time myself to come up with a project template which is able to suit my business needs.

This project template is actually a simple universal webapp with 2 screens. I hope it will be a useful example for those who are interested to build your next webapp with Nextjs.

In the following sections, I will explain my design philosophy injected into this project template.

## Getting Started

To run this example, simply do:
```sh
npm install
npm run dev
```

Then you will see a simple web app with 2 pages like this:

<img src="https://raw.githubusercontent.com/stanleyfok/nextjs-template/master/assets/images/screenshot.png" width="500" />

## Highlights

 * a project skeleton on [Nextjs](https://github.com/zeit/next.js/) SSR supported React framework
 * integrated with express.js for nice URL routing
 * use of scss
 * i18n support by integrating [i18next](https://www.i18next.com/)
 * using jest as unit testing framework with examples on component unit testing with snapshots and mocking api client
 * consideration of security on config files
 * consideration of using CDN for hosting static files
 * with eslint setup with rules from airbnb-base and react/recommended
 * with sasslint setup
 * [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) support
 * a sample dockerfile and docker-compose.yml, which the docker-compose.yml simulates a environment having an application server and a CDN server

## Useful Commands

```sh
#to run in dev mode
npm run dev

#to run in qa or production env. Expect to run this in docker
npm run start

#to run the webpack analyzer
npm run analyze

#to check js and json syntax
npm run eslint

#to auto fix js and json syntax
npm run eslint-fix

#to check scss syntax
npm run sasslint

#to clear cache and .next folder
npm run cc

#to run all jest test cases
npm run test

#to run only unit tests
npm run test-unit

#to run only integration tests
npm run test-int

#to show test coverage report
npm run test-coverage
```

## Design Philosophy - Dev Environment

### 💡 Rule: Hot Reload should be supported during development

Hot Reload is important for frontend development as the changes can be reflected in a very quick manner. Hot reload feature is already supported by the latest version of Nextjs. Any changes on the source files would trigger rebuilding the application automatically.

### 💡 Rule: Code Linting is required

Linters are added into this project template to enhance code quality.

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

## Design Philosophy - Application Design

### 💡 Rule: Need a clear layout structure

Every page in the same project actually shares the same structure. I make good use of some Nextjs features and some custom components to organize the pages:

#### pages/_document.js

This is provided by the Nextjs framework. It defines root skeleton of any page. For example, it contains markup like `<html>`, `<head>`, `<body>`

#### components/Layout.js

This is a custom component, which is more about look and feel structure of any page. For a typical webpage, we usually need a define the header, the footer and where to show the main content.

#### components/Meta.js

This components is representing the meta data to be placed in the <head> section. In this example, I have only added page title and page description. You can extend it to hold more meta fields, for example, the [facebook open graph markup](https://developers.facebook.com/docs/sharing/webmasters/#markup)

#### Individual Page

This is where we define the actual page content. A page needs to include the Meta component and Layout component. The Meta component defines those required meta fields, such as page title and description, while the Layout component describes the look and feel of the page.

Here is how it looks in the render method of a page:
```js
render() {
  return (
    <Layout>
      <Meta
        title="Page Title"
        description="Page Description"
      />
      <p>Hello World</p>
    </Layout>,
  );
}
```

### 💡 Rule: Error Page has to be customized

Nextjs allows us to define our own error page. The custom error page is located at [/pages/_error.js](https://github.com/stanleyfok/nextjs-template/blob/master/pages/_error.js). It looks very similar to the normal pages as you can also define it's own Meta and Layout.

### 💡 Rule: Routes pattern has to be SEO friendly

[Custom server and routing](https://github.com/zeit/next.js#custom-server-and-routing) are needed because we need to support dynamic routing like '/shows/3557-Beware-the-Batman' for better SEO. The routing config file is just a simple object, having each row in the following format:

`'[http method] [pattern]': '[actual nextjs page path]'`

This is how it actually looks in our example:
```js
module.exports = {
  'GET /': '/index',
  'GET /shows/(:id)(-*)?': '/show',
};
```

The [server.js](https://github.com/stanleyfok/nextjs-template/blob/master/server.js) takes this routing file and tells the Express engine how to response when seeing the url patterns.

#### Related Files

 * [configs/routes.js](https://github.com/stanleyfok/nextjs-template/blob/master/configs/routes.js)
 * [server.js](https://github.com/stanleyfok/nextjs-template/blob/master/server.js)

## Design Philosophy - JS

### 💡 Rule: Ensure imported modules are universal

Not all javascript libraries can be run on both server and client side. When you pick a module to use, make sure it is universal.

### 💡 Rule: Config file cannot expose parameters from other environments

In a universal application, every files will be exposed to the frontend. You can actually define your config file like below, which contains all parameters under different environment:

```js
export default {
  dev: { apiHost: 'http://localhost:3001/' },
  staging: { apiHost: 'https://www.myinternalsite.com/' },
  production: { apiHost: 'https://www.mysite.com/' },
}
```

However, the problem is that this would leak internal information to the public, which maybe potentially a security issue.

To solve this problem, the babel plugin [transform define](https://www.npmjs.com/package/babel-plugin-transform-define) is used. It helps to rewrite a variable to its actual value during babel compilation. The variables which can be replaced during the compile time are defined at [env.config.js](https://github.com/stanleyfok/nextjs-template/blob/master/env.config.js)

#### Related Files

 * [configs/config.js](https://github.com/stanleyfok/nextjs-template/blob/master/configs/config.js)
 * [env.config.js](https://github.com/stanleyfok/nextjs-template/blob/master/env.config.js)

## Design Philosophy - CSS and other media files

### 💡 Rule: Use of SCSS

SCSS is a powerful CSS syntax extension which makes our lives easier. I have given up the use of [styled-jsx](https://github.com/zeit/styled-jsx) as I found it easier to organize my styles with scss. For example, I can change the whole site's look and feel by replacing the css file. I couldn't figure out a nice way to do this in styled-jsx. It would be great if someone can share me your experience :)

### 💡 Rule: Use new path for a new version of asset files

When using a CDN, a URL can be cached for a long period of time. Even you replace with a new file content, the CDN will still serve the previous copy of the files stored in the CDN. The safest way is to have different file paths for different releases.

I have introduced 'version hash' to solve it, which is simply the md5 hash of the version number in package.json. A folder named by the version hash will be generated under the path `/static`. For example:
`/static/47cd76e43f74bbc2e1baaf194d07e1fa/images/favicon.png`

If you have any new release, remember to bump up the version number. Your static files will then be placed in a new url, and then be cached by the CDN.

Also, do not check in any code under the static folder. Instead, please put your resources file under the `assets` folder. The webpack rules defined in [next.config.js](https://github.com/stanleyfok/nextjs-template/blob/master/next.config.js) will move your files to the static version hash folder.

## Design Philosophy - i18N

### 💡 Rule: Every string should be placed in translation files

No matter the site is built for one or more locales, it is still a good practice to extract text into translation files. It will help us to better organize the string and make changes very easily. The JSX files should be clean and without any text content.

### 💡 Rule: Make sure no translation files are loaded if the page is rendered with SSR

If the page is rendered by server side, the translation should be ready at server side already. Therefore, we should not expect a translation file is loaded in the client side. You can verify this by inspecting the network calls in your browser. This can ensure the page load speed is faster by loading less files in the browser.

### 💡 Rule: Translation should be organized with hierarchy

By using the library [i18next](https://www.i18next.com/), translation files are stored in JSON format. We should group the translation string, rather than constructing a long translation key

Good:
```js
{
  "header": {
    "title": "Batman TV Programs"
  },
  "footer": {
    "text": "This is footer"
  }
}
```

Bad:
```js
{
  "header_title": "Batman TV Programs",
  "footer_text": "This is footer"
}
```

## Design Philosophy - User Experience

### 💡 Rule: Need to show progress bar when navigating between pages

If data is fetched from client side in getInitialProps(), the UI is frozen util API is fetched completely. Therefore, we have to ensure progress bar is shown when users click on any links. In this example, the plugin [NProgress](https://www.npmjs.com/package/nprogress) is used.

## Design Philosophy - Quality Control

### 💡 Rule: Ensure every page can be loaded from server side and client side

The great thing Nextjs provides to us is React with SSR, which means any page can be access from server side and client side. This also means that you have to ensure your page should be functional when entering from server side or client side.

### 💡 Rule: Test Driven Development is encouraged

Need to write unit test for every modules or UI components

### 💡 Rule: Need a file structure favoring writing test cases

This article says well how to manage the test files: http://www.tysoncadenhead.com/blog/where-should-i-put-javascript-unit-tests/

I take the approach having the `__tests__` folder in each folders, so unit testing files are closer to the modules

### 💡 Rule: Using Jest and Enzyme for unit testing tools

The library [enzyme](https://www.npmjs.com/package/enzyme) and [enzyme-to-json](https://www.npmjs.com/package/enzyme-to-json) are mainly used to write unit tests

### 💡 Rule: Need to export the undecorated component for every component file to facilitate unit testing

Each react component has to export the undecorated component. For example:
```js
export default withI18N(Footer);
export const undecorated = Footer;
```

The exported undecorated will be only used for unit testing. This can help us to test a component by passing the required props. [Shallow rendering](https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md) is used whenever possible.

### 💡 Rule: API client library has to be mocked

API client library has to be mocked so that unit testing is not related to the real api. It will also speed up the time running your test cases.

Reference: https://hackernoon.com/api-testing-with-jest-d1ab74005c0a

## Design Philosophy - Optimization

### 💡 Rule: Analyzer

It is always a good practice to run the [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) to understand how to optimize your app. To learn some optimization skills on Nextjs, please refer to:

* [Lazy Loading Modules](https://learnnextjs.com/excel/lazy-loading-modules)
* [Lazy Loading Components](https://learnnextjs.com/excel/lazy-loading-components)

```sh
#To start the analyzer
npm run analyze
```

## Design Philosophy - Deployment

### 💡 Rule: Using Docker for deployment strategy

A sample dockerfile is created for reference

### 💡 Rule: Using Docker Compose to simulate a close to production env

Docker compose can help you to simulate an environment closer to your production environment. In this example, I have added a CDN server to simulate serving static files through CDN.

#### Related Files

 * [Dockerfile](https://github.com/stanleyfok/nextjs-template/blob/master/Dockerfile)
 * [.dockerignore](https://github.com/stanleyfok/nextjs-template/blob/master/.dockerignore)
 * [docker-compose.yml](https://github.com/stanleyfok/nextjs-template/blob/master/docker-compose.yml)

## To do
 * error page should not return 200 status code
 * unit test rewrite
 * Add BEM example for CSS
 * implement Redux
