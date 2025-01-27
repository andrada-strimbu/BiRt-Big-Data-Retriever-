'use client';
import React, { useState, useEffect } from 'react';
import { fetchSPARQLData } from '@/lib/sparql';
import { FINE_ARTS_QUERY_WITH_FILTERS, REGIONS_QUERY } from '@/utils/queries';
import DataTable from '@/components/DataTable';


const FineArtsPage = () => {
  const [startYear, setStartYear] = useState(1900);
  const [endYear, setEndYear] = useState(2000);
  const [regionQuery, setRegionQuery] = useState('');
  const [regions, setRegions] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        console.log('[FETCH REGIONS]...');
        const cachedRegions = localStorage.getItem('regions');

        if (cachedRegions) {
          console.log('[USING CACHED REGIONS]');
          const parsedRegions = JSON.parse(cachedRegions);
          const regionsList = parsedRegions.map((item) => ({
            id: `wd:${item.id.split('/')[4]}`,
            label: item.label,
          }));
          setRegions(regionsList);
          setRegionQuery(parsedRegions[0]?.id || ''); // Set default region
        } else {
          const results = await fetchSPARQLData(REGIONS_QUERY);
          const regionsList = results.map((item) => ({
            id: `wd:${item.region.value.split('/')[4]}`,
            label: item.regionLabel.value,
          }));
          console.log("region[0] id: ", regionsList[0].id);
          setRegions(regionsList);
          setRegionQuery(regionsList[0]?.id || ''); // Set default region
          localStorage.setItem('regions', JSON.stringify(regionsList)); // Cache regions
          console.log('[REGIONS CACHED]');
        }
      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };
    fetchRegions();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const query = FINE_ARTS_QUERY_WITH_FILTERS(startYear, endYear, regionQuery);
      console.log("query: ", query);
      const results = await fetchSPARQLData(query);
      console.log('Results: ', results);
      setData(results);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Painters & their works</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <div>
          <label>Start Year:</label>
          <input
            type="number"
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
          />
        </div>

        <div>
          <label>End Year:</label>
          <input
            type="number"
            value={endYear}
            onChange={(e) => setEndYear(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Region:</label>
          <select value={regionQuery} onChange={(e) => setRegionQuery(e.target.value)}>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable data={data} columns={['artistLabel', 'workLabel', 'creationYear']} />
      )}
    </div>
  );
};

export default FineArtsPage;

// 2 artisti cu influente comune
//
