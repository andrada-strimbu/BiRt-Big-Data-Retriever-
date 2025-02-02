import { useState } from 'react';
import styles from '../app/music_genre/musicgenre.module.css';

export default function RecommendedSongsTable({ recommendedSongs, goBack }) {
    const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to English

    // Store only unique songs
    const uniqueSongs = [];
    const songSet = new Set();
    console.log("[component] Recommended songs: ", recommendedSongs);
    recommendedSongs.forEach((song) => {
        if (!songSet.has(song.songTitle)) {
            songSet.add(song.songTitle);
            uniqueSongs.push(song);
        }
    });

    return (
        <div className={styles.musicGenre}>
            <h1>Recommended Songs</h1>

            {/* Language Selector Dropdown */}
            <label htmlFor="languageSelect">Select Language:</label>
            <select
                className={styles.genreSelector}
                id="languageSelect"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
            >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
            </select>

            <div className={styles.results}>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Song Title</th>
                            <th>Artist</th>
                            <th>Artist Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uniqueSongs.length > 0 ? (
                            uniqueSongs.map((song, index) => {
                                console.log("selected language: ", selectedLanguage);
                                // Find the description in the selected language, fallback to English
                                const description = song.descriptions.find((desc) => {
                                    console.log("desc: ", desc);
                                    return desc.language === selectedLanguage;
                                });

                                const descriptionText = description ? description.description : "No description available";
                                console.log("description: ", descriptionText);

                                return (
                                    <tr key={index}>
                                        <td>{song.songTitle}</td>
                                        <td>{song.artist}</td>
                                        <td>{descriptionText}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="3">No recommendations available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <button onClick={goBack}>Back to Genre Selection</button>
        </div>
    );
}
