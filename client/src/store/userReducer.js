import * as actionTypes from "./actionTypes";

const initialState = {
  onlyFavorites: true,
  companyName: "",
  platforms: [],
};

const showOnlyFavorites = (state) => ({ ...state, onlyFavorites: true });

const showAllMentions = (state) => ({ ...state, onlyFavorites: false });

const updateCompanyName = (state, companyName) => ({});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_ONLY_FAVORITES:
      return showOnlyFavorites(state);
    case actionTypes.SHOW_ALL_MENTIONS:
      return showAllMentions(state);
    case actionTypes.UPDATE_COMPANY_NAME:
      return updateCompanyName(state, action.companyName);
    default:
      return initialState;
  }
};

export { reducer, initialState };
