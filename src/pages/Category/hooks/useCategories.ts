import { useEffect, useState, useCallback } from 'react';
import { categoryServices } from '../../../services/CategoryServices';
import type { CategoryRes } from '../../../types/category/CategoryRes';

export function useCategories() {
    const [categories, setCategories] = useState<CategoryRes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await categoryServices.getListCategory();
            console.log(res, 'xxxxxxx');
            setCategories(res.data.categories || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { categories, loading, error, refetchListCategory: fetchData };
}