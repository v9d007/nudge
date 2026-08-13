import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CheckCircle2,
  Circle,
  Plus,
  Filter,
  CheckSquare,
  ListTodo,
  AlertCircle,
  Clock,
} from 'lucide-react-native';
import { TaskModal } from '../../components/TaskModal';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { toggleGoalCompletion } from '../../store/dashboardSlice';
import { TaskItem, TaskCategory, TaskPriority } from '../../types';
import { darkStitchTheme, lightStitchTheme } from '../../theme/colors';

export const TasksScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const effectiveTheme = useAppSelector((state) => state.theme.effectiveTheme);
  const theme = effectiveTheme === 'dark' ? darkStitchTheme : lightStitchTheme;
  const insets = useSafeAreaInsets();

  const tasks = useAppSelector((state) => state.dashboard.goals);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low' | 'completed'>('all');

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setModalVisible(true);
  };

  const handleOpenEditModal = (task: TaskItem) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return t.completed;
    return t.priority === filter;
  });

  const getPriorityAccentColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return '#fd56a7';
      case 'medium':
        return '#f97316';
      case 'low':
        return '#f9bd22';
    }
  };

  const getCylindricalTagStyle = (category: TaskCategory) => {
    switch (category) {
      case 'design':
        return { bg: '#fd56a720', text: '#fd56a7' };
      case 'product':
        return { bg: '#f9731620', text: '#f97316' };
      case 'engineering':
        return { bg: '#7c3aed20', text: '#7c3aed' };
      case 'health':
        return { bg: '#10b98120', text: '#10b981' };
      case 'learning':
        return { bg: '#f9bd2220', text: '#f9bd22' };
      default:
        return { bg: '#f9731620', text: '#f97316' };
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
      >
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <View>
              <Text style={[styles.pageTitle, { color: theme.textPrimary }]}>
                Tasks Management
              </Text>
              <Text style={[styles.pageSubtitle, { color: theme.textMuted }]}>
                Prioritize, filter, edit and complete your daily goals
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleOpenAddModal}
              style={[styles.addFab, { backgroundColor: theme.primary }]}
            >
              <Plus size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Task Summary Stat Overview */}
        <View style={styles.statsRow}>
          <View
            style={[
              styles.miniStatCard,
              {
                backgroundColor: theme.surfaceContainer,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <ListTodo size={18} color={theme.primary} />
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>
              {tasks.length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>
              Total
            </Text>
          </View>

          <View
            style={[
              styles.miniStatCard,
              {
                backgroundColor: theme.surfaceContainer,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <CheckSquare size={18} color={theme.secondary} />
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>
              {completedCount}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>
              Done
            </Text>
          </View>

          <View
            style={[
              styles.miniStatCard,
              {
                backgroundColor: theme.surfaceContainer,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <AlertCircle size={18} color={theme.tertiary} />
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>
              {pendingCount}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>
              Pending
            </Text>
          </View>
        </View>

        {/* Priority Filter Bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScrollView}
          contentContainerStyle={styles.filterScrollContent}
        >
          {[
            { id: 'all', label: 'All Tasks' },
            { id: 'high', label: 'High Priority' },
            { id: 'medium', label: 'Medium Priority' },
            { id: 'low', label: 'Low Priority' },
            { id: 'completed', label: 'Completed' },
          ].map((f) => {
            const isSelected = filter === f.id;
            return (
              <TouchableOpacity
                key={f.id}
                onPress={() => setFilter(f.id as any)}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: isSelected
                      ? theme.primary
                      : theme.surfaceContainer,
                    borderColor: isSelected
                      ? theme.primary
                      : theme.cardBorder,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    { color: isSelected ? '#FFFFFF' : theme.textMuted },
                  ]}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Task Item Checklist */}
        <View style={styles.tasksListSection}>
          {filteredTasks.length === 0 ? (
            <View
              style={[
                styles.emptyCard,
                {
                  backgroundColor: theme.surfaceContainer,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Filter size={24} color={theme.textMuted} />
              <Text style={[styles.emptyText, { color: theme.textMuted }]}>
                No tasks match this filter.
              </Text>
            </View>
          ) : (
            filteredTasks.map((task) => {
              const priorityColor = getPriorityAccentColor(task.priority);
              const categoryTagStyle = getCylindricalTagStyle(task.category);
              return (
                <TouchableOpacity
                  key={task.id}
                  onPress={() => handleOpenEditModal(task)}
                  activeOpacity={0.7}
                  style={[
                    styles.sleekCard,
                    {
                      backgroundColor: theme.surfaceContainer,
                      borderColor: theme.cardBorder,
                    },
                  ]}
                >
                  {/* Left Priority Accent Bar */}
                  <View
                    style={[
                      styles.priorityAccentBar,
                      { backgroundColor: priorityColor },
                    ]}
                  />

                  <View style={styles.sleekCardContent}>
                    {/* Row 1: Checkbox + Title */}
                    <View style={styles.rowTitle}>
                      <TouchableOpacity
                        onPress={() => dispatch(toggleGoalCompletion(task.id))}
                        style={styles.checkTouch}
                      >
                        {task.completed ? (
                          <CheckCircle2 size={22} color={theme.primary} />
                        ) : (
                          <Circle size={22} color={theme.textMuted} />
                        )}
                      </TouchableOpacity>

                      <Text
                        style={[
                          styles.taskTitleText,
                          {
                            color: task.completed
                              ? theme.textMuted
                              : theme.textPrimary,
                            textDecorationLine: task.completed
                              ? 'line-through'
                              : 'none',
                          },
                        ]}
                        numberOfLines={1}
                      >
                        {task.title}
                      </Text>
                    </View>

                    {/* Row 2: Metadata Bar (Timestamp + Category Tag) */}
                    <View style={styles.rowMeta}>
                      <View style={styles.timeWrapper}>
                        <Clock size={12} color={theme.textMuted} />
                        <Text style={[styles.timeText, { color: theme.textMuted }]}>
                          {task.timestamp || '02:00 PM'}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.cylindricalTag,
                          { backgroundColor: categoryTagStyle.bg },
                        ]}
                      >
                        <Text
                          style={[
                            styles.cylindricalTagText,
                            { color: categoryTagStyle.text },
                          ]}
                        >
                          {task.category}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Task Creation & Edit Modal */}
      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        taskToEdit={editingTask}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  pageSubtitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  addFab: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  miniStatCard: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  filterScrollView: {
    marginVertical: 4,
  },
  filterScrollContent: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    marginRight: 8,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  tasksListSection: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  sleekCard: {
    flexDirection: 'row',
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 10,
    overflow: 'hidden',
  },
  priorityAccentBar: {
    width: 5,
    height: '100%',
  },
  sleekCardContent: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  rowTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  checkTouch: {
    marginRight: 10,
  },
  taskTitleText: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  rowMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 32,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  cylindricalTag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 9999,
  },
  cylindricalTagText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'capitalize',
    letterSpacing: 0.4,
  },
  emptyCard: {
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  emptyText: {
    fontSize: 13,
    marginTop: 8,
  },
});
