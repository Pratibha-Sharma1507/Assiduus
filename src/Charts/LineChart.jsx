import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const LineChart = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    // Define margins and dimensions
    const margin = { top: 10, right: 30, bottom: 30, left: 60 };
    const width = 410 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // Fetch and process your data
    d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_IC.csv").then(data => {
      data.forEach(d => {
        d.x = +d.x; // Convert to numbers if they are not
        d.y = +d.y;
      });

      // Create scales for x and y
      const x = d3.scaleLinear()
        .domain([d3.min(data, d => d.x), d3.max(data, d => d.x)])
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.y)])
        .range([height, 0]);

      // Create the SVG element
      const svg = d3.select(svgRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Add x and y axis
      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.append("g")
        .call(d3.axisLeft(y));

      // Create the line path
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(d => x(d.x))
          .y(d => y(d.y))
        );

      // Add a transparent rectangle to capture mouse events
      svg.append('rect')
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);

      const bisect = d3.bisector(d => d.x).left;

      // Create a focus circle and text
      const focus = svg
        .append('g')
        .append('circle')
        .style("fill", "none")
        .attr("stroke", "black")
        .attr('r', 8.5)
        .style("opacity", 0);

      const focusText = svg
        .append('g')
        .append('text')
        .style("opacity", 0)
        .attr("text-anchor", "left")
        .attr("alignment-baseline", "middle");

      function mouseover() {
        focus.style("opacity", 1);
        focusText.style("opacity", 1);
      }

      function mousemove(event) {
        const x0 = x.invert(d3.pointer(event)[0]);
        const i = bisect(data, x0, 1);
        const selectedData = data[i];
        focus.attr("cx", x(selectedData.x)).attr("cy", y(selectedData.y));
        focusText
          .html("x:" + selectedData.x + " - y:" + selectedData.y)
          .attr("x", x(selectedData.x) + 15)
          .attr("y", y(selectedData.y));
      }

      function mouseout() {
        focus.style("opacity", 0);
        focusText.style("opacity", 0);
      }
    });
  }, []);

  return <div ref={svgRef}></div>;
};

export default LineChart;
