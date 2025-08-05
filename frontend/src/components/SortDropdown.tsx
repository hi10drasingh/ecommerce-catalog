'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const sortOptions = [
    { label: 'Price: Low to High', value: 'price:asc' },
    { label: 'Price: High to Low', value: 'price:desc' },
    { label: 'Name: A - Z', value: 'name:asc' },
    { label: 'Name: Z - A', value: 'name:desc' },
];

export default function SortDropdown() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSort = `${searchParams.get('sort_by') || ''}:${searchParams.get('sort_order') || ''}`;

    const [selected, setSelected] = useState(currentSort || 'price:asc');

    useEffect(() => {
        const newSort = `${searchParams.get('sort_by') || ''}:${searchParams.get('sort_order') || ''}`;
        setSelected(newSort);
    }, [searchParams]);

    const onChange = (value: string) => {
        setSelected(value);
        const [sort_by, sort_order] = value.split(':');

        const params = new URLSearchParams(searchParams.toString());
        params.set('sort_by', sort_by);
        params.set('sort_order', sort_order);
        params.set('page', '1'); // reset pagination

        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Sort by:</label>
            <select
                className='border rounded px-3 py-2 text-sm'
                value={selected}
                onChange={(e) => onChange(e.target.value)}
            >
                {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
