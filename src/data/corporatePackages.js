export const corporatePackagesData = {
  title: "TANAH Corporate Packages",
  tagline: "Tailored Rooftop Gastronomy & Executive Celebrations in Gachibowli",
  contact: {
    venue: "TANAH Kitchen & Bar",
    phone: "+91 89777 30291",
    email: "gm@tanahkitchen.com",
    website: "www.tanahkitchen.com",
    address: "5th Floor, Opp. Meenakshi Bamboos Road, Near AIG Hospital, P Janardhan Reddy Nagar, Gachibowli, Hyderabad, Telangana – 500032"
  },
  packages: [
    {
      id: "the-frame",
      name: "THE FRAME",
      price: 1699,
      priceLabel: "₹1,699 + taxes / person",
      alcoholType: "Non-Alcoholic",
      badge: "✦ ESSENTIAL CORPORATE",
      color: "#882B06",
      food: [
        "2 Veg Starters",
        "2 Non-Veg Starters (1 Chicken, 1 Fish)",
        "Gourmet Pizza (Veg & Non-Veg Selection)",
        "2 Veg Main Courses",
        "2 Non-Veg Main Courses (1 Chicken, 1 Fish)",
        "Tandoori Roti / Naan",
        "2 Rice / Pulao",
        "1 Salad",
        "1 Dessert"
      ],
      beverages: [
        "Soft Beverages",
        "2 Barman Special Mocktails"
      ],
      alcoholList: []
    },
    {
      id: "homegrown",
      name: "HOMEGROWN",
      price: 2299,
      priceLabel: "₹2,299 + taxes / person",
      alcoholType: "Draught Beer",
      badge: "★ MOST POPULAR",
      popular: true,
      color: "#6B2523",
      food: [
        "3 Veg Starters",
        "2 Non-Veg Starters (1 Chicken, 1 Fish)",
        "Gourmet Pizza (Veg & Non-Veg Selection)",
        "3 Veg Main Courses",
        "2 Non-Veg Main Courses (1 Chicken, 1 Fish)",
        "Tandoori Roti / Naan / Lachcha Paratha",
        "3 Rice / Pulao",
        "1 Salad",
        "2 Desserts"
      ],
      beverages: [
        "Soft Beverages",
        "2 Barman Special Mocktails",
        "Draught Beer: Kingfisher Ultra"
      ],
      alcoholList: ["Kingfisher Ultra Draught Beer"]
    },
    {
      id: "forbidden-hour",
      name: "FORBIDDEN HOUR",
      price: 2799,
      priceLabel: "₹2,799 + taxes / person",
      alcoholType: "Beer + Premium Spirits",
      badge: "🍸 PREMIUM BAR",
      color: "#541B1A",
      food: [
        "3 Veg Starters",
        "3 Non-Veg Starters (1 Chicken, 1 Fish, 1 Prawn)",
        "Gourmet Pizza (Veg & Non-Veg Selection)",
        "3 Veg Main Courses",
        "2 Non-Veg Main Courses (1 Chicken, 1 Fish / Prawn)",
        "Tandoori Roti / Naan / Lachcha Paratha",
        "3 Rice / Pulao",
        "2 Salads",
        "2 Desserts"
      ],
      beverages: [
        "Soft Beverages",
        "2 Barman Special Mocktails",
        "1 Barman Special Cocktail",
        "Draught Beer: Kingfisher Ultra"
      ],
      alcoholList: [
        "Kingfisher Ultra Draught Beer",
        "Jameson Irish Whiskey",
        "Ballantine's Scotch",
        "Teacher's Highland Cream",
        "Absolut Vodka",
        "Smirnoff Vodka",
        "Bacardi White Rum",
        "Old Monk Dark Rum",
        "Beefeater London Dry Gin"
      ]
    },
    {
      id: "the-aristocrat",
      name: "THE ARISTOCRAT",
      price: 3999,
      priceLabel: "₹3,999 + taxes / person",
      alcoholType: "Luxury Top-Shelf Spirits",
      badge: "👑 ULTRA LUXURY",
      color: "#3A2E2A",
      food: [
        "3 Veg Starters",
        "3 Non-Veg Starters (1 Chicken, 1 Fish, 1 Prawn / Mutton)",
        "Gourmet Pizza (Veg & Non-Veg Selection)",
        "3 Veg Main Courses",
        "3 Non-Veg Main Courses (1 Chicken, 1 Fish & Prawn / Mutton)",
        "Tandoori Roti / Naan / Lachcha Paratha / Kulcha",
        "3 Rice / Pulao",
        "2 Salads",
        "3 Desserts"
      ],
      beverages: [
        "Soft Beverages",
        "2 Barman Special Mocktails",
        "1 Barman Special Cocktail",
        "Draught Beer: Kingfisher Ultra"
      ],
      alcoholList: [
        "Kingfisher Ultra Draught Beer",
        "Johnnie Walker Black Label",
        "Chivas Regal 12 YR",
        "Jameson Irish Whiskey",
        "Ballantine's Scotch",
        "Teacher's Highland Cream",
        "Absolut Vodka",
        "Smirnoff Vodka",
        "Bacardi White Rum",
        "Old Monk Dark Rum",
        "Beefeater Gin",
        "Bombay Sapphire Gin"
      ]
    }
  ],
  comparisonTable: [
    {
      name: "The Frame",
      price: "₹1,699",
      vegStarters: 2,
      nonVegStarters: 2,
      vegMains: 2,
      nonVegMains: 2,
      desserts: 1,
      alcohol: "❌ None (Soft Beverages & 2 Mocktails)"
    },
    {
      name: "Homegrown",
      price: "₹2,299",
      vegStarters: 3,
      nonVegStarters: 2,
      vegMains: 3,
      nonVegMains: 2,
      desserts: 2,
      alcohol: "🍺 Draught Beer (Kingfisher Ultra) + Mocktails"
    },
    {
      name: "Forbidden Hour",
      price: "₹2,799",
      vegStarters: 3,
      nonVegStarters: 3,
      vegMains: 3,
      nonVegMains: 2,
      desserts: 2,
      alcohol: "🍺 Draught + Spirits (Whiskey, Vodka, Rum, Gin) + Cocktail"
    },
    {
      name: "The Aristocrat",
      price: "₹3,999",
      vegStarters: 3,
      nonVegStarters: 3,
      vegMains: 3,
      nonVegMains: 3,
      desserts: 3,
      alcohol: "👑 Black Label, Chivas, Bombay Sapphire, Draught & Premium Spirits"
    }
  ],
  menuPool: {
    vegStarters: [
      "Masala Corn / Crispy Corn",
      "Chilli Baby Corn",
      "Jalapeno Cheese Balls",
      "Classic Nachos",
      "Honey Chilli Potato",
      "Crispy Lotus Stem",
      "Veg Shanghai Rolls",
      "Tandoori Stuffed Mushrooms",
      "Achari Paneer Tikka",
      "Malai Broccoli",
      "Dahi Kebab",
      "Pahadi Paneer Tikka",
      "Hara Bhara Kebab",
      "Mamidi Mushroom",
      "Thotakura Liver Fry",
      "Pachi Mirchi Paneer",
      "Gongura Mushrooms",
      "Pandu Mirchi Paneer",
      "Corn Vada",
      "Velluli Baby Corn"
    ],
    nonVegStarters: [
      "Chilli Chicken",
      "Loose Prawns",
      "Chicken Nuggets",
      "Apollo Fish",
      "Fish Finger / Fish & Chips",
      "Kodi Chips / Chicken Popcorn",
      "Dragon Chicken",
      "Crispy Chilli Lamb",
      "Classic Chicken Tikka",
      "Garlic Chicken Tikka",
      "Pahadi Chicken Tikka",
      "Malai Chicken Tikka",
      "Ajwaini Fish Tikka",
      "Mutton Seekh Kebab",
      "Wings (Peri Peri / Gongura / Tandoori / BBQ / Ulavacharu)",
      "Bejawada Fish",
      "Andhra Kodi Vepudu",
      "Karivepaku Kodi Fry",
      "Mutton Ghee Roast With Bone",
      "Mutton Vepudu With Bone",
      "Rajugari Royyalu Vepudu",
      "Mamidi Prawns"
    ],
    vegMainCourse: {
      curries: [
        "Dal Tadka (Pappu / Mango / Gongura / Tomato / Palakura)",
        "Paneer Butter Masala",
        "Mix Veg Curry",
        "Mushroom Masala",
        "Gutti Vankaya Curry"
      ],
      riceAndNoodles: [
        "Mix Veg Pulao",
        "Paneer Pulao",
        "Mushroom Pulao",
        "Veg Tawa Biryani",
        "Jeera Rice",
        "Fried Rice (Hot Garlic Sauce)",
        "Sambar Rice",
        "Gutti Vankaya Pulao",
        "Plain Rice",
        "Curd Rice",
        "Soft Noodles"
      ]
    },
    nonVegMainCourse: {
      curries: [
        "Butter Chicken",
        "Masala Andhra Kodi Kura",
        "Rara Chicken",
        "Mutton Rogan Josh",
        "Rara Mutton Curry",
        "Dalcha Mutton"
      ],
      riceAndNoodles: [
        "Chicken Biryani",
        "Pachimirchi Kodi Pulao",
        "Gongura Kodi Pulao",
        "Chitti Muthyalu Mutton Pulao",
        "Chitti Muthyalu Prawn Pulao",
        "Chitti Muthyalu Chicken Pulao",
        "Chicken Fry Sambar Rice"
      ]
    },
    desserts: [
      "Mango Tres Leches",
      "Blueberry Cheesecake",
      "Vanilla Ice Cream",
      "Gulab Jamun"
    ]
  },
  terms: {
    minimumGuarantee: "Minimum: 25 pax (guests).",
    payment: [
      "50% advance required to confirm booking.",
      "Remaining 50% must be paid in full 48 hours before the event.",
      "Advance is non-refundable."
    ],
    cancellation: "If the client cancels, 50% of the minimum guarantee amount is payable to the restaurant.",
    billing: [
      "Additional guests beyond the minimum guarantee are charged separately.",
      "Any billing outside the package must be cleared the same day after the event."
    ],
    damages: "Any property damage is charged at actual cost.",
    taxes: "Government taxes and applicable service charges are extra.",
    servingTimings: [
      { item: "Starters", duration: "90 minutes" },
      { item: "Main Course", duration: "60 minutes" },
      { item: "Alcoholic beverages", duration: "150 minutes" }
    ],
    alcoholRules: [
      "Alcohol is served peg-wise with mixers, not as shots.",
      "Alcohol is served only to guests above 21 years of age.",
      "The establishment will close operations at the prescribed time mandated by law.",
      "Leftover food cannot be taken away.",
      "Canned beverages, Breezers, juices, and premium packaged water are charged separately."
    ]
  }
}
