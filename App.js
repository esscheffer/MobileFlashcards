import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import StatusBarView from './components/StatusBarView'
import AppNavigator from "./components/navigation/AppNavigator";

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBarView backgroundColor={'red'}
                               barStyle="light-content"/>
                {/*{Platform.OS === 'ios' && <StatusBar barStyle="default" />}*/}
                <AppNavigator/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});