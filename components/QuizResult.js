import React, {Component} from 'react';
import styled from "styled-components/native/dist/styled-components.native.esm";
import {Button} from "react-native-elements";

const MainView = styled.View`
    flex: 1;
    align-items: center;
    text-align: center;
    justify-content: center;
`;

const ResultText = styled.Text`
    font-size: 24px;
    margin: 8px;
    align-items: center;
    text-align: center;
    justify-content: center;
`;

class QuizResult extends Component {
    render() {
        const {correctAnswers, totalQuestions, restartHandler} = this.props;
        return (
            <MainView>
                <ResultText>You got {correctAnswers} of {totalQuestions} questions correct!</ResultText>
                <ResultText>{Math.floor((correctAnswers / totalQuestions) * 100)}% correct!</ResultText>
                <Button title="Restart Quiz"
                        onPress={restartHandler}
                        containerStyle={{margin: 8}}/>
            </MainView>
        );
    }
}

export default QuizResult;
