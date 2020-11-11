import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

import "./RecipeCard.scss";
import CardTime from "../CardTime/CardTime";
import Difficulty from "../Difficulty/Difficulty";
import Serves from "../Serves/Serves";
import ROUTES from "../../utils/routes";

function RecipeCard({
  recipe: {
    _id,
    name,
    difficulty,
    image,
    serves,
    hoursToPrep,
    minutesToPrep,
  } = {},
}) {
  const classes = cn("RecipeCard", "col");

  return (
    <div className={classes}>
      <div className="RecipeCard__ImgWrapper">
        <img src={image} alt="" className="RecipeCard__Img" />
      </div>
      <div className="RecipeCard__Content">
        <Link to={`${ROUTES.RECIPES}/${_id}`} className="card-link">
          <h3 className="RecipeCard__Title">{name}</h3>
        </Link>
        <div className="RecipeCard__Info">
          <CardTime hoursToPrep={hoursToPrep} minutesToPrep={minutesToPrep} />
          <Difficulty difficulty={difficulty} />
          <Serves serves={serves} />
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
