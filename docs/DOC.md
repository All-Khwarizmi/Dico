# Docs 

## Tests 

### Configuration

- Visit the [Setting up Jest with Next.js]([./tests/CONFIGURATION.md](https://nextjs.org/docs/app/building-your-application/testing/jest)) page to get now how to configure the tests with Nextjs.
  - You might need to install ts-node to be able to run tests with typescript. Visit the [ts-node](https://www.npmjs.com/package/ts-node) page to get more information about the ts-node package.
  - Install ts-node with the following command
    ```bash
    npm install --save-dev ts-node 
    ```

#### Additional Configuration

Here are the additional configurations that I had to do to make the tests work with typescript.

1. I had to install babel to make tests work with typescript. Visit the [Jest Configuration](https://jestjs.io/docs/getting-started#using-typescript) page to get more information about the Jest configuration.
    - Might be necessary to change the babel configuration to make it work with typescript. Visit the [Babel Configuration](https://babeljs.io/docs/en/babel-preset-typescript) page to get more information about the Babel configuration.
    - Change babel configuration file name from `babel.config.js` to `babel.config.cjs`  [SO issue](https://stackoverflow.com/questions/61146112/error-while-loading-config-you-appear-to-be-using-a-native-ecmascript-module-c)
    - Make sure to install the `@babel/preset-typescript` package with the following command: [SO issue](https://stackoverflow.com/questions/56519158/cannot-find-module-babel-preset-env-from-path-did-you-mean-babel-env)
        ```bash
        npm install --save-dev @babel/preset-typescript
        ```
        and
        ```bash
        npm install --save-dev @babel/preset-env
        ```