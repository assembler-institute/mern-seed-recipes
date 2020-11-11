import React from "react";
import cn from "classnames";

import "./SVGIcon.scss";

function SVGIcon({ children, additionalClasses }) {
  const classes = cn(
    "SVGIcon",
    additionalClasses && additionalClasses.split(" "),
  );

  return <div className={classes}>{children}</div>;
}

export default SVGIcon;
