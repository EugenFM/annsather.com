import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {setMenuOpen(!menuOpen)}

    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // ✅ Handles logo click from any route
    const handleLogoClick = () => {
        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/");
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }, 400);
        }
    };

    // ✅ Helper for scrolling to section
    const handleSectionClick = (id: string) => {
        const hash = `#${id.toLowerCase().replace(" ", "-")}`;

        if (location.pathname === "/") {
            const el = document.querySelector(hash);
            if (el) {
                const offset = 90;
                const top = el.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: "smooth" });
            }
        } else {
            navigate("/");
            setTimeout(() => {
                const el = document.querySelector(hash);
                if (el) {
                    const offset = 90;
                    const top = el.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: "smooth" });
                }
            }, 400);
        }
    };

    return (
        <nav
            className={`flex items-center fixed w-full z-50 transition-all duration-300 ${
                scrolled ? "bg-white py-4" : "bg-[#330000] py-4"
            }`}
        >
            {/* Left: Logo */}
            <div className="w-60 pl-4">
                <button
                    onClick={handleLogoClick}
                    className="focus:outline-none cursor-pointer text-left"
                >
                    <h2
                        className={`text-2xl md:text-2xl font-['Playfair_Display'] leading-tight transition-all duration-300 ${
                            scrolled
                                ? "text-[#330000]"
                                : "text-[#EAE6D2]"
                        }`}
                    >
                        Ann Sather
                        <br />
                        <span className="text-base md:text-lg leading-tight">
                            Restaurants & Catering
                        </span>
                    </h2>
                </button>
            </div>

            {/* Right: Navigation */}
            <div className="flex-1 flex justify-end items-center gap-10 pr-8">

                {/* Desktop navigation */}
                <div className="hidden md:flex items-center gap-10">
                    {["Home", "Menu", "Visit", "Catering", "Recipes", "Our Story"].map((item) => {
                        const isRecipes = item === "Recipes";
                        const isMenu = item === "Menu";

                        if (isRecipes) {
                            // Recipes -> its own page
                            return (
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
                            );
                        }

                        if (isMenu) {
                            // Menu -> new /menu page
                            return (
                                <Link
                                    key={item}
                                    to="/menu"
                                    className={`font-medium tracking-wide font-['Playfair_Display'] uppercase transition-all duration-300 ${
                                        scrolled
                                            ? "text-[#330000] hover:text-[#7a1a1a] hover:underline underline-offset-4 decoration-[#7a1a1a]"
                                            : "text-[#C8B8AE] hover:text-[#EAE6D2] hover:underline underline-offset-4 decoration-[#EAE6D2]"
                                    }`}
                                >
                                    {item}
                                </Link>
                            );
                        }

                        // Others still scroll within the SPA
                        return (
                            <button
                                key={item}
                                onClick={() => handleSectionClick(item)}
                                className={`font-medium tracking-wide font-['Playfair_Display'] uppercase cursor-pointer transition-all duration-300 ${
                                    scrolled
                                        ? "text-[#330000] hover:text-[#7a1a1a]"
                                        : "text-[#C8B8AE] hover:text-[#EAE6D2]"
                                }`}
                            >
                                {item}
                            </button>
                        );
                    })}

                {/* Order Now button */}
                    <button
                        onClick={() => handleSectionClick("order-online")}
                        className={`ml-4 px-6 py-1 rounded-full font-bold font-['Playfair_Display'] uppercase cursor-pointer transition-all duration-300 ${
                            scrolled
                                ? "bg-transparent border border-[#330000] text-[#330000]"
                                : "bg-[#330000] text-[#EAE6D2] border border-[#EAE6D2] hover:bg-[#601f1f]"
                        }`}>
                        Order Now
                    </button>
                </div>

                {/* Toggle button for tablet & mobile */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={`md:hidden mr-4 focus:outline-none cursor-pointer transition-colors duration-300 ${
                        scrolled ? "text-[#330000]" : "text-[#EAE6D2]"
                    }`}
                >
                    {menuOpen ? (
                        // Close icon (X)
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        // Hamburger icon
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                {/* Mobile dropdown */}
                {menuOpen && (
                    <div
                        className={`absolute top-full left-0 w-full flex flex-col items-center gap-3 py-4 md:hidden transition-all duration-300 ${
                            scrolled ? "bg-white text-[#330000]" : "bg-[#330000] text-[#EAE6D2]"
                        }`}
                    >
                        {["Home", "Menu", "Visit", "Catering", "Recipes", "Our Story"].map((item) => (
                            <button
                                key={item}
                                onClick={() => {
                                    if (item === "Home") {
                                        handleLogoClick();
                                    } else if (item === "Menu") {
                                        navigate("/menu");
                                    } else if (item === "Recipes") {
                                        navigate("/recipes");
                                    } else {
                                        handleSectionClick(item);
                                    }
                                    setMenuOpen(false);
                                }}
                                className="text-base uppercase font-['Playfair_Display'] hover:opacity-80 cursor-pointer transition-opacity duration-200"
                            >
                                {item}
                            </button>
                        ))}


                        <button
                            onClick={() => {
                                handleSectionClick("order-online");
                                setMenuOpen(false);
                            }}
                            className={`mt-2 px-5 py-1 rounded-full border font-bold uppercase font-['Playfair_Display'] cursor-pointer transition-all duration-200 ${
                                scrolled
                                    ? "border-[#330000] text-[#330000] hover:bg-[#f5f5f5]"
                                    : "border-[#EAE6D2] text-[#EAE6D2] hover:bg-[#601f1f]"
                            }`}
                        >
                            Order Now
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
