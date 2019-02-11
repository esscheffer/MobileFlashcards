import React, {Component} from 'react';
import {AsyncStorage, FlatList, View} from "react-native";
import {Divider, ListItem} from 'react-native-elements'
import {connect} from "react-redux";
import {receiveDecks} from "../actions";

class DecksList extends Component {
    componentDidMount() {
        const self = this;
        AsyncStorage.getAllKeys()
            .then(keys => {
                AsyncStorage.multiGet(keys)
                    .then(decks => {
                        const decksObject = {
                            decks: decks.map(deck => {
                                return JSON.parse(deck[1])
                            })
                        };
                        self.props.dispatch(receiveDecks(decksObject));
                    });
            });
    }

    keyExtractor = (item) => item.title;

    listItem = ({item}) => (
        <ListItem title={item.title}
                  subtitle={`${item.questions.length} cards`}
                  onPress={() => this.props.navigation.navigate('Deck', {deckTitle: item.title})}
        />
    );

    renderSeparator = () => {
        return (
            <Divider style={{backgroundColor: 'grey'}}/>
        );
    };

    render() {
        return (
            <View>
                <FlatList data={this.props.decks}
                          renderItem={this.listItem}
                          keyExtractor={this.keyExtractor}
                          ItemSeparatorComponent={this.renderSeparator}/>
            </View>
        );
    }
}

function mapStateToProps({decks}) {
    return {decks};
}

export default connect(mapStateToProps)(DecksList)