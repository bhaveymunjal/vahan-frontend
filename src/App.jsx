import Navbar from "./Components/Navbar";
import AddingEntity from "./Pages/AddingEntity";
import Entity from "./Pages/Entity";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="mt-[60px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entity/:entity" element={<Entity />} />
          <Route path="/adding-entity" element={<AddingEntity />} />
        </Routes>
      </div>
    </div>
  );
}
