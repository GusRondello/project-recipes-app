import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DrinkDetails() {
  const [drink, setDrink] = useState([]);
  const { id } = useParams();
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(
    () => {
      const fetchDrinkById = async () => {
        const response = await fetch(URL);
        const { drinks } = await response.json();
        setDrink(drinks);
      };
      fetchDrinkById();
    }, [URL],
  );

  return (
    <section>
      <img src="" alt="" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">Titulo</h2>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <p data-testid="recipe-category">Lorem Ipsum</p>
      {/* <li data-testid={ `${index}-ingredient-name-and-measure` } /> */}
      <p data-testid="instructions">Lorem Ipsum</p>
      {/* <div data-testid={ `${index}-recomendation-card` } /> */}
      <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
    </section>
  );
}

export default DrinkDetails;
