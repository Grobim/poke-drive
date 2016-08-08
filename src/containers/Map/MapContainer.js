import {
  default as React,
  Component,
  PropTypes
} from 'react';
import { connect } from 'react-redux';

import SimpleMap from 'components/Map';
import { actions as markersActions } from 'routes/Map/modules/markers';

const mapStateToProps = ({ markers }) => ({ markers: markers.data });

export class MapContainer extends Component {
  static propTypes = {
    markers: PropTypes.array.isRequired,
    addMarker: PropTypes.func.isRequired,
    deleteMarker: PropTypes.func.isRequired,
    syncMarkers: PropTypes.func.isRequired
  };

  componentDidMount () {
    const {
      syncMarkers
    } = this.props;

    syncMarkers();
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
      markers
    } = this.props;

    return (
      <SimpleMap
        markers={this.markers}
        onMapClick={this.handleMapClick}
        onMarkerRightclick={this.handleMarkerRightclick}
      />
    );
  }
}

export default connect(mapStateToProps, markersActions)(MapContainer);
