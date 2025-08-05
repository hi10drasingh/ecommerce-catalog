export type FilterParams = {
    search?: string;
    category?: string[];
    brand?: string[];
    color?: string[];
    memory?: string[];
    price_min?: number;
    price_max?: number;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
};

export async function fetchProducts(params: FilterParams) {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            query.append(key, value.join(','));
        } else if (value !== undefined) {
            query.append(key, value.toString());
        }
    });

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'}/products?${query.toString()}`,
        {
            cache: 'no-store',
        }
    );

    return res.json();
}
