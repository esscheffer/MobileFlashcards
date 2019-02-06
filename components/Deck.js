import React, {Component} from 'react';
import {Text, View} from "react-native";

class Deck extends Component {
    state = {};

    render() {
        // noinspection JSCheckFunctionSignatures
        const deck = this.props.navigation.getParam("deck");
        return (
            <View>
                <Text>Deck: {JSON.stringify(deck)}</Text>
            </View>
        );
    }
}

export default Deck;
