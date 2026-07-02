import { menuByCategory, CATEGORY_NOTES } from './menu';

describe('menu content', () => {
  it('includes items from all categories', () => {
    const grouped = menuByCategory();

    expect(grouped['Signature Burgers'].some((item) => item.name === 'Carnivore Burger')).toBe(true);
    expect(grouped['Classic Burgers'].some((item) => item.name === 'Smash Burger')).toBe(true);
    expect(grouped['Drip Crunch Chicken'].some((item) => item.name === 'Crunch Burger')).toBe(true);
    expect(grouped['Wings'].some((item) => item.name === 'Classic Wings')).toBe(true);
    expect(grouped['Kids Meals'].some((item) => item.name === 'Lil Drip Box')).toBe(true);
    expect(grouped['Sodas'].some((item) => item.name === 'Club Blackcurrant')).toBe(true);
    expect(grouped['Extra Sauces'].some((item) => item.name === 'Garlic Mayo')).toBe(true);
  });

  it('uses dedicated thumbnails for featured menu items', () => {
    const grouped = menuByCategory();
    const dripChicken = grouped['Classic Burgers'].find((item) => item.name === 'Drip Chicken Burger');

    expect(dripChicken?.thumbnail).not.toContain('hero');
  });

  it('has expected category notes', () => {
    expect(CATEGORY_NOTES['Signature Burgers']).toContain('Comes with fries');
    expect(CATEGORY_NOTES['Classic Burgers']).toContain('Meal Upgrade');
  });
});
