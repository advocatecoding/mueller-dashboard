import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';


import "leaflet/dist/leaflet.css";



export default function Map() {

    const stores = useSelector((state: RootState) => state.stores.stores);

    const center: LatLngExpression = [51.1657, 10.4515];

    const getCustomMarker = (color: string) => {
        return L.icon({
          iconUrl: `/locationIcon.svg`,
          iconSize: [24, 24],
          iconAnchor: [12, 24],
          popupAnchor: [0, -24],
          className: `custom-icon ${color}`
        });
      };


    return (
        <div className='h-full w-full'>
            <MapContainer zoom={7} center={center} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
          
                {stores.map((store, index) => (
                    <Marker
                        key={index}
                        icon={getCustomMarker("red")}
                        position={[store.latitude, store.longitude]}
                    >
                        <Popup >
                            <a className='text-accent' href={"https://www.mueller.de/meine-filiale/" + store.link} target='_blank'>{store.city}</a>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}
