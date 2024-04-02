export default async function topTracks() {
    let url = new URL(`https://api.us-east.aws.tinybird.co/v0/pipes/top_tracks.json`)

    url.searchParams.append('page_size', '5')

    const result = await fetch(url, {
        headers: {
            Authorization: 'Bearer p.eyJ1IjogImE0OTBkM2VhLWNhZTYtNDRhYi05ZTEwLWI1MDAzYWY5MmY0MyIsICJpZCI6ICJkNzBiMGM2Mi1mOWQ0LTQ3YzYtYjEzMS1jNWIyNzJmZmI2NWMiLCAiaG9zdCI6ICJ1cy1lYXN0LWF3cyJ9.FbksuTJOWO2hZhGR3YA_85hrGR0CwuZlHkQfqFXyoCU'
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