import { useEffect, useState } from "react";
import { Marker, Popup } from "react-map-gl";
import Icons from "../../Icons";

const LocationMarker = ({ event, id, lat, lng }) => {
    const [img, setImg] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        Icons.forEach((icon) => {
            if (icon.id === id) {
                setImg(icon.icon);
            } else {
                return;
            }
        });
    });

    const markerStyles = {
        width: "28px",
        height: "28px"
    };

    return (
        <>
            {showPopup && (
                <Popup
                    longitude={lng}
                    latitude={lat}
                    anchor="bottom"
                    closeButton={false}
                >
                    {event.title}
                </Popup>
            )}
            <Marker longitude={lng} latitude={lat}>
                <div
                    style={markerStyles}
                    onMouseEnter={() => setShowPopup(true)}
                    onMouseLeave={() => setShowPopup(false)}
                >
                    <img width="100%" src={img} alt="" />
                </div>
            </Marker>
        </>
    );
};

export default LocationMarker;
