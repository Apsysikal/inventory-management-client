import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Items } from "./pages/Items";
import { Checkin } from "./pages/Checkin";
import { Checkout } from "./pages/Checkout";
import { CreateItem } from "./pages/CreateItem";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items" element={<Items />} />
      <Route path="/items/create" element={<CreateItem />} />
      <Route path="/items/checkin" element={<Checkin />} />
      <Route path="/items/checkout" element={<Checkout />} />
    </Routes>
  );
}
