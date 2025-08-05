'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function Pagination({ page, total, pageSize }: { page: number; total: number; pageSize: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const totalPages = Math.ceil(total / pageSize);

    const goToPage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`/products?${params.toString()}`);
    };

    if (totalPages <= 1) return null;

    const createPagination = () => {
        const range: (number | string)[] = [];

        const left = Math.max(2, page - 2);
        const right = Math.min(totalPages - 1, page + 2);

        range.push(1);

        if (left > 2) {
            range.push('...');
        }

        for (let i = left; i <= right; i++) {
            range.push(i);
        }

        if (right < totalPages - 1) {
            range.push('...');
        }

        if (totalPages > 1) {
            range.push(totalPages);
        }

        return range;
    };

    const pages = createPagination();

    return (
        <div className='flex justify-center mt-6 space-x-2'>
            <button disabled={page <= 1} onClick={() => goToPage(page - 1)} className='px-3 py-1 border rounded'>
                Previous
            </button>

            {pages.map((p, i) =>
                typeof p === 'number' ? (
                    <button
                        key={i}
                        onClick={() => goToPage(p)}
                        className={`px-3 py-1 border rounded ${page === p ? 'bg-blue-500 text-white' : ''}`}
                    >
                        {p}
                    </button>
                ) : (
                    <span key={i} className='px-3 py-1'>
                        {p}
                    </span>
                )
            )}

            <button
                disabled={page >= totalPages}
                onClick={() => goToPage(page + 1)}
                className='px-3 py-1 border rounded'
            >
                Next
            </button>
        </div>
    );
}
