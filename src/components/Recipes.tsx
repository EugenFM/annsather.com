// import React, { useEffect, useRef, useState } from "react";
// import Header from "./layout/Header";
// import Footer from "./layout/Footer";
//
// const recipeData = [
//     {
//         title: "Breakfast",
//         image: "src/assets/images/recipes/Breakfast-Sampler.jpg",
//         pdfLinks: [
//             { name: "Swedish Pancakes", url: "pdfs/swedish-pancakes.pdf" },
//             { name: "Heart-Shaped Waffles", url: "pdfs/hart-shaped-waffles.pdf" },
//             { name: "Bran Muffins", url: "pdfs/bran-muffins.pdf" },
//             { name: "Cinnamon Rolls", url: "pdfs/cinnamon-rolls.pdf" },
//             { name: "Powdered Sugar Glazes", url: "pdfs/powdered-sugar-glazed.pdf" },
//         ],
//     },
//     {
//         title: "Starters",
//         image: "src/assets/images/catering/AnnSather-Avocado Wrap-S.jpg",
//         pdfLinks: [{ name: "House Salad", url: "pdfs/house-salad.pdf" }],
//     },
//     {
//         title: "Sides",
//         image: "src/assets/images/catering/3egg_omelet.jpg",
//         pdfLinks: [{ name: "Hash Browns", url: "pdfs/hash-browns.pdf" }],
//     },
//     {
//         title: "Entrees",
//         image: "src/assets/images/catering/AnnSather-Steak & Eggs 2-S.jpg",
//         pdfLinks: [{ name: "Swedish Meatballs", url: "pdfs/swedish-meatballs.pdf" }],
//     },
//     {
//         title: "Desserts",
//         image: "src/assets/images/recipes/SwedishPancakes.jpg",
//         pdfLinks: [{ name: "Pumpkin Squares", url: "pdfs/pumpkin-squares.pdf" }],
//     },
// ];
//
// const Recipes = () => {
//     const [activeCard, setActiveCard] = useState<string | null>(null);
//     const sectionRef = useRef<HTMLDivElement | null>(null);
//
//     // Fade-in when scrolled into view
//     const [isVisible, setIsVisible] = useState(false);
//     useEffect(() => {
//         const el = sectionRef.current;
//         if (!el) return;
//         const obs = new IntersectionObserver(([entry]) => {
//             setIsVisible(entry.isIntersecting);
//         }, { threshold: 0.15 });
//         obs.observe(el);
//         return () => obs.disconnect();
//     }, []);
//
//     return (
//         <section
//             id="recipes"
//             ref={sectionRef}
//
//             className={"pb-5 bg-white px-5 text-[#601f1f]"}
//         >
//             <div className="striped-bg">
//
//                 <div className="max-w-7xl mx-auto px-4 pb-10 sm:px-6 lg:px-8">
//
//                     <div className="text-center mb-12 pt-10">
//                         <h2 className="text-4xl font-bold  mb-4">Cooking at Home with Ann Sather</h2>
//                         <p className="max-w-5xl mx-auto text-lg mb-4 leading-relaxed">
//                             Do you think it’s possible to replicate our much celebrated cinnamon
//                             rolls, Swedish pancakes, roast duck or one of our delectable pies at
//                             home? We don’t think so either, but we’re giving you the opportunity
//                             to try.
//                         </p>
//                         <p className="max-w-5xl mx-auto text-lg mb-10 leading-relaxed">
//                             In 1994, Ann Sather’s restaurants published a 50th-anniversary
//                             cookbook. Due to popular demand, we now have recipes for some of our
//                             much-loved dishes available online. Download your favorites below and
//                             get cooking!
//                         </p>
//                     </div>
//
//             </div>
//
//             {/* Grid of expandable cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//                 {recipeData.map(({ title, pdfLinks }) => {
//                     const isOpen = activeCard === title;
//                     return (
//                         <div
//                             key={title}
//                             onClick={() =>
//                                 setActiveCard(isOpen ? null : title)
//                             }
//                             className={`relative bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg transition-all duration-500 cursor-pointer ${
//                                 isOpen ? "scale-105 shadow-2xl" : "hover:scale-105"
//                             }`}
//                         >
//                             {/* Card header (image + title) */}
//                             {/*<img*/}
//                             {/*    src={image}*/}
//                             {/*    alt={title}*/}
//                             {/*    className="w-full h-56 object-cover"*/}
//                             {/*/>*/}
//                             <div className="bg-[#EAE6D2] text-gray-900 py-3 font-bold text-center uppercase">
//                                 {title}
//                             </div>
//
//                             {/* Expandable content */}
//                             <div
//                                 className={`transition-all duration-500 overflow-hidden bg-white/10 text-white text-center ${
//                                     isOpen ? "max-h-96 py-4" : "max-h-0"
//                                 }`}
//                             >
//                                 {pdfLinks.map(({ name, url }) => (
//                                     <p key={name} className="mb-3">
//                                         <a
//                                             href={url}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="inline-block bg-white text-blue-900 font-medium py-1 px-4 rounded hover:bg-yellow-400 hover:text-blue-900 transition"
//                                         >
//                                             {name}
//                                         </a>
//                                     </p>
//                                 ))}
//                             </div>
//                         </div>
//                     );
//                 })}
//               </div>
//             </div>
//         </section>
//     );
// };
//
// export default Recipes;

