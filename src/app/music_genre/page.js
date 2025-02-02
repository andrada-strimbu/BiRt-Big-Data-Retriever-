'use client'
import { useState, useEffect } from 'react';
import { fetchSPARQLData } from '@/lib/sparql';
import { MUSIC_GENRES_INFLUENCED_BY, SELECT_GENRE_INFLUENCES_QUERY, SONGS_RECOMMENDATION_QUERY } from '@/utils/queries';
import styles from './musicgenre.module.css';
import RecommendedSongsTable from '../../components/RecommendedSongs';

export default function Influences() {
    const [availableGenres, setAvailableGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [influences, setInfluences] = useState([]);
    const [recommendedSongs, setRecommendedSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [option, setOption] = useState(1);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const cachedmusicGenres = localStorage.getItem('musicGenres');
                if (cachedmusicGenres) {
                    console.log('[USING CACHED genres]');
                    const parsedMusicGenres = JSON.parse(cachedmusicGenres);
                    setAvailableGenres(parsedMusicGenres);
                } else {
                    const data = await fetchSPARQLData(MUSIC_GENRES_INFLUENCED_BY);
                    console.log("music genres influenced by data: ", data);
                    setAvailableGenres(data);
                    localStorage.setItem('musicGenres', JSON.stringify(data));
                }
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
                const selectedGenreLabel = selectedGenre.split('/')[4];
                console.log("Selected genre: ", selectedGenreLabel);
                const data = await fetchSPARQLData(SELECT_GENRE_INFLUENCES_QUERY(selectedGenreLabel));
                console.log("Fetched influence data: ", data);
                setInfluences(data);

                try {
                    const musicData = await fetchSPARQLData(SONGS_RECOMMENDATION_QUERY(`wd:${selectedGenreLabel}`));
                    console.log("fetched music data: ", musicData);

                    // Process song data with multilingual descriptions
                    const songMap = new Map();

                    musicData.forEach(song => {
                        const songTitle = song.songLabel?.value || 'Unknown Song';
                        const artist = song.artistLabel?.value || 'Unknown Artist';
                        const language = song.language?.value;
                        const description = song.artistDescription?.value || '';

                        if (!songMap.has(songTitle)) {
                            songMap.set(songTitle, {
                                songTitle,
                                artist,
                                descriptions: language ? [{ language, description }] : []
                            });
                        } else {
                            const existingSong = songMap.get(songTitle);
                            if (language && !existingSong.descriptions.some(desc => desc.language === language)) {
                                existingSong.descriptions.push({ language, description });
                            }
                        }
                    });

                    const formattedSongs = Array.from(songMap.values());
                    console.log("formated Songs: ", formattedSongs);
                    setRecommendedSongs(formattedSongs);
                } catch (error) {
                    console.error("Error at fetching music recommendations: ", error);
                }
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
        option ? (
            <div className={styles.musicGenre}>
                <h1>Music Genre Influences</h1>
                <select
                    className={styles.genreSelector}
                    id="genreSelect"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="" disabled hidden>
                        Select a Genre...
                    </option>
                    {availableGenres.map((genre, index) => (
                        <option key={index} value={genre.musicGenre?.value || ''}>
                            {genre.musicGenreLabel?.value || 'Unknown Genre'}
                        </option>
                    ))}
                </select>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                <div className={styles.results}>
                    <h2>Genres Table</h2>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Influenced By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {influences && influences.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.influencedByLabel?.value || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {influences.length ? <button onClick={() => setOption(0)}>Genre-Based Recommendations</button> : null}
                </div>
            </div>
        ) : (
            <RecommendedSongsTable recommendedSongs={recommendedSongs} goBack={() => setOption(1)} />
        )
    );
}
