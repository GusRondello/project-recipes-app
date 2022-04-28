import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function FoodDetails() {
  const [recipe, setRecipe] = useState([]);
  const { id } = useParams();
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(
    () => {
      const fetchRecipeById = async () => {
        const response = await fetch(URL);
        const { meals } = await response.json();
        setRecipe(meals);
      };
      fetchRecipeById();
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
      <iframe title="Video" width="853" height="480" data-testid="video" src="" />
      {/* <div data-testid={ `${index}-recomendation-card` } /> */}
      <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
    </section>
  );
}

export default FoodDetails;
