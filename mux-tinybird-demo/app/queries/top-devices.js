export default async function topDevices() {
    let url = new URL(`https://api.us-east.aws.tinybird.co/v0/pipes/top_devices.json`)


    const result = await fetch(url, {
        headers: {
            Authorization: 'Bearer p.eyJ1IjogImE0OTBkM2VhLWNhZTYtNDRhYi05ZTEwLWI1MDAzYWY5MmY0MyIsICJpZCI6ICIwMTYyMjUzNS1mNjA2LTQzMDMtYTM5OS0yODJjOGI0OTA3NDAiLCAiaG9zdCI6ICJ1cy1lYXN0LWF3cyJ9.CpAjSq_9KzOC8xmdS4AuUONCr1_duTUdKWI3Hm4DQE8'
        }
    })
        .then(r => r.json())
        .then(r => r)
        .catch(e => e.toString())

    if (!result.data) {
        console.error(`there is a problem running the query: ${result}`);
    } else {
        console.table(result.data)
        console.log("** Query columns **")
        for (let column of result.meta) {
            console.log(`${column.name} -> ${column.type}`)
        }
        return result;
    }
}