const FOODS = [
 {id:"spinach",name:"Spinach",emoji:"🥬",diet:["vegetarian","vegan","eggetarian","omnivore"],goals:["iron","folate","vitaminA","fiber"],nutrients:["Iron","Folate","Vitamin A","Fiber"],cost:"low",time:"quick",group:"Vegetables",score:96},
 {id:"lentils",name:"Lentils (Dal)",emoji:"🫘",diet:["vegetarian","vegan","eggetarian","omnivore"],goals:["iron","protein","fiber","folate"],nutrients:["Iron","Protein","Fiber","Folate"],cost:"low",time:"medium",group:"Protein",score:94},
 {id:"chickpeas",name:"Chickpeas",emoji:"🧆",diet:["vegetarian","vegan","eggetarian","omnivore"],goals:["iron","protein","fiber"],nutrients:["Iron","Protein","Fiber"],cost:"low",time:"medium",group:"Protein",score:91},
 {id:"egg",name:"Eggs",emoji:"🥚",diet:["eggetarian","omnivore"],goals:["protein","b12","vitaminD","choline"],nutrients:["Protein","B12","Vitamin D","Choline"],cost:"low",time:"quick",group:"Protein",score:92},
 {id:"milk",name:"Fortified Milk",emoji:"🥛",diet:["vegetarian","eggetarian","omnivore"],goals:["calcium","b12","vitaminD","protein"],nutrients:["Calcium","B12","Vitamin D","Protein"],cost:"low",time:"quick",group:"Dairy",score:89},
 {id:"paneer",name:"Paneer",emoji:"🧀",diet:["vegetarian","eggetarian","omnivore"],goals:["protein","calcium"],nutrients:["Protein","Calcium"],cost:"medium",time:"quick",group:"Dairy",score:87},
 {id:"tofu",name:"Tofu",emoji:"◻️",diet:["vegetarian","vegan","eggetarian","omnivore"],goals:["protein","calcium","iron"],nutrients:["Protein","Calcium","Iron"],cost:"medium",time:"quick",group:"Protein",score:90},
 {id:"oats",name:"Oats",emoji:"🥣",diet:["vegetarian","vegan","eggetarian","omnivore"],goals:["fiber","iron","protein"],nutrients:["Fiber","Iron","Protein"],cost:"low",time:"quick",group:"Staples",score:86},
 {id:"guava",name:"Guava",emoji:"🍈",diet:["vegetarian","vegan","eggetarian","omnivore"],goals:["vitaminC","fiber"],nutrients:["Vitamin C","Fiber"],cost:"low",time:"quick",group:"Fruits",score:88},
 {id:"orange",name:"Orange",emoji:"🍊",diet:["vegetarian","vegan","eggetarian","omnivore"],goals:["vitaminC","fiber"],nutrients:["Vitamin C","Fiber"],cost:"low",time:"quick",group:"Fruits",score:85},
 {id:"yogurt",name:"Yogurt",emoji:"🥣",diet:["vegetarian","eggetarian","omnivore"],goals:["calcium","b12","protein"],nutrients:["Calcium","B12","Protein"],cost:"low",time:"quick",group:"Dairy",score:84},
 {id:"almonds",name:"Almonds",emoji:"🌰",diet:["vegetarian","vegan","eggetarian","omnivore"],goals:["calcium","protein","fiber"],nutrients:["Calcium","Protein","Fiber"],cost:"high",time:"quick",group:"Nuts & Seeds",score:82},
 {id:"chia",name:"Chia Seeds",emoji:"🌱",diet:["vegetarian","vegan","eggetarian","omnivore"],goals:["fiber","calcium","protein"],nutrients:["Fiber","Calcium","Protein"],cost:"medium",time:"quick",group:"Nuts & Seeds",score:81},
 {id:"rajma",name:"Rajma",emoji:"🫘",diet:["vegetarian","vegan","eggetarian","omnivore"],goals:["iron","protein","fiber"],nutrients:["Iron","Protein","Fiber"],cost:"low",time:"slow",group:"Protein",score:90},
 {id:"chicken",name:"Chicken",emoji:"🍗",diet:["omnivore"],goals:["protein","b12"],nutrients:["Protein","B12"],cost:"medium",time:"medium",group:"Protein",score:91},
 {id:"fish",name:"Fatty Fish",emoji:"🐟",diet:["omnivore"],goals:["protein","vitaminD","b12"],nutrients:["Protein","Vitamin D","B12"],cost:"high",time:"medium",group:"Protein",score:90},
 {id:"sesame",name:"Sesame Seeds",emoji:"🌰",diet:["vegetarian","vegan","eggetarian","omnivore"],goals:["calcium","iron","protein"],nutrients:["Calcium","Iron","Protein"],cost:"low",time:"quick",group:"Nuts & Seeds",score:83},
 {id:"methi",name:"Methi",emoji:"🌿",diet:["vegetarian","vegan","eggetarian","omnivore"],goals:["iron","fiber"],nutrients:["Iron","Fiber"],cost:"low",time:"medium",group:"Vegetables",score:80}
];

