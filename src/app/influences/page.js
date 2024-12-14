'use client';

import React, { useEffect, useState, useLayoutEffect } from 'react';
import { GENRE_INFLUENCES_QUERY } from '@/utils/queries';
import { fetchSPARQLData } from '@/lib/sparql';
import * as d3 from 'd3';

export default function Influences() {
  const [influences, setInfluences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSPARQLData(GENRE_INFLUENCES_QUERY);
        console.log("Fetched data:", data);
        setInfluences(data);

        if (data.length > 0) {
          setTimeout(() => {
            drawInfluencesBarChart(data);  // Apelăm pentru Influences
            drawGenresBarChart(data);      // Apelăm pentru Genres
          }, 100);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Funcția pentru desenarea graficului cu bare pentru 'Influenced By'
  const drawInfluencesBarChart = (data) => {
    const svg = d3.select('#influences-bar-chart');
    svg.selectAll('*').remove(); // Curățăm graficul anterior

    const influencedCount = d3.rollup(
      data,
      (v) => v.length,
      (d) => d.influencedMusicGenreLabel.value
    );
    const influencedGenres = Array.from(influencedCount.keys());
    const counts = Array.from(influencedCount.values());

    const width = 1500, height = 700;  // Lățime mărită, înălțime mai mare
    const margin = { top: 20, right: 30, bottom: 100, left: 50 };

    svg.attr('width', width).attr('height', height);

    const xScale = d3.scaleBand()
      .domain(influencedGenres)
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(counts)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.append('g')
      .selectAll('.bar')
      .data(counts)
      .enter()
      .append('rect')
      .attr('x', (_, i) => xScale(influencedGenres[i]))
      .attr('y', (d) => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - margin.bottom - yScale(d))
      .attr('fill', '#69b3a2');

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '8px');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));
  };

  // Funcția pentru desenarea graficului cu bare pentru 'Genres'
  const drawGenresBarChart = (data) => {
    const svg = d3.select('#genres-bar-chart');
    svg.selectAll('*').remove(); // Curățăm graficul anterior

    const genreCount = d3.rollup(
      data,
      (v) => v.length,
      (d) => d.musicGenreLabel.value
    );
    const genres = Array.from(genreCount.keys());
    const counts = Array.from(genreCount.values());

    const width = 1500, height = 500;
    const margin = { top: 20, right: 30, bottom: 100, left: 50 };

    svg.attr('width', width).attr('height', height);

    const xScale = d3.scaleBand()
      .domain(genres)
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(counts)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.append('g')
      .selectAll('.bar')
      .data(counts)
      .enter()
      .append('rect')
      .attr('x', (_, i) => xScale(genres[i]))
      .attr('y', (d) => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - margin.bottom - yScale(d))
      .attr('fill', '#69b3a2');

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '8px');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Music Genres and Their Influences
      </h1>

      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ textAlign: 'center' }}>Genres Table</h2>
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px' }}>Genre</th>
              <th style={{ padding: '10px' }}>Influenced By</th>
            </tr>
          </thead>
          <tbody>
            {influences.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '10px' }}>{item.musicGenreLabel?.value || 'N/A'}</td>
                <td style={{ padding: '10px' }}>{item.influencedMusicGenreLabel?.value || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ textAlign: 'center' }}>Influences Bar Chart</h2>
        <svg id="influences-bar-chart" style={{ display: 'block', margin: '0 auto' }}></svg>
      </div>

      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ textAlign: 'center' }}>Genres Bar Chart</h2>
        <svg id="genres-bar-chart" style={{ display: 'block', margin: '0 auto' }}></svg>
      </div>
    </div>
  );
}
