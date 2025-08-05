'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { debounce } from '@/lib/debounce';

export default function PriceSlider() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [min, setMin] = useState(Number(searchParams.get('price_min')) || 0);
    const [max, setMax] = useState(Number(searchParams.get('price_max')) || 1000);

    useEffect(() => {
        setMin(Number(searchParams.get('price_min')) || 0);
        setMax(Number(searchParams.get('price_max')) || 1000);
    }, [searchParams]);

    const updateRange = debounce((minVal: number, maxVal: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (minVal > 0) {
            params.set('price_min', minVal.toString());
        } else {
            params.delete('price_min');
        }

        if (maxVal < 10000) {
            params.set('price_max', maxVal.toString());
        } else {
            params.delete('price_max');
        }

        params.set('page', '1'); // reset to first page
        router.push(`/products?${params.toString()}`);
    }, 500);

    return (
        <div className='mb-4'>
            <h3 className='font-semibold mb-2 text-gray-700'>Price Range</h3>
            <div className='flex gap-4 items-center'>
                <input
                    type='number'
                    className='w-20 border px-2 py-1 rounded'
                    value={min}
                    onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setMin(val);
                        updateRange(val, max);
                    }}
                    placeholder='Min'
                />
                <span>to</span>
                <input
                    type='number'
                    className='w-20 border px-2 py-1 rounded'
                    value={max}
                    onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setMax(val);
                        updateRange(min, val);
                    }}
                    placeholder='Max'
                />
            </div>
        </div>
    );
}
