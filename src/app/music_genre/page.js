'use client'
import { useState, useEffect } from 'react';
import { fetchSPARQLData } from '@/lib/sparql';
import { MUSIC_GENRES_INFLUENCED_BY, SELECT_GENRE_INFLUENCES_QUERY } from '@/utils/queries';

export default function Influences() {
    const [availableGenres, setAvailableGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [influences, setInfluences] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await fetchSPARQLData(MUSIC_GENRES_INFLUENCED_BY);
                console.log("music genres influenced by data: ", data);
                setAvailableGenres(data);
            } catch (error) {
                console.error("Error at fetching genres: ", error);
            }
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        if (!selectedGenre) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log("Selected genre: ", selectedGenre);
                const data = await fetchSPARQLData(SELECT_GENRE_INFLUENCES_QUERY(selectedGenre.split('/')[4]));
                console.log("Fetched influence data: ", data);
                setInfluences(data);
            } catch (err) {
                console.error("Error at fetching influenced genres: ", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedGenre]);

    
    return (
        <div style={{ padding: '20px' }}>
            <h1>Music Genre Influences</h1>
            <label htmlFor="genreSelect">Select a Music Genre:</label>
            <select
                id="genreSelect"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
            >
                <option value="">--Select a Genre--</option>
                {availableGenres.map((genre, index) => (
                    <option key={index} value={genre.musicGenre?.value || ''}>
                        {genre.musicGenreLabel?.value || 'Unknown Genre'}
                    </option>
                ))}
            </select>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            <div style={{ marginBottom: '50px' }}>
                <h2 style={{ textAlign: 'center' }}>Genres Table</h2>
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '10px' }}> Influenced By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {influences.map((item, index) => (
                            <tr key={index}>
                                <td style={{ padding: '10px' }}>{item.influencedByLabel?.value || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
