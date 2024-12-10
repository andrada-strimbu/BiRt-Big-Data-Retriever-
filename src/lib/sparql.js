// import SparqlClient from 'sparql-http-client';

// export async function queryWikidata(queryy) {
//     const endpointUrl = 'https://query.wikidata.org/sparql';

//     const client = new SparqlClient({ endpointUrl });
//     const results = []; // Array to store the results

//     const response = await client.query.select(queryy, {
//         headers: { accept: 'application/sparql-results+json' },
//     });

//     return new Promise((resolve, reject) => {
//         response.on('data', row => {
//             const processedRow = {};

//             // Extract key-value pairs for each variable
//             for (const [key, value] of Object.entries(row)) {
//                 processedRow[key] = value.value; // Store the variable's value
//             }

//             results.push(processedRow); // Add the row to the results array
//         });

//         response.on('error', err => {
//             console.error('SPARQL query error:', err);
//             reject(err); // Reject the promise in case of an error
//         });

//         response.on('end', () => {
//             resolve(results); // Resolve the promise with the collected results
//         });
//     });
//     return results;
// }

import axios from 'axios';

const SPARQL_ENDPOINT = 'https://query.wikidata.org/sparql';

export const fetchSPARQLData = async (query) => {
  try {
    const response = await axios.get(SPARQL_ENDPOINT, {
      params: { query },
      headers: { Accept: 'application/json' },
    });
    return response.data.results.bindings;
  } catch (error) {
    console.error('SPARQL Query Error:', error);
    throw error;
  }
};

