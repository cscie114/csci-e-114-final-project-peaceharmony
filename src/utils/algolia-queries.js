/*
 *  This file exports a query and this query defines a single index...
 * "Queries tell the Algolia plugin what data is to be indexed. They perform GraphQL queries for the relevant pages and convert the response into a set of Algolia records."
 * "Each index requires a GraphQL query that retrieves the pages and data to be indexed. A transformer transforms the GraphQL data to an Algolia record."
 * "Each index has a name that identifies it. If the index does not exist, it will be created automatically during indexing. Note that each record must have an ID in the key objectID."
 *  https://www.gatsbyjs.com/docs/adding-search-with-algolia/
*/

const query = `
  query MyQuery {
    allTopMovies {
      nodes {
        Title
        imdbID
      }
    }
  }
`

function pageToAlgoliaRecord(node) {
  return {
    objectID: node.imdbID,
    ...node
  }
}

// Let's Snippet the Title...
// (List of attributes to snippet, with an optional maximum number of words to snippet.)
// https://www.algolia.com/doc/api-reference/api-parameters/attributesToSnippet/?client=javascript

const queries = [
  {
    query: query,
    transformer: ({ data }) => data.allTopMovies.nodes.map(pageToAlgoliaRecord),
    indexName: 'Movies',
    settings: { attributesToSnippet: [`Title:20`] },
  },
]

module.exports = queries
