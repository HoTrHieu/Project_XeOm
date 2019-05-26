import React, { Component } from 'react';

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");


  let MapWithADirectionsRenderer = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDeHi_HvoFXqnJT4eCBrlDnOLktJLMjU0s&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
      
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
      componentDidUpdate(){ 
        let DirectionsService = new window.google.maps.DirectionsService();
  
        DirectionsService.route({
          origin: new window.google.maps.LatLng(this.props.ltDon, this.props.lgDon),
          destination: new window.google.maps.LatLng(this.props.ltDen, this.props.lgDen),
          travelMode: window.google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      }
    })
  )(props =>
    <GoogleMap
      defaultZoom={14}
      defaultCenter={new window.google.maps.LatLng(10.7735994,106.6944173)}
    >
      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  );
  



  class MyMap extends Component {
    
    render() {
      return (
        <MapWithADirectionsRenderer 
          ltDon={this.props.latDon} lgDon={this.props.lngDon} ltDen={this.props.latDen} lgDen={this.props.lngDen}
        ></MapWithADirectionsRenderer>
      );
    }
  }

  export default MyMap;