import * as actionTypes from "./actionTypes";

const userInitialState = {
  email: "",
  companyName: [],
  platforms: [],
  favoriteMentions: [],
};

const updateUserData = (user) => {
  return {
    email: user.email,
    companyName: user.companyName,
    platforms: user.platforms,
    favoriteMentions: user.favoriteMentions,
  };
};

const addCompanyName = (state, action) => {
  state.companyName.push(action.companyName);
  return state;
};

const deleteCompanyName = (state, action) => {
  const index = state.companyName.indexOf(action.companyName);
  state.companyName.splice(index, 1);
  return state;
};

const addFavoriteMention = (state, action) => {
  state.favoriteMentions.push(action.favoriteMentions);
  return state;
};

const deleteFavoriteMention = (state, action) => {
  const index = state.favoriteMentions.indexOf(action.favoriteMentions);
  state.favoriteMentions.splice(index, 1);
  return state;
};

const addPlatform = (state, action) => {
  state.platforms.push(action.platform);
  return state;
};

const deletePlatform = (state, action) => {
  const index = state.platforms.indexOf(action.platform);
  state.platforms.splice(index, 1);
  return state;
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_DATA:
      return updateUserData(action.user);
    case actionTypes.ADD_COMPANY_NAME:
      return addCompanyName(state, action);
    case actionTypes.DELETE_COMPANY_NAME:
      return deleteCompanyName(state, action);
    case actionTypes.ADD_FAVORITE_MENTION:
      return addFavoriteMention(state, action);
    case actionTypes.DELETE_FAVORITE_MENTION:
      return deleteFavoriteMention(state, action);
    case actionTypes.ADD_PLATFORM:
      return addPlatform(state, action);
    case actionTypes.DELETE_PLATFORM:
      return deletePlatform(state, action);
    default:
      return state;
  }
};

export { userReducer, userInitialState };
