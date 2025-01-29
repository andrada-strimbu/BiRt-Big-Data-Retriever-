import React from 'react';


// const DataTable = ({ data, columns }) => {
//   // console.log("data:", data)
//   return (
//     <table>
//       {/* artistLabel          workLabel            creationYear  */}
//       <thead>
//         <tr>
//           {columns.map((col, idx) => (
//             <th key={idx}>{col}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {/* {data && data.map((row, idx) => (
//           // console.log("rows: ", row),
//           <tr key={idx}>
//             {columns.map((col, colIdx) => (
//               <td key={colIdx}>{row[col]?.value || 'N/A'}</td>
//             ))}
//           </tr>
//         ))} */}
//         
//       </tbody>
//     </table>
//   );
// };

// export default DataTable;

import styles from './datatable.module.css'

export default function DataTable({ data, columns }) {
  return (
    <div className={styles.fetchedResults}>
      <div className={styles.header}>
        {columns.map((col, idx) => (
          <p key={idx}>{col}</p>
        ))}
      </div>

      <div className={styles.body}>
        {
          data && data.map((row, idx) => (
          <div key={idx} className={styles.divv}>
            {columns.map((col, colIdx) => (
              <p key={colIdx}>{row[col]?.value || 'N/A'}</p>
            ))}
          </div>
        ))}

      </div>
    </div>
  )
}