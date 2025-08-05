'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { debounce } from '@/lib/debounce';

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('search') || '');

    useEffect(() => {
        setQuery(searchParams.get('search') || '');
    }, [searchParams]);

    const updateQuery = debounce((val: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (val.trim()) {
            params.set('search', val);
        } else {
            params.delete('search');
        }
        params.set('page', '1'); // reset pagination
        router.push(`/products?${params.toString()}`);
    }, 500);

    return (
        <div className='mb-4'>
            <input
                type='text'
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    updateQuery(e.target.value);
                }}
                placeholder='Search products...'
                className='w-full md:w-96 border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
        </div>
    );
}
