// import React, { useEffect, useState } from "react";
// import Header from "./layout/Header";
// import Footer from "./layout/Footer";
// import { recipeData } from "./recipes-data";


// ——— Recipes categories ———
// const recipeData = [
    // {
    //     title: "Breakfast",
    //     recipes-data: [
    //         {
    //             name: "Swedish Pancakes",
    //             ingredients: [
    //                 "4 eggs",
    //                 "1⅓ cups all-purpose flour",
    //                 "1 cup sugar",
    //                 "¼ cup non-fat dry milk",
    //                 "2 cups cold water",
    //                 "Dash of salt",
    //                 "Oil or butter for cooking",
    //             ],
    //             instructions: [
    //                 "Sift the dry ingredients together in a bowl.",
    //                 "Beat the eggs in a separate bowl.",
    //                 "Blend the sifted dry ingredients into the beaten eggs and 2 cups of cold water.",
    //                 "Heat a large skillet on high heat until a drop of water \"dances\" before it evaроrates.",
    //                 "Coat the skillet with some oil or butter and pour one generous ladle of batter (1/2 c.) onto the skillet for each pancake.",
    //                 "Flip each pancake when the top bubbles and the bottom is brown.",
    //                 "Serve immediately with delicious lingonberry jam.",
    //             ],
    //             yield:  "Makes 12 large Swedish pancakes."
    //         },
    //         {
    //             name: "Heart-Shaped Waffles",
    //             ingredients: [
    //                 "5 eggs",
    //                 "1/2 c. sugar",
    //                 "1/2 tsp. salt",
    //                 "1 tsp. cardamom, ground",
    //                 "1 c. all-purpose flour",
    //                 "1 c. dairy sour cream, stirred",
    //                 "1/4 c. unsalted butter, melted",
    //                 "Fresh lingonberries or other berries or fruit",
    //                 "Whipped cream"
    //             ],
    //             instructions: [
    //                 "In a large bowl of an electric mixer, beat eggs and sugar on high speed until the mixture" +
    //                 " forms ribbons when the beaters are lifted from the bowl, about 10 minutes.",
    //                 "Beat in the salt and cardamom.",
    //                 "Sprinkle the flour over the surface of the batter.",
    //                 "Use a rubber spatula to fold in the flour, then fold in sour cream and butter.",
    //                 "Let the mixture stand for 10 minutes.",
    //                 "Preheat a heart-shaped waffle iron according to manufacturer’s directions.",
    //                 "Pour about 3/4 cup of the batter onto the center of the waffle iron.",
    //                 "Close the top of the waffle iron and bake for 2–3 minutes over medium heat until the waffle is golden and crisp.",
    //                 "Serve immediately with berries or other fruit and whipped cream (or cool waffles and serve cold)."
    //             ],
    //             yield: "Makes about 8 waffles"
    //         },
    //         {
    //             name: "Bran Muffins",
    //             ingredients: [
    //                 "2 ripe bananas, mashed",
    //                 "1 c. flour",
    //                 "1 c. bran",
    //                 "1 c. milk",
    //                 "1/4 c. brown sugar",
    //                 "1/3 c. molasses",
    //                 "2 eggs, beaten",
    //                 "3 T. margarine",
    //                 "1 T. baking powder",
    //                 "1 tsp. salt"
    //             ],
    //             instructions: [
    //                 "Preheat the oven to 375°F.",
    //                 "Grease the muffin pans.",
    //                 "Put the eggs, bananas, milk, molasses, margarine and bran into a large mixing bowl and let stand for 10 minutes.",
    //                 "Sift the flour, baking powder, brown sugar and salt together, then add to the banana mixture—stir just enough to dampen.",
    //                 "Spoon the batter into the greased muffin pans, filling each cup about two-thirds full.",
    //                 "Bake for about 20 minutes.",
    //                 "Take the muffins out of the oven and turn them out of the muffin pans so they can cool on a wire rack.",
    //                 "Variations: add blueberries, cranberries, walnuts or raisins."
    //             ],
    //             yield: "Makes 12 muffins"
    //         },
    //         {
    //             name: "Cinnamon Rolls",
    //             ingredients: [
    //                 "1 (1/4 oz.) envelope active dry yeast",
    //                 "1 tsp. sugar",
    //                 "1/4 c. warm water (110°F)",
    //                 "1 c. milk, scalded, cooled",
    //                 "1/4 c. butter, melted",
    //                 "1/3 c. sugar",
    //                 "1-1/2 tsp. salt",
    //                 "2-1/2 to 3 c. all-purpose flour",
    //                 "1/4 c. butter, room temperature",
    //                 "1/2 c. brown sugar",
    //                 "1 T. cinnamon, ground",
    //                 "Powdered-Sugar Glaze, if desired"
    //             ],
    //             instructions: [
    //                 "In a large bowl, stir the yeast and 1 teaspoon sugar into the warm water and let it stand for 5 minutes to soften.",
    //                 "Stir in milk, melted butter, 1/3 cup sugar, salt, and 1 cup of flour. Beat all of this with a spoon or electric mixer until smooth.",
    //                 "Gradually stir in 1-1/2 to 2 cups of flour, keeping the dough smooth. If the dough is still moist, stir in 1 tablespoon of flour at a time to make a soft dough.",
    //                 "Cover with a dry cloth and let it rise in a warm place until it is doubled in bulk, about 1 hour.",
    //                 "Divide the raised dough in half. On a lightly oiled board, roll out (with a lightly floured rolling pin) and stretch one piece of dough to make a 12\" x 8\" rectangle.",
    //                 "Spread 2 tablespoons of soft butter over the top of the dough. Sprinkle with brown sugar and cinnamon.",
    //                 "Beginning on the long side, roll up tightly, jelly-roll fashion. Repeat with the remaining dough. Cut the dough into 2-inch slices.",
    //                 "Place slices on floured and greased baking sheets. Let the dough rise until doubled in bulk, about 45 minutes.",
    //                 "Bake in a preheated 350°F oven for 12 to 15 minutes or until golden brown.",
    //                 "Take the cinnamon rolls out of the oven and place them on a wire rack to cool.",
    //                 "Top with Powdered-Sugar Glaze immediately, if desired, and cool or serve warm, as you like."
    //             ],
    //             yield: "Makes 18 rolls (It’s really much easier to buy these at our restaurant!)"
    //         },
    //         {
    //             name: "Powdered Sugar Glaze",
    //             ingredients: [
    //                 "1/2 c. powdered sugar",
    //                 "1/4 c. margarine, melted",
    //                 "1 tsp. vanilla"
    //             ],
    //             instructions: [
    //                 "Place all the ingredients into a small bowl and beat until creamy smooth.",
    //                 "Glaze the cinnamon rolls immediately after taking them out of the oven.",
    //                 "Allow the cinnamon rolls to cool on a wire rack.",
    //                 "Serve the cinnamon rolls while still warm or cooled, as you like."
    //             ],
    //             yield: "Makes enough to glaze 18 cinnamon rolls"
    //         }
    //     ],
    // },
    // {
    //     title: "Starters",
    //     recipes-data: [
    //         {
    //             name: "Celery Seed Dressing",
    //             ingredients: [
    //                 "2 c. salad oil",
    //                 "1 c. vinegar",
    //                 "1/2 c. sugar",
    //                 "2 tsp. dry mustard",
    //                 "3 T. onion, minced or grated",
    //                 "2 T. celery seed, whole"
    //             ],
    //             instructions: [
    //                 "Combine the oil, sugar, dry mustard, grated onion, and celery seed with a wire whisk.",
    //                 "Add the vinegar slowly while continuing to stir.",
    //                 "Cover and refrigerate until ready to serve.",
    //                 "Mix thoroughly before each use."
    //             ],
    //             yield: "Makes 4 cups"
    //         },
    //         {
    //             name: "Cucumber Salad",
    //             ingredients: [
    //                 "1 (10–12 inch) European-style cucumber or 2 (6-inch) cucumbers",
    //                 "2 T. fresh dill, chopped",
    //                 "1/2 c. white vinegar",
    //                 "1/2 c. sugar",
    //                 "1/4 c. water",
    //                 "1 tsp. salt"
    //             ],
    //             instructions: [
    //                 "Core and cut the cucumber into paper-thin slices.",
    //                 "Layer the sliced cucumbers in a medium bowl, sprinkling the dill between each of the layers.",
    //                 "Combine the vinegar, sugar, water, and salt in a 2-cup measure.",
    //                 "Pour the vinegar mixture over the layered cucumbers.",
    //                 "Cover and refrigerate for 4–5 hours before serving.",
    //                 "Mix thoroughly before each use."
    //             ],
    //             yield: "Makes 4–6 servings"
    //         },
    //         {
    //             name: "Lingonberry Vinaigrette",
    //             ingredients: [
    //                 "1 (12 oz.) jar lingonberries (undiluted)",
    //                 "1 c. apple cider vinegar",
    //                 "2 T. celery seed, ground",
    //                 "2 T. sugar",
    //                 "2 c. oil",
    //                 "Salt and pepper to taste"
    //             ],
    //             instructions: [
    //                 "Whisk all the ingredients together in a medium bowl.",
    //                 "Cover and refrigerate until ready to serve.",
    //                 "Mix thoroughly before each use."
    //             ],
    //             yield: "Makes 4 cups"
    //         },
    //         {
    //             name: "Pistachio Vinaigrette",
    //             ingredients: [
    //                 "1 c. pistachios, shelled whole",
    //                 "1 c. white vinegar",
    //                 "2 c. vegetable oil",
    //                 "1/4 c. red onion, chopped",
    //                 "2 T. celery seed, ground",
    //                 "2 T. sugar",
    //                 "Dash of salt and pepper"
    //             ],
    //             instructions: [
    //                 "Combine all the ingredients and blend in a food processor or blender.",
    //                 "Cover and refrigerate until ready to serve.",
    //                 "Mix thoroughly before each use."
    //             ],
    //             yield: "Makes 4 cups"
    //         },
    //         {
    //             name: "Buttered Potato Soup",
    //             ingredients: [
    //                 "2 c. mashed potatoes",
    //                 "6 c. chicken stock",
    //                 "2 T. fresh dill, chopped",
    //                 "4 tsp. butter",
    //                 "Dash of allspice, ground",
    //                 "Salt and pepper to taste"
    //             ],
    //             instructions: [
    //                 "Combine the mashed potatoes and chicken stock in a medium saucepan and whisk until smooth.",
    //                 "Stir over medium heat until the soup barely comes to a boil.",
    //                 "Add salt and pepper to taste and sprinkle the top with a dash of allspice.",
    //                 "Ladle the hot soup into individual bowls or mugs.",
    //                 "Garnish each bowl with some dill and a 1/2 teaspoon of butter and serve immediately."
    //             ],
    //             yield: "Makes 8 servings"
    //         },
    //         {
    //             name: "Swedish Fruit Soup",
    //             ingredients: [
    //                 "1/2 c. pitted prunes",
    //                 "1-1/2 c. mixed dried fruit",
    //                 "1-1/2 c. raisins",
    //                 "1/2 c. Turkish apricots, dried",
    //                 "3 T. cornstarch",
    //                 "1 c. water",
    //                 "1/2 c. sugar",
    //                 "1/2 c. brown sugar",
    //                 "2 T. lemon juice",
    //                 "1/2 c. raspberry syrup"
    //             ],
    //             instructions: [
    //                 "Cover the fruit with cold water and bring it to a boil in a large saucepan.",
    //                 "Allow it to simmer until the fruit is soft but not mushy.",
    //                 "Stir the cornstarch and water with a fork in a small bowl until smooth.",
    //                 "Stir the cornstarch mixture into the simmering fruit.",
    //                 "Continue to cook uncovered until the fruit mixture is clear and any lumps are dissolved.",
    //                 "Stir in the sugars and cook for 2 minutes more, then set it aside to cool.",
    //                 "Add the lemon juice and raspberry syrup when the fruit is thoroughly cooled and serve."
    //             ],
    //             yield: "Makes 12 servings"
    //         },
    //         {
    //             name: "Swedish Pea Soup with Pork",
    //             ingredients: [
    //                 "2 c. dry yellow Swedish peas",
    //                 "3 qts. water",
    //                 "1 (2–3 lb.) ham bone",
    //                 "1 medium onion, sliced",
    //                 "1/4 tsp. allspice, whole",
    //                 "1 tsp. marjoram, dried leaf",
    //                 "1 tsp. salt, to taste",
    //                 "1/8 tsp. black pepper, ground"
    //             ],
    //             instructions: [
    //                 "Sort and wash the peas. Combine the peas and water in a deep soup kettle and soak overnight.",
    //                 "Place the soup kettle with the soaked peas and water over medium-high heat on the stove.",
    //                 "Cover the pot and bring it to a boil. Remove any shells from the peas that float to the top of the water.",
    //                 "Simmer the peas for 2 hours or until the peas are partially softened.",
    //                 "Add the ham bone, onions, and allspice to the pea soup. Continue to simmer covered for one hour until the peas are tender.",
    //                 "Skim any fat from the surface. Stir in the marjoram, salt, and pepper.",
    //                 "To serve, place the ham bone on a platter and cut the meat away from the bone into slices.",
    //                 "Serve the meat in sandwiches if desired, and the hot soup in bowls or mugs."
    //             ],
    //             yield: "Makes 6 servings"
    //         },
    //         {
    //             name: "Spinach Soup",
    //             ingredients: [
    //                 "2 lbs. fresh spinach (or 1 (2 lb.) pkg. frozen chopped spinach)",
    //                 "2 quarts chicken stock",
    //                 "3 T. butter",
    //                 "2 T. flour",
    //                 "1 tsp. salt",
    //                 "1/8 tsp. nutmeg",
    //                 "Dash of pepper, freshly ground"
    //             ],
    //             instructions: [
    //                 "Thoroughly wash the fresh spinach, then drain it and chop it coarsely. (If using frozen spinach, thaw it completely and strain.)",
    //                 "Bring the soup stock to a boil in a 4-quart pot and add the spinach. Simmer uncovered for about 8 minutes.",
    //                 "Strain the spinach from the stock into a bowl. Pour the soup stock into another pot and set it aside.",
    //                 "Press the spinach with a spoon to remove most of the liquid. Chop the cooked spinach even finer if desired.",
    //                 "Melt the butter in the emptied soup pot, then remove it from the heat. Stir in the flour carefully to avoid lumps.",
    //                 "Return the pot to the stove. Stirring constantly over medium-high heat, add the soup stock—1 cup at a time—to the flour mixture.",
    //                 "Bring the uncovered pot of soup to a boil. Add the spinach, salt, pepper, and nutmeg.",
    //                 "Simmer about 5 minutes more until slightly thickened, then serve."
    //             ],
    //             yield: "Makes 4–6 servings"
    //         }
    //     ],
    // },
    // {
    //     title: "Sides",
    //     recipes-data: [
    //         {
    //             name: "Pickled Beets",
    //             ingredients: [
    //                 "1 (16 oz.) jar of beets (preferably center cut beets)",
    //                 "1/4 c. onion, chopped",
    //                 "1/2 c. sugar",
    //                 "3 allspice, whole berries",
    //                 "1/2 c. vinegar"
    //             ],
    //             instructions: [
    //                 "Mix the onion, sugar, allspice, and vinegar together in a small bowl.",
    //                 "Pour the vinegar mixture over the drained beets and serve."
    //             ],
    //             yield: "Makes 6 servings"
    //         },
    //         {
    //             name: "Swedish Brown Beans",
    //             ingredients: [
    //                 "2 c. Swedish brown beans",
    //                 "5 c. water",
    //                 "1 tsp. salt",
    //                 "1/4 c. vinegar",
    //                 "1/4 c. granulated sugar",
    //                 "1/4 c. brown sugar"
    //             ],
    //             instructions: [
    //                 "Rinse the Swedish brown beans. Place them in a large pot with the water and salt.",
    //                 "Let stand overnight.",
    //                 "Bring the beans, along with the soaking water, to a boil over medium-high heat.",
    //                 "Cover and simmer over low heat for 1½ hours or until the beans are tender.",
    //                 "Stir in the vinegar, granulated sugar, and brown sugar.",
    //                 "Simmer uncovered for 30 minutes or longer, until the mixture thickens."
    //             ],
    //             yield: "Makes 6–8 servings"
    //         },
    //         {
    //             name: "Caraway Seed Sauerkraut",
    //             ingredients: [
    //                 "1 lb. can sauerkraut, strained and washed",
    //                 "2 T. grated fresh apple",
    //                 "1 tsp. caraway seed",
    //                 "1 T. brown sugar",
    //                 "1 c. chicken or duck drippings",
    //                 "1 c. water"
    //             ],
    //             instructions: [
    //                 "Combine all the ingredients in a medium saucepan and bring to a boil on the stove.",
    //                 "Turn down the heat, cover, and simmer for 10–15 minutes.",
    //                 "Serve the sauerkraut hot."
    //             ],
    //             yield: "Makes 6–8 servings"
    //         },
    //         {
    //             name: "Candied Sweet Potatoes",
    //             ingredients: [
    //                 "3 medium sweet potatoes",
    //                 "8 c. water",
    //                 "2 T. margarine",
    //                 "2 T. brown sugar",
    //                 "1 tsp. cinnamon, ground",
    //                 "1 tsp. allspice, ground"
    //             ],
    //             instructions: [
    //                 "In a large covered pot, boil then simmer the sweet potatoes in the water until soft, approximately 30–40 minutes.",
    //                 "Remove the sweet potatoes from the pot and place them in cold water to cover until the skins peel off easily.",
    //                 "Slice the sweet potatoes into 3 oz. servings and place them in a greased pan.",
    //                 "Add the margarine, brown sugar, cinnamon, and allspice.",
    //                 "Bake in the oven uncovered for 20–30 minutes at 350°F."
    //             ],
    //             yield: "Makes 6–8 servings"
    //         },
    //         {
    //             name: "Sweet & Sour Red Cabbage",
    //             ingredients: [
    //                 "1 head red cabbage",
    //                 "2 T. butter",
    //                 "1 tsp. salt",
    //                 "1 tsp. caraway seeds",
    //                 "2 c. water",
    //                 "2 T. vinegar",
    //                 "2 T. sugar"
    //             ],
    //             instructions: [
    //                 "Shred the cabbage, as you like, into a large pot and add all the ingredients.",
    //                 "Cook the cabbage over very low heat for 1–2 hours.",
    //                 "Add more water if needed.",
    //                 "Serve hot."
    //             ],
    //             yield: "Makes 4–6 servings"
    //         },
    //         {
    //             name: "Creamed Spinach",
    //             ingredients: [
    //                 "1 lb. frozen chopped spinach",
    //                 "1/4 c. onion, grated",
    //                 "1 tsp. nutmeg, grated",
    //                 "1 tsp. salt",
    //                 "1/2 tsp. pepper"
    //             ],
    //             instructions: [
    //                 "Add the onion, nutmeg, salt, and pepper to the chopped spinach while cooking according to the directions on the package until tender.",
    //                 "Strain the cooked spinach and add to the hot *White Cream Sauce.",
    //                 "Serve the creamed spinach immediately."
    //             ],
    //             yield: "Makes 6–8 servings"
    //         },
    //         {
    //             name: "Creamed Peas",
    //             ingredients: [
    //                 "2 medium (8 oz.) pkgs. frozen peas",
    //                 "Salt and pepper to taste"
    //             ],
    //             instructions: [
    //                 "Season the cooked peas with salt and pepper after bringing them to a slight boil in a medium saucepan according to the directions on the package.",
    //                 "Strain the cooked peas and add to the hot *White Cream Sauce.",
    //                 "Serve the creamed peas immediately."
    //             ],
    //             yield: "Makes 4–6 servings"
    //         },
    //         {
    //             name: "White Cream Sauce",
    //             ingredients: [
    //                 "1/4 c. butter",
    //                 "1/4 c. all-purpose flour",
    //                 "1-1/2 c. milk",
    //                 "1 tsp. salt",
    //                 "1/4 tsp. allspice, ground (or white pepper)"
    //             ],
    //             instructions: [
    //                 "Melt the butter in a small saucepan over medium heat.",
    //                 "Stir in the flour.",
    //                 "Slowly add the milk, stirring constantly with a wire whisk.",
    //                 "Cook until the sauce is thickened and smooth.",
    //                 "Stir in the salt and allspice (or white pepper) and serve hot."
    //             ],
    //             yield: "Makes about 2 cups"
    //         },
    //     ],
    // },
    // {
    //     title: "Entrees",
    //     recipes-data: [
    //         {
    //             name: "Wine Herring",
    //             ingredients: [
    //                 "2 salted herring (about 1-1/2 lbs.)",
    //                 "1/2 c. sherry wine",
    //                 "1/4 c. water",
    //                 "1/4 c. white vinegar",
    //                 "1 c. sugar",
    //                 "1/4 tsp. allspice, ground",
    //                 "2 onions, thinly sliced",
    //                 "Fresh dill, chopped for garnish"
    //             ],
    //             instructions: [
    //                 "In the refrigerator, soak the herring overnight in cold water to cover. Use a shallow, medium glass dish and cover with plastic wrap.",
    //                 "Drain the herring, remove the head, tail, skin, and backbone from the fish.",
    //                 "Rinse the fish in cold water. Cut the herring crosswise into 3/4-inch slices. Place the sliced fish back into the medium, shallow glass dish.",
    //                 "Combine sherry, water, vinegar, sugar, and allspice and pour it over the fish. Top the fish with onions.",
    //                 "Cover with plastic wrap and refrigerate for 24 hours.",
    //                 "Drain the marinade off the herring. Arrange the herring and the onion rings on a plate and garnish with dill."
    //             ],
    //             yield: "Makes about 24 herring pieces"
    //         },
    //         {
    //             name: "Cajun Crab Cakes",
    //             ingredients: [
    //                 "1 lb. pkg crab meat flakes",
    //                 "1/4 c. sour cream",
    //                 "1 tsp. red pepper flakes",
    //                 "2 T. red onions, minced",
    //                 "1 T. dill",
    //                 "3 eggs",
    //                 "2 dashes Tabasco",
    //                 "Breadcrumbs"
    //             ],
    //             instructions: [
    //                 "Mix all the ingredients except breadcrumbs together in a large bowl.",
    //                 "Thicken the crab mixture with breadcrumbs until it is easy enough to handle.",
    //                 "Form into 15–18 patties if served as an entrée (or 40–50 balls if served as an appetizer).",
    //                 "Add to a hot skillet with enough oil to cover the patties.",
    //                 "Fry the patties for 5–7 minutes on each side or until the patties are golden brown.",
    //                 "Serve the patties with *Swedish Dill Mustard Sauce*."
    //             ],
    //             yield: "Makes 15–18 patties"
    //         },
    //
    //         {
    //             name: "Koldomar (Cabbage Rolls)",
    //             ingredients: [
    //                 "2-3 quarts boiling water",
    //                 "1 large head cabbage",
    //                 "1 lb. lean ground beef",
    //                 "1-1/2 c. soft breadcrumbs",
    //                 "1 small onion, minced",
    //                 "1 egg",
    //                 "2 tsp. salt",
    //                 "1/2 tsp. allspice, ground",
    //                 "1/2 tsp. nutmeg, ground",
    //                 "1/2 tsp. garlic powder",
    //                 "2 T. chili sauce",
    //                 "1 T. A-1 sauce"
    //             ],
    //             instructions: [
    //                 "Preheat the oven to 300°F. Butter a 13x9-inch baking pan and set aside.",
    //                 "Remove 16 unblemished large outer leaves from the cabbage. Cook the leaves in boiling water for 1 minute or until softened (or place the head of cabbage in boiling water for 1 minute, drain, and remove 16 outer leaves). Reserve the remaining cabbage for another use. Drain the softened leaves on paper towels.",
    //                 "In a large bowl of an electric mixer, combine beef, breadcrumbs, onion, egg, salt, allspice, nutmeg, garlic powder, chili sauce, and A-1 sauce. Beat on high speed until the mixture is light and fluffy—about 10 minutes.",
    //                 "Divide the meat mixture among the cabbage leaves, placing an egg-shaped mound near the stem end of each leaf. Roll into bundles, folding in the sides of the cabbage leaves over the meat mixture.",
    //                 "Arrange the cabbage rolls close together in the prepared baking pan, with the loose end of each leaf on the bottom. Brush the cabbage rolls with melted butter and bake for 1 hour.",
    //                 "Serve the hot cabbage rolls with brown gravy."
    //             ],
    //             yield: "Makes 8 servings (16 cabbage rolls)"
    //         },
    //
    //
    //         {
    //             name: "Marinated Salmon in Dill",
    //             ingredients: [
    //                 "3 lbs. center-cut fresh Norwegian salmon, cleaned and scaled",
    //                 "1 large bunch fresh dill",
    //                 "1/4 c. salt (coarse salt preferable)",
    //                 "1/4 c. sugar",
    //                 "2 T. white peppercorns, crushed",
    //                 "3 or 4 soup cans for weights"
    //             ],
    //             instructions: [
    //                 "Cut the fish in half lengthwise, and remove the backbone and small bones.",
    //                 "Place half of the fish, skin side down, in a glass baking dish or casserole." +
    //                 " Wash and shake dry the dill and place it on top of the fish.",
    //                 "Combine the rest of the ingredients in a bowl and sprinkle this mixture over the dill," +
    //                 " covering the whole piece of salmon.",
    //                 "Place the other half of the fish, skin side up, on the top. Cover the fish with aluminum foil.",
    //                 "On top of that, place a platter holding 3 or 4 soup cans to make a weight.",
    //                 "Refrigerate the fish like this for 48 hours. Morning and evening during this period, " +
    //                 "remove the dish and baste it with the liquid that accumulates. " +
    //                 "Separate the halves of fish and baste inside as well. Put the platter with weights back" +
    //                 " in the refrigerator each time.",
    //                 "When ready to serve, remove the fish from its marinade, scrape away the seasonings, " +
    //                 "and pat it dry with paper towels.",
    //                 "Slice each half of the fish, skin side down, on the diagonal, removing the slice from the skin.",
    //                 "Serve the salmon as an appetizer or on sandwiches with *Swedish Dill Mustard Sauce*."
    //             ],
    //             yield: "Makes 8–10 servings"
    //         },
    //         {
    //             name: "Lamb Stew in Dill Sauce",
    //             ingredients: [
    //                 "3 lbs. lamb shoulder meat, cubed",
    //                 "1 c. onion, chopped fine",
    //                 "2 stalks fresh dill",
    //                 "1/4 c. flour",
    //                 "1/2 tsp. allspice, whole",
    //                 "1 T. salt",
    //                 "1 tsp. pepper, ground"
    //             ],
    //             instructions: [
    //                 "Cut the lamb as for stew.",
    //                 "Place all of the ingredients, except for the flour, in a large Dutch oven or pot.",
    //                 "Put in enough water to cover the ingredients.",
    //                 "Bring this to a boil on the stove. Turn down the heat and simmer for 1 hour or until the meat is tender.",
    //                 "Remove the meat to a platter.",
    //                 "Thicken the broth with flour—stirring constantly, while still simmering, to remove any lumps in the gravy.",
    //                 "Return the meat to the pot. Serve this with new potatoes."
    //             ],
    //             yield: "Makes 6–8 servings"
    //         },
    //         {
    //             name: "Farikol (Lamb with Cabbage)",
    //             ingredients: [
    //                 "3 lbs. lamb shoulder meat, cubed",
    //                 "3 lbs. cabbage",
    //                 "2 bay leaves",
    //                 "6 allspice, whole",
    //                 "1 T. salt",
    //                 "1 tsp. brown sugar",
    //                 "1/4 tsp. pepper, ground",
    //                 "1 onion, medium, sliced"
    //             ],
    //             instructions: [
    //                 "Cut the lamb as for stew. Remove the leaves of the cabbage.",
    //                 "Alternate the layers of cabbage leaves and meat in a large pot while seasoning each layer.",
    //                 "Add the sliced onion.",
    //                 "Cover and simmer this slowly on the stove for 1–2 hours or until the meat is tender (the moisture from the cabbage and the meat keeps this from drying out)."
    //             ],
    //             yield: "Makes 6–8 servings"
    //         },
    //         {
    //             name: "Lapskus (Norwegian Stew)",
    //             ingredients: [
    //                 "2 lbs. tender chuck, cut into 1-inch cubes",
    //                 "1/2 lb. salt pork, cut up",
    //                 "1/2 tsp. allspice, ground",
    //                 "1/2 c. beef stock",
    //                 "2 qt. raw potatoes, cut up",
    //                 "3 qts. water"
    //             ],
    //             instructions: [
    //                 "Brown the beef and salt pork in a Dutch oven for about 10 minutes.",
    //                 "Add all the other ingredients except potatoes. Add enough water to cover the contents of the pot and place covered in the oven at 325°F for about 30–45 minutes.",
    //                 "Add the potatoes and finish cooking until the meat and potatoes are done.",
    //                 "Note: The beef and salt pork usually turn out to be seasoned perfectly. However, more salt can be added to taste. Also, smoked pork butt can be used in place of the salt pork to give the stew a smoky taste."
    //             ],
    //             yield: "Makes 6–8 servings"
    //         },
    //         {
    //             name: "Roast Duck",
    //             ingredients: [
    //                 "1 (4–5 lb.) Long Island duck (remove neck and tail)",
    //                 "1/2 oz. chicken base",
    //                 "2 pcs. dried fruit (optional)",
    //                 "2 oz. water",
    //                 "Salt and pepper",
    //                 "Chicken fat"
    //             ],
    //             instructions: [
    //                 "Grease a baking pan with chicken fat.",
    //                 "Season the top of the duck with salt and pepper.",
    //                 "Rub the chicken base inside the duck and put in the dried fruit.",
    //                 "Coat the duck with a thin layer of chicken fat and place it in the baking pan.",
    //                 "Pour the water inside the duck.",
    //                 "Cover the duck with foil and roast at 400°F for 2 hours.",
    //                 "Leave the duck uncovered for the last 15 minutes.",
    //                 "Remove the duck to a platter and serve with lingonberry preserves."
    //             ],
    //             yield: "Makes 6–8 servings"
    //         },
    //         {
    //             name: "Chicken Croquettes",
    //             ingredients: [
    //                 "2 c. cooked chicken, minced",
    //                 "1 c. cream sauce (see *White Cream Sauce*)",
    //                 "1 c. onion, chopped",
    //                 "1/2 c. cornstarch",
    //                 "1/4 c. green pepper, chopped",
    //                 "2 eggs",
    //                 "Salt and pepper"
    //             ],
    //             instructions: [
    //                 "Mix the chicken with cream sauce, onion, and green pepper.",
    //                 "Add salt and pepper to taste and 2 eggs.",
    //                 "Roll this mixture in cornstarch and shape into 3-inch patties.",
    //                 "Add vegetable oil to the skillet (enough to cover the patties) and fry patties until both sides are nicely browned."
    //             ],
    //             yield: "Makes 8–12 patties"
    //         },
    //         {
    //             name: "Rosemary Chicken Marinade",
    //             ingredients: [
    //                 "2 stems fresh rosemary",
    //                 "1 c. white wine",
    //                 "2 T. shallots, minced",
    //                 "3 cloves garlic, chopped",
    //                 "2 c. oil",
    //                 "2 c. mustard",
    //                 "Dash of pepper"
    //             ],
    //             instructions: [
    //                 "Combine the first four ingredients with a whisk in a medium bowl.",
    //                 "Add the oil while stirring constantly, then add enough mustard to thicken.",
    //                 "Add a dash of pepper at the end.",
    //                 "(To cook: Marinate boneless chicken breasts in a shallow glass dish. Cover with plastic wrap and refrigerate for 2 hours. Remove the chicken breasts from the marinade and grill 6–8 minutes on each side.)"
    //             ],
    //             yield: "Makes enough to marinate 12 chicken breasts"
    //         },
    //         {
    //             name: "Swedish Beefsteak",
    //             ingredients: [
    //                 "3 lbs. beef sirloin pieces",
    //                 "1-1/2 c. onions, sliced",
    //                 "Oil, fat or butter (enough to cover a pan)",
    //                 "1/2 c. bouillon or stock",
    //                 "Salt and pepper",
    //                 "A dash of sugar"
    //             ],
    //             instructions: [
    //                 "Cut the meat from the rib and slice it into 3/4-inch pieces. " +
    //                 "Pound the meat with a meat mallet to a 1/2-inch thickness.",
    //                 "Brown the meat on both sides for about 3–5 minutes in a very hot skillet with oil.",
    //                 "Sprinkle with salt and pepper. After the steak has been cooked, " +
    //                 "remove it to a heated platter.",
    //                 "In a separate skillet, fry the onions in oil, butter, or fat with a dash of salt, " +
    //                 "pepper, and sugar.",
    //                 "Remove the onions from that pan and add them to the beefsteak pan " +
    //                 "with the bouillon or stock. Cook for 1 minute on high heat.",
    //                 "Pour the onions and sauce over the beefsteak and serve immediately."
    //             ],
    //             yield: "Makes 6 servings"
    //         },
    //
    //         {
    //             name: "Swedish Dill Mustard Sauce",
    //             ingredients: [
    //                 "3 T. vegetable oil",
    //                 "3 T. sharp Swedish mustard",
    //                 "3 T. sugar",
    //                 "1-1/2 T. light wine vinegar",
    //                 "1 T. fresh dill, chopped fine"
    //             ],
    //             instructions: [
    //                 "Mix the mustard, sugar, and vinegar together in a bowl.",
    //                 "Add the oil slowly to the mustard mixture and beat it well into a thick sauce.",
    //                 "Add the fresh dill to the mustard sauce and blend.",
    //                 "Pour the sauce over salmon when ready to serve."
    //             ],
    //             yield: "Makes 1 cup (enough sauce for about 10–12 servings of salmon)"
    //         },
    //     ],
    // },
    // {
