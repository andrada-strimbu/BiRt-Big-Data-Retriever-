import { fetchSPARQLData } from "./sparql";

const fetchMusicGenres = async query => {
            try {
                const data = await fetchSPARQLData(query);
                // console.log("music genres influenced by data: ", data);
                return data;
            } catch (error) {
                console.error("Error at fetching genres: ", error);
            }
        }

export default fetchMusicGenres;