import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import BreakfastMenu from "../menu/BreakfastMenu";

const MenuPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen text-[#601f1f]">
            {/* Header */}
            <Header />

            {/* Main content */}
            <main className="pt-24 pb-10">
                <BreakfastMenu />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MenuPage;
