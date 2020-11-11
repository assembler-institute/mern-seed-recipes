import React from "react";
import cn from "classnames";

import "./CardTime.scss";

function CardTime({ hoursToPrep, minutesToPrep }) {
  const classes = cn("CardTime");

  return (
    <div className={classes}>
      <h4 className="CardTime__Subtitle text-uppercase text-muted">
        Tiempo Estimado
      </h4>
      <div className="CardTime__Items">
        {hoursToPrep > 0 && (
          <p className="CardTime__Value text-muted">{hoursToPrep}h</p>
        )}
        <p className="CardTime__Value text-muted">{minutesToPrep}min</p>
      </div>
    </div>
  );
}

export default CardTime;
