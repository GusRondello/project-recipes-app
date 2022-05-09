const fetchDrinkById = async (id) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(URL);
  const { drinks } = await response.json();
  return drinks;
};

export default fetchDrinkById;
