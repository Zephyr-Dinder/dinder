import React, { Component, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import logo from '../assets/logo.png';
import { getFav, deleteFav } from '../action/action';

const Sidebar = props => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const username = useSelector(state => state.user.data);

  useEffect(() => {
    dispatch(getFav(username))
  }, []);

  const favs = useSelector(state => state.favs.data);

  return <div>
    <nav>
      <div className='nav-container'>
        <div
          className='image-frame'
          onClick={() => {
            // secret();
            // pressPlay();
          }}
        >
          <img className='logo' src={logo} />
        </div>
        <h1>Dinder</h1>
        <button
          className='history'
          onClick={() => setOpen(true)}
        >
          <i className='fa fa-history' />
        </button>
      </div>
    </nav>
    {
      open && <div className='popup'>
        <div className='popup-header'>
          <h2>Favorites:</h2>
          <button className='back' onClick={() => setOpen(false)}>
            <i className='fa fa-arrow-left' />
          </button>
        </div>
        <ul>{
          favs ? favs.map(fav => {
            return <li key={fav.yelpid}>
              <img src={fav.imgurl} />
              <div className='fav-details'>
                <p>{fav.name}</p>
                <p>{fav.address}</p>
              </div>
              <button className='next' onClick={() => dispatch(deleteFav(username, fav.yelpid))}>
                <i className='fa fa-times' />
              </button>
            </li>;
          }) : undefined
        }</ul>
      </div>
    }
  </div>;
};

export default Sidebar;
