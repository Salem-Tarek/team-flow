import axiosClient from "~/lib/axios";

/**
 * Get all dashboard datasets from the unified endpoint.
 * Response structure:
 * {
 *   data: {
 *     stats: [...],
 *     taskStatuses: [...],
 *     weeklyActivity: [...],
 *     recentTasks: [...]
 *   },
 *   message: "..."
 * }
 */
export const getDashboard = (params) => {
    return axiosClient.get("/dashboard", { params })
        .then((res) => res.data);
};
