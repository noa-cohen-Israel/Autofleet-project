import React from 'react';
import "./VehiclesIds.css";
import ListGroup from 'react-bootstrap/ListGroup'

export default function VehiclesIds({ids}) {


  return (
      <div>
         <h3>{ids.length==0 ? "Pressure to find vehicles":ids.length+" Vehicles were found"}</h3>
    <ListGroup className="containerIds">
    
{ids.map((value,index)=>{
    return <ListGroup.Item className="itemIds">{index+1+". "+value}</ListGroup.Item>
})}
   </ListGroup>
   </div>
  );
}
