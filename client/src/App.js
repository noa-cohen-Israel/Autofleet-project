import './App.css';
import Map from './components/Map/Map'
import { getVehicleIds } from './service/vehicles'
import React, { useState} from 'react'
import VehiclesIds from './components/VehiclesIds/VehiclesIds'
import logoAutofleet from './asset/logoAutofleet.png'
function App() {

  const [vehiclesIds, setVehiclesIds] = useState([])
  let ids;
  async function updeteIDs(selectedLocations) {
    ids = await getVehicleIds(selectedLocations)
    setVehiclesIds(ids)
  }


  return (
    <div className="App">
        <img  className="logo" src={logoAutofleet}/>
      <div className="AppContainer">
        <VehiclesIds className="AppItem" ids={vehiclesIds}/>
        <Map className="AppItem" updeteIDs={updeteIDs} resetVehiclesIds={setVehiclesIds}/></div>    
    </div>
  );
}

export default App;
