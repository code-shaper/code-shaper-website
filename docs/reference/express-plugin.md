---
sidebar_position: 3
---

# Express plugin

This plugin contains a single generator to scaffold an
[Express](https://expressjs.com/) server to host APIs.

## Installation

:::tip Prerequisites

Before installing this plugin, make sure that you have installed the `shaper`
CLI and created a monorepo for your code. See
[Setting up a monorepo](../getting-started/setting-up-a-monorepo.md) for
instructions.

:::

Add a dev dependency at the root of your code repository:

```shell
npm install -D @code-shaper/express
```

Now you can run the `shaper` CLI to generate an express server. For example:

```shell
shaper
? Which plugin would you like to run? Express
? Which generator would you like to run? app
? Application name? movie-magic-api
? Parent directory? apps
? Package name used for publishing? @movie-magic/movie-magic-api

Creating movie-magic-api...

Done.

1. Edit /configs/typescript-config-custom/package.json to add a new typescript configuration
   (typescript-library.json) if it is not already there. See below:

     "files": [
       "base.json",
       "typescript-library.json"
     ],

2. In the root directory, run:
     npm install
     npm run build

3. Run movie-magic-api from the root directory:
     npm run dev

4. Point your browser to http://localhost:8080/top-10-movies to call the sample API.
```

## Example of generated code

https://github.com/code-shaper/movie-magic/tree/main/apps/movie-magic-api

## Source Code

https://github.com/code-shaper/code-shaper/tree/main/plugins/express
