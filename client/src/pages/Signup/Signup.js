import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import "./Signup.scss";
import HeaderContainer from "../../redux/containers/components/HeaderContainer";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Label from "../../components/Label/Label";
import ROUTES from "../../utils/routes";
import makePrefix from "../../utils/make-prefix";

function Signup({
  currentUserState: { isAuthenticated, signUpError, isSigningUp } = {},
  signup,
}) {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const prefix = makePrefix("signup-form");

  function handleSubmit(e) {
    e.preventDefault();

    if (name !== "" && lastname !== "" && email !== "" && password !== "") {
      signup({ name, lastname, email, password });
    }
  }

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <div className="Signup d-flex flex-column min-vh-100">
      <HeaderContainer />

      <main className="container d-flex flex-column flex-shrink-0 flex-grow-1">
        <div className="row justify-content-sm-center align-items-sm-center flex-grow-1">
          <section className="Form col-md-8 col-xl-6 mx-sm-auto border rounded p-sm-5">
            <header>
              <h1 className="h2 pt-5 pt-sm-2 pb-4">Nuevo usuario</h1>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Tu nombre"
                  data-testid={prefix("name")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="lastname">Apellido</Label>
                <Input
                  type="text"
                  id="lastname"
                  data-testid={prefix("lastname")}
                  placeholder="Tu apellido"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="email">Email</Label>
                <Input
                  data-testid={prefix("email")}
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  data-testid={prefix("password")}
                  type="password"
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                htmlType="submit"
                additionalClasses="mt-4 btn-block"
                disabled={isSigningUp}
                data-testid={prefix("cta")}
              >
                Registrar
              </Button>
              {signUpError && (
                <div className="bg-dark p-3 mt-3">
                  <p className="text-white mb-0">{signUpError}</p>
                </div>
              )}
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Signup;
