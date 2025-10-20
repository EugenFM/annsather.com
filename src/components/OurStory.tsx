import React, { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// ——— Recipes data (your original) ———
const recipeData = [
    {
        title: 'Breakfast',
        image: 'src/assets/images/recipes/Breakfast-Sampler.jpg',
        pdfLinks: [
            { name: 'Swedish Pancakes', url: 'pdfs/swedish-pancakes.pdf' },
            { name: 'Hart-Shaped Waffles', url: 'pdfs/hart-shaped-waffles.pdf' },
            { name: 'Bran Muffins', url: 'pdfs/bran-muffins.pdf' },
            { name: 'Cinnamon Rolls', url: 'pdfs/cinnamon-rolls.pdf' },
            { name: 'Powdered Sugar Glazes', url: 'pdfs/powdered-sugar-glazed.pdf' },
        ],
    },
    {
        title: 'Starters',
        image: 'src/assets/images/catering/AnnSather-Avocado Wrap-S.jpg',
        pdfLinks: [{ name: 'House Salad', url: 'pdfs/house-salad.pdf' }],
    },
    {
        title: 'Sides',
        image: 'src/assets/images/catering/3egg_omelet.jpg',
        pdfLinks: [{ name: 'Hash Browns', url: 'pdfs/hash-browns.pdf' }],
    },
    {
        title: 'Entrees',
        image: 'src/assets/images/catering/AnnSather-Steak & Eggs 2-S.jpg',
        pdfLinks: [{ name: 'Swedish Meatballs', url: 'pdfs/swedish-meatballs.pdf' }],
    },
    {
        title: 'Desserts',
        image: 'src/assets/images/recipes/SwedishPancakes.jpg',
        pdfLinks: [{ name: 'Pumpkin Squares', url: 'pdfs/pumpkin-squares.pdf' }],
    },
];

const OurStory: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    const paragraphClass =
        'max-w-7xl mx-auto text-[#601f1f] italic text-justify leading-relaxed px-4';

    // Scroll-in animation + collapse when out of view
    useEffect(() => {
        const currentRef = sectionRef.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                if (!entry.isIntersecting) setIsExpanded(false);
            },
            { threshold: 0.2 }
        );
        observer.observe(currentRef);
        return () => observer.disconnect();
    }, []);

    // Support anchor navigation
    useEffect(() => {
        if (
            window.location.hash === '#our-story' ||
            window.location.hash === '#about-us'
        ) {
            setIsExpanded(false);
            sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const toggleExpanded = () => setIsExpanded((prev) => !prev);

    return (
        <section
            id="our-story"
            ref={sectionRef}
            className="py-5 bg-white p-5"
        >
            {/* Hero / intro container */}
            <div
                className={`striped-bg w-full h-full`}
            >
                <div className="relative max-w-7xl mx-auto pb-20 px-4 sm:px-6 lg:px-8 text-[#601f1f]">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#601f1f] pt-12 mb-4">Our Story</h2>
                    </div>

                    <div className="absolute right-10 top-8">
                        <img
                            src="src/assets/images/ann_sather_photo_cropped.jpg"
                            alt="Ann Sather"
                            className="w-28 h-auto rounded-md shadow-md border border-gray-300"
                        />
                    </div>

                    <p className="text-lg leading-relaxed italic text-center max-w-3xl mx-auto mb-4">
                        Yes, there really was an Ann Sather.
                    </p>

                    {/* ——— Intro paragraph (always visible) ——— */}
                    <p className={paragraphClass}>
                        In the 1940s, a vivacious career woman named Ann Sather decided that what she
                        really wanted to do was own and run a restaurant. Her restaurant. A place where
                        people could come for generous homemade meals, warm hospitality and know the
                        moment they came in the door they went from being a customer to becoming a friend.
                    </p>

                    {/* ——— Collapsible long copy ——— */}
                    <div className="transition-all duration-700 ease-in-out overflow-hidden">
                        {/*<br />*/}
                        <p className={paragraphClass}>
                            So, in 1945, when the Swedish owners of a restaurant located on Belmont decided
                            to retire, Ann quit her job of 22 years, pooled her life savings and bought
                            herself a diner known today as Ann Sather Restaurant.
                        </p>

                        <p className={paragraphClass}>
                            For 35 years Ann ran the diner herself. Her devotion to wholesome,
                            made-from-scratch food, low prices, friendly service and hard work became
                            legendary in the Lakeview neighborhood and beyond.
                        </p>

                        {/*<br />*/}
                        <p className={paragraphClass}>
                            In 1981, after searching for a successor who would meet her stringent demands
                            for quality and remain devoted to her patrons, Ann sold the restaurant to Tom
                            Tunney, a 24-year-old graduate of the Cornell University School of Hotel and
                            Restaurant Management. Tom apprenticed with Ann for a year learning the business
                            from top to bottom. Armed with culinary training, Tom, the son of Irish
                            immigrants who grew up on Chicago’s Southside, was learning all of the best
                            Scandinavian cooking secrets in town.
                        </p>

                        {/*<br />*/}
                        <p className={paragraphClass}>
                            Although Ann Sather sadly passed away in 1996, her spirit still prevails in the
                            “good food, good friends and good conversation” philosophy that has made her
                            restaurants famous. She still looks over us all from her portrait hanging in the
                            dining room.
                        </p>

                        {/*<br />*/}
                        <p className={paragraphClass}>
                            During the last 35 years, Tom has expanded the business to include the most
                            famous cinnamon rolls and breakfast in town, two additional restaurants and Ann
                            Sather Corporate and Special Event Catering, which is well-known for its
                            corporate and special events, banquets, business breakfasts and lunches and
                            special deliveries.
                        </p>

                        <br />
                        <p className="font-bold max-w-3xl text-xl leading-relaxed px-4">
                            Ann Sather Corporate and Special Event Catering
                        </p>
                        <p className={paragraphClass}>
                            In addition to our three Chicago dine-in locations, Ann Sather proudly offers
                            professional catering services tailored to corporate events, private gatherings,
                            and special occasions. Our catering team upholds our long-standing commitment to
                            quality, delivering exceptional Swedish comfort food alongside a wide selection
                            of hors d’oeuvres, entrées, and desserts. Each event is supported by our highly
                            trained service staff to ensure a seamless experience. Our flagship Belmont
                            Avenue location, as well as our cafés, are available for private catered events
                            — day or evening — for groups of 50 or more guests.
                        </p>

                        <br />
                        <p className="font-bold max-w-3xl text-xl leading-relaxed px-4">
                            Serving the Community
                        </p>
                        <p className={paragraphClass}>
                            For many years, Ann Sather Restaurants also has been instrumental in serving the
                            community with its generous support of local organizations and causes. As Tom
                            says: "Good businesses are good to their communities.”
                        </p>
                        <p className={paragraphClass}>
                            As we celebrate our 80th anniversary, Ann Sather and her restaurant are
                            legendary and Tom not only serves good food, but also serves the 44th Ward as
                            its Alderman. But even with his busy schedule, Tom is the heart of the Ann
                            Sather family, so don’t be surprised to have him greet you at the door or find
                            him cooking breakfast orders on Sundays.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;
