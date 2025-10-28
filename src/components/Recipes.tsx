// import React, { useEffect, useRef, useState } from "react";
// import Header from "./layout/Header";
// import Footer from "./layout/Footer";
//
// // ——— Recipes data (your original) ———
// const recipeData = [
//     {
//         title: 'Breakfast',
//         image: '/images/recipes/Breakfast-Sampler.jpg',
//         pdfLinks: [
//             { name: 'Swedish Pancakes', url: 'pdfs/swedish-pancakes.pdf' },
//             { name: 'Hart-Shaped Waffles', url: 'pdfs/hart-shaped-waffles.pdf' },
//             { name: 'Bran Muffins', url: 'pdfs/bran-muffins.pdf' },
//             { name: 'Cinnamon Rolls', url: 'pdfs/cinnamon-rolls.pdf' },
//             { name: 'Powdered Sugar Glazes', url: 'pdfs/powdered-sugar-glazed.pdf' },
//         ],
//     },
//     {
//         title: 'Starters',
//         image: '/images/catering/AnnSather-Avocado-Wrap-S.jpg',
//         pdfLinks: [{ name: 'House Salad', url: 'pdfs/house-salad.pdf' }],
//     },
//     {
//         title: 'Sides',
//         image: '/images/catering/3egg_omelet.jpg',
//         pdfLinks: [{ name: 'Hash Browns', url: 'pdfs/hash-browns.pdf' }],
//     },
//     {
//         title: 'Entrees',
//         image: '/images/catering/AnnSather-Steak-&-Eggs 2-S.jpg',
//         pdfLinks: [{ name: 'Swedish Meatballs', url: 'pdfs/swedish-meatballs.pdf' }],
//     },
//     {
//         title: 'Desserts',
//         image: '/images/EFM-AnnSather_PICS/SwedishPancakes1.jpeg',
//         pdfLinks: [{ name: 'Pumpkin Squares', url: 'pdfs/pumpkin-squares.pdf' }],
//     },
// ];
//
//
// const Recipes = () => {
//     const [activeCard, setActiveCard] = useState<string | null>(null);
//     const sectionRef = useRef<HTMLDivElement | null>(null);
//     const [isVisible, setIsVisible] = useState(false);
//
//     // Fade-in when scrolled into view
//     useEffect(() => {
//         const el = sectionRef.current;
//         if (!el) return;
//         const obs = new IntersectionObserver(
//             ([entry]) => setIsVisible(entry.isIntersecting),
//             { threshold: 0.15 }
//         );
//         obs.observe(el);
//         return () => obs.disconnect();
//     }, []);
//
//     return (
//         <div className="bg-white min-h-screen text-[#601f1f]">
//             {/* 🔝 Header */}
//             <Header />
//
//             {/* 🧾 Recipes Section */}
//             <section
//                 id="recipes"
//                 ref={sectionRef}
//                 className="relative w-full bg-[#FFF] pt-28 pb-5 px-5  text-[#601f1f] overflow-hidden transition-opacity duration-1000"
//             >
//                 <div className={`faded-fixed-bg w-full ${isVisible ? "opacity-100" : "opacity-0"}`}>
//                     <div className="relative max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 text-[#601f1f]">
//                         {/* Section heading */}
//                         <div className="text-center mb-12">
//                             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#601f1f] pt-15  mb-6">Cooking at Home with Ann Sather</h2>
//
//                             <p className="max-w-5xl mx-auto text-lg mb-4 leading-relaxed">
//                                 Do you think it’s possible to replicate our much celebrated
//                                 cinnamon rolls, Swedish pancakes, roast duck, or one of our
//                                 delectable pies at home? We don’t think so either, but we’re
//                                 giving you the opportunity to try.
//                             </p>
//                             <p className="max-w-5xl mx-auto text-lg mb-10 leading-relaxed">
//                                 In 1994, Ann Sather’s restaurants published a 50th-anniversary
//                                 cookbook. Due to popular demand, we now have recipes for some of
//                                 our much-loved dishes available online. Download your favorites
//                                 below and get cooking!
//                             </p>
//                         </div>
//
//                         {/* 🧁 Recipe Cards Grid */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//                             {recipeData.map(({ title, pdfLinks }) => {
//                                 const isOpen = activeCard === title;
//                                 return (
//                                     <div
//                                         key={title}
//                                         onClick={() => setActiveCard(isOpen ? null : title)}
//                                         className={`relative bg-white rounded-xl overflow-hidden shadow-lg border border-[#e5d7c6] transition-all duration-500 cursor-pointer ${
//                                             isOpen ? "scale-105 shadow-2xl" : "hover:scale-105"
//                                         }`}
//                                     >
//
//                                         {/* Title Bar */}
//                                         <div className="bg-[#EAE6D2] text-[#601f1f] py-3 font-bold text-center uppercase">
//                                             {title}
//                                         </div>
//
//                                         {/* Expandable section */}
//                                         <div
//                                             className={`transition-all duration-500 overflow-hidden bg-[#faf8f5] text-center ${
//                                                 isOpen ? "max-h-96 py-4" : "max-h-0"
//                                             }`}
//                                         >
//                                             {pdfLinks.map(({ name, url }) => (
//                                                 <p key={name} className="mb-3">
//                                                     <a
//                                                         href={url}
//                                                         target="_blank"
//                                                         rel="noopener noreferrer"
//                                                         className="inline-block bg-white text-[#601f1f] font-medium py-1 px-4 rounded hover:bg-[#e2c08d] hover:text-[#330000] transition"
//                                                     >
//                                                         {name}
//                                                     </a>
//                                                 </p>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>
//             </section>
//
//             {/* 🔚 Footer */}
//             <Footer />
//         </div>
//     );
// };
//
// export default Recipes;



