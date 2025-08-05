const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function parseList(value) {
    return value ? value.split(',').map((v) => v.trim()) : [];
}

exports.getProducts = async (req, res) => {
    try {
        const {
            search,
            category,
            brand,
            price_min,
            price_max,
            sort_by = 'createdAt',
            sort_order = 'desc',
            page = 1,
            pageSize = 12,
            ...attributes
        } = req.query;

        const skip = (page - 1) * pageSize;
        const take = parseInt(pageSize);

        // Base WHERE filter (search, brand, category, price)
        const where = { AND: [] };

        if (search) {
            const searchLower = search.toLowerCase();
            where.AND.push({
                OR: [{ name: { contains: searchLower } }, { description: { contains: searchLower } }],
            });
        }

        if (category) {
            const categories = parseList(category);
            if (categories.length > 0) {
                where.AND.push({
                    categories: {
                        some: { name: { in: categories } },
                    },
                });
            }
        }

        if (brand) {
            const brands = parseList(brand);
            if (brands.length > 0) {
                where.AND.push({ brand: { in: brands } });
            }
        }

        if (price_min || price_max) {
            const priceFilter = {};
            if (price_min) priceFilter.gte = parseFloat(price_min);
            if (price_max) priceFilter.lte = parseFloat(price_max);
            where.AND.push({ price: priceFilter });
        }

        const sortBy = sort_by
        const sortOrder = sort_order
        const allowedSortFields = ['price', 'name', 'createdAt'];
        const orderByField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';

        // Fetch all products that match base filters
        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                orderBy: {
                    [orderByField]: sortOrder,
                },
                skip,
                take,
                include: { categories: true },
            }),
            prisma.product.count({ where }), // returns a number
        ]);

        // Filter attributes (color, memory, etc.) in-memory
        for (const [key, value] of Object.entries(attributes)) {
            const values = parseList(value);
            if (values.length > 0) {
                products = products.filter((p) => values.includes(p.attributes?.[key]));
            }
        }

        const facetMeta = getFacetCounts(products);

        res.json({
            data: products,
            meta: {
                total,
                page: parseInt(page),
                pageSize: take,
                facetMeta,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// In-memory facet counters from filtered products
function getFacetCounts(products) {
    const categoryMap = {};
    const brandMap = {};
    const attributeMap = {};

    for (const product of products) {
        // Categories
        for (const cat of product.categories) {
            categoryMap[cat.name] = (categoryMap[cat.name] || 0) + 1;
        }

        // Brands
        brandMap[product.brand] = (brandMap[product.brand] || 0) + 1;

        // Attributes (color, memory, etc.)
        for (const [key, val] of Object.entries(product.attributes || {})) {
            const values = Array.isArray(val) ? val : [val];
            if (!attributeMap[key]) attributeMap[key] = {};
            for (const v of values) {
                attributeMap[key][v] = (attributeMap[key][v] || 0) + 1;
            }
        }
    }

    return {
        categories: Object.entries(categoryMap).map(([name, count]) => ({ name, count })),
        brands: Object.entries(brandMap).map(([name, count]) => ({ name, count })),
        attributes: Object.fromEntries(
            Object.entries(attributeMap).map(([key, values]) => [
                key,
                Object.entries(values).map(([value, count]) => ({ value, count })),
            ])
        ),
    };
}
