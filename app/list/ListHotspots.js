import React from 'react';

const url = "https://anny-xi.github.io/haarlemSpotACGN/locations.json";

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


async function ViewListMarker() {
    const markerList = await LoadLocationMarkerData()
    return (
        <View>            
                
        </View>
    );
}

export { ViewListMarker, LoadLocationMarkerData }