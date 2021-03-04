import * as actionTypes from "./actionTypes";

const initialState = {
  onlyFavorites: false,
  companyName: "",
  platforms: [],
};

const showOnlyFavorites = (state) => ({ ...state, onlyFavorites: true });

const showAllMentions = (state) => ({ ...state, onlyFavorites: false });

const updateCompanyName = (state, companyName) => ({});

const isLoadingOn = (state) => ({ ...state, isLoading: true });

const isLoadingOff = (state) => ({ ...state, isLoading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_ONLY_FAVORITES:
      return showOnlyFavorites(state);
    case actionTypes.SHOW_ALL_MENTIONS:
      return showAllMentions(state);
    case actionTypes.UPDATE_COMPANY_NAME:
      return updateCompanyName(state, action.companyName);
    case actionTypes.IS_LOADING_OFF:
      return isLoadingOff(state);
    case actionTypes.IS_LOADING_ON:
      return isLoadingOn(state);
    default:
      return initialState;
  }
};

export { reducer, initialState };