//         title: "Desserts",
//         recipes-data: [
//             {
//                 name: "Pumpkin Squares",
//                 ingredients: [
//                     "2 cups pumpkin puree",
//                     "1½ cups sugar",
//                     "3 eggs",
//                     "1 cup flour",
//                     "1 tsp baking soda",
//                     "1 tsp cinnamon",
//                     "½ tsp salt",
//                 ],
//                 instructions: [
//                     "Preheat oven to 350°F.",
//                     "Mix all ingredients until smooth.",
//                     "Pour into greased baking pan and bake for 35 minutes.",
//                     "Cool and cut into squares.",
//                 ],
//             },
//         ],
//     },
// ];

// const Recipes: React.FC = () => {
//     const [isVisible, setIsVisible] = useState(false);
//     const [activeCategory, setActiveCategory] = useState<string | null>(null);
//
//     const [showTop, setShowTop] = useState(false);
//
//     useEffect(() => {
//         const handleScroll = () => {
//             setShowTop(window.scrollY > 400);
//         };
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);
//
//
//     // Fade-in when scrolled into view
//     useEffect(() => {
//         setTimeout(() => setIsVisible(true), 100); // tiny delay for smooth start
//     }, []);
//
//     return (
//         <div className="bg-white min-h-screen text-[#601f1f]">
//             {/* 🔝 Header */}
//             <Header />
//
//             {/* 🧾 Recipes Section */}
//             <section
//                 id="recipes-data"
//                 className="relative w-full bg-[#FFF] pt-28 pb-5 px-5 text-[#601f1f]
//                           transition-opacity duration-1000">
//                 <div className={`faded-fixed-bg w-full transition-opacity duration-1000 ${
//                         isVisible ? "opacity-100" : "opacity-0"}`}>
//                     <div className="relative max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 text-[#601f1f]">
//
//                         {/* Section heading */}
//                         <div className="text-center mb-12">
//                             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#601f1f] pt-15 mb-8">
//                                 Cooking at Home with Ann Sather
//                             </h2>
//                             <p className="max-w-5xl mx-auto text-lg mb-4 leading-relaxed">
//                                 Do you think it’s possible to replicate our much celebrated
//                                 cinnamon rolls, Swedish pancakes, roast duck, or one of our
//                                 delectable pies at home? We don’t think so either, but we’re
//                                 giving you the opportunity to try.
//                             </p>
//                             <p className="max-w-5xl mx-auto text-lg mb-10 leading-relaxed">
//                                 In 1994, Ann Sather’s restaurants published a 50th-anniversary
//                                 cookbook. Due to popular demand, we now have recipes-data for some of
//                                 our much-loved dishes available online. Browse through our
//                                 sections below to get inspired!
//                             </p>
//                         </div>
//
//                         {/* Recipe Categories Styled Like Menu Buttons */}
//                         <div className="flex flex-wrap justify-center gap-4 max-w-xl mx-auto">
//                             {recipeData.map(({ title }) => {
//                                 const isActive = activeCategory === title;
//                                 return (
//                                     <button
//                                         key={title}
//                                         onClick={() =>
//                                             setActiveCategory(isActive ? null : title)}
//                                         className={`px-8 py-2 rounded-full font-semibold uppercase tracking-wide transition-all duration-300 ${
//                                             isActive
//                                                 ? "bg-[#7a1a1a] text-white shadow-md scale-105"
//                                                 : "bg-[#4a5456] text-white hover:bg-[#601f1f]"}`}>
//                                         {title}
//                                     </button>
//                                 );
//                             })}
//                         </div>
//
//                         {/* Active Category Content */}
//                         {activeCategory && (
//                             <div className="mt-10 max-w-7xl mx-auto p-5 px-6">
//                                 <h3 className="text-center text-2xl md:text-3xl font-bold capitalize mb-10 text-[#601f1f]">
//                                     {activeCategory} Recipes
//                                 </h3>
//
//                                 <div className="flex justify-center">
//                                     <div
//                                         className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center
//                    text-[#601f1f]/90 font-['Cardo'] leading-relaxed max-w-7xl w-full"
//                                     >
//                                         {recipeData
//                                             .find((cat) => cat.title === activeCategory)
//                                             ?.recipes-data.map((recipe, index) => (
//                                                 <div
//                                                     key={index}
//                                                     className="w-full border-b border-[#e5d7c6] pb-8 mb-8 last:border-none last:pb-0 last:mb-0"
//                                                 >
//                                                     {/* Recipe title */}
//                                                     <h4 className="text-2xl font-extrabold italic mb-3 text-[#330000]">
//                                                         {recipe.name}
//                                                     </h4>
//
//                                                     {/* Ingredients */}
//                                                     <p className="mb-2 text-lg text-[#330000]/90 italic font-bold">
//                                                         Ingredients
//                                                     </p>
//                                                     <ul className="list-disc list-inside space-y-1">
//                                                         {recipe.ingredients.map((item, i) => (
//                                                             <li key={i} className="text-[#330000] text-lg italic">
//                                                                 {item}
//                                                             </li>
//                                                         ))}
//                                                     </ul>
//
//                                                     {/* Instructions */}
//                                                     <p className="text-lg mt-5 italic font-bold text-[#330000]/90">
//                                                         Instructions
//                                                     </p>
//                                                     {recipe.instructions.map((step, i) => (
//                                                         <p key={i} className="text-lg mt-1 text-[#330000] italic">
//                                                             {step}
//                                                         </p>
//                                                     ))}
//
//                                                     {/* Yield */}
//                                                     {recipe.yield && (
//                                                         <p className="text-lg mt-2 italic text-[#330000]">
//                                                             {recipe.yield}
//                                                         </p>
//                                                     )}
//                                                 </div>
//                                             ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </section>
//
//             {/* 🔝 Back to Top Floating Button */}
//             {showTop && (
//                 <button
//                     onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//                     aria-label="Back to top"
//                     className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full
//            bg-[#EDEDED] text-[#601f1f] text-xl font-bold
//            flex items-center justify-center shadow-lg border border-[#601f1f]/30
//            hover:bg-[#601f1f] hover:text-[#EDEDED] hover:scale-110
//            transition-all duration-300 ease-in-out"
//
//                 >
//                     ↑
//                 </button>
//             )}
//
//             {/* 🔚 Footer */}
//             <Footer />
//         </div>
//     );
// };
//
// export default Recipes;



