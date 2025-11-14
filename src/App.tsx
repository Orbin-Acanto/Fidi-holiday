import React from "react";
import Navbar from "./components/Navbar";
import ParallaxSection from "./components/ParallaxSection";
import { ServiceSection } from "./components/ServiceSection";
import { serviceItems } from "./data";
import { Footer } from "./components/Footer";
const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <ParallaxSection />
      <div className="bg-primary z-10 h-3"></div>
      <ServiceSection items={serviceItems} />
      <div className="bg-primary z-10 h-3"></div>
      <Footer />
    </>
  );
};

export default App;
