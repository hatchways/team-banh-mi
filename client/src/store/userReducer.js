import * as actionTypes from "./actionTypes";
import cloneDeep from "lodash.clonedeep";

const userInitialState = {
  id: "",
  email: "",
  companyName: [],
  platforms: [],
  favoriteMentions: [],
  onlyFavorites: true,
};

const updateUserData = (state, user) => {
  const clonedState = cloneDeep(state);
  return {
    ...clonedState,
    id: user.id,
    email: user.email,
    companyName: user.companyName,
    platforms: user.platforms,
    favoriteMentions: user.favoriteMentions,
  };
};

const toggleOnlyFavorites = (state) => {
  const clonedState = cloneDeep(state);
  return { ...clonedState, onlyFavorites: !clonedState.onlyFavorites };
};

const addCompanyName = (state, action) => {
  const clonedState = cloneDeep(state);
  clonedState.companyName.push(action.companyName);
  return clonedState;
};

const deleteCompanyName = (state, action) => {
  const clonedState = cloneDeep(state);
  const index = clonedState.companyName.indexOf(action.companyName);
  clonedState.companyName.splice(index, 1);
  return clonedState;
};

const addFavoriteMention = (state, action) => {
  const clonedState = cloneDeep(state);
  clonedState.favoriteMentions.push(action.favoriteMentions);
  return clonedState;
};

const deleteFavoriteMention = (state, action) => {
  const clonedState = cloneDeep(state);
  const index = clonedState.favoriteMentions.indexOf(action.favoriteMentions);
  clonedState.favoriteMentions.splice(index, 1);
  return clonedState;
};

const addPlatform = (state, action) => {
  const clonedState = cloneDeep(state);
  clonedState.platforms.push(action.platform);
  return clonedState;
};

const deletePlatform = (state, action) => {
  const clonedState = cloneDeep(state);
  const index = clonedState.platforms.indexOf(action.platform);
  clonedState.platforms.splice(index, 1);
  return clonedState;
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_DATA:
      return updateUserData(state, action.data);
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
    case actionTypes.TOGGLE_ONLY_FAVORITES:
      return toggleOnlyFavorites(state);
    default:
      return state;
  }
};

export { userReducer, userInitialState };
