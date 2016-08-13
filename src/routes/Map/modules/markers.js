import firebase from 'firebase';
import { find } from 'lodash';

let markersRef;

export const ADDED_MARKER = 'ADDED_MARKER';
export const DELETED_MARKER = 'DELETED_MARKER';
export const MOVED_MARKER = 'MOVED_MARKER';
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

const deletedMarker = key => ({
  type: DELETED_MARKER,
  payload: key
});

const movedMarker = ({ key, position }) => ({
  type: MOVED_MARKER,
  payload: {
    key,
    position
  }
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

      markersRef.on('child_added', snap => {
        const markerData = snap.val();
        dispatch(addedMarker(snap.key, markerData.position, markerData));
        dispatch(syncMarker(snap.key));
      });

      markersRef.once('value', snap => {
        dispatch(syncedMarkers());
      });

      markersRef.on('child_removed', snap => {
        dispatch(deletedMarker(snap.key));
        dispatch(unsyncMarker(snap.key));
      });
    }
  };
};

const syncMarker = markerKey => {
  return (dispatch, getState) => {
    const markerRef = markersRef.child(markerKey);

    markerRef.child('position').on('child_changed', snap => {
      const markerPosition = find(getState().markers.data, marker => marker.key === markerKey).position;
      dispatch(movedMarker({
        key: markerKey,
        position: {
          ...markerPosition,
          [snap.key]: snap.val()
        }
      }));
    });
  };
};

const unsyncMarker = markerKey => {
  return () => {
    markersRef.child(markerKey).child('position').off();
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

export const deleteMarker = key => {
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
  [FETCH_MARKERS]: state => ({
    ...state,
    state: LOADING_STATE
  }),
  [SYNCED_MARKERS]: state => ({
    ...state,
    state: LOADED_STATE
  }),
  [MOVED_MARKER]: (state, { payload }) => ({
    ...state,
    data: state.data.map(marker => {
      if (marker.key === payload.key) {
        return {
          ...marker,
          position: payload.position
        };
      }
      return marker;
    })
  })
};

const initialState = {
  data: []
};

export default function markersReducer (state = initialState, action) {
  const handler = reducers[action.type];

  return handler ? handler(state, action) : state;
}
