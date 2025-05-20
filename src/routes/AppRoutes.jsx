import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { MenuPage, DownloadPage, SearchPage, UpdatePage, CollectivelyUpdate } from "../pages/index.js";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MenuPage />} />
                <Route path="/download" element={<DownloadPage />} />
                <Route path="/search-page" element={<SearchPage tipoBusqueda={"individual"} />} />
                <Route path="/upload" element={<UpdatePage />} />
                <Route path="/CollectivelyUpdate" element={<CollectivelyUpdate />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
