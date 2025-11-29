import React from "react";
import { ShoppingBag } from "lucide-react";

interface Platform {
    name: string;
    icon: React.ElementType;
    color: string;
    links: Record<string, string>;
}

interface Location {
    name: string;
    phone: string;
}

interface OrderOnlineProps {
    deliveryPlatforms: Platform[];
    locations: Location[];
    activeLocation: number;
    getLink: (platformName: string) => string | null;
}

const OrderOnline: React.FC<OrderOnlineProps> = ({
                                                     deliveryPlatforms,
                                                     locations,
                                                     activeLocation,
                                                     getLink,
                                                 }) => {
    return (
        <section
            id="order-online"
            className="scroll-mt-26 relative w-full h-[680px] bg-[#FFF] py-15 px-5 text-white overflow-hidden"
        >
            {/* Background image */}
            <div
                className="absolute top-0 left-5 right-5 bottom-5 bg-cover bg-center brightness-70"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(96, 31, 31, .1), rgba(96, 31, 31, .3)),
            url('/images/EFM-AnnSather_PICS/Belmont-walls1.jpeg')`,
                    zIndex: 0,
                }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold pt-10 mb-6">Order Online</h2>
                <p className="text-xl text-white mb-32">
                    Get your favorites delivered or ready for pickup
                </p>

                {/* Delivery Platforms */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 max-w-4xl mx-auto">
                    {deliveryPlatforms.map((platform) => {
                        const link = getLink(platform.name);
                        const isDisabled = !link;
                        const Icon = platform.icon || ShoppingBag;
                        return (
                            <a
                                key={platform.name}
                                href={link || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`font-bold text-2xl rounded-xl p-6 text-center bg-white/30 opacity-90 transition-all duration-300 transform ${
                                    isDisabled
                                        ? "bg-white/10 cursor-not-allowed opacity-60"
                                        : `${platform.color} hover:scale-105 cursor-pointer`
                                }`}
                                aria-disabled={isDisabled}
                            >
                                <Icon size={32} className="mx-auto mb-3" />
                                <p className="font-semibold">{platform.name}</p>
                                {isDisabled && (
                                    <p className="mt-2 text-xs opacity-90">(Not available)</p>
                                )}
                            </a>
                        );
                    })}
                </div>

                {/* Pickup Numbers */}
                <div className="mt-12">
                    <p className="font-bold mb-4 uppercase">
                        Or call for pickup
                    </p>
                    <div className="flex flex-wrap justify-center gap-22">
                        {locations.map((location, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur rounded-lg px-6 py-3"
                            >
                                <span className="font-semibold">{location.name}:</span>{" "}
                                {location.phone}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderOnline;
