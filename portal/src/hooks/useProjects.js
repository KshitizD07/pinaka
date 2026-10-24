'use client';

import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  });

/**
 * SWR hook for fetching and filtering projects from the API.
 * Supports track, status, category, and live text search.
 * @returns {{ projects, total, isLoading, error, filter, setFilter }}
 */
export function useProjects(initialFilter = {}) {
  const [filter, setFilter] = useState(initialFilter);

  const params = new URLSearchParams();
  if (filter.track) params.set('track', filter.track);
  if (filter.status) params.set('status', filter.status);
  if (filter.category) params.set('category', filter.category);
  if (filter.search) params.set('search', filter.search.trim());

  const queryString = params.toString();
  const url = `/api/projects${queryString ? `?${queryString}` : ''}`;

  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: true,
    dedupingInterval: 1000,
  });

  return {
    projects: data?.projects ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
    filter,
    setFilter,
  };
}
