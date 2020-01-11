//Reducer
import * as ActionTypes from './ActionTypes';

export const favorites = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITE:
            if (state.includes(action.payload)) {
                return state; //return to previous state since nothing need to change
            }
            return state.concat(action.payload); //otherwise add fav to array

        default:
            return state;
    }
};