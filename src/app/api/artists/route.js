import { queryWikidata } from '@/lib/sparql';

export async function GET(req) {
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

  const data = await queryWikidata(query);
//   console.log("data: ", data);
// console.log("[route.js]");
  return new Response(JSON.stringify(data), { status: 200 });
}
