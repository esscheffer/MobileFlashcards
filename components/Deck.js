import React, {Component} from 'react';
import styled from "styled-components/native/dist/styled-components.native.esm";
import {Button} from "react-native-elements";
import {connect} from "react-redux";

const MainView = styled.View`
    flex: 1;
    align-items: center;
    text-align: center;
    justify-content: center;
`;

const DeckTitleText = styled.Text`
    align-items: center;
    text-align: center;
    font-size: 40px;
    color: black;
    margin: 8px;
`;

const CardCountText = styled.Text`
    align-items: center;
    text-align: center;
    font-size: 30px;
    color: gray;
    margin: 8px;
`;

class Deck extends Component {
    render() {
        const {deck} = this.props;
        return (
            <MainView>
                <DeckTitleText>{deck.title}</DeckTitleText>
                <CardCountText>{deck.questions.length} cards</CardCountText>
                <Button title="Add Card"
                        type="outline"
                        containerStyle={{margin: 8}}
                        onPress={() =>
                            this.props.navigation.navigate('AddCard', {deckTitle: deck.title})}/>
                <Button title="Start Quiz" containerStyle={{margin: 8}}/>
            </MainView>
        );
    }
}

function mapStateToProps({decks}, {navigation}) {
    return {
        deck: decks.find(deck => deck.title === navigation.getParam("deckTitle"))
    };
}

export default connect(mapStateToProps)(Deck)
