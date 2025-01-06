import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DrinkContext = createContext();

export const DrinkProvider = ({ children }) => {
  const [drinks, setDrinks] = useState({
    whiskey: [],
    beer: [],
    cocktail: [],
    wine: [],
    draft: [],
    seltzer: [],
    cider: [],
    import: [],
    feature: [],
  });
  const [drinkDetails, setDrinkDetails] = useState(null);

  // Generic API Call function to fetch data
  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
    }
  };

  // Fetch all Drinks and categorize them
  const fetchDrinks = async () => {
    const allDrinks = await fetchData('http://localhost:5000/api/drinks');
    if (allDrinks) {
      const categorizedDrinks = allDrinks.reduce((acc, drink) => {
        if (acc[drink.category]) {
          acc[drink.category].push(drink);
        }
        return acc;
      }, {
        whiskey: [],
        beer: [],
        cocktail: [],
        wine: [],
        draft: [],
        seltzer: [],
        cider: [],
        import: [],
        feature: [],
      });
      setDrinks(categorizedDrinks);
    }
  };

  // Fetch a single drink by ID
  const fetchDrinkById = async (_id) => {
    const drink = await fetchData(`http://localhost:5000/api/drinks/${_id}`);
    if (drink) {
      setDrinkDetails(drink);
    }
  };

  // Add a new drink
  const addDrink = async (newDrink) => {
    try {
      await axios.post('http://localhost:5000/api/drinks', newDrink, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Update the state with the new drink
      setDrinks((prevDrinks) => {
        const updatedDrinks = { ...prevDrinks };
        if (!updatedDrinks[newDrink.category]) {
          updatedDrinks[newDrink.category] = [];
        }
        updatedDrinks[newDrink.category].push(newDrink);
        return updatedDrinks;
      });
    } catch (error) {
      console.error('Error adding Drink:', error);
    }
  };

  // Remove a drink
  const deleteDrink = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/drinks/${_id}`);
      setDrinks((prevDrinks) => {
        const updatedDrinks = { ...prevDrinks };
        for (const category in updatedDrinks) {
          updatedDrinks[category] = updatedDrinks[category].filter(
            (drink) => drink._id !== _id
          );
        }
        return updatedDrinks;
      });
    } catch (error) {
      console.error('Error deleting drink:', error);
    }
  };

  // Fetch drinks by category
  const fetchDrinksByCategory = async (category) => {
    const categoryDrinks = await fetchData(`http://localhost:5000/api/drinks/category/${category}`);
    return categoryDrinks || [];
  };

  // Fetch drinks on mount
  useEffect(() => {
    fetchDrinks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DrinkContext.Provider
      value={{
        drinks,
        addDrink,
        deleteDrink,
        fetchDrinkById,
        drinkDetails,
        fetchDrinks,
        fetchDrinksByCategory,
      }}
    >
      {children}
    </DrinkContext.Provider>
  );
};

export const useDrink = () => useContext(DrinkContext);