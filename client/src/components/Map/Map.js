import React, {useState,useCallback,useEffect} from 'react'
import { GoogleMap, useJsApiLoader, Marker, Polygon } from '@react-google-maps/api';
import { getLoctionVehicles } from '../../service/vehicles'
import './Map.css'
const containerStyle = {
  width: '1000px',
  height: '600px'
};



export default function Map({updeteIDs,resetVehiclesIds}) {
  var iconBase = 'https://maps.google.com/mapfiles/kml/pal4/';

  const [map, setMap] = useState(null)
  
  const [vehicleLocations, setVehicleLocations] = useState([])
  const [selectedLocations] = useState([])
  const [drawPolygon, setDrawPolygon] = useState(false)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyC52R7VHe5-Etup41G8odeCv0Qr-3wyqcA"
  })

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])


  const onClick = useCallback(function callback(map) {
    setDrawPolygon(false)
    selectedLocations.push({lat:map.latLng.lat(), lng:map.latLng.lng()})
    setDrawPolygon(true)
  }, [])
 
function cleanSelected(map){
  while(selectedLocations.length!=0){
    selectedLocations.pop()
  }
  setDrawPolygon(false)
  resetVehiclesIds([])
 setMap(map)
}
  useEffect(() => {
    async function fetchData() {
      let location = await getLoctionVehicles()
      setVehicleLocations(location)
    }
    fetchData()
  }, [])

  return isLoaded ? (
    <div>
    <div className="divButton"> 
      <button className="mapButton" onClick={()=>{updeteIDs(selectedLocations)}}>search id</button>
     <button  className="mapButton" onClick={cleanSelected}>clean selected</button>
    </div>
    <div><GoogleMap
      mapContainerStyle={containerStyle}
      center={ {
        lat: 51.505823554787256,
        lng: -0.12991781470909958
      }}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={onClick}>
      {selectedLocations.map((vehicle, index) => {
        return <Marker key={"selected-" + index} position={{ lat: vehicle.lat, lng:vehicle.lng}} />
      })}
      {vehicleLocations.map((vehicle, index) => {
        return <Marker icon={ iconBase + 'icon54.png'} key={index} position={{ lat: vehicle.lat, lng: vehicle.lng }} />
      })}
     { drawPolygon&&<Polygon paths={drawPolygon?selectedLocations:[]} fillColor="#FF0000"></Polygon>}
      <></>
    </GoogleMap>
    </div>
    </div>
  ) : <></>
}
