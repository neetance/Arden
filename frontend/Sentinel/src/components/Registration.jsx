import React from "react";
import "./Registration.css";
import Background from "./Background";
import Header from "./Header";
import Hero from "./Hero";
import Fer from "./Fer";
import Footer from "./Footer";
import Features from "./FeatureCards";
import About from "./About";

const Registration = () => {
  return (
    <>
      <Background />
      <Header />

      <main>
        <Hero />
        <Fer />
        <Features />
        <About />
        <Footer />
      </main>
    </>
  );
};

export default Registration;