import React, { useEffect, useRef, useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

// ——— Recipes categories ———
const recipeData = [
    { title: "Breakfast" },
    { title: "Starters" },
    { title: "Sides" },
    { title: "Entrees" },
    { title: "Desserts" },
];

const Recipes: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
            {/* 🔝 Header */}
            <Header />

            {/* 🧾 Recipes Section */}
            <section
                id="recipes"
                ref={sectionRef}
                className="relative w-full bg-[#FFF] pt-28 pb-5 px-5 text-[#601f1f] overflow-hidden transition-opacity duration-1000"
            >
                <div
                    className={`faded-fixed-bg w-full transition-opacity duration-1000 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div className="relative max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 text-[#601f1f]">
                        {/* Section heading */}
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#601f1f] pt-15 mb-8">
                                Cooking at Home with Ann Sather
                            </h2>

                            <p className="max-w-4xl mx-auto text-lg mb-4 leading-relaxed">
                                Do you think it’s possible to replicate our much celebrated
                                cinnamon rolls, Swedish pancakes, roast duck, or one of our
                                delectable pies at home? We don’t think so either, but we’re
                                giving you the opportunity to try.
                            </p>
                            <p className="max-w-4xl mx-auto text-lg mb-10 leading-relaxed">
                                In 1994, Ann Sather’s restaurants published a 50th-anniversary
                                cookbook. Due to popular demand, we now have recipes for some of
                                our much-loved dishes available online. Browse through our
                                sections below to get inspired!
                            </p>
                        </div>

                        {/* 🧁 Recipe Categories Styled Like Menu Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
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

                        {/* Optional: Active category content (for future use) */}
                        {activeCategory && (
                            <div className="text-center mt-10">
                                <h3 className="text-xl font-bold uppercase mb-4">
                                    {activeCategory} Recipes Coming Soon
                                </h3>
                                <p className="max-w-3xl mx-auto text-lg text-[#601f1f]/80">
                                    We’re currently curating a collection of Ann Sather’s favorite
                                    {activeCategory.toLowerCase()} recipes — stay tuned!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 🔚 Footer */}
            <Footer />
        </div>
    );
};

export default Recipes;




// ——— Recipes data (your original) ———
// const recipeData = [
//     {
//         title: 'Breakfast',
//         image: '/images/recipes/Breakfast-Sampler.jpg',
//         pdfLinks: [
//             { name: 'Swedish Pancakes', url: 'pdfs/swedish-pancakes.pdf' },
//             { name: 'Hart-Shaped Waffles', url: 'pdfs/hart-shaped-waffles.pdf' },
//             { name: 'Bran Muffins', url: 'pdfs/bran-muffins.pdf' },
//             { name: 'Cinnamon Rolls', url: 'pdfs/cinnamon-rolls.pdf' },
//             { name: 'Powdered Sugar Glazes', url: 'pdfs/powdered-sugar-glazed.pdf' },
//         ],
//     },
//     {
//         title: 'Starters',
//         image: '/images/catering/AnnSather-Avocado-Wrap-S.jpg',
//         pdfLinks: [{ name: 'House Salad', url: 'pdfs/house-salad.pdf' }],
//     },
//     {
//         title: 'Sides',
//         image: '/images/catering/3egg_omelet.jpg',
//         pdfLinks: [{ name: 'Hash Browns', url: 'pdfs/hash-browns.pdf' }],
//     },
//     {
//         title: 'Entrees',
//         image: '/images/catering/AnnSather-Steak-&-Eggs 2-S.jpg',
//         pdfLinks: [{ name: 'Swedish Meatballs', url: 'pdfs/swedish-meatballs.pdf' }],
//     },
//     {
//         title: 'Desserts',
//         image: '/images/EFM-AnnSather_PICS/SwedishPancakes1.jpeg',
//         pdfLinks: [{ name: 'Pumpkin Squares', url: 'pdfs/pumpkin-squares.pdf' }],
//     },
// ];
