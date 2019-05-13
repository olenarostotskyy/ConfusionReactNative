import * as ActionTypes from './ActionTypes';

export const favorites = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITE:
            if (state.some(el => el === action.payload))
                return state;
            else
                return state.concat(action.payload);
                
                case ActionTypes.DELETE_FAVORITE:
                return state.filter((favorite) => favorite !== action.payload);//from the state, we will filter out that payload,
                //that dish that corresponds to that payload. And so that dish will be removed from that state over here. And then that modified state is returned from this action here.

        default:
          return state;
      }
};