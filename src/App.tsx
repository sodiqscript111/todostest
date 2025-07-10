import { GridBackgroundDemo } from "./components/GridBackgroundDemo";
import OffersCarousel from "@/components/offer";
import Popup from "@/components/Popup";
import CustomCursor from "@/components/CustomCursor";
import { ParallaxScroll } from "./components/parallax-scroll";
import GlobeWrapper from "./components/globe";
export default function App() {
  return (
    <div className="relative min-h-screen bg-black">
      <CustomCursor />
      <Popup />
      <div className="relative z-0">
        <GridBackgroundDemo />
      </div>
      <div className="relative z-10">
        <OffersCarousel />
      </div>
      <div className="relative z-10">
        <ParallaxScroll />
      </div>
      <div className="relative z-10">
        <GlobeWrapper />
        </div>
    </div>
  );
}