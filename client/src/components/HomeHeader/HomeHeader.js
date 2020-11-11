import React from "react";

import { ReactComponent as PastaSVG } from "../../assets/spaguetti.svg";
import { ReactComponent as SaladSVG } from "../../assets/salad.svg";
import { ReactComponent as BroccoliSVG } from "../../assets/broccoli.svg";
import { ReactComponent as PieSVG } from "../../assets/pie.svg";
import { ReactComponent as NoodlesSVG } from "../../assets/noodles.svg";
import { ReactComponent as CupcakeSVG } from "../../assets/cupcake.svg";

import SVGIcon from "../../components/SVGIcon/SVGIcon";

function Home() {
  return (
    <header className="jumbotron jumbotron-fluid">
      <div className="container">
        <div className="row">
          <div className="col-xl-10 m-xl-auto">
            <div className="row justify-content-between align-items-center">
              <div className="col-md-6 col-lg-6">
                <h1 className="display-4">Descubre nuestras mejores recetas</h1>
                <p className="lead mt-3">
                  Nuestros expertos cocineros han preparado para ti más de 6.000
                  recetas elaboradas con los mejores alimentos de temporada.
                </p>
              </div>
              <div className="col-md-6 col-lg-4 mt-3 mt-lg-0">
                <div className="row row-cols-2 row-cols-sm-4 row-cols-md-2">
                  <div className="col d-md-flex justify-content-md-end">
                    <SVGIcon>
                      <PastaSVG />
                    </SVGIcon>
                  </div>
                  <div className="col d-md-flex justify-content-md-end">
                    <SVGIcon>
                      <SaladSVG />
                    </SVGIcon>
                  </div>
                  <div className="col d-md-flex justify-content-md-end">
                    <SVGIcon>
                      <BroccoliSVG />
                    </SVGIcon>
                  </div>
                  <div className="col d-md-flex justify-content-md-end">
                    <SVGIcon>
                      <PieSVG />
                    </SVGIcon>
                  </div>
                  <div className="col d-md-flex justify-content-md-end">
                    <SVGIcon>
                      <NoodlesSVG />
                    </SVGIcon>
                  </div>
                  <div className="col d-md-flex justify-content-md-end">
                    <SVGIcon>
                      <CupcakeSVG />
                    </SVGIcon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Home;
