const createJwt = async (adminToken, pipeName, dataSourceName, propertyId) => {
    const url = "https://api.tinybird.co/v0/tokens/";
    const headers = {
        "Authorization": `Bearer ${adminToken}`,
        "Content-Type": "application/x-www-form-urlencoded"
    };
    const body = `name=pipe_read_token&scope=PIPES:READ:${pipeName}&scope=DATASOURCES:READ:${dataSourceName}:sub_property_id==${propertyId}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export default createJwt;