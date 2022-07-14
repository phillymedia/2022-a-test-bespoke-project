import React from "react";

import Image from "../Image";
import ArchieContent from "../ArchieContent";

const Combo = ({ data, renderers = null  }) => {
  const defaultRenderers = {
    image: ({ srcSet, caption, credit }) => (
      <Image srcSet={srcSet} caption={caption} credit={credit} />
    )
  }

  const r = {...defaultRenderers, ...renderers};

  const renderContent = data && data.map(datum => {
    return renderers[datum.type] ? renderers[datum.type](datum.value) : null;
  });

  return (
    <div className={`inno-combo inno-combo--${data.length}up inno-uncontent`}>
      <ArchieContent data={ data } renderers={renderers}/>
    </div>
  );
};

export default Combo;
