export const reactQueryConfig = {
    // TODO: may be refactor this
    staleTime: 1000 * 60 * 5, // 5 minutes
    // staleTime: 1000 * 60 * 0.25, // 0.25 minute
    retry: 2, // Only retry twice on failure
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: true, // Refetch when component mounts if query is stale
}