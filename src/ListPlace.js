/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import icone from "./icone-menu2.svg";

class ListPlace extends Component {
    

  render(){
    const { query, locationFilter, locationFound, ItemClick }  = this.props
    return (
      <div id='listplace'>
          <input type='checkbox' id='listplace-chec'></input>
          <label id='listplace-label' for='listplace-chec'><img id='listplace-img' src={icone}></img></label>
              <nav id='listplace-nav'>
              <input className='listplace-button' placeholder='Filter Location' value ={query} onChange={(e)=> { locationFilter(e.target.value)}}/>
              {
              locationFound && locationFound.length > 0 && locationFound.map((loc, i) => (
                
              <ul key={i} id='listplace-ul' onClick={() => {ItemClick(loc)}}>
                  <li id='listplace-li'><a id='listplace-a' href='#'>{loc.name}</a></li> 
              </ul>

              ))
              }

              </nav>
      </div>
    );
  }
}
 


export default ListPlace;
