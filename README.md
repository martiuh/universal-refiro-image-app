## Refiro - Redux, SSR, Code Splitting Web App

My own extension from [`redux-first-router-demo`](https://github.com/faceyspacey/redux-first-router-demo)

I decided to build this, because I wanted a little more features that the demo provided (duh!). Although most of the code it's still for the demo, I made a few changes

### Which are...

- I don't use `babel-pollyfil` for the production build, although I'm really not sure if the whole pollyfill is necesary, I found a really light weight babel pollyfil called `babel-es6-polyfill-light` which is really lightweight, perfect for a leaner production bundle.

- [`html-webpack-plugin`](https://github.com/jantimon/html-webpack-plugin) a really cool webpack plugin that allows to inject a lot of other cool plugins features to the app, such as favicons, auto-generated manifest, pwa features, and more...

- Support for [`ejs`](https://github.com/tj/ejs), all the power of the [`webpack-flush-chunks`](https://github.com/faceyspacey/webpack-flush-chunks) wouldn't be taken advantege of, if we wouldn't be able to inject it to our html, that's why I decided to go for an express render engine and although I'm more of a `pug` guy, I did what needed to be done with `ejs`.

- `webpack-merge` for the webpack config strategy.
