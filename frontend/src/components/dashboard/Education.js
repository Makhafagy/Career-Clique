import React from 'react';
import PropTypes from 'prop-types';

const Education = ({ collegeName, imageUrl, onMouseEnter, onMouseLeave }) => {
  return (
    <div className="education-entry" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <img className="college-logo" src={imageUrl} alt={`${collegeName} Logo`} />
      <div className="college-info">
        <h3>{collegeName}</h3>
        {/* Additional information */}
      </div>
    </div>
  );
};

Education.propTypes = {
  collegeName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default Education;
