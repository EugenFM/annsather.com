import React, { useState } from 'react';
import { Search, Filter, Sparkles, Star, Pizza, Hamburger, Salad } from 'lucide-react';

// This is the enhanced menu header component, now with a Swedish-inspired color theme.
// The colors and layout are adjusted to match the style of your CompleteMenu component.
const CompactHeader = ({
                                featuredItems,
                                searchTerm,
                                setSearchTerm,
                                priceFilter,
                                setPriceFilter,
                            }) => {
    return (
        <div className="bg-blue-900 text-white shadow-lg p-4 md:p-6 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Top Row: Main title and primary actions */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    {/* Title and Subtitle */}
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold text-white tracking-tight">Our Menu</h1>
                        <p className="flex items-center justify-center md:justify-start gap-2 text-blue-200 mt-1">
                            <Sparkles size={18} className="text-yellow-400" />
                            <span>Authentic Swedish Cuisine</span>
                        </p>
                    </div>

                    {/* Search & Filter Controls */}
                    <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                        {/* Search Input */}
                        <div className="relative flex-grow">
                            <Search
                                size={18}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300"
                            />
                            <input
                                type="text"
                                placeholder="Search menu..."
                                className="w-full bg-blue-800/60 border border-blue-700 text-white placeholder-blue-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Price Filter */}
                        <div className="relative">
                            <Filter
                                size={18}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300"
                            />
                            <select
                                className="appearance-none w-full bg-blue-800/60 border border-blue-700 text-white rounded-md py-2 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(e.target.value)}
                            >
                                <option value="all">Price</option>
                                <option value="under10">Under $10</option>
                                <option value="under15">Under $15</option>
                                <option value="over15">$15+</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Customer Favorites */}
                <div className="border-t border-blue-700/70 pt-4">
                    <h3 className="flex items-center gap-2 text-xl font-semibold text-yellow-400 mb-3">
                        Customer Favorites
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {featuredItems.map(({ title, price, icon: Icon }) => (
                            <div
                                key={title}
                                className="flex items-center justify-between gap-3 shrink-0 bg-white/10 backdrop-blur rounded-lg px-4 py-3 hover:bg-white/20 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center">
                                    <Icon size={18} className="text-yellow-400 mr-3" />
                                    <p className="font-medium text-white whitespace-nowrap">{title}</p>
                                </div>
                                <p className="text-yellow-400 font-bold ml-2">{price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompactHeader;