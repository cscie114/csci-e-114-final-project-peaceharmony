/*
 * @type {import('gatsby').GatsbyConfig}
 */

console.log("Current date/time (UTC) = ", new Date());  // UTC
console.log("Start gatsby-config.js");

require("dotenv").config();

module.exports = {

  siteMetadata: {
    title: `Final Project`,
    description: `Final Project for CSCI E-114`,
    course: `CSCI E-114`,
    siteUrl: `https://www.example.com/`,
  },

  plugins: [

    // For reading JSON files from the file system.
    // We'll put our Local Data in the /data/ folder...
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`,
      },
    },

    // For Gatsby Image...
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `srcimagesmovies`,
        path: `${__dirname}/src/images/movies/`,
      },
    },

    // For Algolia Search...
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries")
      },
    },
    `gatsby-plugin-styled-components`
    
  ]
}
