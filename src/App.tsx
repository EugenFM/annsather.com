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
import { HashLink } from 'react-router-hash-link';
import ScrollToHashElement from './components/ScrollToHashElement.tsx';
import CompleteMenu from "./menu/breakfast-menu.tsx";   // adjust the path if the file lives elsewhere
import OurStory from './components/OurStory.tsx';
import Catering from "./components/Catering.tsx";
import Recipes from "./components/Recipes.tsx";
import AdminPage from "./components/cms/admin-page.tsx";
import {Amplify} from "aws-amplify";
// import OurStory from "./components/OurStory.tsx";

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
            <nav
                className={`flex items-center bg-[#330000] fixed w-full z-50 transition-all duration-300 ${
                    scrolled ? 'bg-[#FFFFFF] py-4' : 'bg-[#330000] py-4'
                }`}
            >
                {/* Left: Logo (fixed width, flush left) */}
                <div className="w-60 pl-4 flex-shrink-0">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="focus:outline-none cursor-pointer text-left"
                    >
                        <h2
                            className={`text-2xl md:text-2xl font-['Playfair_Display'] leading-tight drop-shadow-lg transition-all duration-300 ${
                                scrolled
                                    ? 'text-[#330000] hover:text-[#7a1a1a] font-bold'
                                    : 'text-[#C8B8AE] hover:text-[#EAE6D2]'
                            }`}
                        >
                            Ann Sather<br />
                            <span className="text-base md:text-lg">Restaurant & Catering</span>
                        </h2>
                    </button>
                </div>

                {/* Right: Full Nav & Button aligned right */}
                <div className="flex-1">
                    <div className="flex justify-end items-center gap-10 pr-8">
                        {/* Desktop Navigation */}

                        <div className="hidden md:flex items-center gap-10">
                            {['Home', 'Menu', 'Visit', 'Catering', 'Recipes', 'Our Story'].map((item) => {
                                const isRecipes = item === 'Recipes';

                                return isRecipes ? (
                                    // ✅ Regular page link for Recipes
                                    <Link
                                        key={item}
                                        to="/recipes"
                                        className={`font-medium tracking-wide font-['Playfair_Display'] uppercase transition-all duration-300
          ${
                                            scrolled
                                                ? 'text-[#330000] hover:text-[#7a1a1a] hover:underline underline-offset-4 decoration-[#7a1a1a]'
                                                : 'text-[#C8B8AE] hover:text-[#EAE6D2] hover:underline underline-offset-4 decoration-[#EAE6D2]'
                                        }`}
                                    >
                                        {item}
                                    </Link>
                                ) : (
                                    // ✅ Use HashLink for smooth scrolling and cross-page anchors
                                    <HashLink
                                        key={item}
                                        smooth
                                        to={`/${item === 'Home' ? '' : `#${item.toLowerCase().replace(' ', '-')}`}`}
                                        className={`font-medium tracking-wide font-['Playfair_Display'] uppercase transition-colors duration-300 ${
                                            scrolled
                                                ? 'text-[#330000] hover:text-[#7a1a1a] font-bold'
                                                : 'text-[#C8B8AE] hover:text-[#EAE6D2]'
                                        }`}
                                    >
                                        {item}
                                    </HashLink>
                                );
                            })}

                            <HashLink
                                smooth
                                to="/#order-online"
                                className={`ml-4 px-6 py-1 rounded-full font-bold font-['Playfair_Display'] uppercase transition-all duration-300 ${
                                    scrolled
                                        ? 'bg-transparent border border-[#330000] text-[#330000]'
                                        : 'bg-[#330000] text-[#EAE6D2] border border-[#EAE6D2] hover:bg-[#601f1f] shadow-md'
                                }`}
                            >
                                Order Now
                            </HashLink>
                        </div>
                    </div>
                </div>
            </nav>


            {/* Hero Section */}
            <section id='home' className="relative h-screen bg-[#FFFFFF] font-['Playfair_Display'] overflow-hidden">

                {/* ✅ Background image with white margins */}
                <div
                    className="absolute top-29 bottom-5 left-5 right-5 bg-cover bg-center animate-zoomOut"
                    style={{
                        backgroundImage:
                            "url('/images/EFM-AnnSather_PICS/Belmont-indoor7.jpeg')",
                    }}
                ></div>


                {/* Content */}
                <div className="relative z-20 pt-15 h-full flex items-center justify-center text-center px-10">
                    <div className="max-w-4xl">
                        {/* Banner */}
                        <div className="mb-8">
                            </div>

                        {/* Headline */}
                        <h2 className="text-5xl md:text-7xl text-white leading-tight drop-shadow-lg font-['Playfair_Display']">
                            Ann Sather<br />
                            
                        </h2>
                        <span className={"text-3xl text-white"}>Restaurants & Catering</span>
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

            {/* ✅ Menu Highlights with diagonal textured background */}
            <section
                id="menu"
                // className="py-5 bg-white p-5">
                className="scroll-mt-20 relative w-full bg-[#FFF] py-15 px-5 text-white overflow-hidden">
                <div className={'striped-bg w-full h-full'}>
                  <div className="max-w-7xl mx-auto pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#601f1f] pt-15 pb-5 mb-4">Menu Favorites</h2>
                        <p className="text-xl text-[#601f1f] pb-5">From Swedish classics to American breakfast favorites</p>
                    </div>

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
                                        className="w-full h-48 object-cover"
                                    />
                                    {item.popular && (
                                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                                            <Star size={14} className="mr-1" fill="white" />
                                            Popular
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-[#601f1f] mb-2">{item.title}</h3>
                                    <p className="text-[#601f1f] mb-4">{item.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-[#601f1f]">{item.price}</span>
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

            <CompleteMenu />   {/* new tabbed breakfast menu */}

            {/* Visit */}
            <section id="visit"

                     className="scroll-mt-22 relative w-full bg-[#FFF] pb-5 px-5 text-[#601f1f] overflow-hidden">
                <div className="striped-bg">
                    <div className="max-w-7xl mx-auto px-4 pb-10 sm:px-6 lg:px-8">
                        {/* Heading */}
                        <div className="text-center mb-12 pt-10">
                            <h2 className="text-4xl font-bold  mb-4">Visit Ann Sather</h2>
                            <p className="text-xl">
                                Three convenient Chicago locations — and the friendly team behind them.
                            </p>
                        </div>

                        {/* === GRID: Locations | Image | OUR TEAM (aside) === */}
                        <div
                            className="grid gap-8 md:grid-cols-2
          lg:grid-cols-[1.1fr_1.5fr_0.45fr]   /* left | image | skinny aside */items-start">
                            {/* LEFT: Locations accordion */}
                            <div className="space-y-6">
                                {locations.map((location, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setActiveLocation(index)}
                                        className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                                            activeLocation === index
                                                ? 'bg-[#601f1f] text-white shadow-xl scale-105'
                                                : 'bg-white shadow-lg hover:shadow-xl'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-2xl font-bold mb-2">{location.name}</h3>
                                                <div className="flex items-center mb-2">
                                                    <MapPin size={18} className="mr-2" />
                                                    <span>{location.address}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Phone size={18} className="mr-2" />
                                                    <span>{location.phone}</span>
                                                </div>
                                                {location.special && (
                                                    <div className="mt-3">
                      <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              activeLocation === index ? 'bg-white text-[#601f1f]' : 'bg-[#601f1f] text-white'
                          }`}
                      >
                        {location.special}
                      </span>
                                                    </div>
                                                )}
                                            </div>
                                            <ChevronDown
                                                size={24}
                                                className={`transform transition-transform ${activeLocation === index ? 'rotate-180' : ''}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* MIDDLE: Dynamic image */}
                            <div className="relative h-90 lg:h-[520px] rounded-xl overflow-hidden shadow-xl">
                                <img
                                    src={locations[activeLocation].image}
                                    alt={locations[activeLocation].name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-2xl font-bold">{locations[activeLocation].name} Location</h3>
                                    <p className="opacity-90">{locations[activeLocation].address}</p>
                                </div>
                            </div>

                            {/* Our Team */}
                            <aside
                                className="bg-white shadow-md rounded-xl p-6 lg:p-5 lg:sticky lg:top-24
                                max-h-[560px] overflow-hidden flex flex-col justify-center
                                w-[200px]  /* narrower width */"
                            >
                                <h3 className="text-xl font-bold text-[#601f1f] pt-4 mb-3 text-center uppercase tracking-wide">
                                    Our Team
                                </h3>

                                {/* Make vertical list take full height and center items evenly */}
                                <ul className="flex flex-col justify-around items-center h-full w-full text-base leading-snug text-[#601f1f]">
                                    <li className="text-center">
                                        <p className="font-semibold">Adolfo Martinez</p>
                                        <p>General Manager</p>
                                        <p>773-348-2378</p>
                                        <a href="mailto:adolfo@annsather.com" className="hover:underline hover:font-bold">
                                            adolfo@annsather.com
                                        </a>
                                    </li>

                                    <li className="text-center">
                                        <p className="font-semibold">Carrie Patino</p>
                                        <p>Office Manager</p>
                                        <p>773-348-2378, ext. 11</p>
                                        <a href="mailto:carrie@annsather.com" className="hover:underline hover:font-bold">
                                            carrie@annsather.com
                                        </a>
                                    </li>

                                    <li className="text-center">
                                        <p className="font-semibold">Tom Tunney</p>
                                        <p>Owner</p>
                                        <p>773-348-2378</p>
                                        <a href="mailto:tom@annsather.com" className="hover:underline hover:font-bold">
                                            tom@annsather.com
                                        </a>
                                    </li>
                                </ul>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>

            {/* Catering Component */}
            <Catering />

            {/* The Recipes component*/}
            {/*<Recipes />*/}

            {/* The OurStory component*/}
            <OurStory />

            {/* Order Online – now clickable & location‑aware */}
            <section id="order-online"
                     className="scroll-mt-26 relative w-full h-[680px] bg-[#FFF] py-15 px-5 text-white overflow-hidden">

                {/* Background image */}
                <div
                    className="absolute top-0 left-5 right-5 bottom-5 bg-cover bg-center brightness-70"
                    style={{
                        backgroundImage: `
            linear-gradient(rgba(96, 31, 31, .1), rgba(96, 31, 31, .3)),
            url('/images/EFM-AnnSather_PICS/Belmont-walls1.jpeg')`,
                        // backgroundBlendMode: 'overlay',
                        zIndex: 0,
                    }}
                />

                {/*<div className="absolute top-0 left-5 right-5 bottom-5 bg-[#601f1f]/20 pointer-events-none" />*/}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-bold pt-10 mb-6 opacity-90">Order Online</h2>
                        <p className="text-xl text-white mb-32 opacity-90">Get your favorites delivered or ready for pickup</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            {deliveryPlatforms.map((platform) => {
                                const link = getLink(platform.name);
                                const isDisabled = !link;
                                const Icon = platform.icon;
                                return (
                                    <a
                                        key={platform.name}
                                        href={link || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`font-bold text-2xl rounded-xl p-6 text-center bg-white/30 opacity-90 transition-all duration-300 transform ${
                                            isDisabled
                                                ? 'bg-white/10 cursor-not-allowed opacity-40'
                                                : `${platform.color} hover:scale-105 cursor-pointer`
                                        }`}
                                        aria-disabled={isDisabled}
                                    >
                                        <Icon size={32} className="mx-auto mb-3" />
                                        <p className="font-semibold">{platform.name}</p>
                                        {isDisabled && <p className="mt-2 text-xs opacity-90">(Not available)</p>}
                                    </a>
                                );
                            })}
                        </div>

                        <div className="mt-12">
                            <p className="font-bold mb-4 opacity-90 uppercase">Or call for pickup:</p>
                            <div className="flex flex-wrap justify-center gap-6">
                                {locations.map((location, index) => (
                                    <div key={index} className="bg-white/10 backdrop-blur rounded-lg px-6 py-3">
                                        <span className="font-semibold">{location.name}:</span> {location.phone}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#1a0000] text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Ann Sather</h3>
                            <p className="opacity-80">Chicago's favorite Swedish restaurant since 1945</p>
                            <div className="flex space-x-4 mt-4">
                                <Coffee className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                                <Heart className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-lg mb-4">Hours</h4>
                            <p className="opacity-80">Daily: 7:00 AM - 3:00 PM</p>
                            <p className="opacity-80 mt-2">Dine-in • Pickup • Delivery</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-lg mb-4">Connect</h4>
                            <p className="opacity-80">Follow us for daily specials and updates</p>
                            <div className="mt-4">
                                <a href="#" className="opacity-80 hover:text-white font-bold transition-colors">
                                    Social Media Links
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-800 text-center opacity-60">
                        <p>&copy; 2025 Ann Sather Restaurant. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default function App() {
    return (
        <>
            <ScrollToHashElement />
        <Routes>
            {/* Main Website (Home page sections) */}
            <Route path="/" element={<AnnSatherWebsite />} />

            {/* Recipes Page (separate route) */}
            <Route path="/recipes" element={<Recipes />} />

            {/* Admin CMS Page */}
            <Route path="/admin" element={<AdminPage />} />
        </Routes>
        </>
    );
}
