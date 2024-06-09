import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { useCookies } from 'react-cookie';

const ListHeader = ({ getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['ListName']);
  const [showModal, setShowModal] = useState(false);


  const signOut = () => {
    removeCookie('Email');
    removeCookie('AuthToken');
    window.location.reload();
  };

  return (
    <div className='list-header'>
      <h2>🏝️Holiday Tick List</h2>
      <div className='button-container'>
        <button className='create' onClick={() => setShowModal(true)}>ADD NEW</button>
        <button className='signout' onClick={signOut}>SIGN OUT</button>
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />}
    </div>
  );
};

export default ListHeader;
