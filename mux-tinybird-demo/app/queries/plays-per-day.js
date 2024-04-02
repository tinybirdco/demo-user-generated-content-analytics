export default async function playsPerDay() {
    let url = new URL(`https://api.us-east.aws.tinybird.co/v0/pipes/plays_per_day.json`)

    url.searchParams.append('asset_ids', 'WucdG9TaHOoaCJR2ZLIwiQ01o7tb02sHvBunIss02bXLUA')

    const result = await fetch(url, {
        headers: {
            Authorization: 'Bearer p.eyJ1IjogImE0OTBkM2VhLWNhZTYtNDRhYi05ZTEwLWI1MDAzYWY5MmY0MyIsICJpZCI6ICI0NTRhYTkwMS0zMTUwLTRkNzctOTdjMi05NjYzMWNmNzU0ZjgiLCAiaG9zdCI6ICJ1cy1lYXN0LWF3cyJ9.lQo09scPk9w0nnMSq9q9D53x2ePAJsivOURsc5JBRIQ'
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