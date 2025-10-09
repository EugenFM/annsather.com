import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import BreakfastCaterMenu from './sub-components/breakfast-catering-menu.tsx';
import LunchDinerCaterMenu from './sub-components/lunch-dinner-catering-menu.tsx';
import ALaCarteCaterMenu from './sub-components/a-la-carte-catering-menu.tsx';
import HolidaySpecialsCaterMenu from './sub-components/holiday-specials-catering-menu.tsx';
import AppetizersDessertsCaterMenu from './sub-components/appetizers-desserts-catering-menu.tsx';

const CateringSection = () => {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);

    const sectionRefs = {
        breakfast: useRef(null),
        lunch: useRef(null),
        alaCarte: useRef(null),
        holiday: useRef(null),
        desserts: useRef(null),
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute('data-id');
                if (!entry.isIntersecting && openSection === id) {
                    setOpenSection(null);
                }
            });
        }, { threshold: 0.1 });

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

    // Add a global click listener to close the open accordion if clicked outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // If no section is open, do nothing
            if (!openSection) return;

            // Get the ref of the currently open section
            const currentRef = sectionRefs[openSection]?.current;

            // If click is outside the current open section, close it
            if (currentRef && !currentRef.contains(event.target as Node)) {
                setOpenSection(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openSection]);


    const renderAccordion = (
        id: keyof typeof sectionRefs,
        title: string,
        ContentComponent: React.ReactNode
    ) => (
        <div
            ref={sectionRefs[id]}
            className="bg-white/40 rounded-4xl shadow-lg overflow-hidden max-w-2xl mx-auto mb-6"
        >
            <button
                onClick={() => setOpenSection((prev) => (prev === id ? null : id))}
                className="w-full px-6 py-4 bg-white/10 hover:bg-white/30 text-white font-bold transition-colors flex items-center justify-between cursor-pointer"

            >
                <h3 className="text-xl font-bold uppercase">{title}</h3>
                <ChevronDown
                    className={`transform transition-transform ${openSection === id ? 'rotate-180' : ''}`}
                    size={24}
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
        <section id="catering"
                 className="relative w-full bg-[#FFF] py-20 px-5 text-white overflow-hidden">
            {/* Background image */}
            <div
                className="absolute inset-5 bg-cover bg-center brightness-40"
                style={{
                    backgroundImage: `
        linear-gradient(rgba(96, 31, 31, .1), rgba(96, 31, 31, .1)),
        url('src/assets/images/EFM-AnnSather_PICS/Belmont-walls1.jpeg')`,
                    backgroundBlendMode: 'overlay',
                    zIndex: 0,
                }}
            />

            <div className="absolute inset-5 bg-[#601f1f]/10 z-[1] pointer-events-none" />

            {/* Foreground content */}
            <div className="relative z-10">
                <h3 className="text-5xl font-bold text-center mb-8">Ann Sather Catering</h3>

                <div className="mb-10 text-center">
                    <button
                        onClick={() => setShowDeliveryInfo(!showDeliveryInfo)}
                        className="bg-white/40 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-white/40 transition cursor-pointer"
                    >
                        {showDeliveryInfo ? 'Hide Delivery Info' : 'View Delivery Info'}
                    </button>
                </div>

                {showDeliveryInfo && (
                    <div className="bg-white text-blue-900 rounded-xl shadow-lg p-6 max-w-3xl mx-auto mb-10 text-sm">

                        <h4 className="text-lg font-bold mb-4">Deliveries</h4>
                        <p className="mb-2">
                            To place a catering delivery order, please call: <strong>773-348-2378</strong>.
                        </p>
                        <p className="mb-2">
                            We ask that you give us <strong>24-hour notice</strong> to ensure the menu items you desire are available.
                            However, if you do have a last minute order we will do our very best to accommodate your needs.
                        </p>
                        <p className="mb-2">
                            To ensure the timeliness of your delivery and the availability of items ordered, our cut-off time is <strong>2 p.m.</strong>
                            when placing an order for next day delivery.
                        </p>
                        <p className="mb-2">
                            Deliveries are available for groups of <strong>10 or more</strong>.
                        </p>
                        <p className="mb-2"><strong>Delivery Charges are as follows:</strong></p>
                        <ul className="list-disc ml-5 mb-4">
                            <li>$30.00 — North to the city limits, west to the city limits and south to 35th Street (includes Downtown)</li>
                            <li>$35.00 — City south of 35th Street to 75th Street</li>
                            <li>$40.00 — South of 75th Street and local suburbs (Require groups of <strong>20</strong> or more)</li>
                            <li>$50.00 — Holidays (Require groups of <strong>30</strong> or more)</li>
                        </ul>
                        <p className="mb-2">
                            Special requests are our specialty. Don't be afraid to ask, we may have it. Below are some items which are generally
                            requested and we always have in stock:
                        </p>
                        <p className="mb-2"><strong>Disposable (included with deliveries):</strong> Plates, Forks, Knives, Spoons, Serving Utensils, Beverage Cups, Napkins</p>
                        <p className="mb-2">Other: Vinyl Tablecloths (<strong>$5 per tablecloth</strong>) Chafing Set-ups (<strong>$7 per set-up</strong>)</p>
                        <p className="mb-2">
                            Many other items, such as Flowers, Linens, and China are available. We can also supply our experienced staff for your serving needs.
                            Ask about our Off-Premises Catering.
                        </p>
                        <p className="mb-2">Beverages are available (coffee, tea or soda) at an additional $3.25 per person.</p>
                        <p className="mb-2"><em>We accept Cash, Corporate Checks, Visa, MasterCard, and American Express. Sorry, no Personal Checks.</em></p>
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
