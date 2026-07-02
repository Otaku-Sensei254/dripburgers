// Image URL mappings
const IMG: Record<string, string> = {
  // Specific items
  'mushroom-burger': 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
  'hawaiian-burger': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnbtPbJBa_WG7aNxWYhDgf1bPbMymqsqivO75OMOOQrQ&s=10',
  'pineapple-sweet-wings': 'https://sl1nk.com/qpl4kvz',
  'carnivore-burger': 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80',
  'big-smokin-burger': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnbtPbJBa_WG7aNxWYhDgf1bPbMymqsqivO75OMOOQrQ&s=10',
  'double-drip-chicken': 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=900&q=80',
  'all-in-burger': 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=900&q=80',
  'double-smash-burger': 'https://images.unsplash.com/photo-1561758033-7e924f619b47?auto=format&fit=crop&w=900&q=80',
  'the-smokin-burger': 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=900&q=80',
  'drip-chicken-burger': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnbtPbJBa_WG7aNxWYhDgf1bPbMymqsqivO75OMOOQrQ&s=10',
  'smash-burger': 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=900&q=80',
  'veg-burger': 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=80',
  'mango-habanero-burger': 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
  'pineapple-sweet-chilli-burger': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnbtPbJBa_WG7aNxWYhDgf1bPbMymqsqivO75OMOOQrQ&s=10',
  'buffalo-crunch-burger': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnbtPbJBa_WG7aNxWYhDgf1bPbMymqsqivO75OMOOQrQ&s=10',
  'honey-glazed-crunch-burger': 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80',
  'tikka-crunch-burger': 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=900&q=80',
  'bbq-crunch-burger': 'https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?auto=format&fit=crop&w=900&q=80',
  'crunch-burger': 'https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=900&q=80',

  // Loaded fries (all 4)
  'loaded-fries': 'https://shorturl.at/9RscZ',

  // Fries variants
  'fries': 'https://shorturl.at/9RscZ',

  // Sides
  'cheese-fries': 'https://shorturl.at/5JlpM',
  'onion-rings': 'https://shorturl.at/tGZrR',
  'coleslaw': 'https://bit.ly/4eIBosl',

  // Sodas
  'club-orange': 'https://l1nq.com/4fot5ir',
  'club-blackcurrant': 'https://l1nq.com/qx7umpn',
  'club-lemon-lime': 'https://l1nq.com/ot431bu',

  // Dola Basil Drinks
  'dola-mango': 'https://l1nq.com/76bk2zh',
  'dola': 'https://l1nq.com/76bk2zh',

  // Mojitos
  'lime-mojito': 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=900&q=80',
  'peach-mojito': 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=900&q=80',
  'passion-mojito': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',

  // Afia juices (all 3)
  'afia': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZevRniNMkY5p81Q0vStC9FlxzoI6rSKOVO_U8aF9obQ&s=10',

  // Extra sauces (all 9)
  'sauce': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsm-nAm_hR3HyOm3kWNxQPihwOYMnx2WeGp7IAY9pZ4Q&s=10',

  // Accacia drinks (all 5)
  'accacia': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZevRniNMkY5p81Q0vStC9FlxzoI6rSKOVO_U8aF9obQ&s=10',

  // Milkshakes
  'lotus-milkshake': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80',
  'strawberry-milkshake': 'https://images.unsplash.com/photo-1577830134385-6802f0d9b4c1?auto=format&fit=crop&w=900&q=80',

  // Generic default
  'default': 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
};

export const CATEGORY_NOTES: Record<string, string> = {
  'Signature Burgers': 'Comes with fries',
  'Classic Burgers': 'Meal Upgrade — Add KES 250: Boring Fries + Soda | Add KES 300: Peri Peri Fries + Soda',
};

