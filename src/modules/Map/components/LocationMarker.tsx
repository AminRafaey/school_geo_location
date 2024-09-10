/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Popup } from "react-map-gl";
import MarkerComponent from "./MarkerComponent";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const LocationMarker = ({ markers }: any) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openPopup = (index: number) => {
    setSelectedIndex(index);
  };

  const closePopup = () => {
    setSelectedIndex(null);
  };

  return (
    <>
      {markers?.map((marker: any, index: number) => {
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "auto",
          }}
          latitude={parseFloat(markers?.[selectedIndex]?.lat || "0")}
          longitude={parseFloat(markers?.[selectedIndex]?.long || "0")}
          onClose={closePopup}
          closeButton={false}
          closeOnClick={false}
          anchor="top"
        >
          <div style={{ position: "relative", padding: "10px", flex: "1" }}>
            <IconButton
              onClick={closePopup}
              style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                color: "#000",
              }}
            >
              <CloseIcon style={{ fontSize: "16px" }} />
            </IconButton>
            <div
              style={{
                display: "flex",
                alignItems: "center",
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
                    fontSize: "10px",
                    fontWeight: "400",
                    marginTop: "5px",
                    lineHeight: "1.5",
                    color: "#000",
                  }}
                >
                  {markers?.[selectedIndex]?.address}
                </span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <a
              href={markers?.[selectedIndex]?.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "11px",
                fontWeight: "600",
                color: "#0000FF",
                right: "-5px",
                cursor: "pointer",
                textDecoration: "none",
                display: "block",
                textAlign: "center",
                transition: "opacity 0.3s ease",
                marginLeft:"48px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              Visit Staff Directory
            </a>
          </div>
        </Popup>
      )}
    </>
  );
};

export default LocationMarker;
