import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  // For opening in the same tab using React Router
  return (
    <section className="cta">
      <h3>Want to Dive Deeper?</h3>
      <p>
        Learn more about how our services work, what powers them, and how you
        can get the most out of our platform.
      </p>
      <Link to="/documentation" className="custom-policy-btn">
        View Documentation
      </Link>
    </section>
  );
};

export default About;
