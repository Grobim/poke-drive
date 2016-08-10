import firebase from 'firebase';
import { push } from 'react-router-redux';

export const LOGGED_USER = 'LOGGED_USER';
export const LOGGING_USER = 'LOGGING_USER';
export const SIGNED_OUT = 'SIGNED_OUT';

export const LOGGING_STATE = 'LOGGING';
export const LOGGED_STATE = 'LOGGED';

const getGoogleProvider = () => new firebase.auth.GoogleAuthProvider();

const getUsersRef = () => firebase.database().ref('/users');

const loggingUser = () => ({
  type: LOGGING_USER
});

const loggedUser = (userData) => ({
  type: LOGGED_USER,
  payload: userData
});

const signedOut = () => ({
  type: SIGNED_OUT
});

export const logUserWithGoogle = () => {
  return (dispatch) => {
    dispatch(loggingUser());

    firebase.auth().signInWithPopup(getGoogleProvider())
    .then((result) => {
      const {
        displayName,
        photoURL,
        email,
        uid
      } = result.user;

      return {
        displayName,
        photoURL,
        email,
        uid
      };
    })
    .then((userData) => {
      const userRef = getUsersRef().child(userData.uid);

      userRef.once('value', (snap) => {
        if (snap.exists()) {
          dispatch(loggedUser({
            ...snap.val(),
            uid: snap.key
          }));
        } else {
          userRef.set({
            ...userData,
            uid: null
          }).then(() => {
            dispatch(loggedUser({
              ...userData,
              uid: snap.key
            }));
            dispatch(push('/profile'));
          });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }
};

export const signOut = () => {
  return (dispatch) => {
    firebase.auth().signOut().then(() => {
      dispatch(signedOut());
    })
    .catch((error) => {
      console.log(error);
    });
  }
};

export const actions = {
  logUserWithGoogle,
  signOut
};

const reducers = {
  [LOGGED_USER]: (state, { payload }) => ({
    ...state,
    ...payload,
    state: LOGGED_STATE
  }),
  [LOGGING_USER]: (state) => ({
    ...state,
    state: LOGGING_STATE
  }),
  [SIGNED_OUT]: (state) => initialState
};

const initialState = {
  state: SIGNED_OUT
};

export default function markersReducer (state = initialState, action) {
  const handler = reducers[action.type];

  return handler ? handler(state, action) : state;
}
