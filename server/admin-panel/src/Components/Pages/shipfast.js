import React from "react";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

function shipfast() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#cef3d9",
            maxHeight: "100%",
            maxWidth: "53%",
          }}
          className="triangle_right"
        >
          <p
            style={{
              color: "#1a6770",
              fontWeight: 500,
              fontSize: "17px",
              letterSpacing: ".15px",
              margin: "3px",
              padding: "5px",
            }}
          >
            <LocalShippingOutlinedIcon
              style={{ height: "15px", marginTop: "3px" }}
            />
            SHIPS FAST
          </p>
        </div>
        <div>
          <p>
            <a>
              <PlayCircleFilledWhiteOutlinedIcon
                style={{
                  display: "flex",
                  marginLeft: "2rem",
                  fontSize: "29px",
                  color: "#a6a9c1",
                  overflow: "hidden",
                  width: "30px",
                }}
              />
            </a>
          </p>
        </div>
        <div>
          <p>
            <a>
              <FavoriteBorderOutlinedIcon
                style={{
                  margin: "10px",
                  fontSize: "29px",
                  color: "#a6a9c1",
                }}
              />
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default shipfast;
