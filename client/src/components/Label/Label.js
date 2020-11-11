import React from "react";
import cn from "classnames";

function Label({ children, additionalClasses = "", ...props }) {
  const classes = cn(
    "form-control-label",
    additionalClasses && additionalClasses.split(" "),
  );

  return (
    <label className={classes} {...props}>
      {children}
    </label>
  );
}

export default Label;
