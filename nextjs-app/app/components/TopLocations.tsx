import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';

type Row = {
    country: string;
    c: number;
}

export default function TableHero({ data }: { data: Row[] }) {


    return (
        <div className="mx-auto w-full">
            <h1 className='font-mono font-semibold mb-4'>Top locations</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Country</TableHeaderCell>
                        <TableHeaderCell className="text-right">
                            Plays
                        </TableHeaderCell>
                    </TableRow>
                </TableHead>

                <TableBody>

                    {data.map((d) => (
                        <TableRow key={d.country}>
                            <TableCell>{d.country}</TableCell>
                            <TableCell className="text-right">{d.c}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
};