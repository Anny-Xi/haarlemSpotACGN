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
      backgroundColor: '#d1d1f5'
    },
    darkThemeButton: {
      backgroundColor: '#6F6F27'
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
  });

export { styles }