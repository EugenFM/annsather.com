import { Coffee, Heart } from "lucide-react";

const Footer = () => (
    <footer className="bg-[#1a0000] text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-2xl font-bold mb-4">Ann Sather</h3>
                    <p className="opacity-80">Chicago’s favorite Swedish restaurant since 1945</p>
                    <div className="flex space-x-4 mt-4">
                        <Coffee className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                        <Heart className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-lg mb-4">Hours</h4>
                    <p className="opacity-80">Daily 7 AM – 3 PM</p>
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
);

export default Footer;
