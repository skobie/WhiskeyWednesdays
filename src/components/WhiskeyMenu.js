import React, { useState, useEffect } from 'react';
import './WhiskeyMenu.css';
import { useDrink } from '../DrinkContext';

const WhiskeyMenu = ({ userRole }) => {
  const {fetchDrinksByCategory, deleteDrink } = useDrink();
  const [expandedDrinkId, setExpandedDrinkId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use a useState to hold the drinks for each category
  const [categoryDrinks, setCategoryDrinks] = useState({
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

  // Fetch drinks by category on mount
  useEffect(() => {
    const categories = ['whiskey', 'beer', 'cocktail', 'wine', 'draft', 'seltzer', 'cider', 'import', 'feature'];

    const fetchAllDrinks = async () => {
      setLoading(true);
      const fetchedDrinks = {};

      for (const category of categories) {
        let drinksByCategory = await fetchDrinksByCategory(category);

        drinksByCategory = drinksByCategory.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

        fetchedDrinks[category] = drinksByCategory;
      }
      setCategoryDrinks(fetchedDrinks);
      setLoading(false);
    };

    fetchAllDrinks();
  }, [fetchDrinksByCategory]);

  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  const toggleExpand = (_id) => {
    setExpandedDrinkId((prevId) => (prevId === _id ? null : _id));
  };
  
  const handleDelete = async (drinkId, category) => {
    // Confirm before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this drink?");
    
    if (confirmDelete) {
      const success = await deleteDrink(drinkId);
      if (success) {
        setCategoryDrinks((prev) => ({
          ...prev,
          [category]: prev[category].filter((drink) => drink._id !== drinkId),
        }));
      }
    } else {
      console.log("Delete action cancelled.");
    }
  };

  return (
    <div className="whiskey-menu">
      <div className="category-container">
      {/* Render all categories */}
      {Object.keys(categoryDrinks).map((category) => (
        <div key={category} className="category-section">
          <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Menu</h2>
          <ul className="whiskey-list">
            {/* Ensure that categoryDrinks[category] is an array before calling map */}
            {categoryDrinks[category]?.length > 0 ? (
              categoryDrinks[category].map((drink) => (
                <li
                  key={drink._id}
                  className={`whiskey-item ${expandedDrinkId === drink._id ? 'expanded' : ''}`}
                  onClick={() => toggleExpand(drink._id)}
                >
                  <h3>{drink.name}</h3>
                  {expandedDrinkId === drink._id && (
                    <div className={`whiskey-details ${expandedDrinkId === drink._id ? 'open' : ''}`}>
                      <p>{drink.description}</p>
                      <span className="whiskey-price">${drink.price}</span>
                      <img src={drink.image} alt={drink.name} className="whiskey-image" />
                      {token && isAdmin &&(
                        <button 
                        className="delete-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(drink._id, category);
                        }}
                        >Delete</button>
                      )}
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p>No drinks available in this category.</p>
            )}
          </ul>
        </div>
      ))}
      </div>
    </div>
  );
};

export default WhiskeyMenu;