const MEALS = [
 {time:"BREAKFAST",name:"Iron-friendly poha",emoji:"🍲",desc:"Poha with peas, peanuts and a vitamin-C-rich fruit.",tags:["Iron","Fiber","Vitamin C"],diet:["vegetarian","vegan","eggetarian","omnivore"],goals:["iron","fiber","vitaminC"],cost:"low"},
 {time:"BREAKFAST",name:"Protein oats bowl",emoji:"🥣",desc:"Oats with milk/yogurt, fruit and chia seeds.",tags:["Protein","Calcium","Fiber"],diet:["vegetarian","eggetarian","omnivore"],goals:["protein","calcium","fiber"],cost:"low"},
 {time:"LUNCH",name:"Dal, roti & greens",emoji:"🥗",desc:"Dal with whole-wheat roti, leafy greens and salad.",tags:["Iron","Protein","Folate"],diet:["vegetarian","vegan","eggetarian","omnivore"],goals:["iron","protein","folate"],cost:"low"},
 {time:"LUNCH",name:"Rajma rice bowl",emoji:"🍛",desc:"Rajma with rice, cucumber-tomato salad and lemon.",tags:["Protein","Iron","Fiber"],diet:["vegetarian","vegan","eggetarian","omnivore"],goals:["protein","iron","fiber"],cost:"low"},
 {time:"SNACK",name:"Chana & fruit",emoji:"🧆",desc:"Roasted chana paired with guava or orange.",tags:["Protein","Fiber","Vitamin C"],diet:["vegetarian","vegan","eggetarian","omnivore"],goals:["protein","fiber","vitaminC"],cost:"low"},
 {time:"SNACK",name:"Yogurt & seeds",emoji:"🥛",desc:"Yogurt with chia or sesame seeds.",tags:["Calcium","Protein","Fiber"],diet:["vegetarian","eggetarian","omnivore"],goals:["calcium","protein","fiber"],cost:"low"},
 {time:"DINNER",name:"Paneer veggie bowl",emoji:"🧀",desc:"Paneer/tofu with mixed vegetables and roti.",tags:["Protein","Calcium","Iron"],diet:["vegetarian","eggetarian","omnivore"],goals:["protein","calcium","iron"],cost:"medium"},
 {time:"DINNER",name:"Egg & veggie plate",emoji:"🍳",desc:"Eggs with sautéed vegetables and whole-grain toast.",tags:["Protein","B12","Vitamin D"],diet:["eggetarian","omnivore"],goals:["protein","b12","vitaminD"],cost:"low"},
 {time:"DINNER",name:"Fish & greens",emoji:"🐟",desc:"Fish with greens, rice and a fresh salad.",tags:["Protein","B12","Vitamin D"],diet:["omnivore"],goals:["protein","b12","vitaminD"],cost:"high"}
];
