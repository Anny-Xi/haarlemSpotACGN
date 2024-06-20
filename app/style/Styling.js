import { StyleSheet } from 'react-native';



const styles = StyleSheet.create({
    navButton: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
    },
    lightThemeButton: {
        backgroundColor: '#f1c0c0',
        borderColor: '#df6d6d',
        borderWidth: 1
    },
    darkThemeButton: {
        backgroundColor: '#6F6F27',
        borderColor: '#386d26',
        borderWidth: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
    },
    lightContainer: {
        backgroundColor: '#d0d0c0',
    },
    darkContainer: {
        backgroundColor: '#4C1515',
    },
    lightThemeText: {
        color: '#24402E',
    },
    darkThemeText: {
        color: '#F5F5D1',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    marker: {
        color: 'red'
    },
    radius: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0, 112, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center'

    },
    currentLocation: {
        height: 20,
        width: 20,
        borderRadius: 20 / 2,
        overflow: 'hidden',
        backgroundColor: '#0074FF',
        borderWidth: 3,
        borderColor: 'white',
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'column',
        // flexWrap: 'wrap',
    },
    buttonLocation: {
        width: '50%',
        height: 50,
        alignSelf: 'center',
        bottom: 55,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        borderRadius: 25 / 2,

    },
    buttonText: {
        fontSize: 15
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    overViewItem: {
        width: '80%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
    },
    overViewText: {
        fontSize: 15,
        textAlign: 'center'
    },
    goLocationButton: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export { styles }