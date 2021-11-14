//get all of the vehicle locations

export const getLoctionVehicles = async () => {
    let data = await fetch("http://localhost:5000/vehicles");
    let vehicles = await data.json();
    return vehicles;
}

//get vehicles ids that are inside of the specific polygon
//polygon:[[x,y],[x,y]...]
export const getVehicleIds = async (polygon) => {
    let data = await fetch("http://localhost:5000/vehicles/polygon", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(polygon),
    });
    let ids = await data.json();
    console.log(ids)
    return ids;

};