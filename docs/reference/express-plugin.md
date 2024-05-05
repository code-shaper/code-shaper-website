---
sidebar_position: 3
---

# Express plugin

This plugin generates an [Express](https://expressjs.com/) server to host APIs.

## Installation

:::tip Prerequisites

Before installing this plugin, make sure that you have created a monorepo for
your code. See [Create a New Repo](../getting-started/create-a-new-repo.md) for
instructions.

:::

Add a dev dependency at the root of your code repository:

```shell
npm install -D @code-shaper/express
```

Now you can run the `shaper` CLI to generate an express server. For example:

```shell
npx shaper
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

## Example

https://github.com/code-shaper/movie-magic/tree/main/apps/movie-magic-api

## Repository

https://github.com/code-shaper/code-shaper/tree/main/plugins/express
