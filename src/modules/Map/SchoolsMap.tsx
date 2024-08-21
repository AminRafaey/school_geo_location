import React, { useState } from "react";
import LocationMarker from "./components/LocationMarker";
import { Map } from "react-map-gl";
import FilterCard from "./components/FilterCard";
import {
  LocationPageSection,
  LocationPageWrapper,
  MapSection,
} from "./components/location.styled";

const SchoolsMap = ({ schoolData }: any) => {
  const [finalFilterData, setFinalFilterData] = useState(schoolData);

  return (
    <>
      <LocationPageWrapper>
        <LocationPageSection>
          <FilterCard
            schoolData={schoolData}
            setFinalFilterData={setFinalFilterData}
            finalFilterData={finalFilterData}
          />
        </LocationPageSection>
        <MapSection>
          <Map
            initialViewState={{
              zoom: 5,
              latitude: parseFloat(finalFilterData?.[0]?.lat),
              longitude: parseFloat(finalFilterData?.[0]?.long),
            }}
            // @ts-ignore
            mapLib={import("mapbox-gl")}
            mapboxAccessToken="pk.eyJ1IjoiY3NuIiwiYSI6ImNpdnRvam1qeDAwMXgyenRlZjZiZWc1a2wifQ.Gr5pLJzG-1tucwY4h-rGdA"
            mapStyle="mapbox://styles/mapbox/dark-v10"
          >
            {finalFilterData ? (
              <LocationMarker markers={finalFilterData} />
            ) : (
              <></>
            )}
          </Map>
        </MapSection>
      </LocationPageWrapper>
    </>
  );
};

export default SchoolsMap;
