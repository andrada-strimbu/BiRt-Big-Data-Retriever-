// 'use client'
// import React, { useEffect, useState } from 'react';
// import { fetchSPARQLData } from '@/lib/sparql';
// import { FINE_ARTS_QUERY } from '@/utils/queries';
// import DataTable from '@/components/DataTable';

// const FineArtsPage = () => {
//   const [data, setData] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const results = await fetchSPARQLData(FINE_ARTS_QUERY);
//         setData(results);
//       } catch (error) {
//         console.error(error);
//       }
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Fine Arts Influences (Since 1900)</h1>
//       {loading ? <p>Loading...</p> : <DataTable data={data} columns={['artistLabel', 'workLabel', 'creationYear']} />}
//     </div>
//   );
// };

// export default FineArtsPage;

'use client';

import React, { useState } from 'react';
import { fetchSPARQLData } from '@/lib/sparql';
import { FINE_ARTS_QUERY_WITH_FILTERS } from '@/utils/queries';
import DataTable from '@/components/DataTable';

const FineArtsPage = () => {
  const [startYear, setStartYear] = useState(1900);
  const [endYear, setEndYear] = useState(2000);
  const [region, setRegion] = useState('wd:Q38'); // Default: Italy
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const query = FINE_ARTS_QUERY_WITH_FILTERS(startYear, endYear, region);
      const results = await fetchSPARQLData(query);
      setData(results);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Fine Arts Influences</h1>
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
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="wd:Q38">Italy</option>
            <option value="wd:Q30">United States</option>
            <option value="wd:Q55">Netherlands</option>
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