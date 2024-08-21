/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Popup } from "react-map-gl";
import MarkerComponent from "./MarkerComponent";

const LocationMarker = ({ markers }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openPopup = (index: any) => {
    setSelectedIndex(index);
  };

  const closePopup = () => {
    setSelectedIndex(null);
  };

  return (
    <> 
      {markers?.map((marker: any, index: any) => {
        const position = [
          parseFloat(marker?.lat || 0),
          parseFloat(marker?.long || 0),
        ];
        return (
          <MarkerComponent
            key={index}
            position={position}
            index={index}
            marker={marker}
            openPopup={openPopup}
          />
        );
      })}
      {selectedIndex !== null && (
        <Popup
          style={{
            marginTop: "8px",
            width: "200px",
          }}
          latitude={parseFloat(markers?.[selectedIndex]?.lat || 0)}
          longitude={parseFloat(markers?.[selectedIndex]?.long || 0)}
          onClose={closePopup}
          closeButton={true}
          closeOnClick={false}
          anchor="top" // Position the popup at the bottom of the marker
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <img
              src={
                markers?.[selectedIndex]?.logo?.[0]?.url ||
                "/logo/dojo-small.png"
              }
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
              }}
              alt="School Logo"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "600",
                  color: "#000000",
                  lineHeight: "1.5",
                }}
              >
                {markers?.[selectedIndex]?.nameOfCollege}
              </span>
              <span
                style={{
                  fontSize: "8px",
                  fontWeight: "400",
                  marginTop: "5px",
                  lineHeight: "1.5",
                  color: "#000000",
                }}
              >
                {markers?.[selectedIndex]?.address}
              </span>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default LocationMarker;
