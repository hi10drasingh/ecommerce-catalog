export function toArray(value: string | null | undefined): string[] | undefined {
    if (!value) return undefined;
    return value.split(',');
}

export function toNumber(value: string | null | undefined): number | undefined {
    if (!value) return undefined;
    const n = Number(value);
    return isNaN(n) ? undefined : n;
}

export function toSortOrder(value: string | null | undefined): 'asc' | 'desc' | undefined {
    if (value === 'asc' || value === 'desc') return value;
    return undefined;
}
