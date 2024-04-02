import { Card, Tracker, type Color } from '@tremor/react';

type Row = {
    ts: string;
    c: number;
}

export default function TrackerUsageExample({ data }: { data: Row[] }) {

    // if c is 0, color is gray
    // if c is between 1 and 5, color is yellow
    // if c is greater than 5, color is emerald

    const rows = data.map((d) => ({
        color: d.c === 0 ? 'gray' : d.c > 5 ? 'emerald' : 'yellow',
        tooltip: d.c.toString() + ' listeners',
    }));

    return (
        <Card className="mx-auto max-w-md mb-8">
            <p className="text-tremor-default flex items-center justify-between">
                <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">Live listeners</span>
                <span className="text-tremor-content dark:text-dark-tremor-content">past 60 seconds</span>
            </p>
            <Tracker data={rows} className="mt-2" />
        </Card>
    );
}