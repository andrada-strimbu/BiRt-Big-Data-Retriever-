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

  SELECT ?artist ?artistLabel ?genre ?genreLabel ?influenced
  WHERE {
    ?artist wdt:P106 wd:Q639669;           # Occupation: Musician
            wdt:P27 wd:Q30 .              # Citizen of the United States
    ?artist wdt:P136 ?genre;              # Genre
            wdt:P737 ?influenced .        # Influences
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
  }
  LIMIT 20
`;

export const FINE_ARTS_QUERY_WITH_FILTERS = (startYear, endYear, region) => `
  PREFIX wd: <http://www.wikidata.org/entity/>
  PREFIX wdt: <http://www.wikidata.org/prop/direct/>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

  SELECT ?artist ?artistLabel ?work ?workLabel ?creationYear
  WHERE {
    ?artist wdt:P106 wd:Q1028181;           # Occupation: Painter
            wdt:P27 ${region} .            # Filter by region (e.g., wd:Q38 for Italy)
    ?work wdt:P170 ?artist;                # Creator of the work
          wdt:P571 ?creationDate .         # Creation date
    FILTER(YEAR(?creationDate) >= ${startYear} && YEAR(?creationDate) <= ${endYear})
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
  }
  LIMIT 20
`;