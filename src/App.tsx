// App.tsx
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import OurServices from "./pages/services";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/services" element={<OurServices />} />
    </Routes>
  );
}
