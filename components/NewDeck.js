import React, {Component} from 'react';
import styled from 'styled-components/native';
import {Input, Button} from 'react-native-elements';
import {AsyncStorage, Alert} from "react-native";
import {addDeck} from "../actions";
import {connect} from "react-redux";

const MainView = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    text-align: center;
    justify-content: center;
`;

const TitleText = styled.Text`
    align-items: center;
    text-align: center;
    font-size: 40px;
    color: black;
    margin: 8px;
`;

class NewDeck extends Component {
    state = {deckTitle: ""};

    handleTextChange = deckTitle => {
        this.setState({deckTitle})
    };

    handleSubmit = () => {
        const {deckTitle} = this.state;
        const newDeck = {title: deckTitle, questions: []};

        this.props.dispatch(addDeck(newDeck));

        AsyncStorage.setItem(deckTitle, JSON.stringify(newDeck))
            .catch(() =>
                Alert.alert(
                    'Error',
                    'Error creating the deck. Try Again',
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false},
                )
            );

        this.setState({deckTitle: ""});
    };

    render() {
        return (
            <MainView behavior='padding'>
                <TitleText>What is the title of your new deck?</TitleText>
                <Input placeholder='Deck Title'
                       value={this.state.deckTitle}
                       onChangeText={this.handleTextChange}
                       containerStyle={{margin: 8}}/>
                <Button title="Submit"
                        onPress={this.handleSubmit}
                        containerStyle={{margin: 8}}/>
            </MainView>
        );
    }
}

export default connect()(NewDeck);
