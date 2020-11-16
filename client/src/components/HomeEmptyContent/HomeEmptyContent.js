import React from "react";

import "./HomeEmptyContent.scss";

import { ReactComponent as EmptyStateSVG } from "../../assets/undraw_add_content.svg";

function HomeEmptyContent({
  title = "Todavía no hay recetas",
  subhead = "No hay contenido aún",
}) {
  return (
    <div className="HomeEmptyContent row flex-column align-items-center">
      <div className="col col-lg-6">
        <h2 className="h1 mb-3">{title}</h2>
        <p>{subhead}</p>
      </div>
      <div
        className="col col-lg-5 mt-3 mt-sm-5"
        style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      >
        <EmptyStateSVG />
      </div>
    </div>
  );
}

export default HomeEmptyContent;
