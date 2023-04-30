import { useRef, useEffect, useState } from "react";
import { MapContainer, useMap, ImageOverlay, LayersControl, Popup, Marker } from 'react-leaflet'
import L from 'leaflet';
import { CRS } from 'leaflet';
import "leaflet/dist/leaflet.css"
import MapImg1 from "../assets/image/map3.jpeg"
import MapImg2 from "../assets/image/map2.jpeg"
import MarkerIcon from '../assets/image/marker-icon.png'
import { ZonesLayout } from '../Data/Data';
import { Link } from "react-router-dom";

let imageBounds = [
    [10, 10], // padding
    [780, 1380], // image dimensions
];

const myIcon = new L.Icon({
    iconUrl: MarkerIcon,
    iconRetinaUrl: MarkerIcon,
    popupAnchor: [0, -5],
    iconSize: [25],
});

const OverlayImage1 = () => {
    const map = useMap();
    map.fitBounds(imageBounds);
    return (
        <ImageOverlay
            bounds={imageBounds}
            url={MapImg1}
            transparent={true}
        />
    );
}
const OverlayImage2 = () => {
    const map = useMap();
    map.fitBounds(imageBounds);
    return (
        <ImageOverlay
            bounds={imageBounds}
            url={MapImg2}
            transparent={true}
        />
    );
}

const MyMarkers = ({ selectedIndex }) => {
    return ZonesLayout.map((Store, index) => (
        <PointMarker
            key={index}
            content={Store}
            center={[Store.Latitude, Store.Longitude]}
            openPopup={selectedIndex === index}
        />
    ));
};

const PointMarker = ({ center, content, openPopup }) => {
    const map = useMap();
    const markerRef = useRef(null);

    useEffect(() => {
        if (openPopup) {
            map.flyTo(center, 0, {
                duration: 2
            });
            markerRef.current.openPopup();
        }
    }, [map, center, openPopup]);

    return (
        <Marker ref={markerRef} position={center} icon={myIcon}>
            <Popup>
                <div className='Zone-list-popup'>
                    <h4>{content.ZoneName}</h4>
                    <img src={content.Image} alt="Zone" />
                    {/* <p> <strong>Address:</strong> {content.Address}</p> */}
                    <Link to={`/zone/${content.ZoneName}`}><p>More Details</p></Link>
                </div>
            </Popup>

        </Marker>
    );
};




const MapLayout = () => {
    const [selected, setSelected] = useState();

    function handleItemClick(index) {
        setSelected(index);
    }
    
    return (
        <div>
            <div className='map-page'>
                <div className="row">
                    <div className="col-md-4">
                        <div className="zone-list">
                            <h4>Click on a zone to navigate it!</h4>
                            <ol className="zone-item">
                                {ZonesLayout.map((Store, index) => (
                                    <li
                                        key={index}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleItemClick(index);
                                        }}
                                    >
                                        {Store.ZoneName}
                                    </li>
                                ))}
                            </ol>
                        </div>


                    </div>
                    <div className="col-md-8">
                        <MapContainer
                            crs={CRS.Simple}
                            style={{ width: '100%', height: "90vh", backgroundColor: 'white', border: '1px solid black', margin: 'auto' }}
                            maxZoom={2}
                            minZoom={-3}
                            scrollWheelZoom={false}>
                            <MyMarkers selectedIndex={selected} />


                            <LayersControl position="topright" collapsed={false}>
                                <LayersControl.BaseLayer
                                    checked="true"
                                    name="Map 1"
                                >
                                    <OverlayImage1 />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer

                                    name="Map 2"
                                >
                                    <OverlayImage2 />
                                </LayersControl.BaseLayer>

                            </LayersControl>


                        </MapContainer>

                    </div>

                </div>



            </div>

        </div>



    )
}

export default MapLayout