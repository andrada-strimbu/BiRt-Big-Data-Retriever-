'use client';
import React, { useState, useEffect } from 'react';
import { fetchSPARQLData } from '@/lib/sparql';
import { FINE_ARTS_QUERY_WITH_FILTERS } from '@/utils/queries';
import DataTable from '@/components/DataTable';
import styles from './finearts.module.css';
import FineArtsForm from '@/components/FineArtsForm';
import FineArtsChart from "@/app/finearts/FineArtsChart";


const FineArtsPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleSearch = async (startYear, endYear, regionQuery) => {
    setLoading(true);
    try {
      const query = FINE_ARTS_QUERY_WITH_FILTERS(startYear, endYear, regionQuery);
      const results = await fetchSPARQLData(query);
      setData(results);


      const groupedData = results.reduce((acc, item) => {
        const artistLabel = item.artistLabel;
        acc[artistLabel] = (acc[artistLabel] || 0) + 1;
        return acc;
      }, {});


    } catch (error) {
      console.error('Error during search:', error);
    }
    setLoading(false);
  };

  return (

    <>
    <h1 className={styles.title}>Painters & their works</h1>
      <div className={styles.form}>
        <FineArtsForm onSubmitForm={handleSearch} />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <DataTable data={data} columns={['artistLabel', 'workLabel', 'creationYear']} />
          )}
       
      </div>
        <FineArtsChart data={data} />
    
    </>

  );
};

export default FineArtsPage;
