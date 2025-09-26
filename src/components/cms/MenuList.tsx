import { useState } from 'react';
import { Edit, Trash2, ChevronDown } from 'lucide-react';

const MenuList = ({ items, onEdit, onDelete, isLoading }) => {
    // State to track which category accordion is open
    const [openCategory, setOpenCategory] = useState(null);

    // Group items by category. This creates an object where keys are categories
    // and values are arrays of items belonging to that category.
    const groupedItems = items.reduce((acc, item) => {
        const category = item.category || 'Uncategorized'; // Fallback for items without a category
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {});

    // This effect runs when the `items` prop changes. It automatically
    // opens the first category in the list for a better user experience.
    // useEffect(() => {
    //     const categories = Object.keys(groupedItems);
    //     if (categories.length > 0) {
    //         // Sort categories alphabetically before picking the first one
    //         const sortedCategories = categories.sort((a, b) => a.localeCompare(b));
    //         setOpenCategory(sortedCategories[0]);
    //     } else {
    //         setOpenCategory(null); // Reset if there are no items
    //     }
    // }, [items]); // Dependency array ensures this runs when items are loaded/changed

    // Display a loading spinner while fetching data
    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-900"></div>
            </div>
        );
    }

    // Display a message if no items are found for the selected meal type
    if (!items || items.length === 0) {
        return <p className="text-center text-gray-500 py-8">No menu items found for this meal type.</p>;
    }

    // Sort categories alphabetically for a consistent order
    const sortedCategories = Object.keys(groupedItems).sort((a, b) => a.localeCompare(b));

    // Render the list of accordions
    return (
        <div className="space-y-3">
            {sortedCategories.map(category => {
                const isOpen = openCategory === category;
                return (
                    <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
                        {/* Accordion Header */}
                        <h3 id={`accordion-header-${category}`}>
                            <button
                                type="button"
                                onClick={() => setOpenCategory(isOpen ? null : category)} // Toggle open/closed state
                                className="flex items-center justify-between w-full p-4 font-semibold text-left text-blue-900 bg-gray-100 hover:bg-gray-200 transition-colors"
                                aria-expanded={isOpen}
                                aria-controls={`accordion-body-${category}`}
                            >
                                <span>{category}</span>
                                <ChevronDown className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                            </button>
                        </h3>
                        {/* Accordion Body */}
                        <div
                            id={`accordion-body-${category}`}
                            className={`transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}
                            aria-labelledby={`accordion-header-${category}`}
                        >
                            <div className="p-4 space-y-3 bg-white">
                                {groupedItems[category]
                                    // Sort items within the category by title for consistent ordering
                                    .sort((a, b) => a.title.localeCompare(b.title))
                                    .map((item) => (
                                        <div key={item.categoryAndItemId} className="bg-white p-3 rounded-md border border-transparent flex items-center justify-between transition-shadow hover:border-gray-300">
                                            <div>
                                                <p className="font-bold text-md text-gray-800">{item.title}</p>
                                                <p className="text-sm text-gray-500">
                                                    ${parseFloat(item.price).toFixed(2)}
                                                    {item.featured === 'true' && <span className="ml-2 text-xs font-bold text-yellow-500 bg-yellow-100 py-1 px-2 rounded-full">Featured</span>}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => onEdit(item)}
                                                    className="p-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                                                    aria-label={`Edit ${item.title}`}
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(item)}
                                                    className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                                                    aria-label={`Delete ${item.title}`}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default MenuList;
