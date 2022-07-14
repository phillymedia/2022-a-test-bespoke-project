import React from "react";
import ArchieContent from "../ArchieContent";

export default function Note({ body }) {
  return (
    <div className="inno-note">
      <ArchieContent data={ body } options={{ dropCap: false }}/>
    </div>
  );
}
