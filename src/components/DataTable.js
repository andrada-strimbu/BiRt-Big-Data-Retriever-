import React from 'react';


const DataTable = ({ data, columns }) => {
  // console.log("data:", data)
  return (
    <table>
      {/* artistLabel          workLabel            creationYear  */}
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data && data.map((row, idx) => (
          // console.log("rows: ", row),
          <tr key={idx}>
            {columns.map((col, colIdx) => (
              <td key={colIdx}>{row[col]?.value || 'N/A'}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;