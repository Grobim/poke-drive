import firebase from 'firebase';

let markersRef;

export const ADDED_MARKER = 'ADDED_MARKER';
export const DELETED_MARKER = 'DELETED_MARKER';
export const FETCH_MARKERS = 'FETCH_MARKERS';
export const SYNCED_MARKERS = 'SYNCED_MARKERS';

export const LOADING_STATE = 'LOADING';
export const LOADED_STATE = 'LOADED';

const addedMarker = (key, position, others) => ({
  type: ADDED_MARKER,
  payload: {
    key,
    position,
    ...others
  }
});

const deletedMarker = (key) => ({
  type: DELETED_MARKER,
  payload: key
});

const fetchMarkers = () => ({
  type: FETCH_MARKERS
});

const syncedMarkers = () => ({
  type: SYNCED_MARKERS
});

export const syncMarkers = () => {
  if (!markersRef) {
    markersRef = firebase.database().ref('/markers');
  }
  return (dispatch, getState) => {
    if (!getState().markers.state) {
      dispatch(fetchMarkers());

      markersRef.on('child_added', (snap) => {
        const markerData = snap.val();
        dispatch(addedMarker(snap.key, markerData.position, markerData));
      });

      markersRef.once('value', (snap) => {
        dispatch(syncedMarkers());
      });

      markersRef.on('child_removed', (snap) => {
        dispatch(deletedMarker(snap.key));
      });
    }
  };
};

export const addMarker = (position, data) => {
  return (dispatch, getState) => {
    markersRef.push({
      position,
      ...data
    });
  };
};

export const deleteMarker = (key) => {
  return () => {
    markersRef.child(key).remove();
  };
};

export const actions = {
  addMarker,
  deleteMarker,
  syncMarkers
};

const reducers = {
  [ADDED_MARKER]: (state, { payload }) => ({
    ...state,
    data: [...state.data, payload]
  }),
  [DELETED_MARKER]: (state, { payload }) => ({
    ...state,
    data: state.data.filter(({ key }) => key !== payload)
  }),
  [FETCH_MARKERS]: (state) => ({
    ...state,
    state: LOADING_STATE
  }),
  [SYNCED_MARKERS]: (state) => ({
    ...state,
    state: LOADED_STATE
  })
};

const initialState = {
  data: []
};

export default function markersReducer (state = initialState, action) {
  const handler = reducers[action.type];

  return handler ? handler(state, action) : state;
}
