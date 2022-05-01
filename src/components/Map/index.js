
import ReactMapGL from 'react-map-gl';
import { useState, useEffect } from "react";
import Marker from '../Marker'

const Map = ({ activeEvents }) => {
    const mapBoxToken = String(process.env.REACT_APP_API_KEY);

    const [events, setEvents] = useState([]);
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: -0.756918,
        longitude: 47.706877,
        zoom: 1.5
    });

    useEffect(() => {
        setEvents(activeEvents);
        setTimeout(() => {
            setViewport({ ...viewport, zoom: viewport.zoom - 0.1 });
        }, 1000);
    }, [activeEvents]);

    let displayMarkers;
    if (events) {
        displayMarkers = events.map((event, index) => {
            return (
                <Marker
                    key={index}
                    event={event}
                    id={event.categories[0].id}
                    lat={event.geometries[0].coordinates[1]}
                    lng={event.geometries[0].coordinates[0]}
                />
            );
        });
    }

    return (
        <>
            <div className="sidebar">
                Longitude:{viewport.longitude.toFixed(4)} | Latitude:
                {viewport.latitude.toFixed(4)} | Zoom:
                {viewport.zoom.toFixed(1)}
            </div>

            <ReactMapGL
                mapboxAccessToken={mapBoxToken}
                {...viewport}
                mapStyle="mapbox://styles/mapbox/light-v10"
                onMove={(e) => setViewport(e.viewState)}
            >
                {displayMarkers}
            </ReactMapGL>
        </>
    );

}
export default Map;