export default async function topTracks(token) {
    let url = new URL(`https://api.us-east.aws.tinybird.co/v0/pipes/top_tracks.json`)

    url.searchParams.append('page_size', '8')

    const result = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
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