"use client";

import { LineChart } from '@tremor/react';

type Row = { d: string; c: number }

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

export default function LineChartHero({ data }: { data: Row[] }) {
  // rename data[n].c to data[n].Plays and format data[n].d to Day, Date, Year
  const datum = data.map((d) => {
    return {
      d: new Date(d.d).toLocaleDateString(),
      Plays: d.c,
    };
  });

  return (
    <>
      <h1 className='font-mono font-semibold mb-4'>Plays per day</h1>
      <LineChart
        className="h-80 mb-8"
        data={datum}
        index="d"
        categories={['Plays']}
        colors={['indigo', 'rose']}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
      />
    </>
  );
}