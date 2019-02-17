import React, {Component} from 'react';
import {Alert, AsyncStorage, View} from "react-native";
import {Button, Input} from "react-native-elements";
import {addCard} from "../actions";
import {connect} from "react-redux";
import {addToDuplicateArray} from "../utils/ArrayUtils";

class AddCard extends Component {
    state = {
        question: "",
        answer: "",
        questionErrorMessage: "",
        answerErrorMessage: ""
    };

    handleQuestionChange = question => {
        this.setState({question, questionErrorMessage: ""});
    };

    handleAnswerChange = answer => {
        this.setState({answer, answerErrorMessage: ""});
    };

    handleSubmit = () => {
        const {deck} = this.props;
        const {question, answer} = this.state;
        const card = {question, answer};

        if (!question) {
            this.setState({questionErrorMessage: "Questions is required"});
            return;
        }

        if (!answer) {
            this.setState({answerErrorMessage: "Answer is required"});
            return;
        }

        this.props.dispatch(addCard(card, deck.title));

        const deckWithQuestion = {
            ...deck,
            questions: addToDuplicateArray(deck.questions, card)
        };

        AsyncStorage.mergeItem(deck.title, JSON.stringify(deckWithQuestion)).catch(() =>
            Alert.alert(
                'Error',
                'Error creating the card. Try Again',
                [
                    {text: 'OK'},
                ],
                {cancelable: false},
            )
        );

        this.setState({question: "", answer: ""});
    };

    render() {
        return (
            <View>
                <Input placeholder='Question'
                       value={this.state.question}
                       onChangeText={this.handleQuestionChange}
                       containerStyle={{margin: 16}}
                       errorMessage={this.state.questionErrorMessage}/>
                <Input placeholder='Answer'
                       value={this.state.answer}
                       onChangeText={this.handleAnswerChange}
                       containerStyle={{margin: 16}}
                       errorMessage={this.state.answerErrorMessage}/>
                <Button title="Submit"
                        onPress={this.handleSubmit}
                        containerStyle={{margin: 8}}/>
            </View>
        );
    }
}

function mapStateToProps({decks}, {navigation}) {
    return {
        deck: decks.find(deck => deck.title === navigation.getParam("deckTitle"))
    };
}

export default connect(mapStateToProps)(AddCard)
