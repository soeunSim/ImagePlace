import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function GoogleAnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null;
}

export default GoogleAnalyticsTracker;
