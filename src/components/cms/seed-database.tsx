import { useState } from 'react';
import { post } from 'aws-amplify/api';
import {authedPost} from "../../utils/apiClient.ts";

// The full menu data you provided
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


// Flatten the data to make it easier to process and track
const allItems = [];
for (const mealType in menuData) {
    const categories = menuData[mealType];
    for (const category in categories) {
        const items = categories[category];
        for (const item of items) {
            allItems.push({
                mealType,
                category,
                title: item.title,
                price: parseFloat(item.price.replace('$', '')), // The Lambda can handle strings, but numbers are better
                featured: item.featured || false, // Ensure featured is always a boolean
            });
        }
    }
}


const SeedDatabase = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState({ success: 0, failed: 0 });
    const [errorMessages, setErrorMessages] = useState([]);

    const handleSeedDatabase = async () => {
        setIsLoading(true);
        setProgress(0);
        setResults({ success: 0, failed: 0 });
        setErrorMessages([]);

        for (let i = 0; i < allItems.length; i++) {
            const item = allItems[i];
            try {
                const operation = await authedPost('/menu', { body: item });
                await operation.response; // Wait for the request to complete

                setResults(prev => ({ ...prev, success: prev.success + 1 }));

            } catch (error) {
                console.error(`Failed to add item: ${item.title}`, error);
                setResults(prev => ({ ...prev, failed: prev.failed + 1 }));
                setErrorMessages(prev => [...prev, `Failed: ${item.title} - ${error.message}`]);
            }
            // Update progress after each item
            setProgress(((i + 1) / allItems.length) * 100);
        }

        setIsLoading(false);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md my-8 border-2 border-red-500">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Database Seed Utility</h2>
            <p className="text-gray-600 mb-6">
                Use this to perform a one-time import of all menu items into your DynamoDB table.
                This will add <strong>{allItems.length}</strong> items.
            </p>

            <button
                onClick={handleSeedDatabase}
                disabled={false}
                className="w-full flex justify-center items-center bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400"
            >
                {isLoading ? 'Importing...' : 'Start Menu Import'}
            </button>

            {isLoading && (
                <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                    <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            )}

            {(results.success > 0 || results.failed > 0) && (
                <div className="mt-4 text-left">
                    <p className="font-semibold">Import Complete!</p>
                    <p className="text-green-600">Successful: {results.success}</p>
                    <p className="text-red-600">Failed: {results.failed}</p>
                    {errorMessages.length > 0 && (
                        <div className="mt-2 p-2 bg-red-100 rounded">
                            <h4 className="font-bold">Error Details:</h4>
                            <ul className="list-disc list-inside text-sm">
                                {errorMessages.map((msg, index) => <li key={index}>{msg}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SeedDatabase;