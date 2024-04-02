"use client";

import { BarList } from '@tremor/react';

type Row = {
    sub_property_id: string;
    asset_id: string;
    video_title: string;
    c: number;
};

export default function BarListHero({ data }: { data: Row[] }) {
    // reformat keys in data to name and value
    const datahero = data.map((d) => ({
        name: d.video_title,
        value: d.c,
    }));

    return (
        <>
            <h1 className='font-mono font-semibold mb-4'>Top tracks</h1>
            <BarList data={datahero} className="mx-auto max-w-sm w-96 mb-8" />
        </>
    )
};