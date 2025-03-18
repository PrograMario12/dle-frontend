import React from "react";
import Clock from "../components/Principal/Clock";
import CardScanner from "../components/Principal/CardScanner";
import Footer from "../components/Principal/FooterMain";
import "../assets/styles/Principal.css";

const Principal: React.FC = () => {
  return (
    <div className="principal container-fluid d-flex flex-column justify-content-between vh-100">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-center align-items-start">
          <Clock />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <CardScanner />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Principal;