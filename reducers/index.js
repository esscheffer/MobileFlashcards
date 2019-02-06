import {ADD_DECK, RECEIVE_DECKS} from "../actions";

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            };
        case ADD_DECK:
            let newArray = state.decks.slice();
            newArray.push(action.deck);
            return {
                ...state,
                decks: newArray
            };
        default:
            return state;
    }
}

export default decks