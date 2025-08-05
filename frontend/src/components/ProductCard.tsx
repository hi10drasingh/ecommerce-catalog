import { Product } from '@/types/product';

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className='border rounded-lg p-4 shadow-sm hover:shadow-md transition'>
            <img src={product.imageUrl} alt={product.name} className='w-full h-40 object-cover rounded mb-2' />
            <h2 className='text-lg font-semibold'>{product.name}</h2>
            <p className='text-sm text-gray-500'>{product.brand}</p>
            <p className='text-sm text-gray-400'>{product.categories.map((c) => c.name).join(', ')}</p>
            <p className='mt-2 font-bold text-blue-600'>${product.price.toFixed(2)}</p>
        </div>
    );
}
