/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import './App.css';
import { google_maps } from './LoadGoogleMap'
import  { foudPlaces } from './FoundPlace'
import ListPlace from './ListPlace'
import Map from './Map'
import Header from './Header'


class App extends Component {
  state = {
    query: ''
  }
  
  //carrega o mapa do loadGooglemap.js
  //adicionas as markers do foundPlace.js
  componentDidMount(){
    let googleMaps = google_maps();
    let places = foudPlaces();
    Promise.all([ googleMaps, places ])
    .then(values => {
      let google = values[0];
      this.location = values[1].response.venues;
      this.google = google;
      this.infowindow = new google.maps.InfoWindow();
      this.markers= [];

      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        scrollwheel: true,
        center: { lat: this.location[0].location.lat, lng: this.location[0].location.lng }
      });

      this.location.forEach(venue => {
        let marker = new google.maps.Marker({
          position: { lat: venue.location.lat, lng: venue.location.lng },
          map: this.map,
          venue: venue,
          id: venue.id,
          name: venue.name
        });

        marker.addListener('click', () => {
          if (marker.getAnimation() !== null) { marker.setAnimation(null); }
				  else { marker.setAnimation(google.maps.Animation.BOUNCE); }
				  setTimeout(() => { marker.setAnimation(null) }, 1500);
			  });
        google.maps.event.addListener(marker, 'click', () => {
  			   this.infowindow.setContent(marker.name +'<br/>'+ marker.venue.location.address);
				   this.map.setCenter(marker.position);
           this.infowindow.open(this.map, marker);
           
				   
			  });
        this.markers.push(marker); 
      });

      this.setState({ locationFound: this.location })
    })
  }

  //traz as informação do local clicado no menu 
  ItemClick = (venue) =>{
    let marker = this.markers.filter((m) => m.id === venue.id)[0];
    this.infowindow.setContent(marker.name +'<br/>'+ marker.venue.location.address);
    this.map.setCenter(marker.position);
    this.infowindow.open(this.map, marker);
    this.map.panBy(0, -125);
  }
  //faz a pequisa dos locais
  locationFilter = (query) => {
    let f = this.location.filter((venue) => venue.name.toLowerCase().includes(query.toLowerCase()))
    this.markers.forEach(marker => {
      marker.name.toLowerCase().includes(query.toLowerCase()) == true ? 
      marker.setVisible(true) :
      marker.setVisible(false);
    });
    this.setState({ locationFound: f, query })
    
  }



  render(){
    return (
      <div className="App">
        <Header/>
        <Map/>
        <ListPlace locationFilter={this.locationFilter} locationFound={this.state.locationFound} ItemClick={this.ItemClick} li />
        
       
      </div>
    );
  }
 
}

export default App;
