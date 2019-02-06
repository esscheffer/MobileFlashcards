import React from 'react';
import {createAppContainer, createStackNavigator} from "react-navigation";
import Deck from "../Deck";
import TabNavigator from "./TabNavigator";
import {Constants} from "expo";
import {Platform} from "react-native";

const StackNavigator = createStackNavigator({
    Main: {
        screen: TabNavigator,
        navigationOptions: {
            header: null
        }
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            title: 'Deck',
            ...Platform.select({
                android: {
                    headerStyle: {
                        marginTop: -Constants.statusBarHeight,
                    },
                },
            })
        }
    }
});

export default createAppContainer(StackNavigator);
