import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import JoinPage from "../pages/JoinPage";

// 페이지 컴포넌트를 import
import Floor2 from "../Floor2";
import Floor3 from "../Floor3";

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/Floor2" element={<Floor2 />} />
        <Route path="/Floor3" element={<Floor3 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
