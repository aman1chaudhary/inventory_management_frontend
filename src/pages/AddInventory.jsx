import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddInventory = () => {
    const navigate = useNavigate();
    const [inventory, setInventory] = useState({
        name: "",
        category: "",
        brand_name: "",
        availability_zone: "",
        model_number: "",
        description: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventory({
            ...inventory,
            [name]: value,
        });
    };

    const inventoryAdd = () => {
        const { name, category, brand_name, availability_zone, model_number, description, image } = inventory;
        if (name && category && brand_name && availability_zone && model_number && description && image) {
            axios
                .post("http://localhost:9002/add-inventory", inventory)
                .then((res) => {
                    alert(res.data.message);
                    navigate("/inventory");
                })
                .catch((err) => {
                    alert(err.response.data.message);
                });
        } else {
            alert("Invalid input");
        }
    };


    return (
        <div>
            <header id="page-header">
                <div className="page-banner-content">
                    <h1>Add Inventory</h1>
                </div>
            </header>

            <div className="main-container">
                <div className="add-inventory">
                    <input
                        type="text"
                        name="name"
                        value={inventory.name}
                        required
                        placeholder="Inventory Name"
                        onChange={handleChange}
                    /><br />
                    <select
                        id="category"
                        name="category"
                        value={inventory.category}
                        required
                        onChange={handleChange}
                    >
                        <option value="">Select a category</option>
                        <option value="furniture">Furniture</option>
                        <option value="equipment">Equipment</option>
                    </select><br />

                    <select
                        id="availability_zone"
                        name="availability_zone"
                        value={inventory.availability_zone}
                        required
                        onChange={handleChange}
                    >
                        <option value="">Select a Zone</option>
                        <option value="Office 1">Office 1</option>
                        <option value="Office 2">Office 2</option>
                        <option value="Office 3">Office 3</option>
                        <option value="Conference Room">Conference Room</option>
                        <option value="Rest Room">Rest Room</option>
                        <option value="Store Room">Store Room</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Bath Room">Bath Room</option>
                    </select><br />

                    <input
                        type="text"
                        name="brand_name"
                        value={inventory.brand_name}
                        required
                        placeholder="Brand Name"
                        onChange={handleChange}
                    /><br />





                    <input
                        type="text"
                        name="model_number"
                        value={inventory.model_number}
                        required
                        placeholder="Model Number"
                        onChange={handleChange}
                    /><br />

                    <textarea
                        name="description"
                        value={inventory.description}
                        required
                        placeholder="Description"
                        onChange={handleChange}
                        rows="5"
                    /><br />

                    <input
                        type="text"
                        name="image"
                        value={inventory.image}
                        required
                        placeholder="Image Link"
                        onChange={handleChange}
                    /><br />

                    <button className="button" onClick={inventoryAdd}>
                        Add Inventory
                    </button>

                </div>
            </div>
        </div>
    )
};

export default AddInventory;
