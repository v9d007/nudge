import { apiClient } from './apiClient';
import { AnalyticsTimeframe, AnalyticsDataPoint } from '../types';

export const analyticsService = {
  async fetchTrendData(timeframe: AnalyticsTimeframe): Promise<AnalyticsDataPoint[]> {
    return apiClient.get(`/analytics/trend?timeframe=${timeframe}`, [
      { label: 'Mon', value: 6, secondaryValue: 8, date: 'Aug 07' },
      { label: 'Tue', value: 8, secondaryValue: 9, date: 'Aug 08' },
      { label: 'Wed', value: 5, secondaryValue: 7, date: 'Aug 09' },
      { label: 'Thu', value: 9, secondaryValue: 10, date: 'Aug 10' },
      { label: 'Fri', value: 11, secondaryValue: 12, date: 'Aug 11' },
      { label: 'Sat', value: 7, secondaryValue: 8, date: 'Aug 12' },
      { label: 'Sun', value: 10, secondaryValue: 11, date: 'Aug 13' },
    ]);
  },
};
