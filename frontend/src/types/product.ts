export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    brand: string;
    attributes: Record<string, string>;
    categories: { name: string }[];
};

export type FacetMeta = {
    categories: { name: string; count: number }[];
    brands: { name: string; count: number }[];
    attributes: Record<string, { value: string; count: number }[]>;
};

export type ProductResponse = {
    data: Product[];
    meta: {
        total: number;
        page: number;
        pageSize: number;
        facetMeta: FacetMeta;
    };
};
