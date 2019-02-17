import React from 'react';
import {createAppContainer, createStackNavigator} from "react-navigation";
import Deck from "../Deck";
import TabNavigator from "./TabNavigator";
import {Constants} from "expo";
import {Platform} from "react-native";
import AddCard from "../AddCard";
import Quiz from "../Quiz";

const StackNavigator = createStackNavigator({
    Main: {
        screen: TabNavigator,
        navigationOptions: {
            header: null
        }
    },
    Deck: {
        screen: Deck,
        navigationOptions: getNavigationOptions('Deck')
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: getNavigationOptions('Add Card')
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: getNavigationOptions('Quiz')
    }
});

export default createAppContainer(StackNavigator);

function getNavigationOptions(title) {
    return {
        title: title,
        ...Platform.select({
            android: {
                headerStyle: {
                    marginTop: -Constants.statusBarHeight,
                },
            },
        })
    }
}