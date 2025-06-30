import { useState, useEffect } from 'react';
import { Utensils, X } from 'lucide-react';
import { authedPut } from "../../utils/apiClient.ts";

// We now accept 'itemToEdit' as a prop
const UpdateMenuItem = ({ onClose, onSave, itemToEdit }) => {
    // Initialize state from the itemToEdit prop
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [mealType, setMealType] = useState('Breakfast');
    const [category, setCategory] = useState('');
    const [featured, setFeatured] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // When the component loads or the itemToEdit changes, populate the form
    useEffect(() => {
        if (itemToEdit) {
            setTitle(itemToEdit.title || '');
            setPrice(itemToEdit.price?.toString() || '');
            setMealType(itemToEdit.mealType || 'Breakfast');
            setCategory(itemToEdit.category || '');
            // The 'featured' attribute in DynamoDB is a string 'true'/'false'
            setFeatured(itemToEdit.featured === 'true');
        }
    }, [itemToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        if (!title || !price || !mealType || !category) {
            setError("All fields except 'Featured' are required.");
            setIsLoading(false);
            return;
        }

        try {
            // The data to be sent for the update
            const updatedData = {
                title,
                price: parseFloat(price),
                category: category.toUpperCase(),
                featured: featured.toString(),
                // NOTE: We don't update mealType, as it's part of the primary key.
                // If you need to change mealType, you'd typically delete and recreate the item.
            };

            // Construct the specific path for the item
            const path = `/menu/${itemToEdit.mealType}/${encodeURIComponent(itemToEdit.categoryAndItemId)}`;
            console.log('Updating path:', path);
            const operation = await authedPut(path, { body: updatedData });
            const response = await operation.response;
            const result = await response.body.json();

            setSuccess(`Successfully updated item: "${result.title}"!`);
            onSave(result); // Pass the updated item back to the parent

        } catch (err: any) {
            console.error("❌ An error occurred during update:", err);
            setError(err.message || 'Failed to update item. Please check the console.');
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setSuccess('');
                onClose(); // Close the modal after a short delay
            }, 2000);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <div className="flex items-center">
                        <Utensils className="h-7 w-7 text-blue-900 mr-3" />
                        <h2 className="text-2xl font-bold text-blue-900">Update Menu Item</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                        <X className="h-6 w-6 text-gray-600" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">{error}</div>}
                    {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">{success}</div>}

                    {/* Form fields are the same as CreateMenuItem, but pre-filled */}
                    {/* Meal Type is shown but disabled as it's part of the key */}
                    <div>
                        <label htmlFor="mealType" className="text-sm font-bold text-gray-700 tracking-wide">Meal Type</label>
                        <input id="mealType" type="text" value={mealType} disabled className="w-full mt-2 p-3 text-lg bg-gray-200 border-2 border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="category" className="text-sm font-bold text-gray-700 tracking-wide">Category</label>
                        <input id="category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., EGGS BENEDICT" className="w-full mt-2 p-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400" />
                    </div>
                    {/* ... other fields: title, price, featured ... */}
                    <div>
                        <label htmlFor="title" className="text-sm font-bold text-gray-700 tracking-wide">Item Title</label>
                        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Traditional Benedict" className="w-full mt-2 p-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div>
                            <label htmlFor="price" className="text-sm font-bold text-gray-700 tracking-wide">Price</label>
                            <input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 16.00" className="w-full mt-2 p-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400" />
                        </div>
                        <div className="flex items-center mt-8">
                            <input id="featured" type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="h-6 w-6 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400" />
                            <label htmlFor="featured" className="ml-3 text-lg text-gray-800 font-medium">Featured Item?</label>
                        </div>
                    </div>


                    <div className="pt-4">
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center bg-yellow-400 text-blue-900 font-bold p-4 rounded-lg hover:bg-yellow-500 transition-all duration-300 disabled:bg-gray-400 text-lg">
                            {isLoading ? 'Updating...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateMenuItem;