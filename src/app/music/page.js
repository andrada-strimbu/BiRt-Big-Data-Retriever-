'use client';

import React, { useEffect, useState } from 'react';
import { fetchSPARQLData } from '@/lib/sparql';
import { MUSIC_INFLUENCES_QUERY, REGIONS_QUERY } from '@/utils/queries';
import DataTable from '@/components/DataTable';
import styles from './music.module.css';
import MusicCharts from '@/components/MusicCharts';

const MusicPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [regionID, setRegionID] = useState('wd:Q30');
  const [regionLabel, setRegionLabel] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const cachedRegions = localStorage.getItem('regions');
        if (cachedRegions) {
          const parsedRegions = JSON.parse(cachedRegions);
          const randomIndex = Math.floor(Math.random() * parsedRegions.length);
          setRegionID(parsedRegions[randomIndex].id);
          setRegionLabel(parsedRegions[randomIndex].label);
        } else {
          const results = await fetchSPARQLData(REGIONS_QUERY);
          const regionsList = results.map((item) => ({
            id: `wd:${item.region.value.split('/')[4]}`,
            label: item.regionLabel.value,
          }));

          const randomIndex = Math.floor(Math.random() * regionsList.length);
          setRegionID(regionsList[randomIndex].id);
          setRegionLabel(regionsList[randomIndex].label);

          localStorage.setItem('regions', JSON.stringify(regionsList));
        }
      } catch (error) {
        console.error('Error fetching regions:', error);
        setError('Error fetching region data');
      }
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    if (!regionID) return;

    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const query = MUSIC_INFLUENCES_QUERY(regionID);
        const results = await fetchSPARQLData(query);

        if (results.length === 0) {
          setError(`Country ${regionLabel} isn't available.`);
        } else {
          setData(results);
        }
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching data.');
      }
      setLoading(false);
    };

    fetchData();
  }, [regionID, regionLabel]);

  return (
    <div className={styles.musicPageLayout}>
      <h1>Music Artists & Their Influences</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && !error && data && (
        <>
          <h2>Music Data for {regionLabel}</h2>
          <DataTable data={data} columns={['artistLabel', 'genreLabel', 'influencedLabel']} />
          <MusicCharts data={data} />
        </>
      )}
    </div>
  );
};

export default MusicPage;
