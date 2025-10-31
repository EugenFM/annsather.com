import React from "react";
import { Star, Heart } from "lucide-react";

interface MenuItem {
    title: string;
    description: string;
    price: string;
    image: string;
    popular?: boolean;
}

interface MenuHighlightsProps {
    menuHighlights: MenuItem[];
}

const MenuHighlights: React.FC<MenuHighlightsProps> = ({ menuHighlights }) => {
    return (
        <section
            id="menu"
            className="scroll-mt-20 relative w-full bg-[#FFF] p-5 px-5 text-white overflow-hidden"
        >
            <div className="striped-bg w-full h-full">
                <div className="max-w-7xl mx-auto pb-20 px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#601f1f] pt-15 pb-5 mb-4">
                            Menu Favorites
                        </h2>
                        <p className="text-xl text-[#601f1f] pb-2">
                            From Swedish classics to American breakfast favorites
                        </p>
                    </div>

                    {/* Menu Items Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {menuHighlights.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                            >
                                <div className="relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-60 object-cover"
                                    />
                                    {item.popular && (
                                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                                            <Star size={14} className="mr-1" fill="white" />
                                            Popular
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <h3 className="text-xl font-bold text-[#601f1f] mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#601f1f] mb-4">{item.description}</p>
                                    <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-[#601f1f]">
                      {item.price}
                    </span>
                                        <button className="text-red-500 hover:text-red-600 transition-colors">
                                            <Heart size={24} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MenuHighlights;
