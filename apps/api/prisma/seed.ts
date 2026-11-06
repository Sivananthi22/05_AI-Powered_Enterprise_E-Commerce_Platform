import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    sku: "HOME-MUG-001",
    slug: "ceramic-coffee-mug",
    name: "Ceramic Coffee Mug",
    description: "A durable stoneware mug for everyday coffee and tea.",
    priceCents: 1800,
    imageUrl: null,
  },
  {
    sku: "HOME-LAMP-002",
    slug: "desk-lamp",
    name: "Adjustable Desk Lamp",
    description: "A compact, adjustable lamp with a warm, dimmable light.",
    priceCents: 4599,
    imageUrl: null,
  },
  {
    sku: "TECH-CABLE-003",
    slug: "usb-c-cable",
    name: "Braided USB-C Cable",
    description: "A two-meter braided cable for compatible USB-C devices.",
    priceCents: 1299,
    imageUrl: null,
  },
  {
    sku: "HOME-PLANT-004",
    slug: "ceramic-planter",
    name: "Ceramic Planter",
    description: "A simple glazed planter with a removable drainage tray.",
    priceCents: 2499,
    imageUrl: null,
  },
  {
    sku: "OFFICE-NOTE-005",
    slug: "recycled-notebook",
    name: "Recycled Paper Notebook",
    description: "A lay-flat notebook made with recycled paper.",
    priceCents: 899,
    imageUrl: null,
  },
  {
    sku: "HOME-BOTTLE-006",
    slug: "insulated-water-bottle",
    name: "Insulated Water Bottle",
    description: "A reusable stainless-steel bottle for hot or cold drinks.",
    priceCents: 3299,
    imageUrl: null,
  },
  {
    sku: "TECH-STAND-007",
    slug: "aluminum-laptop-stand",
    name: "Aluminum Laptop Stand",
    description: "A sturdy desktop stand with an adjustable viewing angle.",
    priceCents: 5499,
    imageUrl: null,
  },
  {
    sku: "OFFICE-PEN-008",
    slug: "reusable-metal-pen",
    name: "Reusable Metal Pen",
    description: "A refillable metal pen with a balanced, lightweight design.",
    priceCents: 1599,
    imageUrl: null,
  },
];

async function seed(): Promise<void> {
  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });
}

seed()
  .catch((error: unknown) => {
    console.error("Catalog seed failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
