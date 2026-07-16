import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Loading from "./pages/Loading/Loading";
import Report from "./pages/Report/Report";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  );
}