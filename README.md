# FK Ventures

A WordPress-based website developed for FK Ventures.

## Enviroments

- `production`: [?]
- `staging`: [?]

## System Requirements

- [Node](https://nodejs.org/e)
- [NPM](https://www.npmjs.com/)
- Local Web server (Tools such as [MAMP](https://www.mamp.info/en/mamp-pro/) / [DevKinsta](https://kinsta.com/devkinsta/))
- [Composer](https://getcomposer.org/)
- [WP-CLI](https://wp-cli.org/)

## Tooling

- [Webpack](https://webpack.js.org/)
- [PostCSS](https://postcss.org/)
- [postcss-preset-env](https://preset-env.cssdb.org/)

### Recomendations

Although not required, we recommend you use [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) for managing node versions.

If you are using a Mac, we also recommend installing the above tools using [Homebrew](https://brew.sh/) where possible. If not, all the links above should provide options for installing the required tools on your specific setup.

## Setup

### Clone repo into a new project

Clone this repo into a new project folder on your local computer, and remove past `git` references:

- `git clone [GIT URL] [PROJECT FOLDER NAME]`
- `cd [PROJECT FOLDER NAME]`

### Duplicate and update config files

Duplicate the `example.env` to `.env`.

- `cp ./.env.example ./.env`

Update the details as required for the project.

### Setup local server & Database

Set up your local web server and MySQL Database, making sure any details (database, local domains, etc) match the credentials in your `.env` and `config.js` files.

### Install Dependencies

Run `npm install && composer install` to install all JS dependencies (via NPM), and PHP dependencies (via Composer).

> [!WARNING]
> For existing projects, it's likely the composer file won't match the WordPress plugins used on the live website. If taking a dump of a live or staging project, we recommend grabbing the `plugins` folder from the server to ensure you have the correct WordPress plugins installed.

### Setup the Database

We recommend grabbing a copy of the existing database from staging or production and updating the URLs.

# Structure

Below is a very brief overview of how the files in this project fit together:

- The whole project is contained within the repository, but only the needed files are included. Core/vendor should be ignored.
- The `src` folder contains all the assets and templates needed for the WordPress theme.
- The actual theme is built to `wp-content/themes/fk_ventures` to replicate a standard WP install
- Assets are compiled from `src` to the `wp-content/themes/fk_ventures/assets` folder.
- Any files required for tooling are stored at the project root.
- Secrets are stored in the `.env` file. Other project-based configs should be stored in the relevant dotfile, or `config.js`.

# Development

## Watching files and Browser Sync

Running `npm run dev` will watch all files for changes, and open a new browser window and refresh the page on save.

## CSS

This site uses [PostCSS](https://postcss.org/) and [postcss-preset-env](https://preset-env.cssdb.org/) for modern CSS deveopment. These are all compiled via [Webpack](https://webpack.js.org/).

For those familiar, this translates to a very similar developer experience with SASS/SCSS.

### Folder Structure

The `.css` files are divided up into several folders, with `./src/css/style.scss` acting as a manifest file for everything else. The folders we have include

- `global` - For styles that are re-used across the entire site.
- `blocks` - For styles that are used in blocks.
- `partials` - For website parts that are used multiple times across a site.
- `templates` - For styles specific to a particular page or template.

Each file contains file names that should be labelled to explain clearly what they are. For Example:

- `src/css/global/button.css` contains code related to the project's button styling, used throughout the site.
- `src/css/partials/site-header.css` contains the code used for the main site header of the site.
- `src/css/templates/home.css` contains code used for the home template of the project.

### Units

Where possible, we try to use [REM](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#ems_and_rems) units.

We try to avoid using straight pixel units, but sometimes it has to be done. Of course, `vw` / `vh` and `%` units are fully acceptable.

### Media Queries

We're using [postcss-custom-media](https://github.com/csstools/postcss-custom-media) to support MQs. The variable names for queries can be found at `src/css/global/queries.css`.

## SVG

There are some basic recommendations for SVGs that you should follow:

- Use `fill="currentColor"` or `stroke="currentColor"` to allow you to control SVG colours as if they were text.
- Include a `viewbox` attribute for flexible sizing using CSS
- Make sure to include a `<title>` tag to meet A11y best practices
- Compress your files using [SVGOMG](https://jakearchibald.github.io/svgomg/) or similar for best performance.

## Responsive Images

We've created some simple functions and partials for generating responsive images across thr website.

### 1. Function

```twig
{{ responsiveImage(123) }}
{{ responsiveImage(123, 'my-class') }}
```

### 2. Partial Include

```twig
{% include 'partials/responsive-image.twig' with {
  image_id: 123,
  class: 'my-class'
} %}
```

#### Features

- Automatic srcset generation
- Responsive sizes attribute
- Lazy loading (default: true)
- Custom image sizes support
- Alt text, title, and caption handling

#### Parameters

- `image_id`: WordPress attachment ID (required)
- `class`: CSS classes (optional)
- `lazy`: Enable lazy loading (default: true)
- `custom_sizes`: Array of custom sizes (optional)

## Production Build

Running `npm run build` will build the production assets of the static files. This can then be uploaded to the server.
