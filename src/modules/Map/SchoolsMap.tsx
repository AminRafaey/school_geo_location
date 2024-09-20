import React, { useEffect, useRef, useState } from "react";
import LocationMarker from "./components/LocationMarker";
import { Map } from "react-map-gl";
import FilterCard from "./components/FilterCard";
import {
  LocationPageSection,
  LocationPageWrapper,
  MapSection,
} from "./components/location.styled";

const SchoolsMap = ({ schoolData }: any) => {
  const [finalFilterData, setFinalFilterData] = useState(schoolData || []);
  const mapRef = useRef<any>(null);
  useEffect(() => {
    if (finalFilterData && finalFilterData.length > 0) {
      const bounds = finalFilterData.reduce(
        (acc: any, { lat, long }: { lat: any; long: any }) => {
          const latNum = parseFloat(lat);
          const longNum = parseFloat(long);
          if (!isNaN(latNum) && !isNaN(longNum)) {
            acc.minLat = Math.min(acc.minLat, latNum);
            acc.maxLat = Math.max(acc.maxLat, latNum);
            acc.minLng = Math.min(acc.minLng, longNum);
            acc.maxLng = Math.max(acc.maxLng, longNum);
          }
          return acc;
        },
        {
          minLat: parseFloat(finalFilterData[0]?.lat) || 0,
          maxLat: parseFloat(finalFilterData[0]?.lat) || 0,
          minLng: parseFloat(finalFilterData[0]?.long) || 0,
          maxLng: parseFloat(finalFilterData[0]?.long) || 0,
        }
      );
      if (mapRef.current) {
        const map = mapRef.current.getMap();
        map.fitBounds(
          [
            [bounds.minLng, bounds.minLat],
            [bounds.maxLng, bounds.maxLat],
          ],
          {
            padding: 20,
            duration: 1000,
          }
        );
      }
    }
  }, [finalFilterData]);

  return (
    <>
      <LocationPageWrapper>
        <LocationPageSection>
          <FilterCard
            schoolData={schoolData}
            finalFilterData={finalFilterData}
            setFinalFilterData={setFinalFilterData}
          />
        </LocationPageSection>
        <MapSection>
          <Map
            ref={mapRef}
            initialViewState={{
              zoom: 5,
              latitude: parseFloat(finalFilterData?.[0]?.lat || 0),
              longitude: parseFloat(finalFilterData?.[0]?.long || 0),
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
