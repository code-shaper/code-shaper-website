---
sidebar_position: 6
---

# Create a REST API with Express

The Express plugin generates a starter REST API using Express. You can then
modify this API to meet your requirements. The plugin uses the following key
technologies:

1. Framework: [Express](https://expressjs.com/)
2. Logging: [Morgan](https://github.com/expressjs/morgan)
3. Linting:
   [Code Shaper ESLint configuration](https://github.com/code-shaper/code-shaper/tree/main/configs/eslint-config)

You can add additional libraries and frameworks depending on your needs.

This section provides basic instructions for generating the starter REST API.
We'll then customize the API to return top 10 movies as required by the Movie
Magic application discussed in other sections. You can find the completed
example of this api
[here](https://github.com/code-shaper/movie-magic/tree/main/apps/movie-magic-rest-api).

## Prerequisite

1. Make sure that you have the `movie-magic` repository set up as described in
   [Create a new repo](./create-a-new-repo).
2. If you don't have the [jq JSON processor](https://jqlang.github.io/jq/)
   installed on your machine, install it. For example, on MacOS, install it
   using Homebrew: `brew install jq`.

## Install Express plugin and generate a starter API

Install Code Shaper plugin for Express.

```shell
npm install @code-shaper/express
```

Now generate an Express application. By convention, applications are created in
the **apps** directory. Let's create one there.

```shell
npx shaper
? Which plugin would you like to run? Express
? Which generator would you like to run? app
? Application name? movie-magic-rest-api
? Parent directory? apps
? Package name used for publishing? @movie-magic/movie-magic-rest-api
```

Execute the following commands for further setup and commit of all changes:

```shell
# Install dependencies:
npm install

# Build and run the app to make sure it works
npm run build
npm run dev

# Test that the starter REST API is working.
# In another shell execute the following command to fetch movies:
curl "http://localhost:8080/movies" | jq .

# This response should show 10 movies:
# [
#   {
#     "id": "1001",
#     "name": "The Shawshank Redemption",
#     "year": 1994,
#     "rating": 9.3
#   },
#   ...
# ]

# Commit the starter app
git add .
git commit -m "chore: add movie-magic-rest-api"
```

The app is now ready to be customized to your needs.

## Define the new API

The starter API returns all 10 movies contained in `movies.json` (at
_apps/movie-magic-rest-api/src/routes/data_). We want to enhance the API to
filter, sort and paginate the movies. For example,

1. `/movies?cert=PG&cert=R` should return all movies certified as either PG or R
2. `/movies?sort=RANK_ASC&page=1&perPage=10` should return the top 10 movies (by
   sorting the movies by their rank and then returning page 1, with page size
   = 10)

## Create type definitions

Let's create type definitions needed for customizing our API. Copy the following
4 files from
[the completed example](https://github.com/code-shaper/movie-magic/blob/main/apps/movie-magic-rest-api/src/models)
into a new folder at `apps/movie-magic-rest-api/src/models`:

1. `index.ts`
2. `Movie.ts`: enhanced movie structure
3. `PaginationInfo.ts`: pagination information returned by the _movies_ query
4. `QueryParams.ts`: data structures for processing query parameters

:::tip Copying files from the completed example

When copying files from the completed example, do take a minute to understand
them. They are well commented, so it should be easy to understand what they are
doing.

:::

## Enrich movie data

Overwrite the `movies.json` file in your
`apps/movie-magic-rest-api/src/routes/data` folder from the `movies.json` file
in
[the completed example](https://github.com/code-shaper/movie-magic/blob/main/apps/movie-magic-rest-api/src/routes/data/movies.json).
This file contains the enriched data conforming to the new `Movie` type
definition. Also it contains more that 10 movies so that we can test the new
filtering, sorting and pagination capabilities.

## Enhance the movies handler

Overwrite the `movies-router.ts` file in your
`apps/movie-magic-rest-api/src/routes` folder from the `movies-router.ts` file
in
[the completed example](https://github.com/code-shaper/movie-magic/blob/main/apps/movie-magic-rest-api/src/routes/movies-router.ts).
This file contains updated handler logic to parse query parameters and return
the movies that match the request.

Now let's test that the new handler logic is working. Start the REST API if it
is not already running:

```shell
npm run dev
```

In another shell, execute the following command to verify that you can filter by
multiple certificates:

```shell
curl "http://localhost:8080/movies?cert=PG&cert=R" | jq .
```

You should see the following result with 8 movies that are certified as either
PG or R:

```json
{
  "movies": [
    {
      "id": "tt0111161",
      "name": "The Shawshank Redemption",
      "description": "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
      "cast": ["Tim Robbins", "Morgan Freeman"],
      "certificate": "R",
      "genres": ["Drama"],
      "image": {
        "url": "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
        "width": 1200,
        "height": 1800
      },
      "rank": 1,
      "ratingsSummary": {
        "aggregateRating": 9.3,
        "voteCount": 2865906
      },
      "releaseYear": 1994,
      "runtime": 8520,
      "tagline": "Fear can hold you prisoner. Hope can set you free.",
      "isFeatured": false
    },
    ...
  ],
  "pageInfo": {
    "totalPages": 1,
    "totalItems": 8,
    "page": 1,
    "perPage": 8,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

Now execute the following command to get the list of top 10 movies:

```shell
curl "http://localhost:8080/movies?sort=RANK_ASC&page=1&perPage=10" | jq .
```

You should see the following result:

```json
{
  "movies": [
    {
      "id": "tt0111161",
      "name": "The Shawshank Redemption",
      "description": "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
      "cast": ["Tim Robbins", "Morgan Freeman"],
      "certificate": "R",
      "genres": ["Drama"],
      "image": {
        "url": "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
        "width": 1200,
        "height": 1800
      },
      "rank": 1,
      "ratingsSummary": {
        "aggregateRating": 9.3,
        "voteCount": 2865906
      },
      "releaseYear": 1994,
      "runtime": 8520,
      "tagline": "Fear can hold you prisoner. Hope can set you free.",
      "isFeatured": false
    },
    ...
  ],
  "pageInfo": {
    "totalPages": 2,
    "totalItems": 13,
    "page": 1,
    "perPage": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

## Commit your code

```shell
# Commit
git add .
git commit -m "feat: customize /movies API with filters, sort and pagination"
```

Congratulations! You have successfully built a custom movies API using Express
in just a few minutes. This is the power of Code Shaper.
