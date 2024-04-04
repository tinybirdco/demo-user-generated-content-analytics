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

const USERS_DB = [
    { id: "user_1", sub_property_id: "021d3c9f-df52-470d-b360-7af83bd67789", name: "User 1", tb_token: "<user 1 token>" },
    { id: "user_2", sub_property_id: "1afd14c1-d046-452f-92c9-1cbb4427becb", name: "User 1", tb_token: "<user 2 token>", },
]

export default async function UserDashboard({ params }: { params: { userId: string } }) {
    // @ts-ignore
    const { name, tb_token } = USERS_DB.find(user => user.id === params.userId);

    const [playsPerDayResult, topDevicesResult, topTracksResult, topLocationsResult, realTimeListenersResult] = await Promise.all([
        playsPerDay(tb_token),
        topDevices(tb_token),
        topTracks(tb_token),
        topLocations(tb_token),
        realTimeListeners(tb_token),
    ])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full">
            <h1 className="text-6xl font-bold">Dashboard for {name}</h1>

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
