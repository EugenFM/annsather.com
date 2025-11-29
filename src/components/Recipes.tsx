import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { recipeData } from "./recipes-data/";

const Recipes: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [showTop, setShowTop] = useState(false);

    // 🧭 Show "Back to Top" button when scrolled down
    useEffect(() => {
        const handleScroll = () => {
            setShowTop(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // ✨ Fade-in animation on mount
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-white min-h-screen text-[#601f1f]">
            {/* 🔝 Header */}
            <Header />

            {/* 🧾 Recipes Section */}
            <section
                id="recipes"
                className="relative w-full bg-[#FFF] pt-28 pb-5 px-5 text-[#601f1f] transition-opacity duration-1000"
            >
                <div
                    className={`faded-fixed-bg w-full transition-opacity duration-1000 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div className="relative max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 text-[#601f1f]">
                        {/* 🧠 Section Heading */}
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#601f1f] pt-18 pb-4 mb-8">
                                Cooking at Home with Ann Sather
                            </h2>
                            <p className="max-w-4xl mx-auto text-lg mb-4 leading-relaxed">
                                Do you think it’s possible to replicate our much celebrated
                                cinnamon rolls, Swedish pancakes, roast duck, or one of our
                                delectable pies at home? We don’t think so either, but we’re
                                giving you the opportunity to try.
                            </p>
                            <p className="max-w-4xl mx-auto text-lg mb-10 leading-relaxed pb-4">
                                In 1994, Ann Sather’s restaurants published a 50th-anniversary
                                cookbook. Due to popular demand, we now have recipes for some of
                                our much-loved dishes available online. Browse through our
                                sections below to get inspired!
                            </p>
                        </div>

                        {/* 🍳 Recipe Category Buttons */}
                        <div className="flex flex-wrap justify-center gap-8 max-w-xl mx-auto pb-8">
                            {recipeData.map(({ title }) => {
                                const isActive = activeCategory === title;
                                return (
                                    <button
                                        key={title}
                                        onClick={() =>
                                            setActiveCategory(isActive ? null : title)
                                        }
                                        className={`px-8 py-2 rounded-full font-semibold uppercase tracking-wide transition-all duration-300 ${
                                            isActive
                                                ? "bg-[#7a1a1a] text-white shadow-md scale-105"
                                                : "bg-[#4a5456] text-white hover:bg-[#601f1f]"
                                        }`}
                                    >
                                        {title}
                                    </button>
                                );
                            })}
                        </div>

                        {/* 📖 Active Category Recipes */}
                        {activeCategory && (
                            <div className="mt-10 max-w-7xl mx-auto p-5 px-6">
                                <h3 className="text-center text-2xl md:text-3xl font-bold capitalize mb-10 text-[#601f1f]">
                                    {activeCategory} Recipes
                                </h3>

                                <div className="flex justify-center">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center text-[#601f1f]/90 font-['Cardo'] leading-relaxed max-w-7xl w-full">
                                        {recipeData
                                            .find((cat) => cat.title === activeCategory)
                                            ?.recipes.map((recipe, index) => (
                                                <div
                                                    key={index}
                                                    className="w-full border-b border-[#e5d7c6] pb-8 mb-8 last:border-none last:pb-0 last:mb-0"
                                                >
                                                    <h4 className="text-2xl font-extrabold italic mb-3 text-[#330000]">
                                                        {recipe.name}
                                                    </h4>

                                                    <p className="mb-2 text-lg text-[#330000]/90 italic font-bold">
                                                        Ingredients
                                                    </p>
                                                    <ul className="list-disc list-inside space-y-1">
                                                        {recipe.ingredients.map((item, i) => (
                                                            <li key={i} className="text-[#330000] text-lg italic">
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    <p className="text-lg mt-5 italic font-bold text-[#330000]/90">
                                                        Instructions
                                                    </p>
                                                    {recipe.instructions.map((step, i) => (
                                                        <p key={i} className="text-lg mt-1 text-[#330000] italic">
                                                            {step}
                                                        </p>
                                                    ))}

                                                    {recipe.yield && (
                                                        <p className="text-lg mt-2 italic text-[#330000]">
                                                            {recipe.yield}
                                                        </p>
                                                    )}

                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 🔝 Back to Top Floating Button */}
            {showTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Back to top"
                    className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full
            bg-[#EDEDED] text-[#601f1f] text-xl font-bold
            flex items-center justify-center shadow-lg border border-[#601f1f]/30
            hover:bg-[#601f1f] hover:text-[#EDEDED] hover:scale-110
            transition-all duration-300 ease-in-out"
                >
                    ↑
                </button>
            )}

            {/* 🔚 Footer */}
            <Footer />
        </div>
    );
};

export default Recipes;

