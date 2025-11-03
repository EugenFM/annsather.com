import React, { useEffect, useRef, useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

// ——— Recipes categories ———
const recipeData = [
    {
        title: "Breakfast",
        recipes: [
            {
                name: "Swedish Pancakes",
                ingredients: [
                    "4 eggs",
                    "1⅓ cups all-purpose flour",
                    "1 cup sugar",
                    "¼ cup non-fat dry milk",
                    "2 cups cold water",
                    "Dash of salt",
                    "Oil or butter for cooking",
                ],
                instructions: [
                    "Sift the dry ingredients together in a bowl.",
                    "Beat the eggs in a separate bowl.",
                    "Blend the sifted dry ingredients into the beaten eggs and 2 cups of cold water.",
                    "Heat a large skillet on high heat until a drop of water \"dances\" before it evaроrates.",
                    "Coat the skillet with some oil or butter and pour one generous ladle of batter (1/2 c.) onto the skillet for each pancake.",
                    "Flip each pancake when the top bubbles and the bottom is brown.",
                    "Serve immediately with delicious lingonberry jam.",
                ],
                yield:  "Makes 12 large Swedish pancakes."
            },
            {
                name: "Heart-Shaped Waffles",
                ingredients: [
                    "5 eggs",
                    "1/2 c. sugar",
                    "1/2 tsp. salt",
                    "1 tsp. cardamom, ground",
                    "1 c. all-purpose flour",
                    "1 c. dairy sour cream, stirred",
                    "1/4 c. unsalted butter, melted",
                    "Fresh lingonberries or other berries or fruit",
                    "Whipped cream"
                ],
                instructions: [
                    "In a large bowl of an electric mixer, beat eggs and sugar on high speed until the mixture" +
                    " forms ribbons when the beaters are lifted from the bowl, about 10 minutes.",
                    "Beat in the salt and cardamom.",
                    "Sprinkle the flour over the surface of the batter.",
                    "Use a rubber spatula to fold in the flour, then fold in sour cream and butter.",
                    "Let the mixture stand for 10 minutes.",
                    "Preheat a heart-shaped waffle iron according to manufacturer’s directions.",
                    "Pour about 3/4 cup of the batter onto the center of the waffle iron.",
                    "Close the top of the waffle iron and bake for 2–3 minutes over medium heat until the waffle is golden and crisp.",
                    "Serve immediately with berries or other fruit and whipped cream (or cool waffles and serve cold)."
                ],
                yield: "Makes about 8 waffles"
            },
            {
                name: "Bran Muffins",
                ingredients: [
                    "2 ripe bananas, mashed",
                    "1 c. flour",
                    "1 c. bran",
                    "1 c. milk",
                    "1/4 c. brown sugar",
                    "1/3 c. molasses",
                    "2 eggs, beaten",
                    "3 T. margarine",
                    "1 T. baking powder",
                    "1 tsp. salt"
                ],
                instructions: [
                    "Preheat the oven to 375°F.",
                    "Grease the muffin pans.",
                    "Put the eggs, bananas, milk, molasses, margarine and bran into a large mixing bowl and let stand for 10 minutes.",
                    "Sift the flour, baking powder, brown sugar and salt together, then add to the banana mixture—stir just enough to dampen.",
                    "Spoon the batter into the greased muffin pans, filling each cup about two-thirds full.",
                    "Bake for about 20 minutes.",
                    "Take the muffins out of the oven and turn them out of the muffin pans so they can cool on a wire rack.",
                    "Variations: add blueberries, cranberries, walnuts or raisins."
                ],
                yield: "Makes 12 muffins"
            },
            {
                name: "Cinnamon Rolls",
                ingredients: [
                    "1 (1/4 oz.) envelope active dry yeast",
                    "1 tsp. sugar",
                    "1/4 c. warm water (110°F)",
                    "1 c. milk, scalded, cooled",
                    "1/4 c. butter, melted",
                    "1/3 c. sugar",
                    "1-1/2 tsp. salt",
                    "2-1/2 to 3 c. all-purpose flour",
                    "1/4 c. butter, room temperature",
                    "1/2 c. brown sugar",
                    "1 T. cinnamon, ground",
                    "Powdered-Sugar Glaze, if desired"
                ],
                instructions: [
                    "In a large bowl, stir the yeast and 1 teaspoon sugar into the warm water and let it stand for 5 minutes to soften.",
                    "Stir in milk, melted butter, 1/3 cup sugar, salt, and 1 cup of flour. Beat all of this with a spoon or electric mixer until smooth.",
                    "Gradually stir in 1-1/2 to 2 cups of flour, keeping the dough smooth. If the dough is still moist, stir in 1 tablespoon of flour at a time to make a soft dough.",
                    "Cover with a dry cloth and let it rise in a warm place until it is doubled in bulk, about 1 hour.",
                    "Divide the raised dough in half. On a lightly oiled board, roll out (with a lightly floured rolling pin) and stretch one piece of dough to make a 12\" x 8\" rectangle.",
                    "Spread 2 tablespoons of soft butter over the top of the dough. Sprinkle with brown sugar and cinnamon.",
                    "Beginning on the long side, roll up tightly, jelly-roll fashion. Repeat with the remaining dough. Cut the dough into 2-inch slices.",
                    "Place slices on floured and greased baking sheets. Let the dough rise until doubled in bulk, about 45 minutes.",
                    "Bake in a preheated 350°F oven for 12 to 15 minutes or until golden brown.",
                    "Take the cinnamon rolls out of the oven and place them on a wire rack to cool.",
                    "Top with Powdered-Sugar Glaze immediately, if desired, and cool or serve warm, as you like."
                ],
                yield: "Makes 18 rolls (It’s really much easier to buy these at our restaurant!)"
            },
            {
                name: "Powdered Sugar Glaze",
                ingredients: [
                    "1/2 c. powdered sugar",
                    "1/4 c. margarine, melted",
                    "1 tsp. vanilla"
                ],
                instructions: [
                    "Place all the ingredients into a small bowl and beat until creamy smooth.",
                    "Glaze the cinnamon rolls immediately after taking them out of the oven.",
                    "Allow the cinnamon rolls to cool on a wire rack.",
                    "Serve the cinnamon rolls while still warm or cooled, as you like."
                ],
                yield: "Makes enough to glaze 18 cinnamon rolls"
            }
        ],
    },
    {
        title: "Starters",
        recipes: [
            {
                name: "Celery Seed Dressing",
                ingredients: [
                    "2 c. salad oil",
                    "1 c. vinegar",
                    "1/2 c. sugar",
                    "2 tsp. dry mustard",
                    "3 T. onion, minced or grated",
                    "2 T. celery seed, whole"
                ],
                instructions: [
                    "Combine the oil, sugar, dry mustard, grated onion, and celery seed with a wire whisk.",
                    "Add the vinegar slowly while continuing to stir.",
                    "Cover and refrigerate until ready to serve.",
                    "Mix thoroughly before each use."
                ],
                yield: "Makes 4 cups"
            },
            {
                name: "Cucumber Salad",
                ingredients: [
                    "1 (10–12 inch) European-style cucumber or 2 (6-inch) cucumbers",
                    "2 T. fresh dill, chopped",
                    "1/2 c. white vinegar",
                    "1/2 c. sugar",
                    "1/4 c. water",
                    "1 tsp. salt"
                ],
                instructions: [
                    "Core and cut the cucumber into paper-thin slices.",
                    "Layer the sliced cucumbers in a medium bowl, sprinkling the dill between each of the layers.",
                    "Combine the vinegar, sugar, water, and salt in a 2-cup measure.",
                    "Pour the vinegar mixture over the layered cucumbers.",
                    "Cover and refrigerate for 4–5 hours before serving.",
                    "Mix thoroughly before each use."
                ],
                yield: "Makes 4–6 servings"
            },
            {
                name: "Lingonberry Vinaigrette",
                ingredients: [
                    "1 (12 oz.) jar lingonberries (undiluted)",
                    "1 c. apple cider vinegar",
                    "2 T. celery seed, ground",
                    "2 T. sugar",
                    "2 c. oil",
                    "Salt and pepper to taste"
                ],
                instructions: [
                    "Whisk all the ingredients together in a medium bowl.",
                    "Cover and refrigerate until ready to serve.",
                    "Mix thoroughly before each use."
                ],
                yield: "Makes 4 cups"
            },
            {
                name: "Pistachio Vinaigrette",
                ingredients: [
                    "1 c. pistachios, shelled whole",
                    "1 c. white vinegar",
                    "2 c. vegetable oil",
                    "1/4 c. red onion, chopped",
                    "2 T. celery seed, ground",
                    "2 T. sugar",
                    "Dash of salt and pepper"
                ],
                instructions: [
                    "Combine all the ingredients and blend in a food processor or blender.",
                    "Cover and refrigerate until ready to serve.",
                    "Mix thoroughly before each use."
                ],
                yield: "Makes 4 cups"
            },
            {
                name: "Buttered Potato Soup",
                ingredients: [
                    "2 c. mashed potatoes",
                    "6 c. chicken stock",
                    "2 T. fresh dill, chopped",
                    "4 tsp. butter",
                    "Dash of allspice, ground",
                    "Salt and pepper to taste"
                ],
                instructions: [
                    "Combine the mashed potatoes and chicken stock in a medium saucepan and whisk until smooth.",
                    "Stir over medium heat until the soup barely comes to a boil.",
                    "Add salt and pepper to taste and sprinkle the top with a dash of allspice.",
                    "Ladle the hot soup into individual bowls or mugs.",
                    "Garnish each bowl with some dill and a 1/2 teaspoon of butter and serve immediately."
                ],
                yield: "Makes 8 servings"
            },
            {
                name: "Swedish Fruit Soup",
                ingredients: [
                    "1/2 c. pitted prunes",
                    "1-1/2 c. mixed dried fruit",
                    "1-1/2 c. raisins",
                    "1/2 c. Turkish apricots, dried",
                    "3 T. cornstarch",
                    "1 c. water",
                    "1/2 c. sugar",
                    "1/2 c. brown sugar",
                    "2 T. lemon juice",
                    "1/2 c. raspberry syrup"
                ],
                instructions: [
                    "Cover the fruit with cold water and bring it to a boil in a large saucepan.",
                    "Allow it to simmer until the fruit is soft but not mushy.",
                    "Stir the cornstarch and water with a fork in a small bowl until smooth.",
                    "Stir the cornstarch mixture into the simmering fruit.",
                    "Continue to cook uncovered until the fruit mixture is clear and any lumps are dissolved.",
                    "Stir in the sugars and cook for 2 minutes more, then set it aside to cool.",
                    "Add the lemon juice and raspberry syrup when the fruit is thoroughly cooled and serve."
                ],
                yield: "Makes 12 servings"
            },
            {
                name: "Swedish Pea Soup with Pork",
                ingredients: [
                    "2 c. dry yellow Swedish peas",
                    "3 qts. water",
                    "1 (2–3 lb.) ham bone",
                    "1 medium onion, sliced",
                    "1/4 tsp. allspice, whole",
                    "1 tsp. marjoram, dried leaf",
                    "1 tsp. salt, to taste",
                    "1/8 tsp. black pepper, ground"
                ],
                instructions: [
                    "Sort and wash the peas. Combine the peas and water in a deep soup kettle and soak overnight.",
                    "Place the soup kettle with the soaked peas and water over medium-high heat on the stove.",
                    "Cover the pot and bring it to a boil. Remove any shells from the peas that float to the top of the water.",
                    "Simmer the peas for 2 hours or until the peas are partially softened.",
                    "Add the ham bone, onions, and allspice to the pea soup. Continue to simmer covered for one hour until the peas are tender.",
                    "Skim any fat from the surface. Stir in the marjoram, salt, and pepper.",
                    "To serve, place the ham bone on a platter and cut the meat away from the bone into slices.",
                    "Serve the meat in sandwiches if desired, and the hot soup in bowls or mugs."
                ],
                yield: "Makes 6 servings"
            },
            {
                name: "Spinach Soup",
                ingredients: [
                    "2 lbs. fresh spinach (or 1 (2 lb.) pkg. frozen chopped spinach)",
                    "2 quarts chicken stock",
                    "3 T. butter",
                    "2 T. flour",
                    "1 tsp. salt",
                    "1/8 tsp. nutmeg",
                    "Dash of pepper, freshly ground"
                ],
                instructions: [
                    "Thoroughly wash the fresh spinach, then drain it and chop it coarsely. (If using frozen spinach, thaw it completely and strain.)",
                    "Bring the soup stock to a boil in a 4-quart pot and add the spinach. Simmer uncovered for about 8 minutes.",
                    "Strain the spinach from the stock into a bowl. Pour the soup stock into another pot and set it aside.",
                    "Press the spinach with a spoon to remove most of the liquid. Chop the cooked spinach even finer if desired.",
                    "Melt the butter in the emptied soup pot, then remove it from the heat. Stir in the flour carefully to avoid lumps.",
                    "Return the pot to the stove. Stirring constantly over medium-high heat, add the soup stock—1 cup at a time—to the flour mixture.",
                    "Bring the uncovered pot of soup to a boil. Add the spinach, salt, pepper, and nutmeg.",
                    "Simmer about 5 minutes more until slightly thickened, then serve."
                ],
                yield: "Makes 4–6 servings"
            }
        ],
    },
    {
        title: "Sides",
        recipes: [
            {
                name: "Hash Browns",
                ingredients: [
                    "2 large potatoes, grated",
                    "2 tbsp oil or butter",
                    "Salt and pepper to taste",
                ],
                instructions: [
                    "Rinse grated potatoes and squeeze out moisture.",
                    "Heat oil in a skillet, add potatoes, and flatten.",
                    "Cook until crispy on both sides, season, and serve hot.",
                ],
            },
        ],
    },
    {
        title: "Entrees",
        recipes: [
            {
                name: "Swedish Meatballs",
                ingredients: [
                    "1 lb ground beef",
                    "½ lb ground pork",
                    "½ cup breadcrumbs",
                    "1 egg",
                    "1 onion, finely chopped",
                    "Salt, pepper, and nutmeg to taste",
                    "1 cup beef broth",
                    "½ cup cream",
                ],
                instructions: [
                    "Mix meats, breadcrumbs, egg, onion, and spices.",
                    "Form small balls and brown evenly in a skillet.",
                    "Add broth and cream, simmer until sauce thickens.",
                    "Serve with mashed potatoes or noodles.",
                ],
            },
        ],
    },
    {
        title: "Desserts",
        recipes: [
            {
                name: "Pumpkin Squares",
                ingredients: [
                    "2 cups pumpkin puree",
                    "1½ cups sugar",
                    "3 eggs",
                    "1 cup flour",
                    "1 tsp baking soda",
                    "1 tsp cinnamon",
                    "½ tsp salt",
                ],
                instructions: [
                    "Preheat oven to 350°F.",
                    "Mix all ingredients until smooth.",
                    "Pour into greased baking pan and bake for 35 minutes.",
                    "Cool and cut into squares.",
                ],
            },
        ],
    },
];

const Recipes: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    // Fade-in when scrolled into view
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div className="bg-white min-h-screen text-[#601f1f]">
            {/* 🔝 Header */}
            <Header />

            {/* 🧾 Recipes Section */}
            <section
                id="recipes"
                ref={sectionRef}
                className="relative w-full bg-[#FFF] pt-28 pb-5 px-5 text-[#601f1f] overflow-hidden
                transition-opacity duration-1000">
                <div className={`faded-fixed-bg w-full transition-opacity duration-1000 ${
                        isVisible ? "opacity-100" : "opacity-0"}`}>
                    <div className="relative max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 text-[#601f1f]">

                        {/* Section heading */}
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#601f1f] pt-15 mb-8">
                                Cooking at Home with Ann Sather
                            </h2>
                            <p className="max-w-5xl mx-auto text-lg mb-4 leading-relaxed">
                                Do you think it’s possible to replicate our much celebrated
                                cinnamon rolls, Swedish pancakes, roast duck, or one of our
                                delectable pies at home? We don’t think so either, but we’re
                                giving you the opportunity to try.
                            </p>
                            <p className="max-w-5xl mx-auto text-lg mb-10 leading-relaxed">
                                In 1994, Ann Sather’s restaurants published a 50th-anniversary
                                cookbook. Due to popular demand, we now have recipes for some of
                                our much-loved dishes available online. Browse through our
                                sections below to get inspired!
                            </p>
                        </div>

                        {/* Recipe Categories Styled Like Menu Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 max-w-xl mx-auto">
                            {recipeData.map(({ title }) => {
                                const isActive = activeCategory === title;
                                return (
                                    <button
                                        key={title}
                                        onClick={() =>
                                            setActiveCategory(isActive ? null : title)}
                                        className={`px-8 py-2 rounded-full font-semibold uppercase tracking-wide transition-all duration-300 ${
                                            isActive
                                                ? "bg-[#7a1a1a] text-white shadow-md scale-105"
                                                : "bg-[#4a5456] text-white hover:bg-[#601f1f]"}`}>
                                        {title}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Active Category Content */}
                        {activeCategory && (
                            <div className="mt-10 max-w-7xl mx-auto p-5 px-6">
                                <h3 className="text-center text-2xl md:text-3xl font-bold capitalize mb-10 text-[#601f1f]">
                                    {activeCategory} Recipes
                                </h3>

                                <div className="flex justify-center">
                                    <div
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center
                   text-[#601f1f]/90 font-['Cardo'] leading-relaxed max-w-7xl w-full"
                                    >
                                        {recipeData
                                            .find((cat) => cat.title === activeCategory)
                                            ?.recipes.map((recipe, index) => (
                                                <div
                                                    key={index}
                                                    className="w-full border-b border-[#e5d7c6] pb-8 mb-8 last:border-none last:pb-0 last:mb-0"
                                                >
                                                    {/* Recipe title */}
                                                    <h4 className="text-2xl font-extrabold italic mb-3 text-[#330000]">
                                                        {recipe.name}
                                                    </h4>

                                                    {/* Ingredients */}
                                                    <p className="mb-2 text-lg text-[#330000]/90 italic font-bold">
                                                        Ingredients
                                                    </p>
                                                    <ul className="list-disc list-inside space-y-1">
                                                        {recipe.ingredients.map((item, i) => (
                                                            <li key={i} className="text-[#330000] text-lg italic">
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    {/* Instructions */}
                                                    <p className="text-lg mt-5 italic font-bold text-[#330000]/90">
                                                        Instructions
                                                    </p>
                                                    {recipe.instructions.map((step, i) => (
                                                        <p key={i} className="text-lg mt-1 text-[#330000] italic">
                                                            {step}
                                                        </p>
                                                    ))}

                                                    {/* Yield */}
                                                    {recipe.yield && (
                                                        <p className="text-lg mt-2 italic text-[#330000]">
                                                            {recipe.yield}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </section>

            {/* 🔚 Footer */}
            <Footer />
        </div>
    );
};

export default Recipes;




