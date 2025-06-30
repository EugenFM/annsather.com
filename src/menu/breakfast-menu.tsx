import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Filter, Coffee, Utensils, Star, ChevronRight, Clock, ChevronDown, Sparkles } from 'lucide-react';
import CompactHeader from '../menu/CompactHeader.jsx';
import {authedGet, publicGet} from "../utils/apiClient.ts";

// Menu data (keeping the same)
const menuData = {
    "Breakfast": {
        "EGGS BENEDICT": [
            { title: "Traditional Benedict", price: "$16.00" },
            { title: "Steak & Eggs Benedict", price: "$17.50" },
            { title: "Crab Cake Benedict", price: "$16.50" },
            { title: "Smoked Salmon Benedict", price: "$17.50" },
            { title: "Veggie Florentine", price: "$15.50" },
            { title: "Southern Decadence", price: "$16.50" }
        ],
        "THREE EGG OMELETS": [
            { title: "Build Your Own Omelet", price: "$14.95" },
            { title: "Denver Omelet", price: "$15.45" },
            { title: "Mexican Omelet", price: "$16.50" },
            { title: "V-4 Omelet", price: "$16.50" },
            { title: "Garden Omelet", price: "$15.25" },
            { title: "Mediterranean Omelet", price: "$16.50" },
            { title: "Salmon Dill Omelet", price: "$17.50" },
            { title: "Chicken Fajita Omelet", price: "$17.50" }
        ],
        "EGGS": [
            { title: "Two Eggs, Any Style", price: "$13.25" },
            { title: "With Corned Beef Hash", price: "$17.45" },
            { title: "With Bacon or Sausage", price: "$14.45" },
            { title: "With Country Ham", price: "$14.45" },
            { title: "With Chicken Basil Sausage", price: "$14.75" },
            { title: "With Swedish Potato Sausage", price: "$15.00" },
            { title: "With Beef Steak", price: "$17.50" }
        ],
        "BREAKFAST WRAPS": [
            { title: "Sausage, Egg and Cheese Wrap", price: "$15.25" },
            { title: "Bacon, Egg and Cheese Wrap", price: "$15.25" },
            { title: "Ham, Egg and Cheese Wrap", price: "$15.25" },
            { title: "Avocado Delight Wrap", price: "$16.25" },
            { title: "Sunrise Breakfast Wrap", price: "$16.45" },
            { title: "Build Your Own Wrap", price: "$14.95" }
        ],
        "PANCAKES, WAFFLES & MORE": [
            { title: "Swedish Pancakes with Lingonberries", price: "$13.50" },
            { title: "Two Swedish Pancakes with Two Eggs Any Style", price: "$14.50" },
            { title: "Two Swedish Pancakes with Two Swedish Meatballs", price: "$14.50" },
            { title: "Potato Pancakes with Apple Sauce", price: "$13.95" },
            { title: "Homemade French Toast", price: "$13.95" },
            { title: "Swedish Waffles", price: "$13.95" },
            { title: "Biscuits and Gravy with Sausage Patties", price: "$13.95" }
        ],
        "A LA CARTE": [
            { title: "3 Slices Extra Lean Bacon", price: "$3.95" },
            { title: "2 Chicken Basil Sausage Links", price: "$4.50" },
            { title: "Country Ham", price: "$4.25" },
            { title: "2 Sausage Patties", price: "$3.95" },
            { title: "2 Sausage Links", price: "$3.95" },
            { title: "3 Turkey Sausage Links", price: "$4.25" },
            { title: "Swedish Potato Sausage", price: "$4.25" },
            { title: "Homemade Hash Browns", price: "$3.25" },
            { title: "2 Homemade Cinnamon Rolls", price: "$4.75" },
            { title: "2 Hot Biscuits with Honey", price: "$4.25" },
            { title: "Sliced Avocado", price: "$3.75" },
            { title: "Pecan Roll", price: "$4.25" },
            { title: "Sweet Muffin", price: "$2.75" },
            { title: "Toast", price: "$2.95" }
        ],
        "FRUIT & CEREAL": [
            { title: "Fresh Fruit Bowl", price: "$7.50" },
            { title: "Small Fruit Cup", price: "$4.50" },
            { title: "Granola with Fresh Fruit", price: "$9.50" },
            { title: "Granola with Milk or Yogurt", price: "$9.50" },
            { title: "Granola with Fresh Fruit and Yogurt", price: "$11.50" },
            { title: "Hot Oatmeal", price: "$6.95" },
            { title: "Rice Porridge", price: "$6.95" }
        ],
        "BEVERAGES": [
            { title: "Bottomless Coffee, Regular or Decaffeinated", price: "$3.50" },
            { title: "Hot Tea", price: "$3.50" },
            { title: "Soda or Iced Tea", price: "$3.50" },
            { title: "Fresh Orange Juice", price: "$3.75" },
            { title: "Fresh Grapefruit Juice", price: "$3.75" },
            { title: "Apple, Tomato or Cranberry Juice", price: "$3.50" },
            { title: "White or Chocolate Milk", price: "$3.50" },
            { title: "Fresh Strawberry, Orange, Banana Juice", price: "$4.25" }
        ]
    },
    "Lunch": {
        "HOT SANDWICHES": [
            { title: "Build Your Own Burger", price: "$12.50" },
            { title: "Open Face Sandwiches", price: "$13.50" },
            { title: "Reuben Sandwich", price: "$13.50" },
            { title: "Tuna Melt Sandwich", price: "$13.50" }
        ],
        "COLD SANDWICHES": [
            { title: "Chicken Salad Sandwich", price: "$12.50" },
            { title: "Classic BLT Sandwich", price: "$11.95" },
            { title: "Made to Order Egg Salad Sandwich", price: "$11.50" },
            { title: "Roasted Veggie and Hummus Sandwich", price: "$11.95" },
            { title: "White Albacore Tuna Salad Sandwich", price: "$12.50" }
        ],
        "SOUPS AND SALADS": [
            { title: "Soup of the Day", price: "$4.95" },
            { title: "Vegetarian Chili", price: "$6.95" },
            { title: "Hearts Delight Salad", price: "$13.50" },
            { title: "Broiled Salmon Salad", price: "$16.95" },
            { title: "Southwest Chicken Salad", price: "$15.95" },
            { title: "Fresh Fruit and Chicken Salad", price: "$14.95" },
            { title: "Grilled Chicken Breast Salad", price: "$15.95" },
            { title: "Caesar Tortellini Salad", price: "$14.95" }
        ]
    },
    "Specials": {
        "BREAKFAST SPECIALS": [
            { title: "Swedish Breakfast Sampler", price: "$16.45", featured: true },
            { title: "French Toast Fantasy", price: "$14.50", featured: true },
            { title: "Monte Cristo Breakfast", price: "$16.45" },
            { title: "Bacon Cheddar Potato Pancakes", price: "$15.45" },
            { title: "Ann's Darling", price: "$12.95" },
            { title: "Lumberjack Wrap", price: "$15.45" },
            { title: "Turkey Gobbler Wrap", price: "$15.95" },
            { title: "Breakfast Sandwich", price: "$15.95" }
        ],
        "LUNCH SPECIALS": [
            { title: "Soup and Half a Cold Sandwich", price: "$12.95" },
            { title: "Vegetarian Chili and Half a Cold Sandwich", price: "$13.75" },
            { title: "Spinach Salad", price: "$13.75" },
            { title: "Turkey Club", price: "$14.50" },
            { title: "Deluxe Garden Salad", price: "$9.75" }
        ]
    },
    "Entrees": {
        "ANN'S CLASSIC ENTRÉES": [
            { title: "Tom Turkey Dinner", price: "$16.75" },
            { title: "Broiled Salmon", price: "$18.00" },
            { title: "Crab Cakes", price: "$17.75" },
            { title: "Swedish Meatballs", price: "$15.50", featured: true },
            { title: "Grilled Breast of Chicken", price: "$16.25" }
        ]
    }
};



