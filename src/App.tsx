import React from "react";
import Theme from "./modules/templated/Theme";
import ArchieContent from "./modules/templated/ArchieContent";

import data from "./data/data.json";

export default function App() {
  const hero = data.content.find((x) => x.type == "hero");

  return (
    <Theme theme={data["theme"]} hero={hero}>
      <div className="inno-container">
        <div className="inno-content">
          <ArchieContent data={data.content}/>
        </div>
      </div>
    </Theme>
  );
}
