import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Info from "../components/info";

const MoviesPage = function(props) {

  console.log("movies.js props = ", props);
  
  const movieNames = props.data.allTopMovies.nodes.map( function(movie) {
      return ( <li key={movie.imdbID}> <Link to={"/movies/"+movie.imdbID}>{movie.Title}</Link> ({movie.imdbPlusRottenTomatoesTieBreak})</li> );
  });
  
  return (
      <Layout pageTitle="All Movies">
        The number in parentheses is a 5 digit number that allows <u><strong>Rotten Tomatoes</strong></u> to be a very valid tie-breaker of what would be many (lots of) &quot;same score ratings&quot; in the <u><strong>IMDB Top 250</strong></u> list.<br/><br/>
        <Info pageSection="top"></Info><br/>
        <ol>{movieNames}</ol>
        <br/><Info pageSection="bottom"></Info><br/>
      </Layout>
  );
  
}

export const query = graphql `
  query MyQuery {
    allTopMovies {
      nodes {
        Title
        imdbID
        currentImdbRating
        currentImdbVotes
        imdbPlusRottenTomatoesTieBreak
      }
    }
  }
`

export const Head = () => <title>All Movies</title>
export default MoviesPage;
 
// Thanks!
 
 
 
