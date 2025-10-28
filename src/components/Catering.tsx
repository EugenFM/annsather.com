// import React, { useEffect, useRef, useState } from 'react';
// import { ChevronDown } from 'lucide-react';
//
// import BreakfastCaterMenu from './sub-components/breakfast-catering-menu.tsx';
// import LunchDinerCaterMenu from './sub-components/lunch-dinner-catering-menu.tsx';
// import ALaCarteCaterMenu from './sub-components/a-la-carte-catering-menu.tsx';
// import HolidaySpecialsCaterMenu from './sub-components/holiday-specials-catering-menu.tsx';
// import AppetizersDessertsCaterMenu from './sub-components/appetizers-desserts-catering-menu.tsx';
//
// const CateringSection = () => {
//     const [openSection, setOpenSection] = useState<string | null>(null);
//     const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
//     const [showCateringInfo, setShowCateringInfo] = useState(false);
//
//     const sectionRefs = {
//         breakfast: useRef<HTMLDivElement | null>(null),
//         lunch: useRef<HTMLDivElement | null>(null),
//         alaCarte: useRef<HTMLDivElement | null>(null),
//         holiday: useRef<HTMLDivElement | null>(null),
//         desserts: useRef<HTMLDivElement | null>(null),
//     };
//
//     // Ref for Delivery Info panel
//     const deliveryRef = useRef<HTMLDivElement | null>(null);
//     const cateringRef = useRef<HTMLDivElement | null>(null);
//
//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     const id = entry.target.getAttribute('data-id');
//                     if (!entry.isIntersecting && openSection === id) {
//                         setOpenSection(null);
//                     }
//                 });
//             },
//             { threshold: 0.1 }
//         );
//
//         Object.entries(sectionRefs).forEach(([id, ref]) => {
//             if (ref.current) {
//                 ref.current.setAttribute('data-id', id);
//                 observer.observe(ref.current);
//             }
//         });
//
//         return () => {
//             Object.values(sectionRefs).forEach((ref) => {
//                 if (ref.current) observer.unobserve(ref.current);
//             });
//         };
//     }, [openSection]);
//
//     useEffect(() => {
//         if (openSection && sectionRefs[openSection]?.current) {
//             setTimeout(() => {
//                 sectionRefs[openSection]?.current?.scrollIntoView({
//                     behavior: 'smooth',
//                     block: 'start',
//                 });
//             }, 100);
//         }
//     }, [openSection]);
//
//     // Close the open accordion if clicking outside it
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (!openSection) return;
//             const currentRef = sectionRefs[openSection]?.current;
//             if (currentRef && !currentRef.contains(event.target as Node)) {
//                 setOpenSection(null);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [openSection]);
//
//     // Close Delivery Info when clicking outside it or pressing Esc
//     useEffect(() => {
//         if (!showDeliveryInfo) return;
//
//         const onMouseDown = (e: MouseEvent) => {
//             const el = deliveryRef.current;
//             if (el && !el.contains(e.target as Node)) {
//                 setShowDeliveryInfo(false);
//             }
//         };
//         const onKeyDown = (e: KeyboardEvent) => {
//             if (e.key === 'Escape') setShowDeliveryInfo(false);
//         };
//
//         document.addEventListener('mousedown', onMouseDown);
//         document.addEventListener('keydown', onKeyDown);
//         return () => {
//             document.removeEventListener('mousedown', onMouseDown);
//             document.removeEventListener('keydown', onKeyDown);
//         };
//     }, [showDeliveryInfo]);
//
//     const renderAccordion = (
//         id: keyof typeof sectionRefs,
//         title: string,
//         ContentComponent: React.ReactNode
//     ) => (
//         <div
//             ref={sectionRefs[id]}
//             className="bg-white/20 shadow-lg rounded overflow-hidden max-w-4xl mx-auto mb-6"
//         >
//             <button
//                 onClick={() => setOpenSection((prev) => (prev === id ? null : id))}
//                 className="w-full px-6 py-3 bg-white/10 hover:bg-white/30 text-white font-bold transition-colors flex items-center justify-between cursor-pointer"
//             >
//                 <h3 className="text-xl font-bold uppercase">{title}</h3>
//                 <ChevronDown
//                     className={`transform transition-transform ${openSection === id ? 'rotate-180' : ''}`}
//                     size={26}
//                 />
//             </button>
//             {openSection === id && (
//                 <div className="p-6 space-y-4 text-sm text-blue-900 leading-relaxed">
//                     {ContentComponent}
//                 </div>
//             )}
//         </div>
//     );
//
//     return (
//         <section
//             id="catering"
//             className="relative w-full bg-[#FFF] py-15 px-5 text-white overflow-hidden"
//         >
//             {/* Background image */}
//             <div
//                 className="absolute top-0 left-5 right-5 bottom-5 bg-cover bg-center brightness-70"
//                 style={{
//                     backgroundImage: `
//             linear-gradient(rgba(96, 31, 31, .1), rgba(96, 31, 31, .3)),
//             url('src/assets/images/EFM-AnnSather_PICS/Belmont-walls1.jpeg')`,
//                     backgroundBlendMode: 'overlay',
//                     zIndex: 0,
//                 }}
//             />
//             {/*<div className="absolute top-0 left-5 right-5 bottom-5 bg-[#601f1f]/20 z-[1] pointer-events-none" />*/}
//
//             {/* Foreground content */}
//             <div className="relative z-10">
//                 <h3 className="text-4xl font-bold text-center p-10 mb-6">Ann Sather Catering</h3>
//
//                 {/* Delivery Info button */}
//                 <div className="mb-10 text-center pb-4">
//                     <button
//                         onClick={() => setShowDeliveryInfo(!showDeliveryInfo)}
//                         className="bg-white/30 text-white font-bold px-4 py-2 rounded shadow-lg hover:bg-white/40 transition cursor-pointer"
//                     >
//                         {showDeliveryInfo ? 'Hide Delivery Info' : 'View Delivery Info'}
//                     </button>
//                 </div>
//
//                 {/* Catering Info button */}
//                 <div className="mb-10 text-center pb-4">
//                     <button
//                         onClick={() => setShowCateringInfo(!showCateringInfo)}
//                         className="bg-white/30 text-white font-bold px-4 py-2 rounded shadow-lg hover:bg-white/40 transition cursor-pointer"
//                     >
//                         {showCateringInfo ? 'Hide Delivery Info' : 'View Delivery Info'}
//                     </button>
//                 </div>
//
//
//                 {showDeliveryInfo && (
//                     <div
//                         ref={deliveryRef} // <-- click-outside target
//                         className="rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto"
//                     >
//                         <div className="p-6 space-y-4 text-base bg-white/10 text-white leading-relaxed">
//                             <h4 className="text-lg font-bold mb-4">Deliveries</h4>
//                             <p className="mb-2">
//                                 To place a catering delivery order, please call: <strong>773-348-2378</strong>.
//                             </p>
//                             <p className="mb-2">
//                                 We ask that you give us <strong>24-hour notice</strong> to ensure the menu items you desire are available.
//                                 However, if you do have a last minute order we will do our very best to accommodate your needs.
//                             </p>
//                             <p className="mb-2">
//                                 To ensure the timeliness of your delivery and the availability of items ordered, our cut-off time is <strong>2 p.m.</strong>
//                                 when placing an order for next day delivery.
//                             </p>
//                             <p className="mb-2">Deliveries are available for groups of <strong>10 or more</strong>.</p>
//                             <p className="mb-2"><strong>Delivery Charges are as follows:</strong></p>
//                             <ul className="list-disc ml-5 mb-4">
//                                 <li>$30.00 — North to the city limits, west to the city limits and south to 35th Street (includes Downtown)</li>
//                                 <li>$35.00 — City south of 35th Street to 75th Street</li>
//                                 <li>$40.00 — South of 75th Street and local suburbs (Require groups of <strong>20</strong> or more)</li>
//                                 <li>$50.00 — Holidays (Require groups of <strong>30</strong> or more)</li>
//                             </ul>
//                             <p className="mb-2">
//                                 Special requests are our specialty. Don't be afraid to ask, we may have it. Below are some items which are generally
//                                 requested and we always have in stock:
//                             </p>
//                             <p className="mb-2"><strong>Disposable (included with deliveries):</strong> Plates, Forks, Knives, Spoons, Serving Utensils, Beverage Cups, Napkins</p>
//                             <p className="mb-2">Other: Vinyl Tablecloths (<strong>$5 per tablecloth</strong>) Chafing Set-ups (<strong>$7 per set-up</strong>)</p>
//                             <p className="mb-2">
//                                 Many other items, such as Flowers, Linens, and China are available. We can also supply our experienced staff for your serving needs.
//                                 Ask about our Off-Premises Catering.
//                             </p>
//                             <p className="mb-2">Beverages are available (coffee, tea or soda) at an additional $3.25 per person.</p>
//                             <p className="mb-2"><em>We accept Cash, Corporate Checks, Visa, MasterCard, and American Express. Sorry, no Personal Checks.</em></p>
//                         </div>
//                     </div>
//
//
//                 )}
//
//                 {renderAccordion('breakfast', 'Breakfast', <BreakfastCaterMenu />)}
//                 {renderAccordion('lunch', 'Lunch & Dinner', <LunchDinerCaterMenu />)}
//                 {renderAccordion('alaCarte', 'A La Carte', <ALaCarteCaterMenu />)}
//                 {renderAccordion('holiday', 'Holiday Specials', <HolidaySpecialsCaterMenu />)}
//                 {renderAccordion('desserts', 'Appetizers & Desserts', <AppetizersDessertsCaterMenu />)}
//             </div>
//         </section>
//     );
// };
//
// export default CateringSection;
//

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import BreakfastCaterMenu from './sub-components/breakfast-catering-menu.tsx';
import LunchDinerCaterMenu from './sub-components/lunch-dinner-catering-menu.tsx';
import ALaCarteCaterMenu from './sub-components/a-la-carte-catering-menu.tsx';
import HolidaySpecialsCaterMenu from './sub-components/holiday-specials-catering-menu.tsx';
import AppetizersDessertsCaterMenu from './sub-components/appetizers-desserts-catering-menu.tsx';

