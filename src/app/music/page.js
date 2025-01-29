'use client';

import React, { useEffect, useState } from 'react';
import { fetchSPARQLData } from '@/lib/sparql';
import { MUSIC_INFLUENCES_QUERY } from '@/utils/queries';
import * as d3 from 'd3';
import DataTable from '@/components/DataTable';
import styles from './music.module.css'

const MusicPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const results = await fetchSPARQLData(MUSIC_INFLUENCES_QUERY);
        setData(results);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      drawChart(data, 'genreLabel');
      drawChart(data, 'influencedLabel'); // Adăugăm și al doilea grafic pentru influencedLabel
    }
  }, [data]);

  const drawChart = (data, labelType) => {
    // Dimensiunile graficului
    const width = 1000;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 60, left: 40 };

    // Crează SVG
    const svg = d3
      .select(`#${labelType}-chart`)
      .attr('width', width)
      .attr('height', height);

    // Grupăm datele după tipul ales (genreLabel sau influencedLabel)
    const labelCounts = d3.rollup(
      data,
      (v) => v.length,
      (d) => d[labelType].value // Folosim 'genreLabel' sau 'influencedLabel'
    );

    // Extragem stilurile muzicale și numărul de influențe
    const labels = Array.from(labelCounts.keys());
    const influences = Array.from(labelCounts.values());

    // Creăm scalele pentru axele X și Y
    const xScale = d3
      .scaleBand()
      .domain(labels)  // Folosim stilurile muzicale ca etichete
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(influences)])  // Maximul influențelor
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Adăugăm axa X
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    // Adăugăm axa Y
    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Creăm barele pentru fiecare stil
    svg
      .append('g')
      .selectAll('.bar')
      .data(influences)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => xScale(labels[i]))  // Plasăm fiecare bară în funcție de stilul muzical
      .attr('y', (d) => yScale(d))  // Înălțimea fiecărei bare
      .attr('width', xScale.bandwidth())  // Lățimea barei
      .attr('height', (d) => height - margin.bottom - yScale(d))  // Înălțimea fiecărei bare
      .attr('fill', '#69b3a2');
  };

  return (
    <div className={styles.musicPageLayout}>
      <h1>Music Artists & Their Artist Influences</h1>
      {/* <h1>Music Artists & Their Artist Influences</h1> */}
      {loading ? <p>Loading...</p> : <DataTable data={data} columns={['artistLabel', 'genreLabel', 'influencedLabel']} />}

      {/* Primul grafic pentru genreLabel */}
      <svg id="genreLabel-chart"></svg>

      {/* Al doilea grafic pentru influencedLabel - cati artisti a influentat fiecare artist */}
      <svg id="influencedLabel-chart" style={{ marginTop: '50px' }}></svg>
    </div>
  );
};

export default MusicPage;
