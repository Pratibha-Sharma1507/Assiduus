import React, { useEffect, useMemo } from 'react';
import * as d3 from 'd3';

const DataTable = ({ data, selectedMonth }) => {
  const filteredData = useMemo(() => {
    return data
      .filter(item => item.Month.toLowerCase() === selectedMonth.toLowerCase())
      .map(({ Account, Month, YID }) => ({ Account, Month, YID }));
  }, [data, selectedMonth]);

  useEffect(() => {
  
    d3.select('#data-table-container').selectAll('*').remove();

    // Create the table
    const table = d3.select('#data-table-container').append('table')
      .style('width', '410px') 
      .style('height', '200px')

    // headers
    table.append('thead').append('tr')
      .selectAll('th')
      .data(Object.keys(filteredData[0]))
      .enter().append('th')
      .text(function(d) { return d; })
      .style('padding', '8px')
      .style('font-weight', 'bold')
      .style('text-transform', 'uppercase');

    // data rows
    table.append('tbody')
      .selectAll('tr').data(filteredData)
      .enter().append('tr')
      .selectAll('td')
      .data(function(d) { return Object.values(d); })
      .enter().append('td')
      .style('padding', '8px')
      .text(function(d) { return d; })
      .style('font-size', '13px');
  }, [filteredData]);

  return <div id="data-table-container"></div>;
};

export default DataTable;
