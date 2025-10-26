import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`flex items-center fixed w-full z-50 transition-all duration-300 ${
                scrolled ? "bg-white py-4" : "bg-[#330000] py-4"
            }`}
        >
            {/* Left: logo */}
            <div className="w-60 pl-4">
                <Link to="/" className="focus:outline-none cursor-pointer text-left">
                    <h2
                        className={`text-2xl md:text-2xl font-['Playfair_Display'] leading-tight drop-shadow-lg transition-all duration-300 ${
                            scrolled
                                ? "text-[#330000] hover:text-[#7a1a1a] font-bold"
                                : "text-[#C8B8AE] hover:text-[#EAE6D2]"
                        }`}
                    >
                        Ann Sather<br />
                        <span className="text-base md:text-lg">Restaurant & Catering</span>
                    </h2>
                </Link>
            </div>

            {/* Right: navigation */}
            <div className="flex-1 flex justify-end items-center gap-10 pr-8">
                <div className="hidden md:flex items-center gap-10">
                    {["Home", "Menu", "Visit", "Catering", "Recipes", "Our Story"].map(
                        (item) => {
                            const isRecipes = item === "Recipes";
                            return isRecipes ? (
                                <Link
                                    key={item}
                                    to="/recipes"
                                    className={`font-medium tracking-wide font-['Playfair_Display'] uppercase transition-all duration-300 ${
                                        scrolled
                                            ? "text-[#330000] hover:text-[#7a1a1a] hover:underline underline-offset-4 decoration-[#7a1a1a]"
                                            : "text-[#C8B8AE] hover:text-[#EAE6D2] hover:underline underline-offset-4 decoration-[#EAE6D2]"
                                    }`}
                                >
                                    {item}
                                </Link>
                            ) : (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                                    className={`font-medium tracking-wide font-['Playfair_Display'] uppercase transition-all duration-300 ${
                                        scrolled
                                            ? "text-[#330000] hover:text-[#7a1a1a]"
                                            : "text-[#C8B8AE] hover:text-[#EAE6D2]"
                                    }`}
                                >
                                    {item}
                                </a>
                            );
                        }
                    )}

                    <a
                        href="#order-online"
                        className={`ml-4 px-6 py-1 rounded-full font-bold font-['Playfair_Display'] uppercase transition-all duration-300 ${
                            scrolled
                                ? "bg-transparent border border-[#330000] text-[#330000]"
                                : "bg-[#330000] text-[#EAE6D2] border border-[#EAE6D2] hover:bg-[#601f1f] shadow-md"
                        }`}
                    >
                        Order Now
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Header;
