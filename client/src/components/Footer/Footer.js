import React from "react";

function Footer() {
  return (
    <footer className="container-fluid py-4 border-top align-self-end bg-dark">
      <div className="row">
        <div className="col">
          <p className="text-center text-light">
            Assembler School MERN Starter 🌱 {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
