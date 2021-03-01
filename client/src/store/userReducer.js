import * as actionTypes from "./actionTypes";

const initialState = {
  email: null,
  companyName: null,
  platforms: null,
  favoriteMentions: null,
};

const updateUserData = ({
  email,
  companyName,
  platforms,
  favoriteMentions,
}) => {
  return { email, companyName, platforms, favoriteMentions };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_DATA:
      return updateUserData(action.user);
    default:
      return initialState;
  }
};

export { reducer, initialState };
