'use client'
import React, { useEffect, useState } from 'react';
import { fetchSPARQLData } from '@/lib/sparql';
import { MUSIC_INFLUENCES_QUERY } from '@/utils/queries';
import DataTable from '@/components/DataTable';

const MusicPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const results = await fetchSPARQLData(MUSIC_INFLUENCES_QUERY);
        setData(results);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // console.log("data: ", data);
  return (
    <div>
      <h1>Music Influences</h1>
      {loading ? <p>Loading...</p> : <DataTable data={data} columns={['artistLabel', 'genreLabel', 'influencedLabel']} />}
    </div>
  );
};

export default MusicPage;
