import React from "react";
import LocationMarker from "./components/LocationMarker";
import { Map } from "react-map-gl";


const SchoolsMap = ({ schoolData }:any) => {
  console.log('School Data from Front End',schoolData)
  

  return (
    <div style={{
      // width: "calc(100% - 640px)",
      width:"100%",
  height: "100vh",
    }}>

    <Map
            initialViewState={{
              zoom: 5,
              latitude: parseFloat(schoolData?.[0]?.lat),
              longitude: parseFloat(schoolData?.[0]?.long),
            }}
            // @ts-ignore
            mapLib={import("mapbox-gl")}
            mapboxAccessToken="pk.eyJ1IjoiY3NuIiwiYSI6ImNpdnRvam1qeDAwMXgyenRlZjZiZWc1a2wifQ.Gr5pLJzG-1tucwY4h-rGdA"
            mapStyle="mapbox://styles/mapbox/dark-v10"
          >
            <LocationMarker markers={schoolData} />
          </Map>
    </div>
  );
};

export default SchoolsMap;
