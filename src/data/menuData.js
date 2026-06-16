// Menu data for Tanah Kitchen with strictly Indian Rupee pricing (₹249, ₹399, ₹549, ₹699)
export const menuCategories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Beverages', 'Desserts'];

export const menuItems = [
  // Breakfast
  {
    id: 'b1',
    category: 'Breakfast',
    name: 'Ancient Grain Granola',
    desc: 'House-toasted organic millets, wild forest honey, native berries, and farm-fresh curd.',
    price: 399,
    image: '/images/dish_dessert.png',
    tags: ['Organic', 'Gluten-Free']
  },
  {
    id: 'b2',
    category: 'Breakfast',
    name: 'Tanah Avocado Sourdough',
    desc: 'Hand-mashed avocado, heirloom cherry tomatoes, home-churned white butter, toasted sourdough.',
    price: 549,
    image: '/images/dish_thali.png',
    tags: ['Signature', 'Vegan Option']
  },
  {
    id: 'b3',
    category: 'Breakfast',
    name: 'Millet Idli & Heirloom Chutney',
    desc: 'Steamed foxtail millet cakes served with stone-ground coconut chutney and forest herb sambar.',
    price: 249,
    image: '/images/dish_thali.png',
    tags: ['Organic', 'Gluten-Free']
  },
  {
    id: 'b4',
    category: 'Breakfast',
    name: 'Spiced Forest Mushroom Omelette',
    desc: 'Pasture-raised eggs, wild mushrooms, baby spinach, aged artisanal cheese, and rustic toast.',
    price: 399,
    image: '/images/dish_biryani.png',
    tags: ['Fresh Eggs']
  },

  // Lunch
  {
    id: 'l1',
    category: 'Lunch',
    name: 'Heritage Soil Thali',
    desc: 'Curated selection of local seasonal curries, indigenous red rice, house-made pickles, and flatbreads.',
    price: 699,
    image: '/images/dish_thali.png',
    tags: ['Must Try', 'Chef Selection']
  },
  {
    id: 'l2',
    category: 'Lunch',
    name: 'Forest Claypot Biryani',
    desc: 'Fragrant basmati rice layered with slow-cooked organic vegetables, local spices, served in a clay pot.',
    price: 549,
    image: '/images/dish_biryani.png',
    tags: ['Best Seller', 'Signature']
  },
  {
    id: 'l3',
    category: 'Lunch',
    name: 'Earthy Root Vegetable Curry',
    desc: 'Sweet potato, beetroot, and heritage carrots simmered in spiced coconut milk broth, served with red rice.',
    price: 399,
    image: '/images/dish_thali.png',
    tags: ['Vegan', 'Gluten-Free']
  },
  {
    id: 'l4',
    category: 'Lunch',
    name: 'Tanah Green Salad',
    desc: 'Crisp handpicked field greens, cucumbers, toasted pumpkin seeds, wood-pressed mustard dressing.',
    price: 249,
    image: '/images/dish_dessert.png',
    tags: ['Raw', 'Zero Mile']
  },

  // Dinner
  {
    id: 'd1',
    category: 'Dinner',
    name: 'Wood-Fired Wild Mushroom Risotto',
    desc: 'Slow-simmered arborio rice with hand-foraged mushrooms, truffle oil, and aged artisanal parmesan.',
    price: 699,
    image: '/images/dish_biryani.png',
    tags: ['Signature', 'Luxury']
  },
  {
    id: 'd2',
    category: 'Dinner',
    name: 'Smoked Terracotta Paneer',
    desc: 'Clay-roasted organic paneer marinated in local wild herbs and cold-pressed mustard oil, served with mint dip.',
    price: 549,
    image: '/images/dish_thali.png',
    tags: ['Spicy', 'Handcrafted']
  },
  {
    id: 'd3',
    category: 'Dinner',
    name: 'Claypot Dal Earth',
    desc: 'Black lentils slow-simmered for 24 hours on coal embers with rich farm cream and organic white butter.',
    price: 549,
    image: '/images/dish_thali.png',
    tags: ['Legendary', 'Slow Cooked']
  },
  {
    id: 'd4',
    category: 'Dinner',
    name: 'Forest Truffle Gnocchi',
    desc: 'Handmade potato gnocchi tossed in brown butter, sage, wild forest truffles, and pine nuts.',
    price: 699,
    image: '/images/dish_dessert.png',
    tags: ['Handcrafted', 'Limited']
  },

  // Beverages
  {
    id: 'bv1',
    category: 'Beverages',
    name: 'Wild Forest Honey Lemonade',
    desc: 'Squeezed organic lemons, wild-foraged honey, fresh garden mint, infused with activated charcoal.',
    price: 249,
    image: '/images/gallery_spices.png',
    tags: ['Refresher']
  },
  {
    id: 'bv2',
    category: 'Beverages',
    name: 'Golden Soil Milk',
    desc: 'Warm organic almond milk infused with fresh turmeric root, green cardamom, black pepper, and honey.',
    price: 249,
    image: '/images/gallery_spices.png',
    tags: ['Healing', 'Warm']
  },
  {
    id: 'bv3',
    category: 'Beverages',
    name: 'Tanah Cold Brew Coffee',
    desc: 'Single-origin Araku Valley coffee beans cold-steeped for 18 hours, served over artisanal ice blocks.',
    price: 249,
    image: '/images/gallery_spices.png',
    tags: ['Caffeine']
  },
  {
    id: 'bv4',
    category: 'Beverages',
    name: 'Infused Kokum Nectar',
    desc: 'Traditional kokum extract mixed with sparkling water, roasted cumin, and black salt.',
    price: 249,
    image: '/images/gallery_spices.png',
    tags: ['Digestion', 'Cold']
  },

  // Desserts
  {
    id: 'ds1',
    category: 'Desserts',
    name: 'Saffron Rabri Terracotta Bowl',
    desc: 'Slow-reduced milk infused with Kashmiri saffron, topped with silver leaf, pistachios, served in clay bowl.',
    price: 399,
    image: '/images/dish_dessert.png',
    tags: ['Chef Special', 'Traditional']
  },
  {
    id: 'ds2',
    category: 'Desserts',
    name: 'Charcoal Roasted Fig Tart',
    desc: 'Local fresh figs roasted over charcoal, in a gluten-free almond crust, served with vanilla bean whip.',
    price: 399,
    image: '/images/dish_dessert.png',
    tags: ['Organic']
  },
  {
    id: 'ds3',
    category: 'Desserts',
    name: 'Millet Coconut Payasam',
    desc: 'Barnyard millet cooked with fresh coconut milk, jaggery syrup, toasted cashew nuts, and cardamom.',
    price: 399,
    image: '/images/dish_dessert.png',
    tags: ['Vegan', 'Gluten-Free']
  },
  {
    id: 'ds4',
    category: 'Desserts',
    name: 'Dark Chocolate Soil Cake',
    desc: '70% single-origin dark chocolate cake layered with cocoa soil crumb and beetroot raspberry gel.',
    price: 549,
    image: '/images/dish_dessert.png',
    tags: ['Signature', 'Decadent']
  }
];
