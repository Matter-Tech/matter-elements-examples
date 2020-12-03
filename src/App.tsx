import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  // settings up Matter Elements API authorization keys
  useEffect(() => {
    fetch(
        "https://api.thisismatter.com/elements/v1/auth/user_token",
        {
          headers: {
            Authorization: `Bearer ${"mk_matter_sample" /* use your API key here */}`,
          },
        },
    )
        .then(response => response.json())
        .then(({token}) => {
          MatterElements.setAuthToken(token);
        })
        .catch(() => {
          alert("Cannot fetch authorization token for Matter Elements API");
        });
  }, []);

  // a sample way to obtain the portfolio definition
  const [portfolio, setPortfolio] = useState<MatterElements.PortfolioQuery | undefined>(undefined);
  useEffect(() => {
    // replace Promise construction with a fetch
    Promise
        .resolve({
          ids: [
            {
              id: "AP_BAEREDYGTIG_2065",
              type: "uid",
              weight: 1,
            },
          ],
        } as MatterElements.PortfolioQuery)
        .then((result) => {
          setPortfolio(result);
        });
  }, [setPortfolio]);

  // create an element when the portfolio is ready. We don't need to wait for the API key to be ready.
  useEffect(() => {
    if (portfolio && containerRef.current) {
      // create an instance of Single Impact controller
      const singleImpactElement = MatterElements.singleImpact(
          "co2", // "co2", "waste", "energy", "fossil"
          portfolio,
          {
            // This CSS file will be loaded by the Matter Element and will alter the look
            // and feel of that Element. We must use full paths here, because this file will be
            // loaded from different origin. Also in production this file should allow
            // https://elements.thisismatter.com/ origin to load it (with correct CORS headers).
            cssUrls: [ `${window.location.origin}/matter-style.css` ]
          },
      );

      // assign a container for rendering.
      // At least the width of the container should be specified for the Element to be displayed.
      // Some height is necessary to display the loading screen.
      singleImpactElement.render(containerRef.current);
      return singleImpactElement.destroy;
    }
    return undefined;
  }, [portfolio]);

  return (
      <div className="App">
        <div ref={containerRef} className="element-container" />
      </div>
  );
}

export default App;
