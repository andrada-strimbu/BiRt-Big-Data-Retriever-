'use client';
import React, { useState, useEffect } from 'react';
import { fetchSPARQLData } from '@/lib/sparql';
import { FINE_ARTS_QUERY_WITH_FILTERS, REGIONS_QUERY } from '@/utils/queries';
import DataTable from '@/components/DataTable';
import styles from './finearts.module.css';
import FineArtsForm from '@/components/FineArtsForm';
import FineArtsChart from "@/app/finearts/FineArtsChart";


const FineArtsPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const handleSearch = async (startYear, endYear, regionQuery) => {
    setLoading(true);
    try {
      const query = FINE_ARTS_QUERY_WITH_FILTERS(startYear, endYear, regionQuery);
      const results = await fetchSPARQLData(query);
      setData(results);

      // Pregătim datele pentru grafic (grupăm după artist)
      const groupedData = results.reduce((acc, item) => {
        const artistLabel = item.artistLabel; // Presupunem că `artistLabel` este câmpul care conține numele artistului
        acc[artistLabel] = (acc[artistLabel] || 0) + 1; // Incrementăm numărul de lucrări pentru fiecare artist
        return acc;
      }, {});

      // Setăm datele pentru grafic
      setChartData(Object.entries(groupedData).map(([artist, count]) => ({ artist, count })));

    } catch (error) {
      console.error('Error during search:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className={styles.fineartsInput}>
        <h1 className={styles.title}>Painters & their works</h1>

        <div className={styles.form}>
          <FineArtsForm onSubmitForm={handleSearch} />
          <div className={styles.form}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <DataTable data={data} columns={['artistLabel', 'workLabel', 'creationYear']} />
            )}
          </div>
        </div>
        <div className={styles.chart}>
        <FineArtsChart data={data} />
        </div>
      </div>
    </>
  );
};

export default FineArtsPage;
