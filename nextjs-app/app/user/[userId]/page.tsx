import RealTimeListeners from "@/app/components/RealTimeListeners";
import TopTracks from "@/app/components/TopTracks";
import TopDevices from "@/app/components/TopDevices";
import PlaysPerDay from "@/app/components/PlaysPerDay";
import TopLocations from "@/app/components/TopLocations";

// queries
import playsPerDay from "@/app/queries/plays-per-day";
import topDevices from "@/app/queries/top-devices";
import topTracks from "@/app/queries/top-tracks";
import topLocations from "@/app/queries/top-locations";
import realTimeListeners from "@/app/queries/real-time-listeners";

export const dynamic = 'force-dynamic'

const TOKENS = {
    "021d3c9f-df52-470d-b360-7af83bd67789": "p.eyJ1IjogImE0OTBkM2VhLWNhZTYtNDRhYi05ZTEwLWI1MDAzYWY5MmY0MyIsICJpZCI6ICJlZGUyZWQzNi03OTdiLTQ3ZDMtODkyOC01MzY5MGQ3ZjFlNTgiLCAiaG9zdCI6ICJ1cy1lYXN0LWF3cyJ9._7oHiV7k4y-WlenhYGmzabllO0noP0ozQmPh03K0Lmc",
    "1afd14c1-d046-452f-92c9-1cbb4427becb": "p.eyJ1IjogImE0OTBkM2VhLWNhZTYtNDRhYi05ZTEwLWI1MDAzYWY5MmY0MyIsICJpZCI6ICIwMTYyMjUzNS1mNjA2LTQzMDMtYTM5OS0yODJjOGI0OTA3NDAiLCAiaG9zdCI6ICJ1cy1lYXN0LWF3cyJ9.CpAjSq_9KzOC8xmdS4AuUONCr1_duTUdKWI3Hm4DQE8",
}

const USERS = {
    "021d3c9f-df52-470d-b360-7af83bd67789": "Dave",
    "1afd14c1-d046-452f-92c9-1cbb4427becb": "Cameron",
}

export default async function UserDashboard({ params }: { params: { userId: string } }) {
    // @ts-ignore
    const token = TOKENS[params.userId];
    // @ts-ignore
    const userName = USERS[params.userId];

    const [playsPerDayResult, topDevicesResult, topTracksResult, topLocationsResult, realTimeListenersResult] = await Promise.all([
        playsPerDay(token),
        topDevices(token),
        topTracks(token),
        topLocations(token),
        realTimeListeners(token),
    ])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full">
            <h1 className="text-6xl font-bold">Dashboard for {userName}</h1>

            <div className="grid grid-cols-12 gap-10 w-full my-10">
                <div className="col-span-8">
                    <PlaysPerDay data={playsPerDayResult.data} />
                    <TopLocations data={topLocationsResult.data} />
                </div>
                <div className="col-span-4">
                    <RealTimeListeners data={realTimeListenersResult.data} />
                    <TopTracks data={topTracksResult.data} />
                    <TopDevices data={topDevicesResult.data} />
                </div>
            </div>
        </main>
    );
}
