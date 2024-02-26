# Docs 

## Tests 

### Configuration

- Visit the [Setting up Jest with Next.js]([./tests/CONFIGURATION.md](https://nextjs.org/docs/app/building-your-application/testing/jest)) page to get now how to configure the tests with Nextjs.
  - You might need to install ts-node to be able to run tests with typescript. Visit the [ts-node](https://www.npmjs.com/package/ts-node) page to get more information about the ts-node package.
  - Install ts-node with the following command
    ```bash
    npm install --save-dev ts-node 
    ```

## CI/CD

### Links
- [Github Actions Tutorial](https://resources.github.com/learn/pathways/automation/essentials/automated-application-deployment-with-github-actions-and-pages/)
- [Different environments variables](https://www.mohammadfaisal.dev/blog/how-to-handle-different-environments-in-a-nextjs-application)
- [12 Factor App](https://12factor.net/)
- [SO - The best way to deploy the different branches](https://stackoverflow.com/questions/77662783/how-to-deploy-nextjs-app-with-ci-cd-jenkins-docker-nginx)

### Configuration

- Visit the [Github Actions Tutorial](https://resources.github.com/learn/pathways/automation/essentials/automated-application-deployment-with-github-actions-and-pages/) page to get now how to configure the CI/CD with Github Actions.

#### Create folder structure 
**Depending on the nature of your workflow name the files accordingly**

    ```bash
    mkdir -p .github/workflows
    ```
    
Create the `build-and-test.yml` file inside the `.github/workflows` folder

    ```bash 
    touch .github/workflows/build-and-test.yml
    ```