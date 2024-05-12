---
sidebar_position: 4
---

# Create a Remix App

The Remix plugin generates an opinionated web application using the following
key technologies:

1. Framework: [React 18](https://react.dev/) + [Remix](https://remix.run/)
2. Styling: Plain CSS or [Tailwind CSS](https://tailwindcss.com/)
3. Linting:
   [Code Shaper ESLint configuration](https://github.com/code-shaper/code-shaper/tree/main/configs/eslint-config)
   – this is a stricter, production-grade configuration than what you get using
   `create-remix`.

You can add additional libraries and frameworks depending on your needs.

:::tip Testing and Storybook support

The Remix generator does not yet include testing and Storybook support. You can
get the latest guidance on these by following the references below:

- [@remix-run/testing](https://remix.run/docs/en/main/other-api/testing)
- [Storybook + Testing Helper](https://github.com/remix-run/remix/discussions/2481)

:::

This section provides basic instructions for generating a web application using
the Remix plugin. We'll then show you how to extend this application using
additional generators and popular libraries. The final application will show a
list of top 10 movies as shown below. You can find the completed example of this
application
[here](https://github.com/code-shaper/movie-magic/tree/main/apps/movie-magic-remix).

![Home Page](./img/home-page.png)

## Prerequisite

Make sure that you have the `movie-magic` repository set up as described in
[Create a new repo](./create-a-new-repo).

## Install Remix plugin and generate an app

Install Code Shaper plugin for Remix.

```shell
npm install @code-shaper/remix
```

Now generate a Remix application. By convention, applications are created in the
**apps** directory. Let's create one there.

```shell
npx shaper
? Which plugin would you like to run? Remix
? Which generator would you like to run? app
? Application name? movie-magic-remix
? Parent directory? apps
? Package name used for publishing? @movie-magic/movie-magic-remix
? Would you like to use Tailwind CSS? Yes
```

Now execute the following commands for further setup and commit of all changes:

```shell
# Install dependencies:
npm install

# Build and run the app to make sure it works
npm run build
npm run dev

# Point your browser to http://localhost:3000/.
# You should see the running app.
#
# Note: If you have another app in this repo that
# runs on port 3000, you should change the port for
# this app in `apps/movie-magic-remix/remix.config.ts`.
# Search for `3000` (2 places) and change them to
# something else.

# Commit
git add .
git commit -m "chore: add movie-magic-remix app"
```

The app is now ready to customize to your needs.

## Extend the application

Let's see how we can extend our application to show a list of top 10 movies
using additional generators and some popular libraries. Run the following
command in the root directory of your repo to install the libraries we will use
for this example.

> Note: Do not run `npm install` or `npm ci` in any of the subdirectories. It
> will break the build. There should be only one `package-lock.json` file in the
> entire repo (at the root). See
> [Turborepo docs](https://turbo.build/repo/docs/handbook/package-installation#addingremovingupgrading-packages)
> regarding this.

```
npm install clsx axios @tanstack/react-query --workspace @movie-magic/movie-magic-remix
```

Here's a short explanation of the libraries we installed:

1. [clsx](https://github.com/lukeed/clsx): A tiny (239B) utility for
   constructing `className` strings conditionally
2. [axios](https://axios-http.com/): A promise-based HTTP Client for node.js and
   the browser
3. [@tanstack/react-query](https://tanstack.com/query): Asynchronous state
   management for React, providing declarative, auto-managed queries and
   mutations

## Create TypeScript definitions

Let's start by creating TypeScript definitions for data structures that we will
need in our app. Copy the following 4 files from
[the completed example](https://github.com/code-shaper/movie-magic/blob/main/apps/movie-magic-remix/src/models)
into your `apps/movie-magic-remix/src/models` folder:

1. `index.ts`
2. `Movie.ts`
3. `PaginationInfo.ts`
4. `QueryParams.ts`

:::tip Copying files from the completed example

When copying files from the completed example, do take a minute to understand
them. They are well commented, so it should be easy to understand what they are
doing.

:::

## Create a MovieList component

Now we will create a `MovieList` component that receives a list of movies and
displays it. Such components are called _presentational_ components - they don't
worry about how the data was obtained, their job is to simply render it.

We will generate the `MovieList` component using the component generator
provided by the Next.js plugin. Follow the steps below:

```shell
npx shaper
? Which plugin would you like to run? Remix
? Which generator would you like to run? component
? Component name? MovieList
? Which workspace should this go to? apps/movie-magic-remix
? Parent directory within workspace? src/components/MovieList
```

A placeholder `MovieList` component has been created for you. Also a placeholder
Storybook story has been created. Let's implement `MovieList` interactively
using Storybook.

```shell
npm run storybook
```

Point your browser to `http://localhost:6006`. Storybook shows the placeholder
implementation of `MovieList`.

## Implement the MovieList component

We are now ready to implement the real `MovieList`.

1. Create the data to render movies. Copy the `movies.ts` file from
   [the completed example](https://github.com/code-shaper/movie-magic/blob/main/apps/movie-magic-remix/src/mocks/movies.ts)
   into your `apps/movie-magic-remix/src/mocks` folder.
2. Overwrite the placeholder implementation of `MovieList` at
   `apps/movie-magic-remix/src/components/MovieList/MovieList.tsx` from
   [the completed example](https://github.com/code-shaper/movie-magic/blob/main/apps/movie-magic-remix/src/components/MovieList/MovieList.tsx).

## Commit your code

```shell
# Commit
git add .
git commit -m "feat: add MovieList to the home page"
```

Congratulations! You have successfully built a Remix web application from
scratch in just a few minutes. This is the power of Code Shaper.
