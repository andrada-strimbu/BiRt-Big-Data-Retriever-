'use client';

export default function ArtistList({ artists }) {
  return (
    <ul>
      {artists && artists.map((item, index) => (
        <li key={index}>
          {item.painterLabel.value} - {item.birthPlaceLabel.value}
        </li>
      ))}
    </ul>
  );
}
