import React from 'react';
import {StyleSheet, View} from 'react-native';
import StatusBarView from './components/StatusBarView'
import AppNavigator from "./components/navigation/AppNavigator";
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducers"
import middleware from "./middleware"

export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer, middleware)}>
                <View style={styles.container}>
                    <StatusBarView backgroundColor={'blue'}
                                   barStyle="light-content"/>
                    <AppNavigator/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});