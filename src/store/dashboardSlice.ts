import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardMetrics, TaskItem, TaskPriority, TaskCategory, UserProfile } from '../types';

interface DashboardState {
  metrics: DashboardMetrics;
  goals: TaskItem[];
  user: UserProfile;
  loading: boolean;
  error: string | null;
}

const getCategoryColor = (category: TaskCategory, priority: TaskPriority): string => {
  switch (category) {
    case 'design':
      return '#fd56a7';
    case 'product':
      return '#f97316';
    case 'engineering':
      return '#7c3aed';
    case 'health':
      return '#10b981';
    case 'learning':
      return '#f9bd22';
    default:
      return priority === 'high' ? '#fd56a7' : priority === 'medium' ? '#f97316' : '#795900';
  }
};

const initialTasks: TaskItem[] = [
  {
    id: 't1',
    title: 'Review Design System & Tokens',
    category: 'design',
    priority: 'high',
    completed: true,
    targetValue: 1,
    currentValue: 1,
    unit: 'review',
    color: '#fd56a7',
    timestamp: '09:00 AM',
  },
  {
    id: 't2',
    title: 'Finalize Analytics UI & Timeframes',
    category: 'design',
    priority: 'medium',
    completed: true,
    targetValue: 1,
    currentValue: 1,
    unit: 'screen',
    color: '#f97316',
    timestamp: '11:30 AM',
  },
  {
    id: 't3',
    title: 'Draft Release Notes for v2.0',
    category: 'product',
    priority: 'low',
    completed: false,
    targetValue: 1,
    currentValue: 0,
    unit: 'doc',
    color: '#795900',
    timestamp: '02:30 PM',
  },
  {
    id: 't4',
    title: 'Client Presentation & Demo Prep',
    category: 'engineering',
    priority: 'high',
    completed: false,
    targetValue: 60,
    currentValue: 30,
    unit: 'mins',
    color: '#fd56a7',
    timestamp: '04:00 PM',
  },
  {
    id: 't5',
    title: 'Evening Health & Hydration Check',
    category: 'health',
    priority: 'low',
    completed: false,
    targetValue: 2000,
    currentValue: 1200,
    unit: 'ml',
    color: '#10b981',
    timestamp: '07:00 PM',
  },
];

const initialState: DashboardState = {
  metrics: {
    dailyGoalPercentage: 75,
    activeStreak: 14,
    completedNudgesCount: 2,
    totalNudgesCount: 5,
    focusMinutes: 185,
    weeklyGrowthPercentage: 16.4,
  },
  goals: initialTasks,
  user: {
    name: 'Alex Rivera',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    level: 7,
    xpPoints: 3420,
  },
  loading: false,
  error: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleGoalCompletion: (state, action: PayloadAction<string>) => {
      const goal = state.goals.find((g) => g.id === action.payload);
      if (goal) {
        goal.completed = !goal.completed;
        if (goal.completed) {
          goal.currentValue = goal.targetValue;
        }
      }
      
      const completedCount = state.goals.filter((g) => g.completed).length;
      state.metrics.completedNudgesCount = completedCount;
      state.metrics.dailyGoalPercentage = Math.round((completedCount / state.goals.length) * 100);
    },
    addNewTask: (
      state,
      action: PayloadAction<{
        title: string;
        timestamp: string;
        priority: TaskPriority;
        category: TaskCategory;
      }>
    ) => {
      const newTask: TaskItem = {
        id: `t_${Date.now()}`,
        title: action.payload.title,
        category: action.payload.category,
        priority: action.payload.priority,
        completed: false,
        targetValue: 1,
        currentValue: 0,
        unit: 'task',
        color: getCategoryColor(action.payload.category, action.payload.priority),
        timestamp: action.payload.timestamp || '02:00 PM',
      };
      state.goals.unshift(newTask);
      state.metrics.totalNudgesCount = state.goals.length;
      const completedCount = state.goals.filter((g) => g.completed).length;
      state.metrics.dailyGoalPercentage = Math.round((completedCount / state.goals.length) * 100);
    },
    editTask: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        timestamp: string;
        priority: TaskPriority;
        category: TaskCategory;
      }>
    ) => {
      const task = state.goals.find((g) => g.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.timestamp = action.payload.timestamp;
        task.priority = action.payload.priority;
        task.category = action.payload.category;
        task.color = getCategoryColor(action.payload.category, action.payload.priority);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.goals = state.goals.filter((g) => g.id !== action.payload);
      state.metrics.totalNudgesCount = state.goals.length;
      const completedCount = state.goals.filter((g) => g.completed).length;
      state.metrics.dailyGoalPercentage = state.goals.length > 0
        ? Math.round((completedCount / state.goals.length) * 100)
        : 0;
    },
  },
});

export const { toggleGoalCompletion, addNewTask, editTask, deleteTask } = dashboardSlice.actions;
export default dashboardSlice.reducer;
