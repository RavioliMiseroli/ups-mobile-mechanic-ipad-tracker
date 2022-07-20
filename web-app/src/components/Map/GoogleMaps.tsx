import GoogleMapReact from "google-map-react";
import "./GoogleMaps.css";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";
import Popup from "reactjs-popup";
import styled from "styled-components";
import React, { useState } from "react";
import "reactjs-popup/dist/index.css";


export interface Coords {
  lat: number;
  lng: number;
}

export interface Props {
  location: {
    center: Coords;
    address: string;
  };
  zoomLevel: number;
}

const location = {
  center: {
    lat: 41.06812929183645,
    lng: -74.17182012375265,
  },
  address: "UPS Mahwah, 340 MacArthur Blvd, Mahwah, NJ",
};

interface LocationPinProps {
  lat: number;
  lng: number;
  text: string;
}

const StyledPopup = styled(Popup)`
  &-content {
    border-radius: 20px;
    padding: 20px;
  }
`;

const LocationPin = ({ lat, lng, text }: LocationPinProps) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [lost, setVisible] = useState(true);
  
  return (
    <div>
      <style>{`
        .pin-icon-device-lost { font-size: 8rem; transform: translateY(-50%); color: red;}
        .pin-icon-device-found { font-size: 8rem; transform: translateY(-50%); color: black;}
      `}</style>
      
      <div className="pin" onClick={() => setOpen((o) => !o)}>
        <Icon icon={locationIcon} className={lost ? 'pin-icon-device-lost' : 'pin-icon-device-found'} />
        <p className="pin-text">{location.address}</p>
      </div>
      <StyledPopup open={open} closeOnDocumentClick onClose={closeModal}>
        <div>
          <a className="close" onClick={closeModal}>
            &times;
          </a>
        <div className="location-content">
          <span className="location-title">
            <h1 className="location">{location.address}</h1>
            <div>{lost && <div className="tag">Lost</div>}</div>
          </span>
          <p className="location-status">Mark this device as lost or found.</p>
          <div>
            <button className="lost-btn" onClick={() => setVisible(true)}>Lost</button>
            <button className="found-btn" onClick={() => setVisible(false)}>Found</button> 
          </div>
        </div>
        </div>
      </StyledPopup>
    </div>
  );
};

const Map = ({ location, zoomLevel }: Props) => (
  <GoogleMapReact
    bootstrapURLKeys={{ key: "AIzaSyCD23nT6ItbBhjrNYJBn0AANUKNleHOb7c" }}
    defaultCenter={location.center}
    defaultZoom={zoomLevel}
  >
    <LocationPin
      lat={location.center.lat}
      lng={location.center.lng}
      text={location.address}
    />
  </GoogleMapReact>
);

function GoogleMaps() {
  return <Map location={location} zoomLevel={17} />;
}

export default GoogleMaps;
