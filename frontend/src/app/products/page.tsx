import { fetchProducts } from '@/lib/api';
import FiltersSidebar from '@/components/FiltersSidebar';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import SortDropdown from '@/components/SortDropdown';
import LoadingOverlay from '@/components/LoadingOverlay';
import type { Product } from '@/types/product';

import { toArray, toNumber, toSortOrder } from '@/lib/normalize';

interface SearchParams {
    search?: string;
    category?: string;
    brand?: string;
    color?: string;
    memory?: string;
    price_min?: string;
    price_max?: string;
    page?: string;
    pageSize?: string;
    sort_by?: string;
    sort_order?: string;
}

export default async function ProductsPage({ searchParams: rawParams }: { searchParams: Promise<SearchParams> }) {
    const searchParams = await rawParams;
    const filters = {
        search: typeof searchParams.search === 'string' ? searchParams.search : undefined,
        category: toArray(searchParams.category),
        brand: toArray(searchParams.brand),
        color: toArray(searchParams.color),
        memory: toArray(searchParams.memory),
        price_min: toNumber(searchParams.price_min),
        price_max: toNumber(searchParams.price_max),
        page: toNumber(searchParams.page) ?? 1,
        pageSize: toNumber(searchParams.pageSize) ?? 12,
        sort_by: typeof searchParams.sort_by === 'string' ? searchParams.sort_by : 'createdAt',
        sort_order: toSortOrder(searchParams.sort_order) ?? 'desc',
    };

    const { data: products, meta } = await fetchProducts(filters);

    return (
        <main className='flex gap-6 px-6 py-6'>
            <LoadingOverlay />

            <FiltersSidebar facets={meta.facetMeta} />

            <div className='flex-1'>
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6'>
                    <SearchBar />
                    <Pagination total={meta.total} page={meta.page} pageSize={meta.pageSize} />
                    <SortDropdown />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {products.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
}
