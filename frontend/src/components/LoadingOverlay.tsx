'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function LoadingOverlay() {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 500); // Small delay to smooth UX
        return () => clearTimeout(timer);
    }, [searchParams]); // Triggers on filter change

    if (!isLoading) return null;

    return (
        <div className='fixed inset-0 bg-white bg-opacity-50 z-50 flex items-center justify-center pointer-events-none'>
            <div className='animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500'></div>
        </div>
    );
}
