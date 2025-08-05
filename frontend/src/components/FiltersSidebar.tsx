'use client';

import { FacetMeta } from '@/types/product';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import PriceSlider from './PriceSlider';

type FilterProps = {
    facets: FacetMeta;
};

export default function FiltersSidebar({ facets }: FilterProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const updateFilter = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            const existing = params.get(key)?.split(',') || [];

            const newValues = existing.includes(value) ? existing.filter((v) => v !== value) : [...existing, value];

            if (newValues.length) {
                params.set(key, newValues.join(','));
            } else {
                params.delete(key);
            }

            router.push(`/products?${params.toString()}`);
        },
        [searchParams, router]
    );

    return (
        <aside className='w-full md:w-64 pr-4 mb-6 md:mb-0'>
            <div className='space-y-4'>
                <PriceSlider />
                <FacetGroup title='Category' facetKey='category' options={facets.categories} onToggle={updateFilter} />
                <FacetGroup title='Brand' facetKey='brand' options={facets.brands} onToggle={updateFilter} />
                {Object.entries(facets.attributes).map(([key, values]) => (
                    <FacetGroup key={key} title={key} facetKey={key} options={values} onToggle={updateFilter} />
                ))}
            </div>
        </aside>
    );
}

function FacetGroup({
    title,
    facetKey,
    options,
    onToggle,
}: {
    title: string;
    facetKey: string;
    options: { name?: string; value?: string; count: number }[];
    onToggle: (k: string, v: string) => void;
}) {
    return (
        <div>
            <h3 className='font-semibold text-gray-700 mb-2'>{title}</h3>
            <ul className='space-y-1'>
                {options.map((opt) => {
                    const label = opt.name || opt.value;
                    return (
                        <li key={label}>
                            <label className='flex items-center space-x-2 text-sm cursor-pointer'>
                                <input type='checkbox' onChange={() => onToggle(facetKey, label!)} />
                                <span>
                                    {label} ({opt.count})
                                </span>
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
