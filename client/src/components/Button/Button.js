import React from "react";
import cn from "classnames";

function Button({
  children,
  additionalClasses = "",
  variant,
  htmlType = "button",
  ...props
}) {
  const classes = cn(
    "btn",
    variant ? `btn-${variant}` : "btn-primary",
    additionalClasses && additionalClasses.split(" "),
  );

  return (
    <button className={classes} type={htmlType} {...props}>
      {children}
    </button>
  );
}

export default Button;
