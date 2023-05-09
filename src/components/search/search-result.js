import { default as React } from "react";
import { Link } from "gatsby";
import { connectStateResults, Hits, Index, PoweredBy, Snippet } from "react-instantsearch-dom";

const HitCount = connectStateResults( function({ searchResults }) {

  // This is helpful, but very verbose.
  // Uncomment the following for checking real time search results.
  // console.log("searchResults = ", searchResults);

  const hitCount = searchResults && searchResults.nbHits;

  // What this is doing... if we have some Search Hits then return the Number of Hits and add an "s" if more than 1, otherwise if no hits then return null.
  return hitCount > 0 ? ( <div className="HitCount"> {hitCount} result{hitCount !== 1 ? `s` : ``} </div> ) : null

});

const PageHit = function({ hit }) { 

  // * Create Gatsby links to our IMDB/OMDB Movie Page. *
  let linkToUrl = "/movies/" + hit.imdbID + "/";

  return (
    <div>
      <Link to={linkToUrl}> <Snippet attribute="Title" hit={hit} tagName="mark" /> </Link>
    </div>
  )

};

const HitsInIndex = () => (
  <Index indexName="Movies">
    <HitCount />
    <Hits className="Hits" hitComponent={PageHit} />
  </Index>
)

const SearchResult = ({ indices, className }) => (
  <div className={className}>
    {indices.map(index => (
      <HitsInIndex index={index} key={index.name} />
    ))}
    <PoweredBy />
  </div>
)

export default SearchResult
