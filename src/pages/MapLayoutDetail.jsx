import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ZonesLayout } from '../Data/Data';
import { Link } from 'react-router-dom';


const MapLayoutDetail = () => {
    const { ZoneName } = useParams();
    const [store, setStore] = useState(null);
    useEffect(() => {
        let store = ZonesLayout.find((store) => store.ZoneName === (ZoneName));
        if (store) {
            setStore(store);
        }
    }, [ZoneName]);

    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9002/inventory')
            .then(response => response.json())
            .then(data => setInventory(data))
            .catch(error => console.log(error));
    }, []);

    const filteredInventory =  inventory.filter((item) => item.availability_zone === (ZoneName));




    const [showPopupIndex, setShowPopupIndex] = useState(null);
    const handlePopupClose = () => {
        setShowPopupIndex(null);
    }



    return (
        <>
            {store ? (
                <div>
                    <div className='main-container'>
                        <div className='zone-detail'>
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={store.Image} alt='store' />
                                </div>
                                <div className="col-md-8">
                                    <h3>Zone ID: {store.ZoneID}</h3>
                                    <h3>Zone Name: {store.ZoneName}</h3>
                                    <p>Description: {store.description}</p>



                                </div>
                            </div>
                        </div >

                        <div className="card-container">
                            <div className="row">
                                <h3>Inventory</h3>
                                {filteredInventory.filter((item) => item.
                                    availability_zone === store.ZoneName).map((item, index) => (
                                        <div key={index} className="col-md-4">
                                            <div className="inventory-card">
                                                <Link to="" onClick={() => setShowPopupIndex(index)}>
                                                    <img src={item.image} alt='inventory' />
                                                    <h3>{item.name}</h3>
                                                </Link>
                                                <p>Brand: {item.brand_name}</p>
                                                <p>Model Number: {item.model_number}</p>
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

            ) : (
                <h1>No Zone Found</h1>
            )}



        </>
    )
}

export default MapLayoutDetail