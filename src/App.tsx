import React, { useState, useEffect } from 'react';
import {
    MapPin,
    Clock,
    Phone,
    ChevronDown,
    Menu,
    X,
    Star,
    Coffee,
    ShoppingBag,
    Heart,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import MenuHighlights from './components/MenuHighlights.jsx';
import CompleteMenu from "./menu/breakfast-menu.tsx";   // adjust the path if the file lives elsewhere
import OurStory from './components/OurStory.tsx';
import Catering from "./components/Catering.tsx";
import Visit from "./components/Visit.tsx";
import Recipes from "./components/Recipes.tsx";
import OrderOnline from "./components/OrderOnline.tsx";
import Footer from "./components/layout/Footer.tsx";
import Header from "./components/layout/Header.tsx";
import AdminPage from "./components/cms/admin-page.tsx";
import {Amplify} from "aws-amplify";
// import OurStory from "./components/OurStory.tsx";
import BreakfastFavorites from './menu/BreakfastFavorites.tsx';
import BreakfastMenu from './menu/BreakfastMenu.tsx';

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: 'us-east-2_HzIoGsAYn', // Found in your Cognito User Pool details
            userPoolClientId: '1pvg7p14k9pacfp49k696n5kp2', // Found in your Cognito User Pool App client details
            // region: 'us-east-2',
        }
    },
    API: {
        REST: {
            'RestaurantMenuAPI': {
                endpoint: 'https://htdv60daf3.execute-api.us-east-2.amazonaws.com/dev', // The "Invoke URL" from your API Gateway deployment
                region: 'us-east-2',
            }
        }
    }
});

