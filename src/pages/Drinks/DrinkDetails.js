import React from 'react';
import PropTypes from 'prop-types';

function DrinkDetails() {
  return (
    <div>DrinkDetails</div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkDetails;
