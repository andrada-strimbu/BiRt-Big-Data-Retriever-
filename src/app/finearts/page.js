'use client';
import React, { useState, useEffect } from 'react';
import { fetchSPARQLData } from '@/lib/sparql';
import { FINE_ARTS_QUERY_WITH_FILTERS, REGIONS_QUERY } from '@/utils/queries';
import DataTable from '@/components/DataTable';
import styles from './finearts.module.css'
import FineArtsForm from '@/components/FineArtsForm';


const FineArtsPage = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();


  const handleSearch = async (startYear, endYear, regionQuery) => {
    setLoading(true);
    try {
      console.log("start year: ", startYear);
      console.log("end year: ", endYear);
      console.log("regionQuery: ", regionQuery);
      
      const query = FINE_ARTS_QUERY_WITH_FILTERS(startYear, endYear, regionQuery);
      console.log("query: ", query);
      const results = await fetchSPARQLData(query);
      console.log('Results: ', results);
      setData(results);
    } catch (error) {
      console.log("error at search: ", error);
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className={styles.fineartsInput}>
        <h1 className={styles.title}>Painters & their works</h1>

        <div className={styles.form}>
          <FineArtsForm onSubmitForm={handleSearch} />
          <div className={styles.form}  >
            {loading ? (
              <p>Loading...</p>
            ) : (
              <DataTable data={data} columns={['artistLabel', 'workLabel', 'creationYear']} />
            )}
          </div>
        </div>

      </div>
    </>

  );
};

export default FineArtsPage;

// 2 artisti cu influente comune
//