const AnnSatherWebsite = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeLocation, setActiveLocation] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Only run this when we’re on the home page
        if (window.location.pathname === "/") {
            const hash = window.location.hash;
            if (hash) {
                // Wait for sections to render first
                setTimeout(() => {
                    const el = document.querySelector(hash);
                    if (el) {
                        const offset = 100; // adjust for your fixed header
                        const top = el.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top, behavior: "smooth" });
                    }
                }, 500);
            }
        }
    }, []);

    const deliveryPlatforms = [
        {
            name: 'UberEats',
            icon: ShoppingBag,
            color: 'hover:bg-green-500/30',
            links: {
                Belmont: 'https://www.ubereats.com/store/ann-sather-west-belmont-avenue/cV9GAHZBT7mgtHKW9q_VXQ',
                Broadway: 'https://www.ubereats.com/store/ann-sather-broadway/_rqbqrenQPOb9u-BdcIkcw',
                Granville: 'https://www.ubereats.com/store/ann-sather-grandview/cugx4fjvRO6f8Ed8Kkrx8Q'
            }
        },
        {
            name: 'Grubhub',
            icon: ShoppingBag,
            color: 'hover:bg-orange-500/30',
            links: {
                Belmont: 'https://www.grubhub.com/restaurant/ann-sather-restaurant-909-w-belmont-ave-chicago/2032055',
                Broadway: 'https://www.grubhub.com/restaurant/ann-sather-3415-n-broadway-chicago/2039221',
                Granville: 'https://www.grubhub.com/restaurant/ann-sather-restaurant-1147-w-granville-ave-chicago/2039122',

            }
        },
        {
            name: 'DoorDash',
            icon: ShoppingBag,
            color: 'hover:bg-red-500/30',
            links: {
                Belmont: 'https://order.online/store/3142?utm_source=dd-partner-link/',
                Broadway: 'https://order.online/store/AnnSather-537540?hideModal=true&pickup=true&utm_source=dd-partner-link',
                Granville: 'https://order.online/store/AnnSatherRestaurant-179764?hideModal=true&pickup=true&utm_source=dd-partner-link',
            }
        },
    ];

    const locations = [
        {
            name: "Belmont",
            address: "909 W. Belmont",
            phone: "773-348-2378",
            image: "/images/EFM-AnnSather_PICS/Belmont-outdoor1.jpeg",
            special: "Swedish Specials Available"
        },
        {
            name: "Broadway",
            address: "3415 N. Broadway",
            phone: "773-305-0024",
            image: "/images/EFM-AnnSather_PICS/Belmont-outdoor4.jpg"
        },
        {
            name: "Granville",
            address: "1147 W. Granville",
            phone: "773-274-0557",
            image: "/images/EFM-AnnSather_PICS/Granville-outside1.jpeg"

        }
    ];

    const menuHighlights = [
        {
            title: "Famous Cinnamon Rolls",
            description: "Our world-famous cinnamon rolls, made fresh daily",
            price: "$4.95",
            image: "/images/EFM-AnnSather_PICS/CRolls3.jpg",
            popular: true
        },
        {
            title: "Omelet",
            description: "Choice of Omelet or Build Your Own",
            price: "$15.50",
            image: "/images/EFM-AnnSather_PICS/Omelette3.jpeg"
        },
        {
            title: "Swedish Pancakes",
            description: "Thin, delicate pancakes served with lingonberries",
            price: "$12.95",
            image: "/images/EFM-AnnSather_PICS/SwedishPancakes2.jpg"
        },
        {
            title: "Eggs Benedict",
            description: "Classic brunch favorite with hollandaise sauce",
            price: "$16.95",
            image: "/images/EFM-AnnSather_PICS/EggsBenedict3.jpeg"
        }
    ];
    /* Helper to pick the correct link for the active location */
    const getLink = (platformName) => {
        const platform = deliveryPlatforms.find((p) => p.name === platformName);
        const locName = locations[activeLocation].name;
        return platform?.links?.[locName] ?? null;
    };

    return (
        <div className="min-h-screen bg-[#FFFFFF]">

            {/*  Header */}
            <Header />

            {/* Hero Section */}
            <section id='home' className="relative h-screen bg-[#FFFFFF] font-['Playfair_Display'] overflow-hidden">
                {/* ✅ Background image with white margins (now properly clipped) */}
                <div className="absolute top-29 bottom-5 left-5 right-5 overflow-hidden">
                    <div
                        className="w-full h-full bg-cover bg-center animate-zoomOut"
                        style={{
                            backgroundImage:
                                "url('/images/EFM-AnnSather_PICS/Belmont-indoor7.jpeg')",
                        }}
                    ></div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-5 bg-gradient-to-t from-[#000]/20 via-[#000]/10 to-transparent"></div>

                {/* Content */}
                <div className="relative z-20 pt-15 h-full flex items-center justify-center text-center px-10">
                    <div className="max-w-4xl">
                        <h2 className="text-6xl md:text-7xl font-extrabold text-white leading-tight
            drop-shadow-[0_5px_10px_rgba(0,0,0,0.9)] font-['Playfair_Display']">
                            Ann Sather<br />
                        </h2>
                        <span className="block text-3xl md:text-3xl text-white font-bold drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">
                Restaurants & Catering
            </span>
                    </div>
                </div>
            </section>


            {/* Open Hours Banner */}
            <section className="bg-[#EAE6D2] py-3">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="flex items-center justify-center space-x-4">
                        <Clock className="text-[#601f1f]" size={24} />
                        <p className="text-[#601f1f] font-bold text-lg">
                            Open Daily 7 AM - 3 PM | Dine-In • Take-Out • Delivery
                        </p>
                    </div>
                </div>
            </section>

            {/* Breakfast-focused Favorites */}
            <BreakfastFavorites items={menuHighlights} />

            {/* Simple Breakfast Menu */}
            <BreakfastMenu />

            {/* Visit */}
            <Visit />

            {/* Catering Component */}
            <Catering />

            {/* The OurStory component*/}
            <OurStory />

            {/* Order Online – now clickable & location‑aware */}
            <OrderOnline
                deliveryPlatforms={deliveryPlatforms}
                locations={locations}
                activeLocation={activeLocation}
                getLink={getLink}
            />

            {/* Footer */}
            <Footer />

        </div>
    );
};

export default function App() {
    return (
        <Routes>
            {/* Main Website (Home page sections) */}
            <Route path="/" element={<AnnSatherWebsite />} />

            {/* Recipes Page (separate route) */}
            <Route path="/recipes" element={<Recipes />} />

            {/* Admin CMS Page */}
            <Route path="/admin" element={<AdminPage />} />
        </Routes>
    );
}
