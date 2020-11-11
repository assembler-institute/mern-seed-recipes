import React from "react";
import cn from "classnames";

import "./Difficulty.scss";

function Difficulty({ difficulty }) {
  const classes = cn("Difficulty");

  return (
    <div className={classes}>
      <h4 className="Difficulty__Subtitle text-uppercase text-muted">
        Dificultad
      </h4>
      <div className="Difficulty__Items">
        <p className="Difficulty__Value text-muted">{difficulty}</p>
      </div>
    </div>
  );
}

export default Difficulty;
