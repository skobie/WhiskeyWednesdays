import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState({
    appetizer: [],
    salad: [],
    quesadilla: [],
    wings: [],
    side: [],
    entree: [],
    pizza: [],
    kiddo: [],
    beverage: [],
  });
  const [foodDetails, setFoodDetails] = useState(null);

  // Generic API Call function to fetch data
  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
    }
  };

  // Fetch all Foods and categorize them
  const fetchFoods = async () => {
    const allFoods = await fetchData('http://localhost:5000/api/foods');
    if (allFoods) {
      const categorizedFoods = allFoods.reduce((acc, food) => {
        if (acc[food.category]) {
          acc[food.category].push(food);
        }
        return acc;
      }, {
        appetizer: [],
        salad: [],
        quesadilla: [],
        wings: [],
        side: [],
        entree: [],
        pizza: [],
        kiddo: [],
        beverage: [],
      });
      setFoods(categorizedFoods);
    }
  };

  // Fetch a single Food by ID
  const fetchFoodById = async (_id) => {
    const food = await fetchData(`http://localhost:5000/api/foods/${_id}`);
    if (food) {
      setFoodDetails(food);
    }
  };

  // Add a new Food
  const addFood = async (newFood) => {
    try {
      await axios.post('http://localhost:5000/api/foods', newFood, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Update the state with the new Food
      setFoods((prevFoods) => {
        const updatedFoods = { ...prevFoods };
        if (!updatedFoods[newFood.category]) {
          updatedFoods[newFood.category] = [];
        }
        updatedFoods[newFood.category].push(newFood);
        return updatedFoods;
      });
    } catch (error) {
      console.error('Error adding Food:', error);
    }
  };

  // Remove a Food
  const deleteFood = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/foods/${_id}`);
      setFoods((prevFoods) => {
        const updatedFoods = { ...prevFoods };
        for (const category in updatedFoods) {
          updatedFoods[category] = updatedFoods[category].filter(
            (food) => food._id !== _id
          );
        }
        return updatedFoods;
      });
    } catch (error) {
      console.error('Error deleting Food:', error);
    }
  };

  // Fetch Foods by category
  const fetchFoodsByCategory = async (category) => {
    const categoryFoods = await fetchData(`http://localhost:5000/api/foods/category/${category}`);
    return categoryFoods || [];
  };

  // Fetch Foods on mount
  useEffect(() => {
    fetchFoods();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FoodContext.Provider
      value={{
        foods,
        addFood,
        deleteFood,
        fetchFoodById,
        foodDetails,
        fetchFoods,
        fetchFoodsByCategory,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => useContext(FoodContext);