import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TotalCash = ({ data, selectedMonth }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const filteredData = data.filter(
     d => ['August', 'September', 'October', 'November', 'December', 'January'].includes(d.Month)
    );

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 410 - margin.left - margin.right;
    const height = 230 - margin.top - margin.bottom;

    svg.selectAll('*').remove();

    const keys = ['In', 'Out'];
    const stack = d3.stack()
      .keys(keys)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const stackedData = stack(filteredData);

    const x = d3.scaleBand()
      .domain(filteredData.map(d => d.Month))
      .range([margin.left, width + margin.left])
      .padding(0.5);

    const y = d3.scaleLinear()
      .domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])])
      .nice()
      .range([height, margin.top]);

    const color = d3.scaleOrdinal()
      .domain(keys)
      .range(['#4CAF50', '#2196F3']);

    svg.selectAll('.bar')
      .data(stackedData)
      .enter()
      .append('g')
      .attr('fill', d => color(d.key))
      .selectAll('rect')
      .data(d => d)
      .enter()
      .append('rect')
      .attr('x', d => x(d.data.Month))
      .attr('y', d => y(d[1]))
      .attr('height', d => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth());
      

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

    svg.selectAll('.x-axis text')
      .style('font-size', '11px')
      .attr('x', 0)
      .style('text-anchor', 'middle')
      .style('fill', 'black');

  }, [data, selectedMonth]);

  return (
    <svg ref={svgRef}  width={450} height={200}>
    </svg>
  );
};

export default TotalCash;