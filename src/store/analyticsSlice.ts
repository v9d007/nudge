import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnalyticsState, AnalyticsTimeframe, AnalyticsDataPoint } from '../types';

const weeklyData: AnalyticsDataPoint[] = [
  { label: 'Mon', value: 6, secondaryValue: 8, date: 'Aug 07' },
  { label: 'Tue', value: 8, secondaryValue: 9, date: 'Aug 08' },
  { label: 'Wed', value: 5, secondaryValue: 7, date: 'Aug 09' },
  { label: 'Thu', value: 9, secondaryValue: 10, date: 'Aug 10' },
  { label: 'Fri', value: 11, secondaryValue: 12, date: 'Aug 11' },
  { label: 'Sat', value: 7, secondaryValue: 8, date: 'Aug 12' },
  { label: 'Sun', value: 10, secondaryValue: 11, date: 'Aug 13' },
];

const monthlyData: AnalyticsDataPoint[] = [
  { label: 'W1', value: 42, secondaryValue: 50, date: 'Jul 01 - Jul 07' },
  { label: 'W2', value: 58, secondaryValue: 65, date: 'Jul 08 - Jul 14' },
  { label: 'W3', value: 64, secondaryValue: 70, date: 'Jul 15 - Jul 21' },
  { label: 'W4', value: 78, secondaryValue: 85, date: 'Jul 22 - Jul 28' },
];

const dailyData: AnalyticsDataPoint[] = [
  { label: '06 AM', value: 1, date: 'Today' },
  { label: '09 AM', value: 3, date: 'Today' },
  { label: '12 PM', value: 2, date: 'Today' },
  { label: '03 PM', value: 4, date: 'Today' },
  { label: '06 PM', value: 2, date: 'Today' },
  { label: '09 PM', value: 1, date: 'Today' },
];

const initialState: AnalyticsState = {
  timeframe: 'weekly',
  trendData: weeklyData,
  categoryBreakdown: [
    { category: 'Productivity', count: 48, percentage: 40, color: '#6366F1' },
    { category: 'Health & Fitness', count: 32, percentage: 27, color: '#10B981' },
    { category: 'Mindfulness', count: 24, percentage: 20, color: '#F59E0B' },
    { category: 'Learning', count: 16, percentage: 13, color: '#EC4899' },
  ],
  totalNudgesThisMonth: 248,
  avgCompletionRate: 84.5,
  peakProductivityHour: '10:00 AM - 11:30 AM',
  loading: false,
  error: null,
};

export const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setTimeframe: (state, action: PayloadAction<AnalyticsTimeframe>) => {
      state.timeframe = action.payload;
      if (action.payload === 'daily') {
        state.trendData = dailyData;
      } else if (action.payload === 'weekly') {
        state.trendData = weeklyData;
      } else {
        state.trendData = monthlyData;
      }
    },
    setTrendData: (state, action: PayloadAction<AnalyticsDataPoint[]>) => {
      state.trendData = action.payload;
    },
  },
});

export const { setTimeframe, setTrendData } = analyticsSlice.actions;
export default analyticsSlice.reducer;
