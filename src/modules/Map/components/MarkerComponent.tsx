import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Marker } from "react-map-gl";
// import { useResponsive } from "src/hooks/useResponsive";

const MarkerComponent = ({
  position,
  index,
  marker,
  openPopup,
  key,
}:any) => {
  // const isMobile = useResponsive("down", "sm");
  return (
    <React.Fragment>
      <Marker
        style={{
          cursor: "pointer",
        }}
        key={key}
        latitude={position[0]}
        longitude={position[1]}
        onClick={() => {
          openPopup(index);
          // isMobile && openPopup(index);
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/location-icon-light.png"
            style={{ width: "40px", height: "40px" }}
            alt="School Logo"
          />
        </div>
        <div
          style={{
            position: "relative",
            top: "-32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={
              marker?.logo?.[0]?.thumbnails?.small?.url ||
              "/dojo-small.png"
            }
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            alt="School Logo"
          />
        </div>
      </Marker>
    </React.Fragment>
  );
};

export default MarkerComponent;
