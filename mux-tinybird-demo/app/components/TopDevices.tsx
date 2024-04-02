"use client";
import { DonutChart } from '@tremor/react';

const dataFormatter = (number: number) =>
    `${Intl.NumberFormat('us').format(number).toString()}`;

type Row = {
    device: string;
    c: number;
}

export default function TopDevices({data}: {data: Row[]}) {
    // reformat keys in data to name and value
    const datahero = data.map((d) => ({
        name: d.device,
        value: d.c,
    }));

    return (
        <>
            <div className="mx-auto space-y-12">
                <div className="space-y-3">

                    <h1 className='font-mono font-semibold mb-4'>Device breakdown</h1>
                    <div className="flex justify-center">
                        <DonutChart
                            data={datahero}
                            variant="pie"
                            valueFormatter={dataFormatter}
                            onValueChange={(v) => console.log(v)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
};