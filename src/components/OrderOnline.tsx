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
            className="scroll-mt-26 relative w-full h-auto bg-[#FFF] py-15 px-5 text-white overflow-hidden"
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
                <h2 className="text-3xl sm:text-4xl font-bold pt-6 sm:pt-10 mb-4 sm:mb-6">
                    Order Online
                </h2>
                <p className="text-lg sm:text-xl text-white mb-10 sm:mb-20 lg:mb-28">
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
                                className={`
                                max-w-xs w-[60%]        
                                mx-auto  
                                sm:w-80% 
                                md:w-full
                                                
                                rounded-xl text-center
                                transition-all duration-300 transform
                            
                                /* smaller on mobile / moderate on tablet / larger on desktop */
                                p-3 text-base            /* mobile */
                                sm:p-4 sm:text-lg        /* small tablet / big phones */
                                md:p-5 md:text-xl        /* md+ */
                                
                                bg-white/30 opacity-90
                                ${
                                    isDisabled
                                        ? "bg-white/10 cursor-not-allowed opacity-60"
                                        : `${platform.color} hover:scale-105 cursor-pointer`
                                }
  `}
                                aria-disabled={isDisabled}
                            >
                                <Icon
                                    className="
                                              mx-auto mb-3
                                              h-7 w-7        /* mobile */
                                              sm:h-8 sm:w-8  /* small tablet */
                                              md:h-9 md:w-9  /* md+ */
                                            "
                                />
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
                    <p className="font-bold mb-4 uppercase">Or call for pickup</p>

                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12">
                        {locations.map((location, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur rounded-lg px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"
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
