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
      "Laptop",
      "Headphones",
      "Smartphone",
      "Camera",
      "Smartwatch",
    ],
    generateName: (sub) => {
      const brands = ["Sony", "Apple", "Samsung", "Dell", "Canon", "Bose"];
      const brand = faker.helpers.arrayElement(brands);
      const models = ["Pro", "Max", "Ultra", "Plus", "Elite", "Premium"];
      const model = faker.helpers.arrayElement(models);
      return `${brand} ${sub} ${model}`;
    },
    getPriceRange: () => ({ min: 99, max: 1999 }),
    getBrandList: () => ["Sony", "Apple", "Samsung", "Dell", "Canon", "Bose"],
  },
  fashion: {
    subCategories: ["T-Shirt", "Dress", "Jeans", "Sneakers", "Watch"],
    generateName: (sub) => {
      const styles = [
        "Classic",
        "Modern",
        "Vintage",
        "Casual",
        "Premium",
        "Designer",
      ];
      const style = faker.helpers.arrayElement(styles);
      const colors = ["Black", "White", "Blue", "Red", "Gray", "Navy"];
      const color = faker.helpers.arrayElement(colors);
      return sub === "Watch" ? `${style} ${sub}` : `${style} ${color} ${sub}`;
    },
    getPriceRange: () => ({ min: 19.99, max: 299.99 }),
    getBrandList: () => ["Nike", "Zara", "Uniqlo", "Adidas", "Gucci", "H&M"],
  },
  home: {
    subCategories: [
      "Kitchen Set",
      "Bedding Set",
      "Wall Decor",
      "Furniture",
      "Lamp",
    ],
    generateName: (sub) => {
      const styles = [
        "Modern",
        "Scandinavian",
        "Rustic",
        "Contemporary",
        "Minimalist",
      ];
      const style = faker.helpers.arrayElement(styles);
      return `${style} ${sub}`;
    },
    getPriceRange: () => ({ min: 29.99, max: 799.99 }),
    getBrandList: () => ["IKEA", "MUJI", "Williams Sonoma", "Crate & Barrel"],
  },
  beauty: {
    subCategories: [
      "Skincare Set",
      "Makeup Kit",
      "Perfume",
      "Hair Care",
      "Beauty Tools",
    ],
    generateName: (sub) => {
      const types = [
        "Hydrating",
        "Anti-Aging",
        "Brightening",
        "Nourishing",
        "Revitalizing",
        "Professional",
      ];
      const type = faker.helpers.arrayElement(types);
      return `${type} ${sub}`;
    },
    getPriceRange: () => ({ min: 12.99, max: 199.99 }),
    getBrandList: () => [
      "L'Oréal",
      "Clinique",
      "The Ordinary",
      "Glossier",
      "Shiseido",
    ],
  },
  books: {
    subCategories: ["Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "Self-Help"],
    generateName: (sub) => {
      const adjectives = [
        "The Complete",
        "The Essential",
        "The Ultimate",
        "The Art of",
        "Mastering",
      ];
      const topics = [
        "Success",
        "Mindfulness",
        "Leadership",
        "Creativity",
        "Wisdom",
        "Adventure",
      ];
      const adj = faker.helpers.arrayElement(adjectives);
      const topic = faker.helpers.arrayElement(topics);
      return `${adj} ${topic} - ${sub} Book`;
    },
    getPriceRange: () => ({ min: 9.99, max: 39.99 }),
    getBrandList: () => [
      "Penguin",
      "HarperCollins",
      "Simon & Schuster",
      "Macmillan",
    ],
  },
  sports: {
    subCategories: [
      "Fitness Equipment",
      "Outdoor Gear",
      "Team Sports",
      "Yoga Mat",
      "Cycling Gear",
    ],
    generateName: (sub) => {
      const types = [
        "Pro",
        "Elite",
        "Performance",
        "Training",
        "Professional",
        "Advanced",
      ];
      const type = faker.helpers.arrayElement(types);
      return `${type} ${sub}`;
    },
    getPriceRange: () => ({ min: 24.99, max: 499.99 }),
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
      "Educational Toy",
      "Action Figure",
      "Board Game",
      "Doll",
      "Puzzle",
    ],
    generateName: (sub) => {
      const ages = ["3+", "5+", "8+", "10+"];
      const types = ["Learning", "Creative", "Fun", "Interactive", "Classic"];
      const age = faker.helpers.arrayElement(ages);
      const type = faker.helpers.arrayElement(types);
      return `${type} ${sub} (Age ${age})`;
    },
    getPriceRange: () => ({ min: 14.99, max: 149.99 }),
    getBrandList: () => ["LEGO", "Mattel", "Hasbro", "Fisher-Price"],
  },
  grocery: {
    subCategories: [
      "Snacks",
      "Beverages",
      "Organic Food",
      "Bakery",
      "International Food",
    ],
    generateName: (sub) => {
      const types = [
        "Premium",
        "Organic",
        "Natural",
        "Gourmet",
        "Fresh",
        "Artisan",
      ];
      const type = faker.helpers.arrayElement(types);
      const sizes = ["Pack", "Bundle", "Box", "Variety Pack"];
      const size = faker.helpers.arrayElement(sizes);
      return `${type} ${sub} ${size}`;
    },
    getPriceRange: () => ({ min: 3.99, max: 49.99 }),
    getBrandList: () => ["Nestlé", "Coca-Cola", "Kikkoman", "Whole Foods"],
  },
  automotive: {
    subCategories: [
      "Car Tools",
      "Car Cleaning Kit",
      "Car Electronics",
      "Tires",
      "Interior Accessories",
    ],
    generateName: (sub) => {
      const types = [
        "Professional",
        "Premium",
        "Heavy-Duty",
        "High-Performance",
        "Universal",
      ];
      const type = faker.helpers.arrayElement(types);
      return `${type} ${sub}`;
    },
    getPriceRange: () => ({ min: 19.99, max: 599.99 }),
    getBrandList: () => ["Bosch", "3M", "Michelin", "Armor All"],
  },
  health: {
    subCategories: [
      "Supplements",
      "Vitamins",
      "First Aid Kit",
      "Personal Care",
      "Mobility Aid",
    ],
    generateName: (sub) => {
      const types = [
        "Daily",
        "Advanced",
        "Complete",
        "Essential",
        "Premium",
        "Natural",
      ];
      const type = faker.helpers.arrayElement(types);
      return `${type} ${sub}`;
    },
    getPriceRange: () => ({ min: 9.99, max: 99.99 }),
    getBrandList: () => ["Nature Made", "CVS Health", "TheraBand", "Omron"],
  },
};

