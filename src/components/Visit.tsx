import React, { useState } from "react";
import { MapPin, Phone, ChevronDown } from "lucide-react";

const Visit = () => {
    const [activeLocation, setActiveLocation] = useState(0);

    const locations = [
        {
            name: "Belmont",
            address: "909 W. Belmont",
            phone: "773-348-2378",
            image: "/images/EFM-AnnSather_PICS/Belmont-outdoor1.jpeg",
            special: "Swedish Specials Available",
        },
        {
            name: "Broadway",
            address: "3415 N. Broadway",
            phone: "773-305-0024",
            image: "/images/EFM-AnnSather_PICS/Broadview-outdoor1.jpeg",
        },
        {
            name: "Granville",
            address: "1147 W. Granville",
            phone: "773-274-0557",
            image: "/images/EFM-AnnSather_PICS/Granville-outside1.jpeg",
        },
    ];

    return (
        <section
            id="visit"
            className="scroll-mt-20 relative w-full bg-[#FFF] pb-5 px-5 text-[#601f1f] overflow-hidden"
        >
            <div className="striped-bg">
                <div className="max-w-7xl mx-auto px-4 pb-10 sm:px-6 lg:px-8">
                    {/* Heading */}
                    <div className="text-center mb-12 pt-15">
                        <h2 className="text-4xl font-bold mb-4">Visit Ann Sather</h2>
                        <p className="text-xl">
                            Three convenient Chicago locations — and the friendly team behind them.
                        </p>
                    </div>

                    {/* === GRID: Locations | Image | OUR TEAM (aside) === */}

                    <div
                        className="
                                    m grid gap-8
                                    grid-cols-1
                                    md:grid-cols-[1.1fr_1.5fr]
                                    lg:grid-cols-[1.1fr_1.5fr_0.45fr]
                                    items-start
                                  "
                                                    >

                    {/* LEFT: Locations accordion */}
                        <div className="space-y-6">
                            {locations.map((location, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveLocation(index)}
                                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                                        activeLocation === index
                                            ? "bg-[#601f1f] text-white shadow-xl scale-105"
                                            : "bg-white shadow-lg hover:shadow-xl"
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
                        activeLocation === index
                            ? "bg-white text-[#601f1f]"
                            : "bg-[#601f1f] text-white"
                    }`}
                >
                  {location.special}
                </span>
                                                </div>
                                            )}
                                        </div>
                                        <ChevronDown
                                            size={24}
                                            className={`transform transition-transform ${
                                                activeLocation === index ? "rotate-180" : ""
                                            }`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* MIDDLE: Dynamic image */}
                        <div
                            className="relative rounded-xl overflow-hidden shadow-xl
                                        h-72 sm:h-[380px] md:h-[520px] lg:h-[520px]">
                            <img
                                src={locations[activeLocation].image}
                                alt={locations[activeLocation].name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-2xl font-bold">
                                    {locations[activeLocation].name} Location
                                </h3>
                                <p className="opacity-90">{locations[activeLocation].address}</p>
                            </div>
                        </div>

                        {/* ASIDE: Our Team */}
                        <aside
                            className="bg-white shadow-md rounded-xl p-6 lg:p-5
                                        w-full lg:w-[220px] flex flex-col justify-center items-center
                                        h-auto lg:h-[520px] mt-6 md:mt-0 md:col-span-full lg:col-auto">



                        <h3 className="text-xl font-bold text-[#601f1f] pt-4 mb-6 text-center uppercase tracking-wide">
                                Our Team
                            </h3>

                            <ul
                                className="flex flex-col sm:flex-col md:flex-row lg:flex-col
                                            justify-around items-center lg:items-stretch
                                            gap-6 text-base leading-snug text-[#601f1f]
                                            w-full text-center">
                                <li className="flex-1 min-w-[160px]">
                                    <p className="font-semibold">Adolfo Martinez</p>
                                    <p>General Manager</p>
                                    <p>773-348-2378</p>
                                    <a
                                        href="mailto:adolfo@annsather.com"
                                        className="hover:underline hover:font-bold break-words"
                                    >
                                        adolfo@annsather.com
                                    </a>
                                </li>

                                <li className="flex-1 min-w-[160px]">
                                    <p className="font-semibold">Carrie Patino</p>
                                    <p>Office Manager</p>
                                    <p>773-348-2378, ext. 11</p>
                                    <a
                                        href="mailto:carrie@annsather.com"
                                        className="hover:underline hover:font-bold break-words"
                                    >
                                        carrie@annsather.com
                                    </a>
                                </li>

                                <li className="flex-1 min-w-[160px]">
                                    <p className="font-semibold">Tom Tunney</p>
                                    <p>Owner</p>
                                    <p>773-348-2378</p>
                                    <a
                                        href="mailto:tom@annsather.com"
                                        className="hover:underline hover:font-bold break-words"
                                    >
                                        tom@annsather.com
                                    </a>
                                </li>
                            </ul>
                        </aside>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default Visit;
