import React from 'react'

const Hamburger = ({open,openModal}) => {
    return (
      <button id='menu-btn' onClick={openModal} className={`hamburger ${open&&'open'}`} type='button'>
          <span className='hamburger-top'></span>
          <span className='hamburger-middle'></span>
          <span className='hamburger-bottom'></span>
      </button>
    )
  }

export default Hamburger