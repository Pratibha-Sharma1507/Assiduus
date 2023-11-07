import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, selectedMonth }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

   
    const filteredData = data.filter(d => d.Month === selectedMonth);

 
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 410 - margin.left - margin.right;
    const height = 220 - margin.top - margin.bottom;

    svg.selectAll('*').remove();


    const x = d3.scaleBand()
      .domain(filteredData.map(d => d.date))
      .range([margin.left, width + margin.left])
      .padding(0.7);

    const y = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.value)])
      .nice()
      .range([height, margin.top]);

    // Append bars to the chart
    svg.selectAll('.bar')
      .data(filteredData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.date))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('rx', 8) 
      .attr('ry', 8)
      .style('fill', '#4CAF50'); 

  
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('x', -9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end');

   
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y));

   
    svg.selectAll('.bar')
      .style('fill', '#4CAF50'); 

    svg.selectAll('.x-axis text')
      .style('font-size', '11px')
      .attr('x', 0)
      .style('text-anchor', 'middle')
      .style('fill', 'black'); 

  }, [data, selectedMonth]);

  return (
    <svg ref={svgRef} width={450} height={200}>
    </svg>
  );
};

export default BarChart;
