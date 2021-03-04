import * as actionTypes from "./actionTypes";

const initialState = {
  onlyFavorites: false,
};

const showOnlyFavorites = (state) => ({ ...state, onlyFavorites: true });

const showAllMentions = (state) => ({ ...state, onlyFavorites: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_ONLY_FAVORITES:
      return showOnlyFavorites(state);
    case actionTypes.SHOW_ALL_MENTIONS:
      return showAllMentions(state);
    default:
      return initialState;
  }
};

export { reducer, initialState };
