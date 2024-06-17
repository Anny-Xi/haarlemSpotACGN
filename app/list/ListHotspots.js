import { Marker } from 'react-native-maps';
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
        <>            
                {/* Link for mulipe markers:  https://stackoverflow.com/questions/40541095/render-multiple-marker-in-react-native-maps */}

                {markerList.markers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.coordinates}
                        title={marker.name}
                    />
                ))}
        </>
    );
}

export { ViewListMarker, LoadLocationMarkerData }