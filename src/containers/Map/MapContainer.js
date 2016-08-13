import {
  default as React,
  Component,
  PropTypes
} from 'react';
import { connect } from 'react-redux';

import SimpleMap from 'components/Map';
import { actions as markersActions } from 'routes/Map/modules/markers';
import { actions as userLocationActions } from 'reducers/userLocation';

const mapStateToProps = ({
  markers,
  userLocation
}) => ({
  markers: markers.data,
  userLocation: {
    position: {
      lat: userLocation.latitude,
      lng: userLocation.longitude
    },
    accuracy: userLocation.accuracy
  }
});

export class MapContainer extends Component {
  static propTypes = {
    markers: PropTypes.array.isRequired,
    addMarker: PropTypes.func.isRequired,
    deleteMarker: PropTypes.func.isRequired,
    syncMarkers: PropTypes.func.isRequired,
    syncLocation: PropTypes.func.isRequired,
    unsyncLocation: PropTypes.func.isRequired,
    userLocation: PropTypes.object.isRequired
  };

  componentDidMount () {
    const {
      syncMarkers,
      syncLocation
    } = this.props;

    syncMarkers();
    syncLocation();
  }

  componentWillUnmount () {
    const {
      unsyncLocation
    } = this.props;

    unsyncLocation();
  }

  get markers () {
    const {
      markers
    } = this.props;

    return markers.map((marker) => ({
      ...marker,
      defaultAnimation: 2
    }));
  }

  handleMapClick = this.handleMapClick.bind(this);
  handleMapClick (event) {
    const { addMarker } = this.props;

    addMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  }

  handleMarkerRightclick = this.handleMarkerRightclick.bind(this);
  handleMarkerRightclick (key, event) {
    const { deleteMarker } = this.props;

    deleteMarker(key);
  }

  render () {
    const {
      userLocation
    } = this.props;

    return (
      <SimpleMap
        positionLocation={userLocation}
        markers={this.markers}
        onMapClick={this.handleMapClick}
        onMarkerRightclick={this.handleMarkerRightclick}
      />
    );
  }
}

export default connect(mapStateToProps, {
  ...markersActions,
  ...userLocationActions
})(MapContainer);
