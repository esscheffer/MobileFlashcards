import {ADD_CARD, ADD_DECK, RECEIVE_DECKS} from "../actions";
import {addToDuplicateArray} from "../utils/ArrayUtils";

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            };
        case ADD_DECK:
            return {
                ...state,
                decks: addToDuplicateArray(state.decks, action.deck)
            };
        case ADD_CARD:
            return {
                ...state,
                decks: state.decks.map(deck => deck.title === action.deckTitle ? {
                    ...deck, questions: addToDuplicateArray(deck.questions, action.card)
                } : deck)
            };
        default:
            return state;
    }
}

export default decks