import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useTable } from '../../context/Table';

const BarChart = () => {
  const svgRef = useRef();
  const { rangeData,selectedMonth } = useTable();
  
  const monthName = `Bar Chart Stats - ${selectedMonth}`; // Change this to the desired month name

  useEffect(() => {
    if (!rangeData) return; // Exit if rangeData is not available

    const svg = d3.select(svgRef.current);
    const width = 700;
    const height = 300;
    const margin = { top: 50, right: 30, bottom: 80, left: 40 }; // Increased top margin for month name

    svg
      .attr('width', width)
      .attr('height', height)
      .style('background', '#f4f4f4')
      .style('margin-top', '50')
      .style('overflow', 'visible');

    const x = d3
      .scaleBand()
      .domain(rangeData.map((d) => d.range))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(rangeData, (d) => d.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.selectAll('*').remove(); // Clear existing content in the SVG

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .attr('font-size', '14px')
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('dx', '-0.5em')
      .attr('dy', '0.5em')
      .style('text-anchor', 'end');

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5))
      .attr('font-size', '14px');

    svg
      .selectAll('.bar')
      .data(rangeData)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.range))
      .attr('y', (d) => y(d.count))
      .attr('height', (d) => y(0) - y(d.count))
      .attr('width', x.bandwidth())
      .attr('fill', 'steelblue');

    // Calculate the average count
    const average = d3.mean(rangeData, d => d.count);

    // Add a line at the average value
    svg
      .append('line')
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('y1', y(average))
      .attr('y2', y(average))
      .attr('stroke', 'red')
      .attr('stroke-dasharray', '4');

    // Add text to indicate the average value
    svg
      .append('text')
      .attr('x', width - margin.right - 10)
      .attr('y', y(average) - 10)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', 'red')
      .text(`Avg: ${average.toFixed(2)}`);

    // Add month name above the bar chart
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '20px')
      .attr('font-weight', 'bold')
      .text(monthName);

  }, [rangeData]);

  return (
    <div>
      <svg style={{ width: '50%' }} ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;
