<h1 align="center">
  Social Chain Media Editorial Gatsby Theme
</h1>

## 🚀 Quick start

1.  **Configuration.**
    
    Copy sample.env to .env.development and .env.production files in the local root directory
    Fill in blanks

    | Variable       | Description                                                                                     |
    |----------------|-------------------------------------------------------------------------------------------------|
    | CLIENT_EMAIL   | This is your client email address from Google Analytics API                                     |
    | GOOGLE_API_KEY | The is the Google Analytics API Key                                                             |
    | DEPLOY_ENV     | This can either be lbn_published_stage or lbn_published_production depending on the environment |

    You also need to add these to the Netlify environment variables before deploying to staging or production. See below.

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd sc-editorial/
    yarn develop
    ```

3.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── gatsby
    ├── node_modules
    ├── src
    ├── static
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── package.json
    ├── README.md
    └── yarn.lock

1.  **`/gatsby`**: This directory contains all of the files linked from gatsby-node.js. They create the pages, posts, author and category pages.

2.  **`/node_modules`**: This directory contains all of the modules of code that the project depends on (npm packages) are automatically installed.

3.  **`/src`**: This directory contains all of the code related to what you see on the front-end of the site (what you see in the browser) such as the site header or a page template. `src` is a convention for “source code”.

4.  **`/static`**: Put files here that need to be placed at root level. i.e. robots.txt, ads.txt, favicon etc. 

5.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

6.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

7.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about the site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

8.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site (pages/posts etc) build process.

9. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

10. **`README.md`**: A text file containing useful reference information about your project.

11. **`yarn.lock`** (See `package.json` above, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project by Yarn. **(You won’t change this file directly).**

## Setting up menus

In Wordpress set up two menus, one with the slug 'main-menu' for the main navigation and one with the slug 'footer-menu' for the footer navigation.

## 💫 Set up Netlify
