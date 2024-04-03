export default async function playsPerDay(token) {
    let url = new URL(`https://api.us-east.aws.tinybird.co/v0/pipes/plays_per_day.json`)

    // url.searchParams.append('asset_ids', 'b03f525e-0853-4326-b1c0-3f12321443b1')

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
        console.log(result)
    } else {
        console.table(result.data)
        console.log("** Query columns **")
        for (let column of result.meta) {
            console.log(`${column.name} -> ${column.type}`)
        }
        return result;
    }
}