export const MENU_ITEMS: MenuItem[] = [
  // ── Signature Burgers ──
  {
    id: 'carnivore-burger',
    name: 'Carnivore Burger',
    description: 'Triple-layered with halal crispy macon, melted cheese, and bold flavor for a big, indulgent experience.',
    price: 1800,
    category: 'Signature Burgers',
    thumbnail: IMG['carnivore-burger'],
  },
  {
    id: 'mushroom-burger',
    name: 'Mushroom Burger',
    description: 'Juicy beef layered with buttery mushrooms and melted cheese, delivering deep, savory satisfaction in every bite.',
    price: 1600,
    category: 'Signature Burgers',
    thumbnail: IMG['mushroom-burger'],
  },
  {
    id: 'hawaiian-burger',
    name: 'Hawaiian Burger',
    description: 'Juicy beef topped with grilled pineapple and melted cheese for a sweet-savory combination that hits differently.',
    price: 1500,
    category: 'Signature Burgers',
    thumbnail: IMG['hawaiian-burger'],
  },

  // ── Classic Burgers ──
  {
    id: 'big-smokin-burger',
    name: 'Big Smokin Burger',
    description: 'Perfectly toasted brioche bun, two well-seasoned beef patties, bold and smoky BBQ sauce, fried egg, melted cheese, onion rings, fresh lettuce, tomato slice, and pickles.',
    price: 1150,
    category: 'Classic Burgers',
    thumbnail: IMG['big-smokin-burger'],
  },
  {
    id: 'double-drip-chicken',
    name: 'Double Drip Chicken Burger',
    description: 'Perfectly toasted brioche bun, double grilled peri peri chicken, melted cheese, fresh lettuce, tomato slices, and our special drip sauce.',
    price: 1100,
    category: 'Classic Burgers',
    thumbnail: IMG['double-drip-chicken'],
  },
  {
    id: 'all-in-burger',
    name: 'All In Burger',
    description: 'Perfectly toasted brioche bun, well-seasoned beef patty, grilled peri peri chicken, melted cheese, caramelized onions, fresh lettuce, tomato slice, pickles, and our special drip sauce.',
    price: 1100,
    category: 'Classic Burgers',
    thumbnail: IMG['all-in-burger'],
  },
  {
    id: 'double-smash-burger',
    name: 'Double Smash Burger',
    description: 'Perfectly toasted brioche bun, two well-seasoned beef patties with melted cheese, fresh lettuce, sliced tomato, caramelized onions, pickles, and our special drip sauce.',
    price: 1050,
    category: 'Classic Burgers',
    thumbnail: IMG['double-smash-burger'],
  },
  {
    id: 'the-smokin-burger',
    name: 'The Smokin Burger',
    description: 'Perfectly toasted brioche bun, well-seasoned beef patty, smoky BBQ sauce, melted cheese, onion rings, fresh lettuce, tomato slices, and our special drip sauce.',
    price: 950,
    category: 'Classic Burgers',
    thumbnail: IMG['the-smokin-burger'],
  },
  {
    id: 'drip-chicken-burger',
    name: 'Drip Chicken Burger',
    description: 'Perfectly toasted brioche bun, peri peri chicken, melted cheese, fresh lettuce, tomato slice, and our special drip sauce.',
    price: 900,
    category: 'Classic Burgers',
    thumbnail: IMG['drip-chicken-burger'],
  },
  {
    id: 'smash-burger',
    name: 'Smash Burger',
    description: 'Perfectly toasted brioche bun, juicy smashed beef patty, melted cheese, fresh lettuce, sliced tomato, caramelized onions, pickles, and our special drip sauce.',
    price: 850,
    category: 'Classic Burgers',
    thumbnail: IMG['smash-burger'],
  },
  {
    id: 'veg-burger',
    name: 'Veg Burger',
    description: 'Golden-fried falafel with smooth hummus spread and signature marinated onions for the perfect tang. Served on a toasted brioche bun.',
    price: 850,
    category: 'Classic Burgers',
    thumbnail: IMG['veg-burger'],
  },

  // ── Drip Crunch Chicken ──
  {
    id: 'mango-habanero-burger',
    name: 'Mango Habanero Burger',
    description: 'Perfectly toasted brioche bun, crunchy juicy fried chicken dipped in mango habanero sauce, fresh lettuce, tomato slice, pickles, and our special garlic mayo sauce.',
    price: 1100,
    category: 'Drip Crunch Chicken',
    thumbnail: IMG['mango-habanero-burger'],
  },
  {
    id: 'pineapple-sweet-chilli-burger',
    name: 'Pineapple Sweet Chilli Burger',
    description: 'Perfectly toasted brioche bun, crunchy juicy fried chicken dipped in pineapple sweet chilli sauce, fresh lettuce, tomato slice, pickles, and our special garlic mayo sauce.',
    price: 1100,
    category: 'Drip Crunch Chicken',
    thumbnail: IMG['pineapple-sweet-chilli-burger'],
  },
  {
    id: 'buffalo-crunch-burger',
    name: 'Buffalo Burger',
    description: 'Perfectly toasted brioche bun, crunchy juicy fried chicken dipped in buffalo sauce, fresh lettuce, tomato slice, pickles, and our special garlic mayo sauce.',
    price: 1100,
    category: 'Drip Crunch Chicken',
    thumbnail: IMG['buffalo-crunch-burger'],
  },
  {
    id: 'honey-glazed-crunch-burger',
    name: 'Honey Glazed Burger',
    description: 'Perfectly toasted brioche bun, crunchy juicy fried chicken dipped in honey glazed sauce, fresh lettuce, tomato slice, pickles, and our special garlic mayo sauce.',
    price: 1100,
    category: 'Drip Crunch Chicken',
    thumbnail: IMG['honey-glazed-crunch-burger'],
  },
  {
    id: 'tikka-crunch-burger',
    name: 'Tikka Crunch Burger',
    description: 'Perfectly toasted brioche bun, crunchy juicy fried chicken dipped in tikka sauce, fresh lettuce, tomato slice, coleslaw salad, and our special garlic mayo sauce.',
    price: 1100,
    category: 'Drip Crunch Chicken',
    thumbnail: IMG['tikka-crunch-burger'],
  },
  {
    id: 'bbq-crunch-burger',
    name: 'BBQ Crunch Burger',
    description: 'Perfectly toasted brioche bun, crunchy juicy fried chicken dipped in BBQ sauce, fresh lettuce, tomato slice, pickles, and our special garlic mayo sauce.',
    price: 1100,
    category: 'Drip Crunch Chicken',
    thumbnail: IMG['bbq-crunch-burger'],
  },
  {
    id: 'crunch-burger',
    name: 'Crunch Burger',
    description: 'Perfectly toasted brioche bun, crunchy juicy fried chicken, fresh lettuce, tomato slice, pickles, and our special garlic mayo sauce.',
    price: 950,
    category: 'Drip Crunch Chicken',
    thumbnail: IMG['crunch-burger'],
  },
  {
    id: 'crunch-chicken-fingers',
    name: 'Crunch Chicken Fingers',
    description: 'Tender strips of golden fried chicken served with garlic mayo dip.',
    price: 850,
    category: 'Drip Crunch Chicken',
    thumbnail: IMG.default,
  },

  // ── Wings ──
  {
    id: 'pineapple-sweet-wings',
    name: 'Pineapple Sweet Wings',
    description: 'Crispy chicken wings tossed in pineapple sweet sauce.',
    price: 750,
    category: 'Wings',
    thumbnail: IMG['pineapple-sweet-wings'],
  },
  {
    id: 'mango-habanero-wings',
    name: 'Mango Habanero Wings',
    description: 'Crispy chicken wings tossed in mango habanero sauce.',
    price: 750,
    category: 'Wings',
    thumbnail: IMG.default,
  },
  {
    id: 'buffalo-wings',
    name: 'Buffalo Wings',
    description: 'Crispy chicken wings tossed in buffalo sauce.',
    price: 750,
    category: 'Wings',
    thumbnail: IMG.default,
  },
  {
    id: 'tikka-wings',
    name: 'Tikka Wings',
    description: 'Crispy chicken wings tossed in tikka sauce.',
    price: 750,
    category: 'Wings',
    thumbnail: IMG.default,
  },
  {
    id: 'honey-glazed-wings',
    name: 'Honey Glazed Wings',
    description: 'Crispy chicken wings coated in honey glazed sauce.',
    price: 750,
    category: 'Wings',
    thumbnail: IMG.default,
  },
  {
    id: 'bbq-wings',
    name: 'BBQ Wings',
    description: 'Crispy chicken wings tossed in BBQ sauce.',
    price: 750,
    category: 'Wings',
    thumbnail: IMG.default,
  },
  {
    id: 'classic-wings',
    name: 'Classic Wings',
    description: 'Crispy classic chicken wings served with your choice of dip.',
    price: 700,
    category: 'Wings',
    thumbnail: IMG.default,
  },

  // ── Loaded Fries ──
  {
    id: 'carnivore-loaded-fries',
    name: 'Carnivore Loaded Fries',
    description: 'Fries topped with halal beef macon, jalapeños, cheese sauce, burger sauce, and smoky sauce.',
    price: 1200,
    category: 'Loaded Fries',
    thumbnail: IMG['loaded-fries'],
  },
  {
    id: 'combo-loaded-fries',
    name: 'Combo Loaded Fries',
    description: 'The ultimate mash-up of beef and chicken loaded fries.',
    price: 950,
    category: 'Loaded Fries',
    thumbnail: IMG['loaded-fries'],
  },
  {
    id: 'chicken-loaded-fries',
    name: 'Chicken Loaded Fries',
    description: 'Crispy fried chicken, cheese sauce, burger sauce, and BBQ.',
    price: 750,
    category: 'Loaded Fries',
    thumbnail: IMG['loaded-fries'],
  },
  {
    id: 'beef-loaded-fries',
    name: 'Beef Loaded Fries',
    description: 'Loaded with beef, cheese sauce, burger sauce, and BBQ.',
    price: 750,
    category: 'Loaded Fries',
    thumbnail: IMG['loaded-fries'],
  },

  // ── Sides ──
  {
    id: 'washawasha-fries',
    name: 'Washawasha Fries',
    description: 'Fries coated in Washawasha sauce.',
    price: 400,
    category: 'Sides',
    thumbnail: IMG['fries'],
  },
  {
    id: 'cheese-fries',
    name: 'Cheese Fries',
    description: 'Fries topped with cheese sauce.',
    price: 350,
    category: 'Sides',
    thumbnail: IMG['cheese-fries'],
  },
  {
    id: 'honey-glazed-popcorns',
    name: 'Honey Glazed Chicken Popcorns',
    description: 'Crispy chicken bites coated in special honey glazed sauce.',
    price: 350,
    category: 'Sides',
    thumbnail: IMG.default,
  },
  {
    id: 'drip-shot',
    name: 'Drip Shot',
    description: 'Add a delicious cheese sauce injection to your burger.',
    price: 350,
    category: 'Sides',
    thumbnail: IMG.default,
  },
  {
    id: 'peri-peri-fries',
    name: 'Peri Peri Fries',
    description: 'Crispy fries tossed with signature peri peri seasoning.',
    price: 300,
    category: 'Sides',
    thumbnail: IMG['fries'],
  },
  {
    id: 'onion-rings',
    name: 'Onion Rings',
    description: 'Crunchy beer-battered rings served with a smoky dip.',
    price: 300,
    category: 'Sides',
    thumbnail: IMG['onion-rings'],
  },
  {
    id: 'boring-fries',
    name: 'Boring Fries',
    description: 'Classic thick-cut fries with a light sprinkle of salt.',
    price: 250,
    category: 'Sides',
    thumbnail: IMG['fries'],
  },
  {
    id: 'coleslaw',
    name: 'Coleslaw',
    description: 'Fresh, creamy coleslaw made with crisp shredded vegetables.',
    price: 150,
    category: 'Sides',
    thumbnail: IMG['coleslaw'],
  },

  // ── Kids Meals ──
  {
    id: 'lil-drip-box',
    name: 'Lil Drip Box',
    description: 'Two mini beef or chicken burgers, crispy fries, an Accacia Kids Drink, and a fun toy.',
    price: 750,
    category: 'Kids Meals',
    thumbnail: IMG.default,
  },
  {
    id: 'lil-drip-box-popcorn',
    name: 'Lil Drip Box (Chicken Popcorn)',
    description: 'Chicken popcorns, crispy fries, an Accacia Kids Drink, and a fun toy.',
    price: 750,
    category: 'Kids Meals',
    thumbnail: IMG.default,
  },

  // ── Sodas ──
  {
    id: 'vimto-sparkling',
    name: 'Vimto Sparkling',
    description: 'Sparkling Vimto — 350ml.',
    price: 120,
    category: 'Sodas',
    thumbnail: IMG.default,
  },
  {
    id: 'club-cola',
    name: 'Club Cola',
    description: 'Club Cola — 350ml.',
    price: 100,
    category: 'Sodas',
    thumbnail: IMG.default,
  },
  {
    id: 'club-orange',
    name: 'Club Orange',
    description: 'Club Orange — 350ml.',
    price: 100,
    category: 'Sodas',
    thumbnail: IMG['club-orange'],
  },
  {
    id: 'club-lemonade',
    name: 'Club Lemonade',
    description: 'Club Lemonade — 350ml.',
    price: 100,
    category: 'Sodas',
    thumbnail: IMG.default,
  },
  {
    id: 'club-blackcurrant',
    name: 'Club Blackcurrant',
    description: 'Club Blackcurrant — 350ml.',
    price: 100,
    category: 'Sodas',
    thumbnail: IMG['club-blackcurrant'],
  },
  {
    id: 'club-lemon-lime',
    name: 'Club Lemon & Lime',
    description: 'Club Lemon & Lime — 350ml.',
    price: 100,
    category: 'Sodas',
    thumbnail: IMG['club-lemon-lime'],
  },

  // ── Dola Basil Drinks ──
  {
    id: 'dola-mango',
    name: 'Dola Basil Mango',
    description: 'Mango Dola Basil drink.',
    price: 300,
    category: 'Dola Basil Drinks',
    thumbnail: IMG['dola-mango'],
  },
  {
    id: 'dola-peach',
    name: 'Dola Basil Peach',
    description: 'Peach Dola Basil drink.',
    price: 300,
    category: 'Dola Basil Drinks',
    thumbnail: IMG['dola'],
  },
  {
    id: 'dola-lychee',
    name: 'Dola Basil Lychee',
    description: 'Lychee Dola Basil drink.',
    price: 300,
    category: 'Dola Basil Drinks',
    thumbnail: IMG['dola'],
  },
  {
    id: 'dola-strawberry',
    name: 'Dola Basil Strawberry',
    description: 'Strawberry Dola Basil drink.',
    price: 300,
    category: 'Dola Basil Drinks',
    thumbnail: IMG['dola'],
  },

  // ── Mojitos ──
  {
    id: 'lime-mojito',
    name: 'Lime Mojito',
    description: 'Refreshing lime mojito.',
    price: 500,
    category: 'Mojitos',
    thumbnail: IMG['lime-mojito'],
  },
  {
    id: 'peach-mojito',
    name: 'Peach Mojito',
    description: 'Refreshing peach mojito.',
    price: 500,
    category: 'Mojitos',
    thumbnail: IMG['peach-mojito'],
  },
  {
    id: 'vimto-mojito',
    name: 'Vimto Mojito',
    description: 'Vimto flavored mojito.',
    price: 500,
    category: 'Mojitos',
    thumbnail: IMG.default,
  },
  {
    id: 'passion-mojito',
    name: 'Passion Mojito',
    description: 'Passion fruit mojito.',
    price: 500,
    category: 'Mojitos',
    thumbnail: IMG['passion-mojito'],
  },
  {
    id: 'grenadine-mojito',
    name: 'Grenadine Mojito',
    description: 'Grenadine mojito.',
    price: 500,
    category: 'Mojitos',
    thumbnail: IMG.default,
  },
  {
    id: 'strawberry-mojito',
    name: 'Strawberry Mojito',
    description: 'Strawberry mojito.',
    price: 500,
    category: 'Mojitos',
    thumbnail: IMG.default,
  },
  {
    id: 'blue-lagoon-mojito',
    name: 'Blue Lagoon Mojito',
    description: 'Blue Lagoon mojito.',
    price: 500,
    category: 'Mojitos',
    thumbnail: IMG.default,
  },

  // ── Milkshakes ──
  {
    id: 'lotus-milkshake',
    name: 'Lotus Milkshake',
    description: 'Rich and creamy Lotus Biscoff milkshake.',
    price: 750,
    category: 'Milkshakes',
    thumbnail: IMG['lotus-milkshake'],
  },
  {
    id: 'snickers-milkshake',
    name: 'Snickers Milkshake',
    description: 'Indulgent Snickers milkshake.',
    price: 600,
    category: 'Milkshakes',
    thumbnail: IMG.default,
  },
  {
    id: 'oreo-milkshake',
    name: 'Oreo Milkshake',
    description: 'Classic Oreo milkshake.',
    price: 600,
    category: 'Milkshakes',
    thumbnail: IMG.default,
  },
  {
    id: 'twix-milkshake',
    name: 'Twix Milkshake',
    description: 'Creamy Twix milkshake.',
    price: 600,
    category: 'Milkshakes',
    thumbnail: IMG.default,
  },
  {
    id: 'espresso-milkshake',
    name: 'Espresso Milkshake',
    description: 'Coffee-infused espresso milkshake.',
    price: 600,
    category: 'Milkshakes',
    thumbnail: IMG.default,
  },
  {
    id: 'vanilla-milkshake',
    name: 'Vanilla Milkshake',
    description: 'Classic vanilla milkshake.',
    price: 500,
    category: 'Milkshakes',
    thumbnail: IMG.default,
  },
  {
    id: 'chocolate-milkshake',
    name: 'Chocolate Milkshake',
    description: 'Rich chocolate milkshake.',
    price: 500,
    category: 'Milkshakes',
    thumbnail: IMG.default,
  },
  {
    id: 'strawberry-milkshake',
    name: 'Strawberry Milkshake',
    description: 'Creamy strawberry milkshake.',
    price: 500,
    category: 'Milkshakes',
    thumbnail: IMG['strawberry-milkshake'],
  },

  // ── Hot Drinks ──
  {
    id: 'double-shot-espresso',
    name: 'Double Shot Espresso',
    description: 'Double shot espresso.',
    price: 150,
    category: 'Hot Drinks',
    thumbnail: IMG.default,
  },
  {
    id: 'single-shot-espresso',
    name: 'Single Shot Espresso',
    description: 'Single shot espresso.',
    price: 100,
    category: 'Hot Drinks',
    thumbnail: IMG.default,
  },

  // ── Juices ──
  {
    id: 'afia-mango',
    name: 'Afia Mango',
    description: 'Afia mango juice.',
    price: 120,
    category: 'Juices',
    thumbnail: IMG['afia'],
  },
  {
    id: 'afia-apple',
    name: 'Afia Apple',
    description: 'Afia apple juice.',
    price: 120,
    category: 'Juices',
    thumbnail: IMG['afia'],
  },
  {
    id: 'afia-mixed-fruit',
    name: 'Afia Mixed Fruit',
    description: 'Afia mixed fruit juice.',
    price: 120,
    category: 'Juices',
    thumbnail: IMG['afia'],
  },
  {
    id: 'accacia-apple',
    name: 'Accacia Apple',
    description: 'Accacia kids apple juice.',
    price: 150,
    category: 'Juices',
    thumbnail: IMG['accacia'],
  },
  {
    id: 'accacia-mango',
    name: 'Accacia Mango',
    description: 'Accacia kids mango juice.',
    price: 150,
    category: 'Juices',
    thumbnail: IMG['accacia'],
  },
  {
    id: 'accacia-strawberry',
    name: 'Accacia Strawberry',
    description: 'Accacia kids strawberry juice.',
    price: 150,
    category: 'Juices',
    thumbnail: IMG['accacia'],
  },
  {
    id: 'accacia-blackcurrant',
    name: 'Accacia Blackcurrant',
    description: 'Accacia kids blackcurrant juice.',
    price: 150,
    category: 'Juices',
    thumbnail: IMG['accacia'],
  },
  {
    id: 'accacia-blue-raspberry',
    name: 'Accacia Blue Raspberry',
    description: 'Accacia kids blue raspberry juice.',
    price: 150,
    category: 'Juices',
    thumbnail: IMG['accacia'],
  },

  // ── Water ──
  {
    id: 'water-bottle',
    name: 'Water Bottle',
    description: '500ml chilled water bottle.',
    price: 150,
    category: 'Water',
    thumbnail: IMG.default,
  },

  // ── Extra Sauces ──
  {
    id: 'jalapenos',
    name: 'Jalapenos',
    description: 'Jalapeño peppers.',
    price: 100,
    category: 'Extra Sauces',
    thumbnail: IMG['sauce'],
  },
  {
    id: 'garlic-mayo',
    name: 'Garlic Mayo',
    description: 'Creamy garlic mayonnaise.',
    price: 80,
    category: 'Extra Sauces',
    thumbnail: IMG['sauce'],
  },
  {
    id: 'ranch-sauce',
    name: 'Ranch Sauce',
    description: 'Smooth ranch sauce.',
    price: 80,
    category: 'Extra Sauces',
    thumbnail: IMG['sauce'],
  },
  {
    id: 'drip-burger-sauce',
    name: 'Drip Burger Sauce',
    description: 'Our signature burger sauce.',
    price: 80,
    category: 'Extra Sauces',
    thumbnail: IMG['sauce'],
  },
  {
    id: 'bbq-sauce',
    name: 'BBQ Sauce',
    description: 'Smoky, sweet BBQ sauce.',
    price: 50,
    category: 'Extra Sauces',
    thumbnail: IMG['sauce'],
  },
  {
    id: 'buffalo-sauce',
    name: 'Buffalo Sauce',
    description: 'Tangy buffalo sauce.',
    price: 50,
    category: 'Extra Sauces',
    thumbnail: IMG['sauce'],
  },
  {
    id: 'honey-glazed-sauce',
    name: 'Honey Glazed Sauce',
    description: 'Sweet honey glazed sauce.',
    price: 50,
    category: 'Extra Sauces',
    thumbnail: IMG['sauce'],
  },
  {
    id: 'pineapple-sweet-sauce',
    name: 'Pineapple Sweet Sauce',
    description: 'Sweet pineapple sauce.',
    price: 50,
    category: 'Extra Sauces',
    thumbnail: IMG['sauce'],
  },
  {
    id: 'habanero-sauce',
    name: 'Habanero Sauce',
    description: 'Spicy habanero sauce.',
    price: 50,
    category: 'Extra Sauces',
    thumbnail: IMG['sauce'],
  },
];

const MENU_BY_ID: Record<string, MenuItem> = {};
for (const item of MENU_ITEMS) {
  MENU_BY_ID[item.id] = item;
}

export function menuItemById(id: string): MenuItem | undefined {
  return MENU_BY_ID[id];
}

export function menuByCategory(): Record<string, MenuItem[]> {
  const map: Record<string, MenuItem[]> = {};
  for (const item of MENU_ITEMS) {
    if (!map[item.category]) map[item.category] = [];
    map[item.category].push(item);
  }
  return map;
}