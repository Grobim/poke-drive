import { default as React, Component, PropTypes } from 'react';
import {
  GoogleMapLoader,
  GoogleMap,
  Marker
} from 'react-google-maps';
import classes from './Map.scss';

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 *
 * We use React 0.14 stateless function components here.
 * https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 */
export class SimpleMap extends Component {
  static propTypes = {
    markers: PropTypes.array,
    containerElementProps: PropTypes.object,
    onMapClick: PropTypes.func,
    onMarkerRightclick: PropTypes.func
  };

  render () {
    const {
      containerElementProps,
      onMapClick,
      onMarkerRightclick,
      markers
    } = this.props;

    return (
      <section style={{ height: '100%' }}>
        <GoogleMapLoader
          containerElement={
            <div
              {...containerElementProps}
              className={classes.map}
            />
          }
          googleMapElement={
            <GoogleMap
              defaultZoom={13}
              defaultCenter={{ lat: 48.858132, lng: 2.343359 }}
              onClick={onMapClick}
            >
              {markers.map((marker) => (
                <Marker
                  {...marker}
                  onRightclick={() => onMarkerRightclick(marker.key)}
                />
              ))}
            </GoogleMap>
          }
        />
      </section>
    );
  }
}

export default SimpleMap;
