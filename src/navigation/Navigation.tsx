import { Routes, Route } from "react-router-dom";
import { HomePage, BookingPage, ResumeBookingPage } from "../pages";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/resumeBooking" element={<ResumeBookingPage />} />
    </Routes>
  );
};

export default Navigation;
