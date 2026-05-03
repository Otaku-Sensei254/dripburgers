import drip from '../images/drip.jpg';
import drip2 from '../images/drip2.jpg';
import drip3 from '../images/drip3.jpg';
import drip4 from '../images/drip4.jpg';
import drip5 from '../images/drip5.jpg';
import drip6 from '../images/drip6.jpg';
import drip7 from '../images/drip7.jpg';
import drip9 from '../images/drip9.jpg';
import hero from '../images/hero.jpg';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
};

export const MENU_ITEMS: MenuItem[] = [
  // Burgers & sandwiches
  {
    id: 'drip-double',
    name: 'DRIP Double Smash',
    description: 'Two patties, American cheese, caramelized onions, house drip sauce.',
    price: 1190,
    category: 'Burgers & sandwiches',
    thumbnail: drip,
  },
  {
    id: 'classic-bacon',
    name: 'Classic Bacon Burger',
    description: 'Smash patty, streaky bacon, lettuce, pickles, dripping mayo.',
    price: 1050,
    category: 'Burgers & sandwiches',
    thumbnail: drip2,
  },
  {
    id: 'chicken-crisper',
    name: 'Crispy Chicken Stack',
    description: 'Buttermilk chicken, cabbage slaw, honey chili glaze, brioche.',
    price: 980,
    category: 'Burgers & sandwiches',
    thumbnail: drip3,
  },
  {
    id: 'veggie-melt',
    name: 'Garden Melt Burger',
    description: 'Grilled portobello, roasted peppers, feta, pesto aioli.',
    price: 820,
    category: 'Burgers & sandwiches',
    thumbnail: drip4,
  },

  // Pizza
  {
    id: 'pizza-margh',
    name: 'Margherita',
    description: 'San Marzano-style sauce, buffalo mozzarella, fresh basil.',
    price: 1150,
    category: 'Pizza',
    thumbnail:
      'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'pizza-pep',
    name: 'Classic Pepperoni',
    description: 'Spicy beef pepperoni, mozzarella, parmesan dust.',
    price: 1280,
    category: 'Pizza',
    thumbnail:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'pizza-meatfeast',
    name: 'Nairobi Meat Feast',
    description: 'Beef mince crumble, smoky sausage, jalapeños, BBQ drizzle.',
    price: 1450,
    category: 'Pizza',
    thumbnail:
      'https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'pizza-veg',
    name: 'Garden Supreme',
    description: 'Peppers, mushrooms, olives, red onion, herbed ricotta pockets.',
    price: 1100,
    category: 'Pizza',
    thumbnail:
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1200&q=80',
  },

  // Nyama choma
  {
    id: 'nya-goat-half',
    name: 'Choma Goat (Half kg)',
    description: 'Slow-grilled marinated cuts, garlic salt, chili kachumbari.',
    price: 1850,
    category: 'Nyama choma',
    thumbnail: drip5,
  },
  {
    id: 'nya-goat-full',
    name: 'Choma Goat (1 kg)',
    description: 'Full kilo feast with two sides.',
    price: 3200,
    category: 'Nyama choma',
    thumbnail: drip6,
  },
  {
    id: 'nya-beef',
    name: 'Beef Striploin Choma',
    description: 'Charred edges, rock salt rub, smoky dipping jus.',
    price: 2100,
    category: 'Nyama choma',
    thumbnail: drip7,
  },
  {
    id: 'nya-chicken',
    name: 'Grilled Lemon Chicken',
    description: 'Spatchcock halves, peri drizzle, pickles.',
    price: 1350,
    category: 'Nyama choma',
    thumbnail: drip9,
  },

  // Chips & sides
  {
    id: 'chips-plain',
    name: 'Handcut Chips – Plain',
    description: 'Thick fries, flaky salt.',
    price: 320,
    category: 'Chips & sides',
    thumbnail:
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'chips-masala',
    name: 'Masala Fries',
    description: 'Warm spice glaze, tangy tamarind yogurt.',
    price: 450,
    category: 'Chips & sides',
    thumbnail:
      'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'chips-loaded',
    name: 'Loaded Drip Fries',
    description: 'Melted cheese, bacon crumble, drizzle sauce.',
    price: 620,
    category: 'Chips & sides',
    thumbnail:
      'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'side-ring',
    name: 'Onion Rings Tower',
    description: 'Beer batter crunch, smoky mayo.',
    price: 480,
    category: 'Chips & sides',
    thumbnail:
      'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=1200&q=80',
  },

  // Drinks & desserts
  {
    id: 'passion-juice',
    name: 'Passion Mango Quencher',
    description: 'Fresh blend, iced.',
    price: 220,
    category: 'Drinks & desserts',
    thumbnail:
      'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'chai',
    name: 'Masala Chai Latte',
    description: 'Spiced Kenyan tea stain, steamed milk.',
    price: 250,
    category: 'Drinks & desserts',
    thumbnail:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'soda-bot',
    name: 'Soda (bottle)',
    description: 'Assorted sodas chilled.',
    price: 150,
    category: 'Drinks & desserts',
    thumbnail:
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'milkshake-v',
    name: 'Drip Thickshake — Vanilla Bean',
    description: 'Custard-soft serve blend.',
    price: 580,
    category: 'Drinks & desserts',
    thumbnail:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'brownie',
    name: 'Warm Chocolate Brownie',
    description: 'Toasted nuts, salted caramel.',
    price: 450,
    category: 'Drinks & desserts',
    thumbnail: hero,
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
