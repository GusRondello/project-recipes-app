export function getIngredients(recipe) {
  const entries = Object.entries(recipe);
  const justIngredients = entries
    .filter((ingredient) => ingredient[0].match(/strIngredient/gmi));
  const ingredients = justIngredients
    .filter((ingredient) => ingredient[1] !== null && ingredient[1] !== '');
  const allIngredients = ingredients.map((ingredient) => ingredient[1]);
  return allIngredients;
}

export function getMeasure(recipe) {
  const entries = Object.entries(recipe);
  const justMeasure = entries
    .filter((measure) => measure[0].match(/strMeasure/gmi));
  const measures = justMeasure
    .filter((measure) => measure[1] !== null && measure[1] !== '');
  const allMeasures = measures.map((measure) => measure[1]);
  return allMeasures;
}

export function getIngredientsAndMeasures(recipe) {
  const measure = getMeasure(recipe);
  const ingredients = getIngredients(recipe);
  const ingredientsAndMeasures = [];

  ingredients.forEach((ingredient, index) => {
    const instruction = { ingredient, measure: measure[index] };
    ingredientsAndMeasures.push(instruction);
  });
  return ingredientsAndMeasures;
}
