import { Spin } from "antd";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import Loading from "./Loading";

const CandidateVisit = lazy(() => import("../pages/CandidateVisit"));
const Daashboard = lazy(() => import("../pages/Dashboard"));
const Material = lazy(() => import("../pages/Material"));
const VendorVisit = lazy(() => import("../pages/VendorVisit"));

const MainContent = () => {
    return (
        <main className="flex-1 p-8 pt-4 pb-0 ml-52">
            <Routes>
                {/* <Route path="/vendor-visit" element={
                    () =>
                    <Suspense fallback={"Loading..."}>

                        <VendorVisit />
                    </Suspense>} /> */}
                <Route path="/vendor-visit" element={<VendorVisit />} />
                <Route
                    path="/courier/:transtype"
                    element={<Material />}
                />
                <Route path="/candidate-visit" element={<CandidateVisit />} />
                {/* <Route path="/driver" element={<DriverPage />} /> */}
                {/* Optional: Add a default redirect or home page */}
                <Route path="/" element={<Daashboard />} />
                {/* <Route path="/vendors" element={<Daashboard />} /> */}
            </Routes>
        </main>
        // </div>
    );
}

export default MainContent;