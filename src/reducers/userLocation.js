export const UPDATED_LOCATION = 'UPDATED_LOCATION';

let checkGeolocInterval;

const geolocation = (
  navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure('Your browser doesn\'t support geolocation');
    }
  }
);

const updatedLocation = location => ({
  type: UPDATED_LOCATION,
  payload: {
    ...location
  }
});

export const syncLocation = () => {
  return dispatch => {
    checkGeolocInterval = setInterval(() => {
      geolocation.getCurrentPosition(position => {
        const {
          accuracy,
          latitude,
          longitude
        } = position.coords;

        dispatch(updatedLocation({
          accuracy,
          latitude,
          longitude
        }));
      });
    }, 1000);
  };
};

export const unsyncLocation = () => {
  return () => {
    clearInterval(checkGeolocInterval);
  };
};

export const actions = {
  syncLocation,
  unsyncLocation
};

const reducers = {
  [UPDATED_LOCATION]: (state, { payload }) => ({
    ...state,
    ...payload
  })
};

const initialState = {};

export default function userReducer (state = initialState, action) {
  const handler = reducers[action.type];

  return handler ? handler(state, action) : state;
}