const CateringSection = () => {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
    const [showCateringInfo, setShowCateringInfo] = useState(false);

    const sectionRefs = {
        breakfast: useRef<HTMLDivElement | null>(null),
        lunch: useRef<HTMLDivElement | null>(null),
        alaCarte: useRef<HTMLDivElement | null>(null),
        holiday: useRef<HTMLDivElement | null>(null),
        desserts: useRef<HTMLDivElement | null>(null),
    };

    const paragraphClass =
        'max-w-7xl mx-auto text-[#601f1f] italic text-justify leading-relaxed px-4';
    const deliveryRef = useRef<HTMLDivElement | null>(null);
    const cateringRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.getAttribute('data-id');
                    if (!entry.isIntersecting && openSection === id) {
                        setOpenSection(null);
                    }
                });
            },
            { threshold: 0.1 }
        );

        Object.entries(sectionRefs).forEach(([id, ref]) => {
            if (ref.current) {
                ref.current.setAttribute('data-id', id);
                observer.observe(ref.current);
            }
        });

        return () => {
            Object.values(sectionRefs).forEach((ref) => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, [openSection]);

    useEffect(() => {
        if (openSection && sectionRefs[openSection]?.current) {
            setTimeout(() => {
                sectionRefs[openSection]?.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }, 100);
        }
    }, [openSection]);

    // Close accordion if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!openSection) return;
            const currentRef = sectionRefs[openSection]?.current;
            if (currentRef && !currentRef.contains(event.target as Node)) {
                setOpenSection(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openSection]);

    // 🔸 Close Delivery Info if clicked outside or Esc pressed
    useEffect(() => {
        if (!showDeliveryInfo) return;

        const onMouseDown = (e: MouseEvent) => {
            const el = deliveryRef.current;
            if (el && !el.contains(e.target as Node)) setShowDeliveryInfo(false);
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowDeliveryInfo(false);
        };

        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [showDeliveryInfo]);

    // 🔸 Close Catering Info if clicked outside or Esc pressed
    useEffect(() => {
        if (!showCateringInfo) return;

        const onMouseDown = (e: MouseEvent) => {
            const el = cateringRef.current;
            if (el && !el.contains(e.target as Node)) setShowCateringInfo(false);
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowCateringInfo(false);
        };

        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [showCateringInfo]);

    const renderAccordion = (
        id: keyof typeof sectionRefs,
        title: string,
        ContentComponent: React.ReactNode
    ) => (
        <div
            ref={sectionRefs[id]}
            className="bg-white/20 shadow-lg rounded overflow-hidden max-w-3xl mx-auto mb-6"
        >
            <button
                onClick={() => setOpenSection((prev) => (prev === id ? null : id))}
                className="w-full px-6 py-3 bg-white/10 hover:bg-white/30 text-white font-bold transition-colors flex items-center justify-between cursor-pointer"
            >
                <h3 className="text-xl font-bold uppercase">{title}</h3>
                <ChevronDown
                    className={`transform transition-transform ${openSection === id ? 'rotate-180' : ''}`}
                    size={26}
                />
            </button>
            {openSection === id && (
                <div className="p-6 space-y-4 text-sm text-blue-900 leading-relaxed">
                    {ContentComponent}
                </div>
            )}
        </div>
    );

    return (
        <section
            id="catering"
            className="scroll-mt-28 relative w-full bg-[#FFF] py-15 px-5 text-white overflow-hidden"
        >
            {/* Background image */}
            <div
                className="absolute top-0 left-5 right-5 bottom-5 bg-cover bg-center brightness-70"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(96, 31, 31, .1), rgba(96, 31, 31, .3)),
            url('src/assets/images/EFM-AnnSather_PICS/Belmont-wall3.jpg')`,


                    backgroundBlendMode: 'overlay',
                    zIndex: 0,
                }}
            />

            {/* Foreground content */}
            <div className="relative z-10">
                <h3 className="text-4xl font-bold text-center p-5 mb-6">
                    Ann Sather Catering
                </h3>

                {/* Delivery + Catering Info buttons */}
                <div className="mb-10 flex flex-col sm:flex-row justify-center items-center gap-4 pb-4 text-center">
                    <button
                        onClick={() => setShowDeliveryInfo(!showDeliveryInfo)}
                        className="bg-white/30 text-white font-bold px-4 py-2 rounded shadow-lg hover:bg-white/40 transition cursor-pointer w-[80%] max-w-xs sm:w-auto"
                    >
                        {showDeliveryInfo ? 'Hide Delivery Info' : 'View Delivery Info'}
                    </button>

                    <button
                        onClick={() => setShowCateringInfo(!showCateringInfo)}
                        className="bg-white/30 text-white font-bold px-4 py-2 rounded shadow-lg hover:bg-white/40 transition cursor-pointer w-[80%] max-w-xs sm:w-auto"
                    >
                        {showCateringInfo ? 'Hide Catering Info' : 'View Catering Info'}
                    </button>
                </div>


                {/* Delivery Info Panel */}
                {showDeliveryInfo && (
                    <div ref={deliveryRef} className="rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto mb-10">
                        <div className="p-6 space-y-4 text-base bg-white/10 text-white leading-relaxed">
                            <h4 className="text-lg font-bold mb-4">Deliveries</h4>
                            <p className="mb-2"> To place a catering delivery order, please call: <strong>773-348-2378</strong>.
                            </p> <p className="mb-2"> We ask that you give us <strong>24-hour notice</strong> to ensure
                            the menu items you desire are available. However, if you do have a last minute order we will
                            do our very best to accommodate your needs. </p>
                            <p className="mb-2"> To ensure the timeliness of your delivery and the availability of items ordered,
                                our cut-off time is <strong>2 p.m.</strong> when placing an order for next day delivery. </p>
                            <p className="mb-2">Deliveries are available for groups of <strong>10 or more</strong>.</p>
                            <p className="mb-2"><strong>Delivery Charges are as follows:</strong></p>
                            <ul className="list-disc ml-5 mb-4">
                                <li>$30.00 — North to the city limits, west to the city limits and south to 35th Street
                                    (includes Downtown)</li>
                                <li>$35.00 — City south of 35th Street to 75th Street</li>
                                <li>$40.00 — South of 75th Street and local suburbs (Require groups of <strong>20</strong> or more)</li>
                                <li>$50.00 — Holidays (Require groups of <strong>30</strong> or more)</li>
                            </ul> <p className="mb-2"> Special requests are our specialty. Don't be afraid to ask, we may have it.
                            Below are some items which are generally requested and we always have in stock: </p>
                            <p className="mb-2"><strong>Disposable (included with deliveries):</strong> Plates, Forks,
                                Knives, Spoons, Serving Utensils, Beverage Cups, Napkins</p>
                            <p className="mb-2">Other: Vinyl Tablecloths (<strong>$5 per tablecloth</strong>)
                                Chafing Set-ups (<strong>$7 per set-up</strong>)</p>
                            <p className="mb-2"> Many other items, such as Flowers, Linens, and China are available.
                                We can also supply our experienced staff for your serving needs.
                                Ask about our Off-Premises Catering. </p>
                            <p className="mb-2">Beverages are available (coffee, tea or soda) at an additional
                                $3.25 per person.</p>
                            <p className="mb-2"><em>We accept Cash, Corporate Checks, Visa, MasterCard, and American Express.
                                Sorry, no Personal Checks.</em></p>
                        </div>
                    </div>
                )}

                {/* Catering Info Panel (NEW) */}
                {showCateringInfo && (
                    <div ref={cateringRef} className="rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto mb-10">
                        <div className="p-6 space-y-4 text-base bg-white/10 text-white leading-relaxed">
                            <p className="font-bold max-w-3xl text-xl leading-relaxed px-4">
                                Ann Sather Corporate and Special Event Catering
                            </p>
                            <p className='text-white'>
                                In addition to our three Chicago dine-in locations, Ann Sather proudly offers
                                professional catering services tailored to corporate events, private gatherings,
                                and special occasions. Our catering team upholds our long-standing commitment to
                                quality, delivering exceptional Swedish comfort food alongside a wide selection
                                of hors d’oeuvres, entrées, and desserts. Each event is supported by our highly
                                trained service staff to ensure a seamless experience. Our flagship Belmont
                                Avenue location, as well as our cafés, are available for private catered events
                                — day or evening — for groups of 50 or more guests.
                            </p>
                        </div>
                    </div>
                )}

                {renderAccordion('breakfast', 'Breakfast', <BreakfastCaterMenu />)}
                {renderAccordion('lunch', 'Lunch & Dinner', <LunchDinerCaterMenu />)}
                {renderAccordion('alaCarte', 'A La Carte', <ALaCarteCaterMenu />)}
                {renderAccordion('holiday', 'Holiday Specials', <HolidaySpecialsCaterMenu />)}
                {renderAccordion('desserts', 'Appetizers & Desserts', <AppetizersDessertsCaterMenu />)}
            </div>
        </section>
    );
};

export default CateringSection;

