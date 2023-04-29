import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const InventoryAdded = () => {
    useEffect(() => {
        AOS.init();
    }, [])

    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9002/inventory')
            .then(response => response.json())
            .then(data => setInventory(data))
            .catch(error => console.log(error));
    }, []);


    const [selectedCategory, setSelectedCategory] = useState('all');

    const options = [
        { label: 'All', value: 'all' },
        { label: 'Furniture', value: 'furniture' },
        { label: 'Equipment', value: 'equipment' },
    ];

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filteredInventory = selectedCategory === 'all' ? inventory : inventory.filter((item) => item.category === selectedCategory);

    const [showPopupIndex, setShowPopupIndex] = useState(null);
    const handlePopupClose = () => {
        setShowPopupIndex(null);
    }

    return (
        <div>
            <header id="page-header">
                <div className="page-banner-content">
                    <h1>Inventory</h1>
                </div>
            </header>

            <div className="filter-section">
                <label htmlFor="category"><p>Filter by category:</p></label>
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>





            <div className="main-container">
            <div className="card-container">

                <div className="row">
                    {filteredInventory.map((item, index) => (
                        <div className='col-md-4' key={index}>
                            <div className="inventory-card" data-aos="fade-up">
                                <Link to="" onClick={() => setShowPopupIndex(index)}>
                                    <img src={item.image} alt='inventory' />
                                    <h3>{item.name}</h3>
                                </Link>
                                
                            </div>
                        </div>
                    ))}


                </div>
                </div>

            </div>

            {showPopupIndex !== null && (
                <div className="inventory-popup-card">
                    <div className="inventory-popup">
                        <div className="popup-close-btn">
                            <button type="button" onClick={handlePopupClose} class="btn-close" aria-label="Close"></button>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <img src={filteredInventory[showPopupIndex].image} alt='inventory' />
                            </div>
                            <div className="col-md-8">
                                <h3>{filteredInventory[showPopupIndex].name}</h3>
                                <p><strong>Brand:</strong> {filteredInventory[showPopupIndex].brand_name}</p>
                                <p><strong>Category:</strong> {filteredInventory[showPopupIndex].category}</p>
                                <p><strong>Model Number:</strong> {filteredInventory[showPopupIndex].model_number}</p>
                                <p><strong>Available in:</strong> {filteredInventory[showPopupIndex].availability_zone}</p>
                                <p><strong>Description:</strong> {filteredInventory[showPopupIndex].description}</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default InventoryAdded;
