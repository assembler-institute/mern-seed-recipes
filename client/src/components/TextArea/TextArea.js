import React from "react";
import cn from "classnames";

function TextArea({ additionalClasses = "", ...props }) {
  const classes = cn(
    "form-control",
    additionalClasses && additionalClasses.split(" "),
  );

  return <textarea className={classes} {...props} />;
}

export default TextArea;
