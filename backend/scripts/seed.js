const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

const CATEGORIES = ['Electronics', 'Apparel', 'Books', 'Home & Kitchen', 'Toys'];
const BRANDS = ['Sony', 'Samsung', 'Nike', 'HP', 'Apple', 'Adidas'];
const COLORS = ['Red', 'Blue', 'Green', 'Black', 'White'];
const MEMORY = ['64GB', '128GB', '256GB'];
const SIZES = ['S', 'M', 'L', 'XL'];

const NUM_PRODUCTS = 1000;

async function main() {
    console.log('Seeding categories...');
    const categoryMap = {};
    for (const name of CATEGORIES) {
        const cat = await prisma.category.upsert({
            where: { name },
            update: {},
            create: { name },
        });
        categoryMap[name] = cat;
    }

    console.log('Seeding products...');
    for (let i = 0; i < NUM_PRODUCTS; i++) {
        const brand = faker.helpers.arrayElement(BRANDS);
        const categoryNames = faker.helpers.arrayElements(CATEGORIES, faker.number.int({ min: 1, max: 2 }));
        const categories = categoryNames.map((name) => ({ id: categoryMap[name].id }));

        const baseAttributes = {
            color: faker.helpers.arrayElement(COLORS),
            size: faker.helpers.arrayElement(SIZES),
            memory: faker.helpers.arrayElement(MEMORY),
        };

        await prisma.product.create({
            data: {
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
                imageUrl: faker.image.urlPicsumPhotos(),
                brand,
                attributes: baseAttributes,
                categories: {
                    connect: categories,
                },
            },
        });

        if (i % 100 === 0) console.log(`Created ${i} products`);
    }

    console.log('Done seeding!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
