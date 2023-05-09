"use strict";
 
console.log("Start gatsby-node.js");

require("dotenv").config();
const OMDB_API_KEY = process.env.OMDB_API_KEY;
const EleventyFetch = require("@11ty/eleventy-fetch");

// gatsbyjs.com : "Code in the file gatsby-node.js is run once in the process of building your site. You can use its APIs to create pages dynamically, add data into GraphQL, or respond to events during the build lifecycle."

exports.sourceNodes = async function ({ actions, createContentDigest, createNodeId }) {

  console.log("Now inside exports.sourceNodes = async function ({ actions, createContentDigest, createNodeId })");
  
  const { createNode } = actions;
  
  // Miscellaneous Variables
  let topMovies = [];
  let baseURLMovies = "https://www.omdbapi.com/?";
  let baseURLPosters = "https://img.omdbapi.com/?";

  // * The Latest up to date Wikipedia Summary...
  // The "redirects" parameter will automatically follow through to the canonical Wikipedia Page in case the Movie Title does not quite match Wikipedia's exact name/title for that page.
  // The "extracts" parameter will return the text content as extracts (what we're looking for) and not just meta data such as article id, any redirect info, etc.
  // The "explaintext" parameter will return extracts as plain text instead of HTML (which can cause issues in our web page if the HTML is not formed exactly right).
  // The "exintro" parameter will limit to just the top summary section (otherwise if this is removed then all of the sub-sections will also be returned and then this basically would be almost the entire page).
  // * Then later in the code here below, we'll append the Movie Title and add in the "titles" parameter.
  let baseURLWiki = "https://en.wikipedia.org/w/api.php?format=json&action=query&redirects=1&prop=extracts&explaintext&exintro&";
  
  let userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36";
  
  // Query Variables & Settings
  let queryData;
  let queryDuration = "1d";
  let queryFetchOptions = { headers: { "User-Agent": userAgent } };
  let queryObject;
  let queryParams;
  let queryString;
  let queryType = "json";
  let queryDirectory = ".eleventycache";
  let queryURL;
  
  console.log("***** Movies *****");

  // The start of creating our Gatsby Local Data, later we'll use createNode and send this into GraphQL.
  const allTrailers = require("./data/trailers.json");

  // OMDB API -- the "i" is for the ID of the Movie and the "h" is for the height of the poster.
  // So this is the API and we have to match it -- then for here we'll change the traditional "i" for the index to the spelled out "index" to keep the variables clean and separate.
  for (let index = 0; index < allTrailers.length; index++) {
    queryParams = { apikey: OMDB_API_KEY, i: allTrailers[index].imdbID };
    queryObject = new URLSearchParams(queryParams);
    queryString = queryObject.toString();
    queryURL = baseURLMovies + queryString;
    console.log("OMDB queryURL = ", queryURL);
    try {
      queryData = await EleventyFetch(queryURL, { fetchOptions: queryFetchOptions, duration: queryDuration, type: queryType, directory: queryDirectory })
      .then( function(result) { return result; });
    } catch (error) { console.log("error = ", error); }
    // console.log("OMDB queryData = ", queryData);
    topMovies.push(queryData);

    /*
     *  The OMDB's IMDB Ratings are a little bit outdated.
     *  So we'll use our Gatsby Local Data instead, which has IMDB Ratings from May 2023.
     */
    topMovies[index].currentImdbRating = allTrailers[index].imdbRating;
    topMovies[index].currentImdbVotes = allTrailers[index].imdbVotes;

  }

  let wikiExtract;
  for (let i = 0; i < allTrailers.length; i++) {
    queryParams = { titles: allTrailers[i].movieTitle };
    queryObject = new URLSearchParams(queryParams);
    queryString = queryObject.toString();
    queryURL = baseURLWiki + queryString;
    console.log("WIKI queryURL = ", queryURL);
    try {
      queryData = await EleventyFetch(queryURL, { fetchOptions: queryFetchOptions, duration: queryDuration, type: queryType, directory: queryDirectory })
      .then( function(result) { return result; });
    } catch (error) { console.log("error = ", error); }
     
    // Interestingly, the Property Name is different with each Movie, so we can't ask by Name, we must simply get the very first property [0] on the Object.
    wikiExtract = Object.values(queryData.query.pages)[0].extract;

    topMovies[i].wikiData = queryData;
    topMovies[i].wikiExtract = wikiExtract;
  }
 
  let imdbPlusRottenTomatoesTieBreak;
   
  for (let i = 0; i < topMovies.length; i++) {

    // First, let's parseFloat currentImdbRating to remove it from the string and then multiply by 10000 so the first 2 digits represent the IMDB score.
    // Second, let's parseFloat the Rotten Tomatoes Value to remove it from the string and then add this to the IMDB score so now the last 3 digits represent the Rotten Tomatoes score.
    // We will then have a number with 5 digits that works perfectly to allow Rotten Tomatoes to be a very valid tie-breaker of the many, many same-score-ratings in the IMDB Top 250 list.
    imdbPlusRottenTomatoesTieBreak = ( parseFloat(topMovies[i].currentImdbRating) * 10000 ) + parseFloat(topMovies[i].Ratings[1].Value);
    topMovies[i].imdbPlusRottenTomatoesTieBreak = imdbPlusRottenTomatoesTieBreak;

  }
 
  // Sort Movies according to IMDB + Rotten Tomatoes
  topMovies.sort((a, b) => b.imdbPlusRottenTomatoesTieBreak - a.imdbPlusRottenTomatoesTieBreak);
 
  console.log("All of the Processing for all of the Movies completed successfully.");

  console.log("***** createNode *****");

  for (let i = 0; i < topMovies.length; i++) {  // Get All of the Top Movies.
    console.log("CREATING NODE for topMovies[i].Title = ", topMovies[i].Title);
    createNode({
      ...topMovies[i],
      id: createNodeId(topMovies[i].imdbID),
      parent: null,
      children: [],
      internal: {
        // contentDigest = "A digest 'Hash', or short digital summary, of the content of this node (for example, md5sum). The digest should be unique to the content of this node since it's used for caching. If the content changes, this digest should also change. There's a helper function called createContentDigest to create an md5 digest." (https://www.gatsbyjs.com/docs/reference/graphql-data-layer/node-interface/#contentdigest)
        contentDigest: createContentDigest(topMovies[i]),
        type: 'topMovies',
        description: 'Entire Data for a Movie.'
      }
    });
  }
  
}
 
// Thanks!
 
 
 
