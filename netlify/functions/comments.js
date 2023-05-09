/*
 *  
 *  Get the very latest new Comments per Movie.
 *  We would like these Comments to be fresh and "Up To The Second".
 *  When we build our SSG site all of the API Data will be new at that point in time... but, after the SSG site is built, days later that data is no longer fresh and new.
 *  This is OK for some data, but for Comments we would like these to be new right up to that moment in time.
 *  >>> So therefore that's why we have Comments in a Netlify Real Time Serverless Function...
 *  
 */

"use strict";

console.log("Start comments.js");

const nodeFetch = require('node-fetch');

require("dotenv").config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const handler = async function(event, context) {
  console.log("Now inside const handler = async function(event, context)")
  console.log("event = ", event);
  console.log("context = ", context);

  let { youtubeid } = event.queryStringParameters;

  const baseURL = 'https://www.googleapis.com/youtube/v3/commentThreads?';
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36';
  const queryFetchOptions = { headers: { "Accept": "application/json", "User-Agent": userAgent } };

  const queryParams = { key: YOUTUBE_API_KEY, videoId: youtubeid, part: "snippet", textFormat: "plainText", maxResults: 10 };

  const queryObject = new URLSearchParams(queryParams);
  const queryString = queryObject.toString();
  const queryURL = baseURL + queryString;
  console.log("Comments queryURL = ", queryURL);

  try {

    const queryData = await nodeFetch( queryURL, { fetchOptions: queryFetchOptions } );

    if (!queryData.ok) {
      let queryDataText = "In comments.js the Netlify Serverless Function for the YouTube API for getting Comments had a response that was not OK and the statusText is : " + queryData.statusText;
      console.log(queryDataText);
      return { statusCode: queryData.status, body: queryDataText }
    }

    const queryDataJson = await queryData.json();

    const queryDataJsonString = JSON.stringify({ queryDataJson });

    return {
      statusCode: 200,
      body: queryDataJsonString
    }
      
  } catch (error) {
    let tryCatchText = "In comments.js the Netlify Serverless Function for the YouTube API for getting Comments try/catch had an error and the message is : " + error.message;
    console.log(tryCatchText);
    console.log("The full try catch error details are : ", error);
    return { statusCode: 500, body: JSON.stringify({ msg: tryCatchText }) }
  }
  
}

module.exports = {handler}
 
// Thanks!
 
 
 