const CompleteMenu = () => {
    const [menuData, setMenuData] = useState({});
    const [isLoadingMenu, setIsLoadingMenu] = useState(true);
    const [menuError, setMenuError] = useState('');
    const [activeCategory, setActiveCategory] = useState('Breakfast');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedSections, setExpandedSections] = useState({});
    const [priceFilter, setPriceFilter] = useState('all');

    const menuSectionRef = useRef(null);
    const headerRef = useRef(null);

    // This is the assumed height of a global navigation bar, if any.
    // The sticky header will stick below this.
    const TOP_NAV_HEIGHT = 80; // Set to your global nav height, e.g., 80

    const [headerHeight, setHeaderHeight] = useState(0);

    // Featured items for quick access
// Dynamically extract featured items from loaded data
    const featuredItems = useMemo(() => {
        const items = [];
        Object.entries(menuData).forEach(([category, sections]) => {
            Object.entries(sections).forEach(([section, sectionItems]) => {
                sectionItems.forEach(item => {
                    if (item.featured) {
                        items.push({
                            ...item,
                            category,
                            icon: item.title.includes('Cinnamon') ? Sparkles : Star
                        });
                    }
                });
            });
        });
        return items.slice(0, 3); // Return top 3 featured items
    }, [menuData]);

    // Measure header height
    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }
    }, [searchTerm, priceFilter]); // Re-calculate if content changes


    // Fetch menu data on component mount
    useEffect(() => {
        const fetchAllMenuData = async () => {
            setIsLoadingMenu(true);
            setMenuError('');

            const mealTypes = ['Breakfast', 'Lunch', 'Specials', 'Entrees'];
            const fetchedData = {};

            try {
                // Fetch data for each meal type
                for (const mealType of mealTypes) {
                    const operation = await publicGet(`/menu/${mealType}`);
                    const response = await operation.response;
                    const data = await response.body.json();

                    // Transform the flat array into the nested structure expected by the component
                    const categorizedData = {};
                    data.forEach(item => {
                        const category = item.category;
                        if (!categorizedData[category]) {
                            categorizedData[category] = [];
                        }
                        categorizedData[category].push({
                            title: item.title,
                            price: Number(item.price),
                            featured: item.featured || false,
                            description: item.description || ''
                        });
                    });

                    fetchedData[mealType] = categorizedData;
                }

                setMenuData(fetchedData);
            } catch (err) {
                console.error('Error fetching menu data:', err);
                setMenuError('Failed to load menu items. Please try again later.');
            } finally {
                setIsLoadingMenu(false);
            }
        };

        fetchAllMenuData();
    }, []);

    // Handle category change and scroll to the top of the menu section
    const handleCategoryChange = (category) => {
        setActiveCategory(category);

        const menuSection = menuSectionRef.current;
        if (!menuSection) return;

        // Scroll to the top of the menu container, accounting for the sticky header
        const scrollPosition = menuSection.offsetTop - headerHeight - TOP_NAV_HEIGHT;

        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    };

    // Toggle section expansion
    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Auto-expand first section of active category on change
    useEffect(() => {
        if (filteredMenu[activeCategory]) {
            const firstSection = Object.keys(filteredMenu[activeCategory])[0];
            if (firstSection) {
                setExpandedSections(prev => ({
                    // ...prev, // Uncomment to keep other sections open
                    [`${activeCategory}-${firstSection}`]: true
                }));
            }
        }
    }, [activeCategory]);
    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
            .format(amount); // → $1,234.00
    // Filter menu items based on search and price
    const filteredMenu = useMemo(() => {
        const filtered = {};
        Object.entries(menuData).forEach(([category, sections]) => {
            const filteredSections = {};
            Object.entries(sections).forEach(([section, items]) => {
                const filteredItems = items.filter(item => {
                    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
                    let matchesPrice = true;
                    if (priceFilter !== 'all') {
                        const price = parseFloat(item.price.replace('$', ''));
                        if (priceFilter === 'under10') matchesPrice = price < 10;
                        else if (priceFilter === 'under15') matchesPrice = price < 15;
                        else if (priceFilter === 'over15') matchesPrice = price >= 15;
                    }
                    return matchesSearch && matchesPrice;
                });
                if (filteredItems.length > 0) {
                    filteredSections[section] = filteredItems;
                }
            });
            if (Object.keys(filteredSections).length > 0) {
                filtered[category] = filteredSections;
            }
        });
        return filtered;
    }, [menuData, searchTerm, priceFilter]);

    // Get icon for category
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Breakfast': return Coffee;
            case 'Lunch': return Utensils;
            case 'Specials': return Star;
            case 'Entrees': return Utensils;
            default: return Coffee;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Add loading state */}
            {isLoadingMenu && (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-900"></div>
                </div>
            )}

            {/* Add error state */}
            {menuError && (
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {menuError}
                    </div>
                </div>
            )}
            {!isLoadingMenu && !menuError && (
                <>
            {/* Sticky Header Section */}
            {/* This div will stick to the top of the viewport when scrolling */}
            <div
                ref={headerRef}
                className="sticky z-40"
                style={{ top: `${TOP_NAV_HEIGHT}px` }}
            >
                <CompactHeader
                    featuredItems={featuredItems}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    priceFilter={priceFilter}
                    setPriceFilter={setPriceFilter}
                />
            </div>

            {/* Menu Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8" ref={menuSectionRef}>

                    {/* Category Navigation (Sidebar) */}
                    <div className="lg:w-64">
                        <div
                            className="sticky"
                            style={{ top: `${headerHeight + TOP_NAV_HEIGHT + 24}px` }}
                        >
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                            <nav className="space-y-2">
                                {Object.keys(menuData).map((category) => {
                                    const Icon = getCategoryIcon(category);
                                    return (
                                        <button
                                            key={category}
                                            onClick={() => handleCategoryChange(category)}
                                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-all duration-200 ${
                                                activeCategory === category
                                                    ? 'bg-blue-900 text-white shadow-lg'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                            }`}
                                        >
                                            <div className="flex items-center">
                                                <Icon size={20} className="mr-3" />
                                                <span className="font-medium">{category}</span>
                                            </div>
                                            <ChevronRight size={20} className={activeCategory === category ? 'text-yellow-400' : 'text-gray-400'} />
                                        </button>
                                    );
                                })}
                            </nav>

                            {/* Hours Info */}
                            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center mb-2">
                                    <Clock className="text-blue-900 mr-2" size={20} />
                                    <h4 className="font-bold text-blue-900">Hours</h4>
                                </div>
                                <p className="text-sm text-blue-800">Daily: 7 AM - 3 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="flex-1 min-h-screen">
                        {Object.keys(filteredMenu).length === 0 && (
                            <div className="text-center py-16 bg-white rounded-lg shadow-md">
                                <p className="text-gray-500 text-lg font-semibold">No menu items found.</p>
                                <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
                            </div>
                        )}

                        {Object.entries(filteredMenu).map(([category, sections]) => (
                            <div
                                key={category}
                                className={`${activeCategory === category ? 'block' : 'hidden'}`}
                            >
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{category}</h2>
                                    <p className="text-gray-600">
                                        {category === 'Breakfast' && 'Start your day with our hearty breakfast selections'}
                                        {category === 'Lunch' && 'Delicious lunch options to satisfy your midday cravings'}
                                        {category === 'Specials' && 'Chef\'s special creations and seasonal favorites'}
                                        {category === 'Entrees' && 'Classic Ann Sather entrées made with love'}
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {Object.entries(sections).map(([section, items]) => (
                                        <div key={section} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/80">
                                            <button
                                                onClick={() => toggleSection(`${category}-${section}`)}
                                                className="w-full px-6 py-4 bg-white hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-xl font-bold text-blue-900">{section}</h3>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-600 mr-3">{items.length} items</span>
                                                        <ChevronDown
                                                            className={`text-blue-900 transform transition-transform duration-300 ${
                                                                expandedSections[`${category}-${section}`] ? 'rotate-180' : ''
                                                            }`}
                                                            size={24}
                                                        />
                                                    </div>
                                                </div>
                                            </button>

                                            <div className={`transition-all duration-500 ease-in-out ${
                                                expandedSections[`${category}-${section}`] ? 'max-h-[2000px]' : 'max-h-0'
                                            } overflow-hidden`}>
                                                <div className="p-6 pt-0 space-y-4">
                                                    {items.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex justify-between items-start py-3 border-t border-gray-100"
                                                        >
                                                            <div className="flex-1 pr-4">
                                                                <h4 className="font-semibold text-gray-900 flex items-center">
                                                                    {item.title}
                                                                    {item.featured && (
                                                                        <Star className="ml-2 text-yellow-500" size={16} fill="currentColor" />
                                                                    )}
                                                                </h4>
                                                                {item.description && (
                                                                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                                                )}
                                                            </div>
                                                            <span className="text-lg text-black-700">{formatCurrency(item.price)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

                </>
            )}
        </div>
    );
};

export default CompleteMenu;