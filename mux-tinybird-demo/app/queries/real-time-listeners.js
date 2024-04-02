export default async function realTimeListeners() {
    let url = new URL(`https://api.us-east.aws.tinybird.co/v0/pipes/real_time_listeners.json`)

    url.searchParams.append('lookback_seconds', '60')
    
    const result = await fetch(url, {
      headers: {
        Authorization: 'Bearer p.eyJ1IjogImE0OTBkM2VhLWNhZTYtNDRhYi05ZTEwLWI1MDAzYWY5MmY0MyIsICJpZCI6ICIwYjZhMzk1MC0wMTdiLTRlNzEtYjgwOC1hNmQzNGZhNGFkMjYiLCAiaG9zdCI6ICJ1cy1lYXN0LWF3cyJ9.hQL_EhcgEll6klkD1mssj5F8YsJ3TEnHtR6aycxGdQM'
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