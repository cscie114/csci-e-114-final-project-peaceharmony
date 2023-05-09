"use strict";

console.log("Start TopMovies.imdbID.js");

import * as React from "react";
import {useState, useEffect} from "react";
import { graphql } from "gatsby";
import nodeFetch from "node-fetch";
import Layout from "../../components/layout";
 
// This web application will query data from multiple sources, one of which is a remote RESTful API, the other of which is from the file system. The following code will merge both data sources into the Gatsby GraphQL data layer and use that data in pages through GraphQL queries.
 
export const query = graphql `

query MyQuery ($imdbID: String) {

  allTopMovies (filter: {imdbID: {eq: $imdbID}}) {
    totalCount
    nodes {
      Actors
      Awards
      BoxOffice
      Country
      DVD
      Director
      Genre
      Language
      Metascore
      Plot
      Poster
      Production
      Rated
      Ratings {
        Source
        Value
      }
      Released
      Response
      Runtime
      Title
      Type
      Website
      Writer
      Year
      imdbID
      imdbRating
      imdbVotes
      wikiExtract
    }
  }

  allTrailersJson (filter: {imdbID: {eq: $imdbID}}) {
    totalCount
    nodes {
      imdbID
      imdbRating
      imdbVotes
      movieTitle
      youtubeID
    }
  }

}
`
 
const TopMovie = function(props) {

  console.log("Now inside the Exported Function TopMovie and props = ", props);

  let movie = props.data.allTopMovies.nodes[0];

  // Hmm, these are not Arrays, these are Strings.
  // console.log("movie.Actors = ", movie.Actors);
 
  // React: "You need to give each array item a key - a string or a number that uniquely identifies it among other items in that array."
  // https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
  // Also, to be extra sure (as you never know what is delivered from an outside API and also if the fields are in fact always unique) - let's try making our own keys. 
  // So instead of keys such as... key : "The Lord of the Rings: The Fellowship of the Ring (2001)", we can instead create our own keys and so for example key={"rating"+i} will result as...  key:"rating1" key:"rating2" (etc)
 
  // Ratings
  let Ratings = movie.Ratings.map( function(Rating, i) { 
    return <span key={"rating"+i}> {Rating.Source} ... {Rating.Value} <br/> </span>;
  });

  // This is the YouTube Player. We need the correct YouTube Video ID passed into this.
  let movieTrailer = "https://www.youtube.com/embed/" + props.data.allTrailersJson.nodes[0].youtubeID;

  // Set some data in React's State.
  // https://react.dev/reference/react/useState
  // const [state, setState] = useState(initialState);

  const [commentsData, setCommentsData] = useState({});
  
  useEffect( function() {

    console.log("Now inside the useEffect function.");

    const serverlessFunctionURL = "/.netlify/functions/comments?youtubeid=" + props.data.allTrailersJson.nodes[0].youtubeID;
    console.log("serverlessFunctionURL = ", serverlessFunctionURL);

    nodeFetch(serverlessFunctionURL, { method: "GET" })
    .then( function(response) {
      console.log("Serverless Function Comments API response = ", response);
      return response.json();
    })
    .then( function(responseJson) {
      console.log("Serverless Function Comments API responseJson = ", responseJson);
      setCommentsData(responseJson.queryDataJson.items);
    })
    .catch((error) => console.log("Serverless Function Comments API error = ", error));

    console.log("Finishing up the useEffect function.");

  }, []);


  // ***** Return JSX *****
  
  return (

      <Layout pageTitle={movie.Title}>

        Menu: &nbsp;<a href="#Trailer">Movie Trailer</a> | <a href="#Poster">Movie Poster</a> | <a href="#Details">Movie Details</a> | <a href="#Wikipedia">Wikipedia Movie Summary</a> | <a href="#Comments">Movie Comments & Opinions</a><br/><br/><br/>
        
        <span className="infotitle" id="Trailer">Movie Trailer : </span> <a href="#" className="top">(Top)</a><br/>
        
        <iframe width="720" height="405" src={movieTrailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen ></iframe><br/><br/>

        <span className="infotitle" id="Poster">Movie Poster : </span> <a href="#" className="top">(Top)</a><br/>
        <img src={movie.Poster} alt="Movie Poster" /><br/><br/><br/>
        
        <span className="infotitle" id="Details">Movie Details : </span> <a href="#" className="top">(Top)</a><br/><br/>

        BoxOffice ... {movie.BoxOffice}<br/>
        Awards ... {movie.Awards}<br/>
        Released ... {movie.Released}<br/>
        Runtime ... {movie.Runtime}<br/>
        Rated ... {movie.Rated}<br/><br/>

        Actors ... {movie.Actors}<br/>
        Director ... {movie.Director}<br/>
        Writer ... {movie.Writer}<br/>
        Plot ... {movie.Plot}<br/><br/>

        Genre ... {movie.Genre}<br/>
        Country ... {movie.Country}<br/>
        Language ... {movie.Language}<br/>
        DVD ... {movie.DVD}<br/><br/>

        Ratings :
        <br/>{Ratings}
        IMDB Vote Count ... {movie.imdbVotes}<br/><br/><br/>

        <span className="infotitle" id="Wikipedia">Wikipedia Movie Summary : </span> <a href="#" className="top">(Top)</a><br/><br/>
        {movie.wikiExtract}<br/>
        
        { console.log("!!! commentsData = ", commentsData) }
        <br/><br/><span className="infotitle" id="Comments">The very latest Comments & Opinions for <strong>{ movie.Title }</strong> : </span> <a href="#" className="top">(Top)</a><br/><br/>
        <span className="comments">
          {
            Object.entries(commentsData).map( function([key, value]) {
              return (<div key={key}>
                 <img src={value.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="Profile Image" /><br/>
                 <span className="commentlabels">Name</span>: {value.snippet.topLevelComment.snippet.authorDisplayName} <br/>
                 <span className="commentlabels">Comment</span>: {value.snippet.topLevelComment.snippet.textDisplay} <br/>
                 <span className="commentlabels">Published</span>: {value.snippet.topLevelComment.snippet.publishedAt} <br/><br/>
              </div>)
            })
          }
        </span>

        <br/><br/><br/><br/><br/><br/><a href="#top" className="topbottompage">(Top)</a><br/><br/><br/>

      </Layout>

  );

}

export const Head = () => <title>Movie</title>
export default TopMovie;
 
// Thanks!
 
 
 
