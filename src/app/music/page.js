'use client';

import React, { useEffect, useState } from 'react';
import { fetchSPARQLData } from '@/lib/sparql';
import { MUSIC_INFLUENCES_QUERY } from '@/utils/queries';
import * as d3 from 'd3';
import DataTable from '@/components/DataTable';
import styles from './music.module.css';

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
      drawChart(data, 'influencedLabel');
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [data]);

  const handleResize = () => {
    if (data) {
      drawChart(data, 'genreLabel');
      drawChart(data, 'influencedLabel');
    }
  };

  const drawChart = (data, labelType) => {
    const margin = { top: 20, right: 20, bottom: 60, left: 40 };
    const containerWidth = document.getElementById(`${labelType}-chart`).parentElement.clientWidth;
    const width = Math.min(containerWidth, 800); 
    const height = 400;

    const svg = d3
      .select(`#${labelType}-chart`)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    svg.selectAll('*').remove(); 

    const labelCounts = d3.rollup(
      data,
      (v) => v.length,
      (d) => d[labelType].value
    );

    const labels = Array.from(labelCounts.keys());
    const influences = Array.from(labelCounts.values());

    const xScale = d3
      .scaleBand()
      .domain(labels)
      .range([margin.left, width - margin.right])
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(influences)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('fill', '#111')
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .attr('transform', 'rotate(-30)')
      .style('text-anchor', 'end');

    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('fill', '#111')
      .style('font-size', '10px')
      .style('font-weight', 'bold');

    svg
      .append('g')
      .selectAll('.bar')
      .data(influences)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => xScale(labels[i]))
      .attr('y', (d) => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - margin.bottom - yScale(d))
      .attr('fill', '#588157');
  };

  return (
    <div className={styles.musicPageLayout}>
      <h1>Music Artists & Their Artist Influences</h1>
      {loading ? <p>Loading...</p> : <DataTable data={data} columns={['artistLabel', 'genreLabel', 'influencedLabel']} />}

      <div style={{ width: '100%', maxWidth: '800px', overflow: 'hidden' }}>
        {/* Primul grafic pentru genreLabel */}
        <svg id="genreLabel-chart"></svg>
      </div>

      <div style={{ width: '100%', maxWidth: '800px', overflow: 'hidden', marginTop: '50px' }}>
        {/* Al doilea grafic pentru influencedLabel - cati artisti a influentat fiecare artist */}
        <svg id="influencedLabel-chart"></svg>
      </div>
    </div>
  );
};

export default MusicPage;
