import React from 'react';
import {StyleSheet, View} from 'react-native';
import StatusBarView from './components/StatusBarView'
import AppNavigator from "./components/navigation/AppNavigator";
import {Provider} from "react-redux";
import {setLocalNotification} from "./utils/NotificationUtils";
import {store} from "./store";

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={store}>
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