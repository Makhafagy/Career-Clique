import React from 'react';

const ToggleButtons = ({ onToggle, buttonText }) => {
  return (
    <div className='button-container'>
      <button onClick={onToggle} className='login-signup-button'>
        {buttonText}
      </button>
    </div>
  );
};

export default ToggleButtons;
