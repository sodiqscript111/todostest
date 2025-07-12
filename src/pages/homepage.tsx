import { GridBackgroundDemo } from "../components/GridBackgroundDemo";
import OffersCarousel from "../components/offer";
import Popup from "../components/Popup";
import CustomCursor from "../components/CustomCursor";
import  ParallaxScroll  from "../components/parallax-scroll";
import GlobeWrapper from "../components/globe";
import AboutUs from "../components/aboutus";
import OurServices from "../pages/services";


export default function Homepage() {
  return (
    <div className="relative min-h-screen bg-black">
      <CustomCursor />
      <Popup />
      <GridBackgroundDemo />
      <OffersCarousel />
      <ParallaxScroll />
      <GlobeWrapper />
      <AboutUs />
      <OurServices />
    </div>
  );
}   