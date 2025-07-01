
import { useEffect, useRef, useState } from 'react';

const recipeData = [
    {
        title: 'Breakfast',
        image: 'images/Breakfast-Sampler.jpg',
        pdfLinks: [
            { name: 'Swedish Pancakes', url: 'pdfs/swedish-pancakes.pdf' },
            { name: 'Hart-Shaped Waffles', url: 'pdfs/hart-shaped-waffles.pdf' },
            { name: 'Bran Muffins', url: 'pdfs/bran-muffins.pdf' },
            { name: 'Cinnamon Rolls', url: 'pdfs/cinnamon-rolls.pdf' },
            { name: 'Powdered Sugar Glazes', url: 'pdfs/powdered-sugar-glazed.pdf' },
        ]
    },
    {
        title: 'Starters',
        image: 'images/catering/AnnSather-Avocado Wrap-S.jpg',
        pdfLinks: [
            { name: 'House Salad', url: 'pdfs/house-salad.pdf' }
        ]
    },
    {
        title: 'Sides',
        image: 'images/catering/3egg_omelet.jpg',
        pdfLinks: [
            { name: 'Hash Browns', url: 'pdfs/hash-browns.pdf' }
        ]
    },
    {
        title: 'Entrees',
        image: 'images/catering/AnnSather-Steak & Eggs 2-S.jpg',
        pdfLinks: [
            { name: 'Swedish Meatballs', url: 'pdfs/swedish-meatballs.pdf' }
        ]
    },
    {
        title: 'Desserts',
        image: 'images/catering/swedish_pancakes.jpg',
        pdfLinks: [
            { name: 'Pumpkin Squares', url: 'pdfs/pumpkin-squares.pdf' }
        ]
    }
];

const Recipes = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const currentRef = sectionRef.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.2 }
        );

        observer.observe(currentRef);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (window.location.hash === '#recipes') {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <section
            id="recipes"
            ref={sectionRef}
            className={`relative bg-blue-900 text-white px-6 py-14 max-w-7xl mx-auto transition-opacity duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center pt-10 mb-6 leading-relaxed px-4">
                Cooking at Home with Ann Sather
            </h2>

            <p className="max-w-5xl mx-auto text-justify leading-relaxed px-4">
                Do you think it’s possible to replicate our much celebrated cinnamon rolls,
                Swedish pancakes, roast duck or one of our delectable pies at home?
                We don’t think so, either, but we are giving you the opportunity to try.
            </p>

            <p className="max-w-5xl mx-auto text-justify leading-relaxed px-4">
                In 1994, Ann Sather’s restaurants published a 50th anniversary cookbook.
                Due to popular demand, we now have recipes for some of our much-loved dishes
                available online. Download the recipes for your favorite menu items below and
                get cooking!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 m-10 px-4 max-w-4xl mx-auto">

                {recipeData.map(({ title, image, pdfLinks }) => (
                    <div
                        key={title}
                        onClick={() => setActiveCategory(activeCategory === title ? null : title)}
                        className="text-blue-900 font-semibold text-center rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer"
                    >
                      <div className={'relative'}>
                        <img
                            src={image}
                            alt={title}
                            // className="w-full h-24 object-cover rounded-md mb-3"
                            className="w-full h-38 object-cover rounded-t-md mb-1"
                        />
                        <div className="bg-yellow-400 text-gray-900 p-1 font-semibold text-center uppercase shadow-lg transform hover:shadow-2xl cursor-pointer flex items-center justify-center"

                        >{title}</div>

                          {activeCategory === title && (
                              // <div className="bg-blue-900 text-sm text-center pt-4 pb-4 px-6 rounded-b-xl shadow-inner space-y-2">
                              <div className="absolute left-1/2 -translate-x-1/2 bg-blue-900 px-6 py-4 rounded-xl shadow-lg space-y-2">
                                  {pdfLinks.map(({ name, url }) => (

                                      <p key={name}>
                                          <a
                                              href={url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="inline-block w-36 bg-white text-blue-900 font-medium py-2 px-4 rounded-full text-center hover:bg-yellow-400 hover:text-blue-900 transition"                                          >
                                              {name}
                                          </a>
                                      </p>
                                  ))}
                              </div>
                          )}

                      </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Recipes;
