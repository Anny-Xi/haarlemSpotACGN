

const url = "https://anny-xi.github.io/haarlemSpotACGN/locations.json";

async function loadLocationMarkerData() {

    try {
        const result = await fetch(url);
        const data = await result.json();
        return data;

    } catch (e) {
        console.log('error', e);
    }
}

async function loadMarkers() {


    let data = await loadLocationMarkerData(); // await makes sure that the function will finish
    // console.log(data);

    // make choice here



    let filterdata = filterCategory !== "all" ? data.filter(({ category }) => category === filterCategory) : filterCategory === "list" ? loadCategory() : data;
    // filterCategory === "all" ? data : data.filter(({ category }) => category === filterCategory

    // console.log(filterdata);



    // destructuring
    for (const { name, category, unicode } of filterdata) {
        console.log(`name :${name}, category : ${category}, unicode: ${unicode} `);

        console.log(String.fromCodePoint(parseInt(unicode[0].replace('U+', ''), 16))) // delete U+
    }
    // console.log(filterCategory); //all
    // console.log(source); // api
}

async function loadCategory() {
    //make an new Set to check difference
    let categorylist = new Set();

    let data = await loadEmojiData();

    for (const { category } of data) {
        categorylist.add(category);
    }

    console.log(categorylist);

}


function viewListMarker() {

    return (<View style={styles.container}>
        <Text>Dit is de home met een map!</Text>
        <MapView
            style={styles.map}
            region={{
                latitude: 52.381,
                longitude: 4.63719,
                latitudeDelta: 0.000,
                longitudeDelta: 0.015,
            }}
        >
            {/* Link for mulipe markers:  https://stackoverflow.com/questions/40541095/render-multiple-marker-in-react-native-maps */}

            {markerList.markers.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={marker.coordinates}
                    title={marker.name}
                />
            ))}
        </MapView>
        <StatusBar style="auto" />
    </View>
    );
}

export {viewListMarker, loadLocationMarkerData}