import React from "react";
import cn from "classnames";

function Input({ children, additionalClasses = "", ...props }) {
  const classes = cn(
    "form-control",
    additionalClasses && additionalClasses.split(" "),
  );

  return (
    <input className={classes} {...props}>
      {children}
    </input>
  );
}

export default Input;
