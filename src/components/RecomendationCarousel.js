import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../styles/RecomendationCarousel.css';

function RecomendationCarousel({ recomendations }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  const recomendationCards = recomendations.map((recomendation, index) => (
    <div
      className="recomendation_card"
      key={ recomendation?.idDrink || recomendation.idMeal }
      data-testid={ `${index}-recomendation-card` }
    >
      <div className="img_container">
        <img
          className="image-recomendation"
          src={ recomendation?.strDrinkThumb || recomendation.strMealThumb }
          alt={ recomendation?.strDrink || recomendation.strMeal }
        />
      </div>
      <h3
        data-testid={ `${index}-recomendation-title` }
      >
        { recomendation?.strDrink || recomendation.strMeal }

      </h3>
      <p>{ recomendation?.strAlcoholic || recomendation.strCategory }</p>
    </div>
  ));

  return (
    <div className="carousel__container">
      <Slider { ...settings }>
        {
          recomendationCards
        }
      </Slider>
    </div>
  );
}

RecomendationCarousel.propTypes = {
  recomendations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecomendationCarousel;
