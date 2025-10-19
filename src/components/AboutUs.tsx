import React, { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AboutUs: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    const paragraphClass = "max-w-5xl mx-auto text-gray-700 text-justify leading-relaxed px-4";

    // Handle scroll animation
    useEffect(() => {
        const currentRef = sectionRef.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);

                // Collapse when it's out of view
                if (!entry.isIntersecting) {
                    setIsExpanded(false);
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(currentRef);
        return () => observer.disconnect();
    }, []);

    // Auto-expand if navigated via #about
    useEffect(() => {
        if (window.location.hash === '#about-us') {
            setIsExpanded(false);
            sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const toggleExpanded = () => setIsExpanded(prev => !prev);

    return (
        <section
            id="about-us"
            ref={sectionRef}
            className={`bg-white text-gray-800 px-6 py-14 max-w-5xl mx-auto transition-opacity duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4' }`} >


            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-900 pt-10 mb-6 leading-relaxed px-4">
                About Ann Sather Restaurants and Catering
            </h2>
            <div className="flex justify-center pb-4">
                <img
                    src="images/ann_sather_photo_cropped.jpg"
                    alt="About our restaurant"
                    className="w-20 h-auto rounded-sm"
                />
            </div>
            <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto mb-4">
                Yes, there really was an Ann Sather.
            </p>

            <p className={paragraphClass}>
                In the 1940s, a vivacious career woman named Ann Sather decided that what she really wanted to do was
                own and run a restaurant. Her restaurant. A place where people could come for generous homemade meals,
                warm hospitality and know the moment they came in the door they went from being a customer to becoming a
                friend.
            </p>

            {/* Collapsible Content */}
            <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-[300p0x]' : 'max-h-0'
                }`}
            >

            <br />
                <p className={paragraphClass}>
                    So, in 1945, when the Swedish owners of a restaurant located on Belmont decided to retire, Ann
                    quit her job of 22 years, pooled her life savings and bought herself a diner known today as Ann
                    Sather Restaurant.
                </p>

                <p className={paragraphClass}>
                    For 35 years Ann ran the diner herself. Her devotion to wholesome, made-from-scratch food, low
                    prices, friendly service and hard work became legendary in the Lakeview neighborhood and beyond.
                </p>

                <br />
                <p className={paragraphClass}>
                    In 1981, after searching for a successor who would meet her stringent demands for quality and
                    remain devoted to her patrons, Ann sold the restaurant to Tom Tunney, a 24-year-old graduate of
                    the Cornell University School of Hotel and Restaurant Management. Tom apprenticed with Ann for a
                    year learning the business from top to bottom. Armed with culinary training, Tom, the son of
                    Irish immigrants who grew up on Chicago’s Southside, was learning all of the best Scandinavian
                    cooking secrets in town.
                </p>

                <br />
                <p className={paragraphClass}>
                    Although Ann Sather sadly passed away in 1996, her spirit still prevails in the “good food, good
                    friends and good conversation” philosophy that has made her restaurants famous. She still looks
                    over us all from her portrait hanging in the dining room.
                </p>

                <br />
                <p className={paragraphClass}>
                    During the last 35 years, Tom has expanded the business to include the most famous cinnamon rolls
                    and breakfast in town, two additional restaurants and Ann Sather Corporate and Special Event
                    Catering, which is well-known for its corporate and special events, banquets, business breakfasts
                    and lunches and special deliveries.
                </p>

                <br />
                <p className="font-bold max-w-3xl text-gray-700 text-xl leading-relaxed px-4">
                    Ann Sather Corporate and Special Event Catering
                </p>
                <p className={paragraphClass}>
                    In addition to our three Chicago dine-in locations, Ann Sather proudly offers professional
                    catering services tailored to corporate events, private gatherings, and special occasions. Our
                    catering team upholds our long-standing commitment to quality, delivering exceptional Swedish
                    comfort food alongside a wide selection of hors d’oeuvres, entrées, and desserts. Each event is
                    supported by our highly trained service staff to ensure a seamless experience. Our flagship
                    Belmont Avenue location, as well as our cafés, are available for private catered events - day or
                    evening - for groups of 50 or more guests.
                </p>

                <br />
                <p className="font-bold max-w-3xl text-gray-700 text-xl leading-relaxed px-4">
                    Serving the Community
                </p>
                <p className={paragraphClass}>
                    For many years, Ann Sather Restaurants also has been instrumental in serving the community with
                    its generous support of local organizations and causes. As Tom says: "Good businesses are good to
                    their communities.”
                </p>
                <p className={paragraphClass}>
                    As we celebrate our 80th anniversary, Ann Sather and her restaurant are legendary and Tom not
                    only serves good food, but also serves the 44th Ward as its Alderman. But even with his busy
                    schedule, Tom is the heart of the Ann Sather family, so don’t be surprised to have him greet you
                    at the door or find him cooking breakfast orders on Sundays.
                </p>
            </div>

            {/* Toggle Button */}
            <div className="flex justify-center items-center text-center mt-6">
                <button
                    onClick={toggleExpanded}
                    className="flex items-center justify-center gap-2 text-blue-700 hover:text-blue-900 cursor-pointer transition-colors"
                >
                    {isExpanded ? (
                        <>
                            Read less <FaChevronUp className="inline-block" />
                        </>
                    ) : (
                        <>
                            Read more <FaChevronDown className="inline-block" />
                        </>
                    )}
                </button>
            </div>
        </section>
    );
};

export default AboutUs;
