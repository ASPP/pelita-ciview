'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";


const columns = [
  "Name",
  "# Matches",
  "# Wins",
  "# Draws",
  "# Losses",
  "Score",
  "ELO",
  "Error count",
  "# Fatal Errors",
]

function CITable({ data }: { data: string[][] }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((x) => (<th key={x}>{x}</th>))}
        </tr>
      </thead>
      <tbody>
        {
          data.map((row) => (
            <tr key={row[0]}>{row.map((it, idx) => (
              <td key={idx}>{it}</td>
            ))
            }</tr>))
        }
      </tbody>
    </table>
  );
};

export default function CIViewer() {
  const searchParams = useSearchParams()
  const [data, setData] = useState([]);

  const jsonPage = searchParams.get('url');

  if (!jsonPage) return (<p>No data</p>);

  useEffect(() => {
    fetch(jsonPage)
      .then(response => response.json())
      .then(setData);
  }, [jsonPage]);

  return (
    <>
      <CITable data={data}></CITable>
    </>
  );
}
