import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { type Category, CATEGORIES } from "../src/types/product.type";

const prisma = new PrismaClient();

const CATEGORY_CONFIG: Record<
  Category,
  {
    subCategories: string[];
    generateName: (subCat: string) => string;
    getPriceRange: () => { min: number; max: number };
    getBrandList: () => string[];
  }
> = {
  electronics: {
    subCategories: [
      "laptops",
      "headphones",
      "phones",
      "cameras",
      "smartwatches",
    ],
    generateName: (sub) =>
      `${faker.company.name()} ${faker.word.adjective()} ${sub}`,
    getPriceRange: () => ({ min: 20, max: 2000 }),
    getBrandList: () => ["Sony", "Apple", "Samsung", "Dell", "Canon", "Bose"],
  },
  fashion: {
    subCategories: ["t-shirts", "dresses", "jeans", "sneakers", "watches"],
    generateName: (sub) =>
      `${faker.color.human()} ${faker.word.adjective()} ${sub}`,
    getPriceRange: () => ({ min: 10, max: 300 }),
    getBrandList: () => ["Nike", "Zara", "Uniqlo", "Adidas", "Gucci", "H&M"],
  },
  home: {
    subCategories: ["kitchenware", "bedding", "decor", "furniture", "lighting"],
    generateName: (sub) => `${faker.word.adjective()} ${sub} set`,
    getPriceRange: () => ({ min: 15, max: 800 }),
    getBrandList: () => ["IKEA", "MUJI", "Williams Sonoma", "Crate & Barrel"],
  },
  beauty: {
    subCategories: ["skincare", "makeup", "fragrance", "haircare", "tools"],
    generateName: (sub) => `${faker.word.adjective()} ${sub} kit`,
    getPriceRange: () => ({ min: 8, max: 200 }),
    getBrandList: () => [
      "L'Oréal",
      "Clinique",
      "The Ordinary",
      "Glossier",
      "Shiseido",
    ],
  },
  books: {
    subCategories: ["fiction", "non-fiction", "sci-fi", "mystery", "self-help"],
    generateName: (sub) =>
      `"${faker.word.adjective()} ${faker.word.noun()}" - ${sub} novel`,
    getPriceRange: () => ({ min: 5, max: 40 }),
    getBrandList: () => [], // Books often don’t have "brands"
  },
  sports: {
    subCategories: ["fitness", "outdoor", "team sports", "yoga", "cycling"],
    generateName: (sub) => `${faker.word.adjective()} ${sub} gear`,
    getPriceRange: () => ({ min: 20, max: 500 }),
    getBrandList: () => [
      "Nike",
      "Adidas",
      "The North Face",
      "Yonex",
      "Under Armour",
    ],
  },
  toys: {
    subCategories: [
      "educational",
      "action figures",
      "board games",
      "dolls",
      "puzzles",
    ],
    generateName: (sub) => `${faker.word.adjective()} ${sub} for kids`,
    getPriceRange: () => ({ min: 10, max: 150 }),
    getBrandList: () => ["LEGO", "Mattel", "Hasbro", "Fisher-Price"],
  },
  grocery: {
    subCategories: [
      "snacks",
      "beverages",
      "organic",
      "bakery",
      "international",
    ],
    generateName: (sub) => `${faker.company.name()} ${sub} pack`,
    getPriceRange: () => ({ min: 2, max: 50 }),
    getBrandList: () => ["Nestlé", "Coca-Cola", "Kikkoman", "Whole Foods"],
  },
  automotive: {
    subCategories: ["tools", "cleaning", "electronics", "tires", "interior"],
    generateName: (sub) => `${faker.word.adjective()} car ${sub}`,
    getPriceRange: () => ({ min: 10, max: 600 }),
    getBrandList: () => ["Bosch", "3M", "Michelin", "Armor All"],
  },
  health: {
    subCategories: [
      "supplements",
      "vitamins",
      "first aid",
      "personal care",
      "mobility",
    ],
    generateName: (sub) => `${faker.word.adjective()} ${sub} product`,
    getPriceRange: () => ({ min: 5, max: 100 }),
    getBrandList: () => ["Nature Made", "CVS Health", "TheraBand", "Omron"],
  },
};

function generateTags(category: Category, subCategory: string): string {
  const commonTags = ["bestseller", "popular", "discount"];
  const normalizedSub = subCategory.toLowerCase().replace(/[^a-z0-9]/g, "");

  const catTags: Record<Category, string[]> = {
    fashion: ["cotton", "summer", "casual", "formal"],
    beauty: ["organic", "vegan", "cruelty-free", "hydrating"],
    home: ["durable", "modern", "eco-friendly"],
    books: ["bestseller", "paperback", "hardcover"],
    grocery: ["organic", "gluten-free", "imported"],
    health: ["daily", "natural", "doctor-recommended"],
    electronics: ["wireless", "bluetooth", "rechargeable"],
    sports: ["lightweight", "breathable", "waterproof"],
    toys: ["educational", "safe", "age-3+"],
    automotive: ["durable", "easy-install", "premium"],
  };

  const tags = [...commonTags, normalizedSub];
  const extra = faker.helpers.arrayElements(catTags[category] || [], 2);
  return [...tags, ...extra].join(",");
}

async function main() {
  console.log("🌱 Starting database seeding...");

  // Seed Products
  console.log("📦 Seeding products...");
  const products = [];
  const total = 200;
  for (let i = 0; i < total; i++) {
    const category = faker.helpers.arrayElement(CATEGORIES);
    const config = CATEGORY_CONFIG[category];
    const subCategory = faker.helpers.arrayElement(config.subCategories);
    const brandList = config.getBrandList();
    const brand = brandList.length
      ? faker.helpers.arrayElement(brandList)
      : null;
    const { min, max } = config.getPriceRange();

    const name = config.generateName(subCategory);
    const price = parseFloat(
      faker.number.float({ min, max, fractionDigits: 2 }).toFixed(2)
    );
    const description = faker.commerce.productDescription();
    const rating = faker.number.float({
      min: 3.8,
      max: 5.0,
      fractionDigits: 1,
    });
    const tags = generateTags(category, subCategory);

    products.push({
      name,
      description,
      price,
      category,
      subCategory,
      brand,
      inStock: faker.datatype.boolean({ probability: 0.92 }),
      rating,
      imageUrl: faker.image.url(),
      tags,
    });
  }

  await prisma.product.createMany({ data: products });
  console.log(
    `✅ Created ${products.length} diverse products across 10 categories`
  );
  console.log("✅ Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
