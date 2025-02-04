import React from 'react';
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