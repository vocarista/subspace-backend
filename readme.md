# Documentation for the Code

## Overview

This documentation describes the structure and functionality of a Node.js application consisting of two main files, `service.ts` and `server.ts`. The application fetches data from an external API, processes it, and exposes two API endpoints for querying statistics and searching blogs. `The comments in the code and this documentation have been generated using ChatGPT.`

## service.ts

### Functions

#### `getLongestTitle(blogs: Array<any>): string`

- Description: This function takes an array of blog objects as input and returns the title of the longest blog post.
- Parameters:
  - `blogs`: An array of blog objects, where each object contains a `title` property.
- Returns: A string representing the title of the longest blog post.

#### `getNoTitlesWithPrivacy(blogs: Array<any>): number`

- Description: This function takes an array of blog objects as input and returns the number of blog posts that contain the word "privacy" (case-insensitive) in their titles.
- Parameters:
  - `blogs`: An array of blog objects, where each object contains a `title` property.
- Returns: An integer representing the number of blog posts with "privacy" in their titles.

#### `getUniqueBlogTitles(blogs: Array<any>): Array<any>`

- Description: This function takes an array of blog objects as input and returns an array of unique blog titles in lowercase.
- Parameters:
  - `blogs`: An array of blog objects, where each object contains a `title` property.
- Returns: An array of unique blog titles in lowercase.

#### `processData(data: Array<any>): any`

- Description: This function processes the provided array of blog data and returns an object containing statistics about the data.
- Parameters:
  - `data`: An array of blog objects, where each object contains a `title` property.
- Returns: An object with the following properties:
  - `total_blogs`: Total number of blogs in the input data.
  - `longest_title`: Title of the longest blog post.
  - `titles_with_privacy`: Number of blog posts with "privacy" in their titles.
  - `unique_blog_titles`: Array of unique blog titles in lowercase.

#### `getQueriedBlogs(blogs: Array<any>, queryTitle: string): Array<any>`

- Description: This function takes an array of blog objects and a query string as input and returns an array of blog posts that match the query string in their titles.
- Parameters:
  - `blogs`: An array of blog objects, where each object contains a `title` property.
  - `queryTitle`: A string representing the query to search for in blog titles (case-insensitive).
- Returns: An array of blog posts that match the query.

## server.ts

### Dependencies

- `express`: A Node.js web application framework for building APIs.
- `dotenv`: A module for loading environment variables from a `.env` file.
- `axios`: A promise-based HTTP client for making API requests.
- `lodash`: A utility library for working with arrays, strings, and objects.

### API Endpoints

#### `/api/blog-stats` (GET)

- Description: This endpoint retrieves and returns statistics about the blog data fetched from an external API.
- Response: An object with the following properties:
  - `total_blogs`: Total number of blogs in the fetched data.
  - `longest_title`: Title of the longest blog post.
  - `titles_with_privacy`: Number of blog posts with "privacy" in their titles.
  - `unique_blog_titles`: Array of unique blog titles in lowercase.

#### `/api/blog-search` (GET)

- Description: This endpoint searches for blog posts based on a query string provided in the request query parameters and returns matching blog posts.
- Query Parameters:
  - `query`: A string representing the query to search for in blog titles (case-insensitive).
- Response: An array of blog posts that match the query.

### Functions

#### `fetchAnalytics(): Promise<any>`

- Description: This function fetches blog data from an external API, processes it using the `processData` function, and returns the processed data.
- Returns: A promise that resolves to an object containing statistics about the fetched data.

#### `statsCacheResolver(req: any): string`

- Description: A cache resolver function for memoization, used to generate cache keys based on request query parameters.
- Parameters:
  - `req`: The request object.
- Returns: A string representing a cache key based on the request query parameters.

#### `searchQuery(req: any): Promise<any>`

- Description: This function fetches blog data from an external API, searches for blog posts based on the query provided in the request query parameters, and returns matching blog posts.
- Parameters:
  - `req`: The request object.
- Returns: A promise that resolves to an array of blog posts that match the query.

#### `searchCacheResolver(req: any): string`

- Description: A cache resolver function for memoization, used to generate cache keys based on request query parameters.
- Parameters:
  - `req`: The request object.
- Returns: A string representing a cache key based on the request query parameters.

#### `pingServer(): void`

- Description: This function sends a ping request to this server (https://api.subspace.vocarista.com) to keep it active.
- Interval: Ping is sent every 14 minutes (interval defined by `pingInterval`).

#### `/` (GET)

- Description: The root endpoint that responds with "Server active" to indicate that the server is running.

### Server Initialization

- The server is initialized to listen on a specified port (default is 3000).
- A ping request is sent to an external server at regular intervals to keep it active.

## Running the Application

- Make sure to install the required dependencies using `npm install`.
- Create a `.env` file to store environment variables.
- Start the server using `npm start`.
- Access the API endpoints as described above.

Please note that this documentation provides an overview of the code's functionality and structure. Additional configuration and deployment steps may be required depending on the specific environment and requirements.
