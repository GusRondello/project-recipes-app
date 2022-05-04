import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import DrinkDetails from './pages/Drinks/DrinkDetails';
import DrinkInProgress from './pages/Drinks/DrinkInProgress';
import Drinks from './pages/Drinks/Drinks';
import Explore from './pages/Explore/Explore';
import ExploreDrinkIngredients from './pages/Explore/ExploreDrinkIngredients';
import ExploreDrinks from './pages/Explore/ExploreDrinks';
import ExploreFoodIngredients from './pages/Explore/ExploreFoodIngredients';
import ExploreFoodNationalities from './pages/Explore/ExploreFoodNationalities';
import ExploreFoods from './pages/Explore/ExploreFoods';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodDetails from './pages/Foods/FoodDetails';
import FoodInProgress from './pages/Foods/FoodInProgress';
import Foods from './pages/Foods/Foods';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

const Routes = () => (
  <Switch>
    <Route component={ Login } path="/" exact />
    <Route component={ Foods } path="/foods" exact />
    <Route component={ Drinks } path="/drinks" exact />
    <Route component={ FoodDetails } path="/foods/:id" exact />
    <Route
      exact
      path="/drinks/:id"
      render={ (props) => <DrinkDetails { ...props } /> }
    />
    <Route component={ FoodInProgress } path="/foods/:id/in-progress" exact />
    <Route component={ DrinkInProgress } path="/drinks/:id/in-progress" />
    <Route component={ Explore } path="/explore" exact />
    <Route component={ ExploreFoods } path="/explore/foods" exact />
    <Route component={ ExploreDrinks } path="/explore/drinks" exact />
    <Route component={ ExploreFoodIngredients } path="/explore/foods/ingredients" exact />
    <Route
      component={ ExploreDrinkIngredients }
      path="/explore/drinks/ingredients"
      exact
    />
    <Route
      component={ ExploreFoodNationalities }
      path="/explore/foods/nationalities"
      exact
    />
    <Route component={ Profile } path="/profile" exact />
    <Route component={ DoneRecipes } path="/done-recipes" exact />
    <Route component={ FavoriteRecipes } path="/favorite-recipes" exact />
    <Route component={ NotFound } path="/*" />
  </Switch>
);

export default Routes;
