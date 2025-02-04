'use client';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from './finearts.module.css'; 

const FineArtsChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data && data.length > 0) {
      drawChart(data);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [data]);

  const handleResize = () => {
    drawChart(data);
  };

  const drawChart = (data) => {
    const artistCounts = data.reduce((acc, item) => {
      const artistLabel = item.artistLabel?.value;
      if (artistLabel) {
        acc[artistLabel] = (acc[artistLabel] || 0) + 1;
      }
      return acc;
    }, {});

    const labels = Object.keys(artistCounts);
    const values = Object.values(artistCounts);

    const margin = { top: 20, right: 20, bottom: 60, left: 40 };
    const width = svgRef.current.parentElement.clientWidth;
    const height = 400;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const xScale = d3
      .scaleBand()
      .domain(labels)
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(values)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSize(0));

    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale).ticks(5));

    svg.selectAll('.x-axis text')
      .style('font-size', '14px')
      .style('font-family', 'Arial')
      .style('fill', '#081c15');

    svg.selectAll('.y-axis text')
      .style('font-size', '14px')
      .style('font-family', 'Arial')
      .style('fill', '#081c15');

    svg
      .append('g')
      .selectAll('.bar')
      .data(values)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => xScale(labels[i]))
      .attr('y', (d) => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - margin.bottom - yScale(d))
      .attr('fill', '#588157');

    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', margin.top)
      .attr('text-anchor', 'middle')
      .style('font-size', '26px')
      .style('font-family', 'Arial')
      .style('fill', '#081c15')
      .text('Number of works per artist');
  };

  return (
    <div className={styles.chartContainer} style={{ width: '100%', overflow: 'hidden' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default FineArtsChart;
