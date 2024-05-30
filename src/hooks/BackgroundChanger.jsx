import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function BackgroundChanger() {
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;

    switch (pathname) {
      case "/":
        document.body.style.backgroundColor = "#fecdb7"; // Exempel: vit bakgrund för hemsidan
        break;
      case "/order":
        document.body.style.backgroundColor = "#ebebea"; // Exempel: grå bakgrund för "om oss"-sidan
        break;
      default:
        document.body.style.backgroundColor = "#fecdb7"; // Standardfärg
        break;
    }
  }, [location]);

  return null;
}

export default BackgroundChanger;
