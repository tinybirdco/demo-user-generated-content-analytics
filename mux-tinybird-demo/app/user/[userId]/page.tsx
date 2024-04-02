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

export default async function UserDashboard({ params }: { params: { userId: string } }) {
    const playsPerDayResult = await playsPerDay();

    const [topDevicesResult, topTracksResult, topLocationsResult, realTimeListenersResult] = await Promise.all([
        topDevices(),
        topTracks(),
        topLocations(),
        realTimeListeners(),
    ])

    console.log("playas per day")
    console.log(playsPerDayResult)

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full">
            <h1 className="text-6xl font-bold">Dashboard for {params.userId}</h1>

            <div className="grid grid-cols-12 gap-10 w-full my-10">
                <div className="col-span-8">
                    <PlaysPerDay />
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
