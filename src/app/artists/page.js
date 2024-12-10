import ArtistList from '@/components/ArtistList';
import { queryWikidata } from '@/lib/sparql';

export default async function ArtistsPage() {
  const query = `
    PREFIX wd: <http://www.wikidata.org/entity/>
    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT ?painter ?painterLabel ?birthPlaceLabel
    WHERE {
      ?painter wdt:P106 wd:Q1028181 ;
               wdt:P19 ?birthPlace ;
               wdt:P27 wd:Q38 .
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
    }
    LIMIT 10
  `;

  const artists = await queryWikidata(query);

  return (
    <div>
      <h1>Italian Painters</h1>
      <ArtistList artists={artists} />
    </div>
  );
}
