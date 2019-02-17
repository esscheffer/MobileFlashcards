import React, {Component} from 'react';
import {View} from "react-native";
import styled from "styled-components/native/dist/styled-components.native.esm";
import {Button} from "react-native-elements";
import QuizResult from "./QuizResult";
import {clearLocalNotification, setLocalNotification} from "../utils/NotificationUtils";

const MainView = styled.View`
    flex: 1;
`;

const CardView = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    text-align: center;
    justify-content: center;
`;

const CardText = styled.Text`
    text-align: center;
    font-size: 40px;
    color: black;
    margin: 8px;
`;

const ButtonsView = styled.View`
    flex: 1;
    justify-content: flex-end;
    margin-bottom: 36px;
`;

const ProgressText = styled.Text`
    font-size: 16px;
`;

class Quiz extends Component {
    state = {
        currentQuestionIndex: 0,
        totalCorrectAnswers: 0,
        showingAnswer: false,
        showingResult: false
    };

    handleCorrectAnswer = () => {
        // noinspection JSCheckFunctionSignatures
        if ((this.state.currentQuestionIndex + 1) === this.props.navigation.getParam("deck").questions.length) {
            this.finishQuiz(true)
        } else {
            this.setState(previousState => ({
                totalCorrectAnswers: previousState.totalCorrectAnswers + 1,
                currentQuestionIndex: previousState.currentQuestionIndex + 1,
                showingAnswer: false
            }));
        }
    };

    handleIncorrectAnswer = () => {
        // noinspection JSCheckFunctionSignatures
        if ((this.state.currentQuestionIndex + 1) === this.props.navigation.getParam("deck").questions.length) {
            this.finishQuiz(false);
        } else {
            this.setState(previousState => ({
                currentQuestionIndex: previousState.currentQuestionIndex + 1,
                showingAnswer: false
            }));
        }
    };

    finishQuiz = lastQuestionCorrect => {
        this.setState(previousState => ({
            totalCorrectAnswers: previousState.totalCorrectAnswers + (lastQuestionCorrect ? 1 : 0),
            currentQuestionIndex: 0,
            showingAnswer: false,
            showingResult: true
        }));

        clearLocalNotification().then(setLocalNotification)
    };

    restartQuiz = () => {
        this.setState({
            currentQuestionIndex: 0,
            totalCorrectAnswers: 0,
            showingAnswer: false,
            showingResult: false
        });
    };

    flipCard = () => {
        this.setState(previousState => ({
            showingAnswer: !previousState.showingAnswer
        }))
    };

    render() {
        // noinspection JSCheckFunctionSignatures
        const deck = this.props.navigation.getParam("deck");
        const {currentQuestionIndex, totalCorrectAnswers, showingAnswer, showingResult} = this.state;

        return (<MainView>
                {showingResult ? <QuizResult correctAnswers={totalCorrectAnswers}
                                             totalQuestions={deck.questions.length}
                                             restartHandler={this.restartQuiz}/>
                    : <MainView>
                        <ProgressText>{currentQuestionIndex + 1}/{deck.questions.length}</ProgressText>
                        <CardView>
                            {showingAnswer ?
                                <View style={{flex: 1}}>
                                    <View>
                                        <CardText>{deck.questions[currentQuestionIndex].answer}</CardText>
                                        <Button title="Question"
                                                type="clear"
                                                onPress={this.flipCard}
                                                containerStyle={{margin: 8}}/>
                                    </View>
                                    <ButtonsView>
                                        <Button title="Correct"
                                                onPress={this.handleCorrectAnswer}
                                                buttonStyle={{backgroundColor: 'green'}}
                                                containerStyle={{margin: 8}}/>
                                        < Button title="Incorrect"
                                                 buttonStyle={{backgroundColor: 'red'}}
                                                 onPress={this.handleIncorrectAnswer}
                                                 containerStyle={{margin: 8}}/>
                                    </ButtonsView>
                                </View>
                                : <View>
                                    <View style={{flex: 1}}>
                                        <CardText>{deck.questions[currentQuestionIndex].question}</CardText>
                                        <Button title="Answer"
                                                type="clear"
                                                onPress={this.flipCard}
                                                containerStyle={{margin: 8}}/>
                                    </View>
                                    <ButtonsView/>
                                </View>
                            }
                        </CardView>
                    </MainView>
                }
            </MainView>
        );
    }
}

export default Quiz;
