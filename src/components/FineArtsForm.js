'use client'

import { useEffect, useState } from "react";
import styles from './fineartsform.module.css'
import {REGIONS_QUERY} from "@/utils/queries";
import {fetchSPARQLData} from "@/lib/sparql";

export default function FineArtsForm({ onSubmitForm }) {
    const [startYear, setStartYear] = useState(1900);
    const [endYear, setEndYear] = useState(2000);
    const [regionQuery, setRegionQuery] = useState('');
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                console.log('[FETCH REGIONS]...');
                const cachedRegions = localStorage.getItem('regions');
                console.log("cachedRegions: ", cachedRegions);

                if (cachedRegions) {
                    console.log('[USING CACHED REGIONS]');
                    const parsedRegions = JSON.parse(cachedRegions);
                    const regionsList = parsedRegions.map((item) => ({
                        id: item.id,
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



    return (
        <form className={styles.formInput}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmitForm(startYear, endYear, regionQuery);
            }}
        >
            <div className={styles.inputRow}>
                <label>Start Year:</label>
                <input
                    type="number"
                    value={startYear}
                    onChange={(e) => setStartYear(Number(e.target.value))}
                />
            </div>

            <div className={styles.inputRow}>
                <label>End Year:</label>
                <input
                    type="number"
                    value={endYear}
                    onChange={(e) => setEndYear(Number(e.target.value))}
                />
            </div>

           <div className={styles.inputRow}>
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

    )
}