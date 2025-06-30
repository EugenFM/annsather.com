//--- Admin Page Component ---
// AdminPage.tsx

import {
    Edit,
    LayoutDashboard,
    LogIn,
    LogOut,
    MapPin,
    PlusCircle,
    Utensils,
} from "lucide-react";
import { useState, useEffect } from "react";
import { signIn, signOut, getCurrentUser, confirmSignIn } from 'aws-amplify/auth';
import CreateMenuItem from './CreateMenuItem.tsx';
import SeedDatabase from "./seed-database.tsx";
import {authedDel, authedGet} from "../../utils/apiClient.ts";
import UpdateMenuItem from "./UpdateMenuItem.tsx";
import MenuList from "./MenuList.tsx"; // Import the new component

const AdminPage = () => {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // We'll use email as the username
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Start loading to check for a current session
    // This state will control showing the "Set New Password" form
    const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
    // This state will hold the user's chosen new password
    const [newPassword, setNewPassword] = useState('');

    // --- NEW STATE FOR MENU MANAGEMENT ---
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [isLoadingItems, setIsLoadingItems] = useState(false);
    const [apiError, setApiError] = useState('');
    const [selectedMealType, setSelectedMealType] = useState('Breakfast');
    const mealTypes = ['Breakfast', 'Lunch', 'Specials', 'Entrees']; // Define your meal types


    // Check for a logged-in user when the component mounts
    // --- UPDATED useEffect to fetch items on login and mealType change ---
    useEffect(() => {
        const checkUserAndFetchData = async () => {
            setIsLoading(true);
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
                // If user is logged in, fetch items for the default meal type
                await fetchMenuItems(selectedMealType);
            } catch (error) {
                // No user is signed in
                setUser(null);
            }
            setIsLoading(false);
        };
        checkUserAndFetchData();
    }, []); // Only run on initial component mount

    // --- NEW: A separate effect to refetch when the meal type changes ---
    useEffect(() => {
        if (user) { // Only fetch if the user is logged in
            fetchMenuItems(selectedMealType);
        }
    }, [selectedMealType, user]); // Dependency array

    // --- NEW: FUNCTION TO FETCH MENU ITEMS ---
    const fetchMenuItems = async (mealType) => {
        setIsLoadingItems(true);
        setApiError('');
        try {
            const operation = await authedGet(`/menu/${mealType}`);
            const response = await operation.response;
            const data = await response.body.json();
            setMenuItems(data);
        } catch (err) {
            console.error("Error fetching menu items:", err);
            setApiError('Failed to load menu items.');
            setMenuItems([]); // Clear items on error
        } finally {
            setIsLoadingItems(false);
        }
    };

    // --- NEW: FUNCTION TO HANDLE ITEM DELETION ---
    const handleDeleteItem = async (itemToDelete) => {
        // This itemToDelete object comes from your state and was originally fetched from the API.
        // It already has the correct .mealType and .categoryAndItemId
        console.log("Item to delete:", itemToDelete); // Add this log to see the object

        if (!window.confirm(`Are you sure you want to delete "${itemToDelete.title}"?`)) {
            return;
        }

        try {
            // You MUST use the exact mealType and categoryAndItemId from the object.
            // Do NOT try to build the key from other properties like 'category' or 'itemId'.

            const mealType = itemToDelete.mealType;

            // This is the complete, correct ID from the database.
            const categoryAndItemId = itemToDelete.categoryAndItemId;

            // URL encode the sort key in case it contains special characters like '#'
            const encodedCategoryAndItemId = encodeURIComponent(categoryAndItemId);

            // Construct the path exactly as your API Gateway expects it.
            const path = `/menu/${mealType}/${encodedCategoryAndItemId}`;

            console.log("Sending DELETE request to path:", path); // Add this log for final verification

            await authedDel(path);

            // This part is correct - it updates the UI instantly.
            setMenuItems(prevItems => prevItems.filter(item => item.categoryAndItemId !== itemToDelete.categoryAndItemId));

        } catch (err) {
            console.error('Error deleting item:', err);
            setApiError(err.message || 'Failed to delete item.');
        }
    };
    // --- MODAL HANDLERS ---
    const openCreateModal = () => setCreateModalOpen(true);
    const closeCreateModal = () => setCreateModalOpen(false);

    const openUpdateModal = (item) => {
        setItemToEdit(item);
        setUpdateModalOpen(true);
    };
    const closeUpdateModal = () => {
        setItemToEdit(null);
        setUpdateModalOpen(false);
    };

    // --- SAVE HANDLERS (to update UI after create/update) ---
    const handleSaveNewItem = (newItem) => {
        // If the new item's mealType matches the selected one, add it to the list
        if (newItem.mealType === selectedMealType) {
            setMenuItems(prev => [...prev, newItem]);
        }
        // You might want to automatically switch to the new item's meal type tab
        // setSelectedMealType(newItem.mealType);
        closeCreateModal();
    };

    const handleSaveUpdatedItem = (updatedItem) => {
        // Find and replace the item in the local state
        setMenuItems(prev => prev.map(item =>
            item.categoryAndItemId === updatedItem.categoryAndItemId ? updatedItem : item
        ));
        closeUpdateModal();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // If the user is already being prompted for a new password,
        // call the confirmation handler instead.
        if (showNewPasswordForm) {
            await handleConfirmNewPassword();
            return;
        }

        try {
            const { isSignedIn, nextStep } = await signIn({
                username,
                password,
            });

            // --- NEW LOGIC TO HANDLE NEXT STEP ---
            if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
                // If Cognito requires a new password, show the form and stop.
                setShowNewPasswordForm(true);
            } else if (isSignedIn) {
                // If sign-in is complete, fetch the user and proceed.
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            }
            // --- END NEW LOGIC ---

        } catch (err) {
            setError(err.message || 'An error occurred during sign-in.');
            setPassword('');
        }
        setIsLoading(false);
    };


    // --- NEW HANDLER FUNCTION ---
    const handleConfirmNewPassword = async () => {
        setIsLoading(true);
        setError('');
        try {
            // Use confirmSignIn to send the new password
            await confirmSignIn({ challengeResponse: newPassword });

            // After successful confirmation, the user is signed in.
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setShowNewPasswordForm(false); // Hide the new password form
            setNewPassword(''); // Clear the password state
        } catch (err) {
            setError(err.message || 'Failed to set new password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    // --- END NEW HANDLER ---
    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await signOut();
            setUser(null);
            setUsername('');
            setPassword('');
        } catch (err) {
            setError(err.message || 'Error signing out.');
        }
        setIsLoading(false);
    };

    // --- Handlers for the modal ---
    // const openCreateModal = () => setCreateModalOpen(true);
    // const closeCreateModal = () => setCreateModalOpen(false);
    const handleSaveItem = (newItem) => {
        console.log('New item saved:', newItem);
        // Optionally, you can add logic here to refresh a list of items
        // For now, we'll just close the modal.
        // You could also leave it open if the user wants to add multiple items in a row.
        // closeCreateModal();
    };

    // While checking for a session, show a loader
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-blue-900">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400"></div>
            </div>
        );
    }

    // --- RENDER THE NEW PASSWORD FORM CONDITIONALLY ---
    if (showNewPasswordForm) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-blue-900 font-sans p-4">
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl text-center">
                    <h2 className="text-4xl font-bold text-blue-900">Set New Password</h2>
                    <p className="mt-2 text-gray-600">Please choose a new password to complete your first sign-in.</p>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="text-left">
                            <label htmlFor="newPassword" className="text-sm font-bold text-gray-700 tracking-wide">
                                New Password
                            </label>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full mt-2 p-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-400 transition"
                                placeholder="••••••••"
                            />
                        </div>
                        {error && <p className="text-red-600 text-sm">{error}</p>}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center bg-yellow-400 text-blue-900 font-bold p-3 rounded-lg hover:bg-yellow-500 transition-all duration-300 disabled:bg-gray-400"
                            >
                                {isLoading ? 'Setting...' : 'Confirm and Sign In'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    // --- END CONDITIONAL RENDER ---

    // If no user is logged in, show the login form
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-blue-900 font-sans p-4">
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl text-center">
                    <div>
                        <h2 className="text-4xl font-bold text-blue-900">Admin Access</h2>
                        <p className="mt-2 text-gray-600">Please sign in to manage content.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="text-left">
                            <label htmlFor="email" className="text-sm font-bold text-gray-700 tracking-wide">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full mt-2 p-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-400 transition"
                                placeholder="admin@example.com"
                            />
                        </div>

                        <div className="text-left">
                            <label htmlFor="password" className="text-sm font-bold text-gray-700 tracking-wide">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-2 p-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-400 transition"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && <p className="text-red-600 text-sm">{error}</p>}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center bg-yellow-400 text-blue-900 font-bold p-3 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-300 disabled:bg-gray-400"
                            >
                                {isLoading ? (
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-900"></div>
                                ) : (
                                    <>
                                        <LogIn className="mr-2 h-5 w-5" />
                                        Sign In
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                    <a href="/" className="inline-block mt-4 text-sm text-blue-600 hover:underline">
                        &larr; Back to Website
                    </a>
                </div>
            </div>
        );
    }

    // If a user is logged in, show the admin dashboard
    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* --- RENDER MODALS CONDITIONALLY --- */}
            {isCreateModalOpen && <CreateMenuItem onClose={closeCreateModal} onSave={handleSaveNewItem} />}
            {isUpdateModalOpen && <UpdateMenuItem onClose={closeUpdateModal} onSave={handleSaveUpdatedItem} itemToEdit={itemToEdit} />}


            <header className="bg-blue-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <LayoutDashboard size={32} />
                            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-2 rounded-lg font-semibold bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition-colors"
                        >
                            <LogOut size={20} className="mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Content Management</h2>
                    <p className="text-lg text-gray-600">Select a category below to edit website content.</p>
                </div>

                {/* --- 2. ADD THE SEED UTILITY HERE --- */}
                {/* It's recommended to only show this in a development environment */}
                {process.env.NODE_ENV === 'development' && <SeedDatabase />}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* --- MODIFIED MENU ITEMS CARD --- */}
                    {/* --- NEW MENU MANAGEMENT SECTION --- */}
                    <div className="bg-white p-6 rounded-xl shadow-md mt-10 md:col-span-2 lg:col-span-3">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
                            <div className="flex items-center text-blue-800 mb-4 sm:mb-0">
                                <Utensils size={28} className="mr-3" />
                                <h2 className="text-2xl font-bold">Menu Items</h2>
                            </div>
                            <button
                                onClick={openCreateModal}
                                className="w-full sm:w-auto flex justify-center items-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <PlusCircle size={20} className="mr-2" />
                                Add New Item
                            </button>
                        </div>

                        {/* --- MEAL TYPE TABS --- */}
                        <div className="flex flex-wrap gap-y-2 space-x-2 border-b-2 border-gray-200 mb-4">
                            {mealTypes.map(meal => (
                                <button
                                    key={meal}
                                    onClick={() => setSelectedMealType(meal)}
                                    className={`px-4 py-2 font-semibold text-lg transition-colors ${
                                        selectedMealType === meal
                                            ? 'border-b-4 border-yellow-400 text-blue-900'
                                            : 'text-gray-500 hover:text-blue-800'
                                    }`}
                                >
                                    {meal}
                                </button>
                            ))}
                        </div>
                        {/* --- API ERROR DISPLAY --- */}
                        {apiError && <p className="text-red-500 bg-red-100 p-3 rounded-md my-4">{apiError}</p>}

                        {/* --- MENU LIST --- */}
                        <MenuList
                            items={menuItems}
                            isLoading={isLoadingItems}
                            onEdit={openUpdateModal}
                            onDelete={handleDeleteItem}
                        />
                    </div>


                    {/* ... other cards (Locations, Content Pages) remain the same ... */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-shadow transform hover:-translate-y-1">
                        <div className="flex items-center text-blue-800 mb-4">
                            <MapPin size={28} className="mr-3" />
                            <h2 className="text-2xl font-bold">Locations</h2>
                        </div>
                        <p className="text-gray-600 mb-6">Update restaurant locations, hours, and contact info.</p>
                        <button disabled={true} className="w-full flex justify-center items-center bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            <PlusCircle size={20} className="mr-2" />
                            Manage Locations
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-shadow transform hover:-translate-y-1">
                        <div className="flex items-center text-blue-800 mb-4">
                            <Edit size={28} className="mr-3" />
                            <h2 className="text-2xl font-bold">Content Pages</h2>
                        </div>
                        <p className="text-gray-600 mb-6">Edit pages like "About Us", "Catering", and "Recipes".</p>
                        <button className="w-full flex justify-center items-center bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            <PlusCircle size={20} className="mr-2" />
                            Manage Content
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default AdminPage;