// seedCategories.js

import Category from "./models/category.js";
export const seedCategories = async () => {
  await Category.deleteMany();

  const women = await Category.create({
    name: "Women",
    slug: "women",
    level: 0
  });

  const bags = await Category.create({
    name: "Bags",
    slug: "bags",
    parent: women._id,
    level: 1
  });

  const tote = await Category.create({
    name: "Tote Bags",
    slug: "tote-bags",
    parent: bags._id,
    level: 2
  });

  const mini = await Category.create({
    name: "Mini Bags",
    slug: "mini-bags",
    parent: bags._id,
    level: 2
  });

  const shoes = await Category.create({
    name: "Shoes",
    slug: "shoes",
    parent: women._id,
    level: 1
  });

  const sneakers = await Category.create({
    name: "Sneakers",
    slug: "sneakers",
    parent: shoes._id,
    level: 2
  });

  const heels = await Category.create({
    name: "Heels",
    slug: "heels",
    parent: shoes._id,
    level: 2
  });

  return { tote, mini, sneakers, heels };
};