export const FINE_ARTS_QUERY = `
  PREFIX wd: <http://www.wikidata.org/entity/>
  PREFIX wdt: <http://www.wikidata.org/prop/direct/>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

  SELECT ?artist ?artistLabel ?work ?workLabel ?creationYear
  WHERE {
    ?artist wdt:P106 wd:Q1028181;           # Occupation: Painter
            wdt:P27 wd:Q38 .               # Citizen of Italy
    ?work wdt:P170 ?artist;                # Creator of the work
          wdt:P571 ?creationDate .         # Creation date
    FILTER(YEAR(?creationDate) > 1900)     # Filter works after 1900
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
  }
  LIMIT 20
`;

export const MUSIC_INFLUENCES_QUERY = `
  PREFIX wd: <http://www.wikidata.org/entity/>
  PREFIX wdt: <http://www.wikidata.org/prop/direct/>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

  SELECT ?artist ?artistLabel ?genre ?genreLabel ?influenced ?influencedLabel
  WHERE {
    ?artist wdt:P106 wd:Q639669;           # Occupation: Musician
            wdt:P27 wd:Q30 .              # Citizen of the United States
    ?artist wdt:P136 ?genre;              # Genre
            wdt:P737 ?influenced .        # Influences
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
  }
    LIMIT 20
`;


export const GENRE_INFLUENCES_QUERY = `
    PREFIX wd: <http://www.wikidata.org/entity/>
  PREFIX wdt: <http://www.wikidata.org/prop/direct/>
  SELECT ?musicGenre ?musicGenreLabel ?influencedMusicGenre ?influencedMusicGenreLabel
  WHERE {
    ?musicGenre wdt:P31 wd:Q188451;  # Ensure the item is a music genre (Q188451).
               wdt:P737 ?influencedMusicGenre. # Get genres it has influenced.
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }
`;



//Query pt genurile muzicale care contin proprietatea "influenced by"
export const MUSIC_GENRES_INFLUENCED_BY = `PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?musicGenre ?musicGenreLabel  
WHERE {
  ?musicGenre wdt:P31 wd:Q188451;  # Instance of a music genre
             wdt:P737 ?influencedBy.  # "Influenced by" property
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
`


export const SELECT_GENRE_INFLUENCES_QUERY = (selectedGenre) => `
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
SELECT ?influencedBy ?influencedByLabel
WHERE {
  wd:${selectedGenre} wdt:P737 ?influencedBy. # Genres influencing the selected genre
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
`;


// export const FINE_ARTS_QUERY_WITH_FILTERS = (startYear, endYear, region) => `
// PREFIX wd: <http://www.wikidata.org/entity/>
// PREFIX wdt: <http://www.wikidata.org/prop/direct/>
// PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
// PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

// SELECT ?artist ?artistLabel ?work ?workLabel ?creationYear
// WHERE {
//   ?artist wdt:P106 wd:Q1028181;           # Occupation: Painter
//           wdt:P27 ${region} .            # Filter by region (e.g., wd:Q38 for Italy)
//   ?work wdt:P170 ?artist;                # Creator of the work
//         wdt:P571 ?creationDate .         # Creation date
//   BIND(YEAR(xsd:dateTime(?creationDate)) AS ?creationYear)  # Extract creation year
//   FILTER(?creationYear >= ${startYear} && ?creationYear <= ${endYear})
//   SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
// }
// LIMIT 20
// `;

export const FINE_ARTS_QUERY_WITH_FILTERS = (startYear, endYear, region) => `
 PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT DISTINCT ?artist ?artistLabel ?work ?workLabel ?creationYear
WHERE {
  ?artist wdt:P106 wd:Q1028181;              # Occupation: Painter
          wdt:P27 ${region} .                   # Filter by region (e.g., wd:Q38 for Italy)
  ?work wdt:P170 ?artist;                    # Creator of the work
        wdt:P571 ?creationDate .             # Creation date
  BIND(YEAR(xsd:dateTime(?creationDate)) AS ?creationYear)  # Extract creation year
  FILTER(?creationYear >= ${startYear} && ?creationYear <= ${endYear})

  OPTIONAL { ?work rdfs:label ?workLabel_en . FILTER (lang(?workLabel_en) = "en") }
  OPTIONAL { ?work rdfs:label ?workLabel_any . FILTER (lang(?workLabel_any) != "en") }
  BIND(COALESCE(?workLabel_en, ?workLabel_any) AS ?workLabel)

  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
}
LIMIT 20
`

export const REGIONS_QUERY = `
  SELECT DISTINCT ?region ?regionLabel WHERE {
    ?region wdt:P31 wd:Q6256. # Instance of "country"
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  }
  ORDER BY ?regionLabel
`;

// ORDER BY ?artistLabel


// export const SONGS_RECOMMENDATION_QUERY = (genreID) => `
//   PREFIX wd: <http://www.wikidata.org/entity/>
// PREFIX wdt: <http://www.wikidata.org/prop/direct/>

// SELECT DISTINCT ?song ?songLabel ?artistLabel
// WHERE {
//   ?song wdt:P31 wd:Q7366;   # Must be an instance of "song"
//         wdt:P136 ${genreID}; # Example: Rock (Q11399)
//         wdt:P175 ?artist.   # Performer (artist)
  
//   SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
// }
// LIMIT 20
// `


export const SONGS_RECOMMENDATION_QUERY = (genreID) => `
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX schema: <http://schema.org/>

SELECT DISTINCT ?song ?songLabel ?artist ?artistLabel ?language ?artistDescription
WHERE {
  ?song wdt:P31 wd:Q7366;   # Must be an instance of "song"
        wdt:P136 ${genreID}; # Example: Rock (Q11399)
        wdt:P175 ?artist.   # Performer (artist)
  
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }

  # Fetch artist descriptions, but only in selected languages
  OPTIONAL {
    ?artist schema:description ?artistDescription.
    BIND(LANG(?artistDescription) AS ?language)
    FILTER(?language IN ("en", "fr", "de", "it"))  # Keep only Spanish, French, German, Italian
  }
}
LIMIT 20


`