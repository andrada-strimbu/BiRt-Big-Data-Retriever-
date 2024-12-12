
'use client'

/*
const influences = await fetchSPARQLData(GENRE_INFLUENCES_QUERY);
    console.log("influences: ", influences[0]);
OUTPUT:
influences:  {
  genre: { type: 'uri', value: 'http://www.wikidata.org/entity/Q105975780' },
  influencedGenre: { type: 'uri', value: 'http://www.wikidata.org/entity/Q662' },
  genreLabel: { 'xml:lang': 'en', type: 'literal', value: 'Last Ring' },
  influencedGenreLabel: {
    'xml:lang': 'en',
    type: 'literal',
    value: 'Neon Genesis Evangelion'
  }
}
*/

import { useEffect, useState } from 'react';
import { GENRE_INFLUENCES_QUERY } from '@/utils/queries';
import { fetchSPARQLData } from '@/lib/sparql';

export default function Influences() {
  const [influences, setInfluences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSPARQLData(GENRE_INFLUENCES_QUERY);
        setInfluences(data); 
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

//   console.log("influences: ", influences);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Music Genres and Their Influences</h1>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Genre</th>
            <th>Influenced By</th>
          </tr>
        </thead>
        <tbody>
          {influences.map((item, index) => (
            <tr key={index}>
              <td>{item.musicGenreLabel?.value || 'N/A'}</td>
              <td>{item.influencedMusicGenreLabel?.value || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// D3 - data driven documents pt vizualizari
// process X 