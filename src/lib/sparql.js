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


