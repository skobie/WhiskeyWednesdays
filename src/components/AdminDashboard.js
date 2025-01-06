import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { useDrink } from '../DrinkContext';  // This import is for drinks, but we’ll need another context for food
import { useFood } from '../FoodContext'; // Import useFood


const AdminDashboard = () => {
  const { addDrink } = useDrink();  // For drink actions
  
  const { addFood } = useFood();
  const [foodData, setFoodData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'appetizer', // Default category
  });
  const [drinkData, setDrinkData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'whiskey', // Default category
  });

  const [showFoodForm, setShowFoodForm] = useState(false);
  const [showDrinkForm, setShowDrinkForm] = useState(false);

  const navigate = useNavigate();

  // Handle form input changes for food data
  const handleFoodChange = (e) => {
    const { name, value } = e.target;
    setFoodData({
      ...foodData,
      [name]: value,
    });
  };

  // Handle form input changes for drink data
  const handleDrinkChange = (e) => {
    const { name, value } = e.target;
    setDrinkData({
      ...drinkData,
      [name]: value,
    });
  };

  // Handle form submit for both drinks and foods
  const handleSubmit = async (e, formType) => {
    e.preventDefault();
    try {
      if (formType === 'food') {
        await addFood(foodData);
        alert('Food added successfully!');
        setFoodData({
          name: '',
          description: '',
          price: '',
          image: '',
          category: 'appetizer',
        });
      } else if (formType === 'drink') {
        await addDrink(drinkData);  // Add drink functionality
        alert('Drink added successfully!');
        setDrinkData({
          name: '',
          description: '',
          price: '',
          image: '',
          category: 'whiskey',
        });
      }
    } catch (error) {
      console.error(`Error adding ${formType}:`, error);
      alert(`There was an error adding the ${formType}. Please try again.`);
    }
  };

  // Toggle form visibility for food
  const toggleFoodForm = () => setShowFoodForm((prev) => {
    if (!prev) setShowDrinkForm(false);
    return !prev;
  });


  // Toggle form visibility for drink
  const toggleDrinkForm = () => setShowDrinkForm((prev) => {
    if (!prev); setShowFoodForm(false);
    return !prev;
  });

  // Check if the user is an admin
  const token = localStorage.getItem('token');
  const isAdmin = token ? JSON.parse(atob(token.split('.')[1])).isAdmin : false;

  if (!isAdmin) {
    navigate('/');
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="form-buttons">
        <button
          onClick={toggleDrinkForm }
          className="form-toggle-btn"
        >
          {showDrinkForm ? 'Hide Drink Form' : 'Add Drink'}
        </button>
        <button
          onClick={toggleFoodForm }
          className="form-toggle-btn"
        >
          {showFoodForm ? 'Hide Food Form' : 'Add Food'}
        </button>
      </div>

      {/* Food Form */}
      {showFoodForm  && (
        <form onSubmit={(e) => handleSubmit(e, 'food')} className="drink-form">
          <h2>Add Food</h2>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={foodData.name}
              onChange={handleFoodChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={foodData.description}
              onChange={handleFoodChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="string"
              name="price"
              value={foodData.price}
              onChange={handleFoodChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="image"
              value={foodData.image}
              onChange={handleFoodChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={foodData.category}
              onChange={handleFoodChange}
              required
            >
              <option value="appetizer">Appetizers</option>
              <option value="salad">Salads</option>
              <option value="quesadilla">Quesadillas</option>
              <option value="wing">Wings</option>
              <option value="side">Sides</option>
              <option value="entree">Entrees</option>
              <option value="pizza">Pizzas</option>
              <option value="kiddo">Kids</option>
              <option value="beverage">Beverages</option>
            </select>
          </div>
          <button type="submit">Add Food</button>
        </form>
      )}

      {/* Drink Form */}
      {showDrinkForm  && (
        <form onSubmit={(e) => handleSubmit(e, 'drink')} className="drink-form">
          <h2>Add Drink</h2>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={drinkData.name}
              onChange={handleDrinkChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={drinkData.description}
              onChange={handleDrinkChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="string"
              name="price"
              value={drinkData.price}
              onChange={handleDrinkChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="image"
              value={drinkData.image}
              onChange={handleDrinkChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={drinkData.category}
              onChange={handleDrinkChange}
              required
            >
              <option value="whiskey">Whiskey</option>
              <option value="beer">Beer</option>
              <option value="cocktail">Cocktail</option>
              <option value="wine">Wine</option>
              <option value="draft">Draft</option>
              <option value="seltzer">Seltzer</option>
              <option value="cider">Cider</option>
              <option value="import">Import</option>
              <option value="feature">Feature</option>
            </select>
          </div>
          <button type="submit">Add Drink</button>
        </form>
      )}
    </div>
  );
};

export default AdminDashboard;