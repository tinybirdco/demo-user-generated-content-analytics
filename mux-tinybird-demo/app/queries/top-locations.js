export default async function topLocations() {
    let url = new URL(`https://api.us-east.aws.tinybird.co/v0/pipes/top_locations.json`)

    const result = await fetch(url, {
        headers: {
            Authorization: 'Bearer p.eyJ1IjogImE0OTBkM2VhLWNhZTYtNDRhYi05ZTEwLWI1MDAzYWY5MmY0MyIsICJpZCI6ICI3YjY0MzlmMy00N2QyLTQzMDgtYjFlNS1jOWQ3OGRjZTI4ZDAiLCAiaG9zdCI6ICJ1cy1lYXN0LWF3cyJ9.NrPS6dLScpDblHgyUQlzvpY7vvLlHy7QKfdNxR76aDo'
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