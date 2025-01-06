import React, { useState, useEffect } from 'react';
import './FoodMenu.css';
import { useFood } from '../FoodContext';  // Import useFood from FoodContext

const FoodMenu = ({ userRole }) => {
  const { fetchFoodsByCategory, deleteFood } = useFood();
  const [loading, setLoading] = useState(true);

  // State to hold Foods for each category
  const [categoryFoods, setCategoryFoods] = useState({
    appetizer: [],
    salad: [],
    quesadilla: [],
    wing: [],
    side: [],
    entree: [],
    pizza: [],
    kiddo: [],
    beverage: [],
  });

  // Fetch foods by category on component mount
  useEffect(() => {
    const categories = [
      'appetizer',
      'entree',
      'salad',
      'wing',
      'pizza',
      'quesadilla',
      'side',
      'kiddo',
      'beverage',
    ];

    const fetchAllFoods = async () => {
      setLoading(true);
      const fetchedFoods = {};

      for (const category of categories) {
        const foodsByCategory = await fetchFoodsByCategory(category);
        fetchedFoods[category] = foodsByCategory;
      }

      setCategoryFoods(fetchedFoods);
      setLoading(false);
    };

    fetchAllFoods();
  }, [fetchFoodsByCategory]);

   // Check if user is signed in and their role
   const token = localStorage.getItem('token');
   const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Display loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const handleDelete = async (foodId, category) => {
    // Confirm before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    
    if (confirmDelete) {
      const success = await deleteFood(foodId);
      if (success) {
        setCategoryFoods((prev) => ({
          ...prev,
          [category]: prev[category].filter((food) => food._id !== foodId),
        }));
      }
    } else {
      console.log("Delete action cancelled.");
    }
  };

  return (
    <div className="food-menu">
      <div className="flyer-container">
        {/* Display food categories in a grid */}
        <div className="food-category-grid">
          {Object.keys(categoryFoods).map((category) => (
            <div key={category} className="foodcategory-section">
              <h2 className="foodcategory-header">
                {category.charAt(0).toUpperCase() + category.slice(1) + "s"} 
              </h2>
              <ul className="food-list">
                {categoryFoods[category]?.length > 0 ? (
                  categoryFoods[category].map((food) => (
                    <li key={food._id} className="food-item">
                      <div className="food-card">
                        <img src={food.image} alt={food.name} className="food-image" />
                        <div className="food-info">
                          <h3 className="food-name">{food.name}</h3>
                          <p className="food-description">{food.description}</p>
                          <span className="food-price">${food.price}</span>
                          {token && isAdmin && (
                        <button 
                        className="delete-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(food._id, category);
                        }}
                        >Delete</button>
                      )}
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="no-foods">No foods available in this category.</p>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FoodMenu;