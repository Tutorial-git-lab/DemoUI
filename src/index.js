import ReactDOM from "react-dom/client";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import State from "./Pages/State";
import District from "./Pages/District";
import NoPage from "./Pages/NoPage";
import Country from "./Pages/Country";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

export default function App() {
  const [show, setShow] = useState(false);
  console.log(show);
  return show ? (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="country" element={<Country />} />
          <Route path="state" element={<State />} />
          <Route path="district" element={<District />} />
          <Route path="home" element={<Home />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  ) : (
    <Login setShow={setShow} />
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
