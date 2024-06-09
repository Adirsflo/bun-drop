import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function BackgroundChanger() {
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;

    switch (pathname) {
      case "/":
        document.body.style.backgroundColor = "#fecdb7";
        break;
      case "/order":
        document.body.style.backgroundColor = "#ebebea";
        break;
      default:
        document.body.style.backgroundColor = "#fecdb7";
        break;
    }
  }, [location]);

  return null;
}

export default BackgroundChanger;
