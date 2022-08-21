import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Checkin } from "./pages/Checkin";
import { Checkout } from "./pages/Checkout";
import { CreateItem } from "./pages/CreateItem";
import { SignIn } from "./pages/SignIn";
import { Lists } from "./pages/Lists";
import { List } from "./pages/List";
import { CreateList } from "./pages/CreateList";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<Lists />} />
      <Route path="/list/create-list" element={<CreateList />} />
      <Route path="/list/:listId" element={<List />} />
      <Route path="/list/:listId/create" element={<CreateItem />} />
      <Route path="/list/:listId/checkin" element={<Checkin />} />
      <Route path="/list/:listId/checkout" element={<Checkout />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}