import React, { useEffect, useRef, useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const recipeData = [
    {
        title: "Breakfast",
        image: "src/assets/images/recipes/Breakfast-Sampler.jpg",
        pdfLinks: [
            { name: "Swedish Pancakes", url: "pdfs/swedish-pancakes.pdf" },
            { name: "Heart-Shaped Waffles", url: "pdfs/hart-shaped-waffles.pdf" },
            { name: "Bran Muffins", url: "pdfs/bran-muffins.pdf" },
            { name: "Cinnamon Rolls", url: "pdfs/cinnamon-rolls.pdf" },
            { name: "Powdered Sugar Glazes", url: "pdfs/powdered-sugar-glazed.pdf" },
        ],
    },
    {
        title: "Starters",
        image: "src/assets/images/catering/AnnSather-Avocado Wrap-S.jpg",
        pdfLinks: [{ name: "House Salad", url: "pdfs/house-salad.pdf" }],
    },
    {
        title: "Sides",
        image: "src/assets/images/catering/3egg_omelet.jpg",
        pdfLinks: [{ name: "Hash Browns", url: "pdfs/hash-browns.pdf" }],
    },
    {
        title: "Entrees",
        image: "src/assets/images/catering/AnnSather-Steak & Eggs 2-S.jpg",
        pdfLinks: [{ name: "Swedish Meatballs", url: "pdfs/swedish-meatballs.pdf" }],
    },
    {
        title: "Desserts",
        image: "src/assets/images/recipes/SwedishPancakes.jpg",
        pdfLinks: [{ name: "Pumpkin Squares", url: "pdfs/pumpkin-squares.pdf" }],
    },
];

const Recipes = () => {
    const [activeCard, setActiveCard] = useState<string | null>(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Fade-in when scrolled into view
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div className="bg-white min-h-screen text-[#601f1f]">
            {/* 🔝 Fixed site header */}
            <Header />

            {/* 🧾 Main content */}
            <main className="pt-28 pb-16" ref={sectionRef}>
                <section
                    id="recipes"
                    className={`transition-opacity duration-1000 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div className="max-w-7xl mx-auto px-5">
                        <div className="text-center mb-12 pt-10">
                            <h2 className="text-4xl font-bold mb-4">
                                Cooking at Home with Ann Sather
                            </h2>
                            <p className="max-w-4xl mx-auto text-lg mb-4 leading-relaxed">
                                Do you think it’s possible to replicate our much celebrated
                                cinnamon rolls, Swedish pancakes, roast duck or one of our
                                delectable pies at home? We don’t think so either, but we’re
                                giving you the opportunity to try.
                            </p>
                            <p className="max-w-4xl mx-auto text-lg mb-10 leading-relaxed">
                                In 1994, Ann Sather’s restaurants published a 50th-anniversary
                                cookbook. Due to popular demand, we now have recipes for some of
                                our much-loved dishes available online. Download your favorites
                                below and get cooking!
                            </p>
                        </div>

                        {/* 🧁 Recipe Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {recipeData.map(({ title, pdfLinks }) => {
                                const isOpen = activeCard === title;
                                return (
                                    <div
                                        key={title}
                                        onClick={() =>
                                            setActiveCard(isOpen ? null : title)
                                        }
                                        className={`relative bg-white rounded-xl overflow-hidden shadow-lg border border-[#e5d7c6] transition-all duration-500 cursor-pointer ${
                                            isOpen ? "scale-105 shadow-2xl" : "hover:scale-105"
                                        }`}
                                    >
                                        <div className="bg-[#EAE6D2] text-gray-900 py-3 font-bold text-center uppercase">
                                            {title}
                                        </div>

                                        {/* Expandable section */}
                                        <div
                                            className={`transition-all duration-500 overflow-hidden bg-[#faf8f5] text-center ${
                                                isOpen ? "max-h-96 py-4" : "max-h-0"
                                            }`}
                                        >
                                            {pdfLinks.map(({ name, url }) => (
                                                <p key={name} className="mb-3">
                                                    <a
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-block bg-white text-[#601f1f] font-medium py-1 px-4 rounded hover:bg-[#e2c08d] hover:text-[#330000] transition"
                                                    >
                                                        {name}
                                                    </a>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>

            {/* 🔚 Footer */}
            <Footer />
        </div>
    );
};

export default Recipes;
