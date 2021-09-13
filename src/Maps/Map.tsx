import axios from "axios";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { Apartment } from "../module/apartment";
import { useState } from "react";
import React from "react";

export default function Maps() {
  const icon: L.DivIcon = L.divIcon({
    className: "Apartment-icon",
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [15, 0],
  });

  let list: Apartment[] = [];

  const [newData, setNewData] = useState<Apartment[]>();

  React.useEffect(() => {
    axios({
      method: "get",
      url: "https://apartments-8ac3d-default-rtdb.europe-west1.firebasedatabase.app/Apartments.json",
    }).then((response) => {
      setNewData(response.data);
    });
  }, [newData?.length]);

  let key: any;

  if (newData !== undefined) {
    for (key in newData) {
      list.push(newData[key]);
    }
  }
  const position: LatLngExpression = [43.8563, 18.4131];
  const zoom: number = 12;

  /*
  const map = useMapEvents({
    click: (e) => {
      setClickPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  */

  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {list.map((item, index) => (
        <Marker
          icon={icon}
          key={index}
          position={[item.lat, item.lon]}
          title={`${item.name} at ${item.adress}`}
        >
          <Popup>
            <strong>
              {item.name} at {item.adress}
            </strong>
            <br />
            <p>{item.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