function generateTags(category: Category, subCategory: string): string {
  const commonTags = ["new-arrival", "bestseller", "free-shipping"];
  const normalizedSub = subCategory
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/\s+/g, "-");

  const catTags: Record<Category, string[]> = {
    fashion: ["trending", "seasonal", "comfortable", "stylish"],
    beauty: ["organic", "vegan", "dermatologist-tested", "paraben-free"],
    home: ["modern", "eco-friendly", "space-saving", "easy-clean"],
    books: ["bestseller", "recommended", "award-winning", "must-read"],
    grocery: ["organic", "non-gmo", "fresh", "premium-quality"],
    health: [
      "clinically-tested",
      "natural",
      "doctor-recommended",
      "gluten-free",
    ],
    electronics: [
      "latest-tech",
      "energy-efficient",
      "warranty-included",
      "fast-charging",
    ],
    sports: ["performance", "durable", "lightweight", "weather-resistant"],
    toys: ["educational", "age-appropriate", "safe", "award-winning"],
    automotive: [
      "oem-quality",
      "easy-install",
      "universal-fit",
      "long-lasting",
    ],
  };

  const tags = [normalizedSub];
  const extra = faker.helpers.arrayElements(catTags[category] || [], 3);
  const allTags = [
    ...tags,
    ...extra,
    ...faker.helpers.arrayElements(commonTags, 2),
  ];
  return [...new Set(allTags)].join(",");
}

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing products
  console.log("🗑️  Clearing existing products...");
  await prisma.product.deleteMany({});

  // Seed Products
  console.log("📦 Seeding products...");
  const products = [];
  const total = 200;

  for (let i = 0; i < total; i++) {
    const category = faker.helpers.arrayElement(CATEGORIES);
    const config = CATEGORY_CONFIG[category];
    const subCategory = faker.helpers.arrayElement(config.subCategories);
    const brandList = config.getBrandList();
    const brand =
      brandList.length > 0 ? faker.helpers.arrayElement(brandList) : null;
    const { min, max } = config.getPriceRange();

    const name = config.generateName(subCategory);
    const price = parseFloat(
      faker.number.float({ min, max, fractionDigits: 2 }).toFixed(2)
    );

    // Generate better descriptions
    const features = [
      "High-quality materials",
      "Excellent craftsmanship",
      "Modern design",
      "Durable construction",
      "Easy to use",
      "Great value",
    ];
    const selectedFeatures = faker.helpers.arrayElements(features, 3);
    const description = `${faker.commerce.productDescription()} ${selectedFeatures.join(
      ". "
    )}.`;

    const rating = parseFloat(
      faker.number
        .float({
          min: 3.5,
          max: 5.0,
          fractionDigits: 1,
        })
        .toFixed(1)
    );
    const tags = generateTags(category, subCategory);

    products.push({
      name,
      description,
      price,
      category,
      subCategory,
      brand,
      inStock: faker.datatype.boolean({ probability: 0.9 }),
      rating,
      imageUrl: `https://picsum.photos/seed/${i}/400/400`,
      tags,
    });
  }

  await prisma.product.createMany({ data: products });
  console.log(
    `✅ Successfully created ${products.length} products across ${CATEGORIES.length} categories`
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