import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { recipeData } from "./recipes-data/";

const Recipes: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [showTop, setShowTop] = useState(false);

    // 🧭 Show "Back to Top" button when scrolled down
    useEffect(() => {
        const handleScroll = () => {
            setShowTop(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // ✨ Fade-in animation on mount
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-white min-h-screen text-[#601f1f]">
            {/* 🔝 Header */}
            <Header />

            {/* 🧾 Recipes Section */}
            <section
                id="recipes"
                className="relative w-full bg-[#FFF] pt-28 pb-5 px-5 text-[#601f1f] transition-opacity duration-1000"
            >
                <div
                    className={`faded-fixed-bg w-full transition-opacity duration-1000 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div className="relative max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 text-[#601f1f]">
                        {/* 🧠 Section Heading */}
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

                        {/* 🍳 Recipe Category Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 max-w-xl mx-auto">
                            {recipeData.map(({ title }) => {
                                const isActive = activeCategory === title;
                                return (
                                    <button
                                        key={title}
                                        onClick={() =>
                                            setActiveCategory(isActive ? null : title)
                                        }
                                        className={`px-8 py-2 rounded-full font-semibold uppercase tracking-wide transition-all duration-300 ${
                                            isActive
                                                ? "bg-[#7a1a1a] text-white shadow-md scale-105"
                                                : "bg-[#4a5456] text-white hover:bg-[#601f1f]"
                                        }`}
                                    >
                                        {title}
                                    </button>
                                );
                            })}
                        </div>

                        {/* 📖 Active Category Recipes */}
                        {activeCategory && (
                            <div className="mt-10 max-w-7xl mx-auto p-5 px-6">
                                <h3 className="text-center text-2xl md:text-3xl font-bold capitalize mb-10 text-[#601f1f]">
                                    {activeCategory} Recipes
                                </h3>

                                <div className="flex justify-center">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center text-[#601f1f]/90 font-['Cardo'] leading-relaxed max-w-7xl w-full">
                                        {recipeData
                                            .find((cat) => cat.title === activeCategory)
                                            ?.recipes.map((recipe, index) => (
                                                <div
                                                    key={index}
                                                    className="w-full border-b border-[#e5d7c6] pb-8 mb-8 last:border-none last:pb-0 last:mb-0"
                                                >
                                                    <h4 className="text-2xl font-extrabold italic mb-3 text-[#330000]">
                                                        {recipe.name}
                                                    </h4>

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

                                                    <p className="text-lg mt-5 italic font-bold text-[#330000]/90">
                                                        Instructions
                                                    </p>
                                                    {recipe.instructions.map((step, i) => (
                                                        <p key={i} className="text-lg mt-1 text-[#330000] italic">
                                                            {step}
                                                        </p>
                                                    ))}

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

            {/* 🔝 Back to Top Floating Button */}
            {showTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Back to top"
                    className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full
            bg-[#EDEDED] text-[#601f1f] text-xl font-bold
            flex items-center justify-center shadow-lg border border-[#601f1f]/30
            hover:bg-[#601f1f] hover:text-[#EDEDED] hover:scale-110
            transition-all duration-300 ease-in-out"
                >
                    ↑
                </button>
            )}

            {/* 🔚 Footer */}
            <Footer />
        </div>
    );
};

export default Recipes;

