export type ThemeMode = 'light' | 'dark' | 'system';

export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskCategory = 'design' | 'product' | 'engineering' | 'health' | 'learning';

export interface TaskItem {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  completed: boolean;
  targetValue: number;
  currentValue: number;
  unit: string;
  color: string;
  timestamp: string;
}

export interface DashboardMetrics {
  dailyGoalPercentage: number;
  activeStreak: number;
  completedNudgesCount: number;
  totalNudgesCount: number;
  focusMinutes: number;
  weeklyGrowthPercentage: number;
}

export type AnalyticsTimeframe = 'daily' | 'weekly' | 'monthly';

export interface AnalyticsDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  date: string;
}

export interface CategoryBreakdown {
  category: string;
  count: number;
  percentage: number;
  color: string;
}

export interface AnalyticsState {
  timeframe: AnalyticsTimeframe;
  trendData: AnalyticsDataPoint[];
  categoryBreakdown: CategoryBreakdown[];
  totalNudgesThisMonth: number;
  avgCompletionRate: number;
  peakProductivityHour: string;
  loading: boolean;
  error: string | null;
}

export interface UserProfile {
  name: string;
  avatarUrl?: string;
  level: number;
  xpPoints: number;
}
