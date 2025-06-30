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
import CompleteMenu from "./menu/breakfast-menu.tsx";   // adjust the path if the file lives elsewhere
import AboutUs from './components/AboutUs';
import Catering from "./components/Catering.tsx";
import Recipes from "./components/Recipes.tsx";
import AdminPage from "./components/cms/admin-page.tsx";
import {Amplify} from "aws-amplify";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: 'us-east-2_HzIoGsAYn', // Found in your Cognito User Pool details
            userPoolClientId: '1pvg7p14k9pacfp49k696n5kp2', // Found in your Cognito User Pool App client details
            region: 'us-east-2',
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
            color: 'hover:bg-green-500/20',
            links: {
                Belmont: 'https://www.ubereats.com/store/ann-sather-west-belmont-avenue/cV9GAHZBT7mgtHKW9q_VXQ',
                Broadway: 'https://www.ubereats.com/store/ann-sather-broadway/_rqbqrenQPOb9u-BdcIkcw',
                Granville: 'https://www.ubereats.com/store/ann-sather-grandview/cugx4fjvRO6f8Ed8Kkrx8Q'
            }
        },
        {
            name: 'Grubhub',
            icon: ShoppingBag,
            color: 'hover:bg-orange-500/20',
            links: {
                Broadway: 'https://www.grubhub.com/restaurant/ann-sather-3415-n-broadway-chicago/2039221',
                Granville: 'https://www.grubhub.com/restaurant/ann-sather-restaurant-1147-w-granville-ave-chicago/2039122'
            }
        },
        {
            name: 'DoorDash',
            icon: ShoppingBag,
            color: 'hover:bg-red-500/20',
            links: {
                Belmont: 'https://www.doordash.com/store/ann-sather-chicago-3142/'
            }
        },
        {
            name: 'Postmates',
            icon: ShoppingBag,
            color: 'hover:bg-blue-500/20',
            links: {
                Broadway: 'https://postmates.com/store/ann-sather-broadway/_rqbqrenQPOb9u-BdcIkcw'
            }
        }
    ];

    const locations = [
        {
            name: "Belmont",
            address: "909 W. Belmont",
            phone: "773-348-2378",
            image: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800&h=600&fit=crop",
            special: "Swedish Specials Available"
        },
        {
            name: "Broadway",
            address: "3415 N. Broadway",
            phone: "773-305-0024",
            image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop"
        },
        {
            name: "Granville",
            address: "1147 W. Granville",
            phone: "773-274-0557",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
        }
    ];

    const menuHighlights = [
        {
            title: "Famous Cinnamon Rolls",
            description: "Our world-famous cinnamon rolls, made fresh daily",
            price: "$4.95",
            image: "https://images.unsplash.com/photo-1509365390695-33aee754301f?w=400&h=300&fit=crop",
            popular: true
        },
        {
            title: "Swedish Pancakes",
            description: "Thin, delicate pancakes served with lingonberries",
            price: "$12.95",
            image: "https://images.unsplash.com/photo-1565299543923-37dd37887442?w=400&h=300&fit=crop"
        },
        {
            title: "Swedish Meatballs",
            description: "Traditional meatballs with cream sauce and lingonberries",
            price: "$14.95",
            image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop"
        },
        {
            title: "Eggs Benedict",
            description: "Classic brunch favorite with hollandaise sauce",
            price: "$13.95",
            image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&h=300&fit=crop"
        }
    ];
    /* Helper to pick the correct link for the active location */
    const getLink = (platformName) => {
        const platform = deliveryPlatforms.find((p) => p.name === platformName);
        const locName = locations[activeLocation].name;
        return platform?.links?.[locName] ?? null;
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${
                scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            {/* Logo - using the actual logo image */}
                            <div className="flex items-center">
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="focus:outline-none cursor-pointer"
                                    >
                                <img
                                    src="/src/assets/images/AnnSather-Logo_img.png"
                                    alt="Ann Sather Restaurant"
                                    className={`h-16 w-auto transition-all duration-300 ${
                                        scrolled ? 'h-12' : 'h-16'
                                    }`}
                                    // onError={(e) => {
                                    //     e.target.style.display = 'none';
                                    //     e.target.nextSibling.style.display = 'flex';
                                    // }}
                                    // Code update - EFM
                                    onError={(e) => {
                                        const target = e.target as HTMLElement;
                                        target.style.display = 'none';

                                        const sibling = target.nextSibling as HTMLElement | null;
                                        if (sibling) {
                                            sibling.style.display = 'flex';
                                        }
                                    }}

                                />
                                </button>
                                <div className="hidden items-center"
                                    style={{ display: 'none' }}
                                >
                                    <div className="flex flex-col">
                                        <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                                            scrolled ? 'text-blue-900' : 'text-white'
                                        }`}>
                                            ANN SATHER
                                        </h1>
                                        <span className={`text-xs uppercase tracking-wider transition-colors duration-300 ${
                                            scrolled ? 'text-blue-700' : 'text-yellow-300'
                                        }`}>
                      Restaurant & Catering
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-8 items-center">
                            {['Menu', 'Catering', 'Locations', 'Recipes', 'About Us', 'Contact'].map((item) => (
                                <a key={item}
                                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                                    className={`font-medium transition-colors duration-300 hover:text-yellow-400 ${
                                        scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white'
                                    }`}
                                >
                                    {item}
                                </a>
                            ))}
                            <a
                                href="#order-online"
                                className={`ml-4 px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                                    scrolled
                                        ? 'bg-yellow-400 text-blue-900 hover:bg-yellow-500'
                                        : 'bg-white/20 backdrop-blur text-white border border-white hover:bg-white hover:text-blue-900'
                                }`}
                            >
                                Order Now
                            </a>
                        </div>



                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`md:hidden transition-colors duration-300 ${
                                scrolled ? 'text-gray-700' : 'text-white'
                            }`}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 overflow-hidden ${
                    isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`} style={{ top: '100%' }}>
                    <div className="px-4 py-6 space-y-4">
                        {['Menu', 'Catering', 'Locations', 'Recipes', 'About Us', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(' ', '-')}`}
                                className="block text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-blue-700/80 z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&h=1080&fit=crop')"
                    }}
                ></div>

                <div className="relative z-20 pt-15 h-full flex items-center justify-center text-center px-4">
                    <div className="max-w-4xl">
                        <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur rounded-full text-yellow-300 font-semibold text-lg mt-10">
                Serving Chicago Since 1945
              </span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-2 animate-fade-in">
                            Home of the Famous<br />Cinnamon Rolls
                        </h2>
                        <p className="text-xl md:text-2xl text-white/90 mb-8">
                            Authentic Swedish cuisine in the heart of Chicago
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="#order-online" className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-xl">
                                Order Now
                            </a>
                            <a href="#menu" className="bg-white/20 backdrop-blur text-white border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-900 transform hover:scale-105 transition-all duration-300">
                                View Menu
                            </a>
                        </div>
                        <div className="mt-12 animate-bounce">
                            <ChevronDown size={32} className="text-white mx-auto" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Hours Banner */}
            <section className="bg-yellow-400 py-6">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="flex items-center justify-center space-x-4">
                        <Clock className="text-blue-900" size={24} />
                        <p className="text-blue-900 font-bold text-lg">
                            Open Daily 7 AM - 3 PM | Dine-In • Take-Out • Delivery
                        </p>
                    </div>
                </div>
            </section>

            {/* Menu Highlights */}
            <section id="menu" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Menu Favorites</h2>
                        <p className="text-xl text-gray-600">From Swedish classics to American breakfast favorites</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {menuHighlights.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
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
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 mb-4">{item.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-blue-600">{item.price}</span>
                                        <button className="text-red-500 hover:text-red-600 transition-colors">
                                            <Heart size={24} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/*<div className="text-center mt-12">*/}
                    {/*    <a href="#" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">*/}
                    {/*        View Full Menu*/}
                    {/*        <ChevronDown size={20} className="ml-2 transform -rotate-90" />*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                </div>
            </section>

            <CompleteMenu />   {/* new tabbed breakfast menu */}

            {/* Catering Component */}
            <Catering />
            
            {/* Locations */}
            <section id="locations" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Locations</h2>
                        <p className="text-xl text-gray-600">Three convenient Chicago locations to serve you</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            {locations.map((location, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveLocation(index)}
                                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                                        activeLocation === index
                                            ? 'bg-blue-600 text-white shadow-xl scale-105'
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
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              activeLocation === index ? 'bg-yellow-400 text-blue-900' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {location.special}
                          </span>
                                                </div>
                                            )}
                                        </div>
                                        <ChevronDown
                                            size={24}
                                            className={`transform transition-transform ${
                                                activeLocation === index ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="relative h-96 md:h-auto rounded-xl overflow-hidden shadow-xl">
                            <img
                                src={locations[activeLocation].image}
                                alt={locations[activeLocation].name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-2xl font-bold">{locations[activeLocation].name} Location</h3>
                                <p className="opacity-90">{locations[activeLocation].address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Order Online – now clickable & location‑aware */}
            <section id="order-online" className="py-20 bg-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">Order Online</h2>
                    <p className="text-xl mb-12 opacity-90">Get your favorites delivered or ready for pickup</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
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
                                    className={`rounded-xl p-6 text-center transition-all duration-300 transform ${
                                        isDisabled
                                            ? 'bg-white/10 cursor-not-allowed opacity-40'
                                            : `${platform.color} hover:scale-105 cursor-pointer`
                                    }`}
                                    aria-disabled={isDisabled}
                                >
                                    <Icon size={32} className="mx-auto mb-3" />
                                    <p className="font-semibold">{platform.name}</p>
                                    {isDisabled && <p className="mt-2 text-xs opacity-70">(Not available)</p>}
                                </a>
                            );
                        })}
                    </div>

                    <div className="mt-12">
                        <p className="text-lg mb-4">Or call for pickup:</p>
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

            {/* The AboutUs component*/}
            <AboutUs />
            <Recipes />


            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
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
                                <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                                    Subscribe to our newsletter →
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


//--- App Component (Router) ---
export default function App() {
    // This simple router reads the URL path to determine which page to show.
    // It avoids the need for react-router-dom, which was causing issues.
    const [path, setPath] = useState(window.location.pathname);

    // This effect handles browser back/forward navigation.
    useEffect(() => {
        const onLocationChange = () => {
            setPath(window.location.pathname);
        };
        window.addEventListener('popstate', onLocationChange);
        return () => {
            window.removeEventListener('popstate', onLocationChange);
        };
    }, []);

    // Render the component based on the path.
    // In the preview environment, you may need to manually add /admin to the URL.
    if (path.endsWith('/admin')) {
        return <AdminPage />;
    }

    return <AnnSatherWebsite />;
}