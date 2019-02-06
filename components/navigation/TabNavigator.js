import DecksList from "../DecksList";
import NewDeck from "../NewDeck";
import {Platform} from "react-native";
import {createBottomTabNavigator, createMaterialTopTabNavigator} from "react-navigation";

const tabConfiguration = {
    DecksList: {
        screen: DecksList,
        navigationOptions: {
            title: 'Deck List'
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            title: 'New Deck'
        }
    },
};

const TabNavigator =
    Platform.select({
        ios: createBottomTabNavigator(tabConfiguration),
        android: createMaterialTopTabNavigator(tabConfiguration)
    });

export default TabNavigator;
