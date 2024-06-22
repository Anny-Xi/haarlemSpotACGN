const url = "https://anny-xi.github.io/haarlemSpotACGN/locations.json"; //json file

async function LoadLocationMarkerData() {

    try {
        const result = await fetch(url);
        const data = await result.json();
        console.log(data)
        return data;

    } catch (e) {
        console.log('error', e);
    }
}


export { LoadLocationMarkerData }