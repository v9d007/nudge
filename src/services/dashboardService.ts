import { apiClient } from './apiClient';
import { DashboardMetrics, TaskItem } from '../types';

export const dashboardService = {
  async fetchDashboardMetrics(): Promise<DashboardMetrics> {

    return apiClient.get('/dashboard/metrics', {
      dailyGoalPercentage: 72,
      activeStreak: 14,
      completedNudgesCount: 8,
      totalNudgesCount: 11,
      focusMinutes: 185,
      weeklyGrowthPercentage: 16.4,
    });
  },

  async toggleGoalStatus(goalId: string, isCompleted: boolean): Promise<{ success: boolean }> {
    return apiClient.post('/goals/toggle', { goalId, isCompleted });
  },
};
