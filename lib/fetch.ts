import { useCallback, useEffect, useState } from "react";

export async function fetcher(url: string, options?: RequestInit) {
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw res;
        }
        
        const contentType = res.headers.get("Content-Type");

        if (contentType && contentType.includes("application/json")) {
            return res.json();
        }
    } catch (error) {
        throw error;
    }
}

export const useFetch = <T>(url: string, options?: RequestInit) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetcher(url, options);
            setData(result);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};
