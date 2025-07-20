import React, {useEffect, useRef, useState} from 'react';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';

const Contact: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);


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
            {threshold: 0.2}
        );

        observer.observe(currentRef);
        return () => observer.disconnect();
    }, []);

    // Auto-expand if navigated via #contact
    useEffect(() => {
        if (window.location.hash === '#contact') {
            setIsExpanded(false);
            sectionRef.current?.scrollIntoView({behavior: 'smooth'});
        }
    }, []);

    const toggleExpanded = () => setIsExpanded(prev => !prev);

    return (
        <section
            id="contact"
            ref={sectionRef}
            className={`bg-white text-gray-800 px-6 py-14 max-w-5xl mx-auto`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-900 pt-10 mb-6 leading-relaxed px-4">
                Contact Us
            </h2>

            <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg leading-relaxed w-full max-w-4xl">
                    {/* Our Team */}
                    <div className="flex flex-col items-center">
                        <div className="w-full text-center">
                            <h3 className="text-xl font-bold text-blue-800 mb-6 text-center uppercase">Our Team</h3>
                            <p><strong>Adolfo Martinez</strong>, General Manager<br/>
                                773-348-2378<br/>
                                <a href="mailto:adolfo@annsather.com"
                                   className="text-blue-600 hover:underline">adolfo@annsather.com</a></p>
                        </div>

                        <div className="w-full text-center mt-6">
                            <p><strong>Carrie Patino</strong>, Office Manager<br/>
                                773-348-2378, ext. 11<br/>
                                <a href="mailto:carrie@annsather.com"
                                   className="text-blue-600 hover:underline">carrie@annsather.com</a></p>

                        </div>

                        <div className="w-full text-center mt-6 md:hidden block">
                            <p><strong>Tom Tunney</strong>, Owner<br />
                                773-348-2378<br />
                                <a href="mailto:tom@annsather.com" className="text-blue-600 hover:underline">
                                    tom@annsather.com
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-full text-center">
                            <h3 className="text-xl font-bold text-yellow-400 uppercase mb-6 text-center">Locations</h3>
                            <p><strong>Lakeview Restaurant</strong><br/>
                                909 W. Belmont<br/>
                                Chicago, IL 60657<br/>
                                773-348-2378<br/>
                                Fax: 773-348-1731<br/>
                                Clara Smith, Manager</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Collapsible Content */}
            <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-[3000px]' : 'max-h-0'
                }`}
            >
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg leading-relaxed w-full max-w-4xl">
                        {/* Inside the collapsible grid – "Our Team" column */}
                        <div className="flex-col items-center w-full hidden md:block">
                            <div className="w-full text-center mt-6">
                                <p><strong>Tom Tunney</strong>, Owner<br />
                                    773-348-2378<br />
                                    <a href="mailto:tom@annsather.com" className="text-blue-600 hover:underline">
                                        tom@annsather.com
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-full text-center">
                                <p className="mt-6 md:mt-2"><strong>Broadway Restaurant</strong><br/>
                                    3415 N. Broadway<br/>
                                    Chicago, IL 60657<br/>
                                    773-305-0024<br/>
                                    Mike Midgette, Manager</p>

                                <p className="mt-8"><strong>Granville Restaurant</strong><br/>
                                    1147 W. Granville (at Broadway)<br/>
                                    Chicago, IL 60660<br/>
                                    773-274-0557<br/>
                                    Jesus Martinez, Manager</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <div className="flex justify-center items-center text-center mt-6">
                <button
                    onClick={toggleExpanded}
                    className="flex items-center justify-center gap-2 text-blue-700 hover:text-blue-900 cursor-pointer transition-colors"
                >
                    {isExpanded ? (
                        <>
                            Read less <FaChevronUp className="inline-block"/>
                        </>
                    ) : (
                        <>
                            Read more <FaChevronDown className="inline-block"/>
                        </>
                    )}
                </button>
            </div>
        </section>
    );
};

export default Contact;
