import { Routes, Route } from "react-router-dom";

import { HomePage, BookingPage } from "../pages";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingPage />} />
    </Routes>
  );
};

export default Navigation;
