import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Flame, CheckCircle2, Circle, Clock, Plus, Award, BellRing, Play } from 'lucide-react-native';
import { Header } from '../../components/Header';
import { ProgressRing } from '../../components/ProgressRing';
import { StatCard } from '../../components/StatCard';
import { TaskModal } from '../../components/TaskModal';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { toggleGoalCompletion } from '../../store/dashboardSlice';
import { TaskItem, TaskCategory, TaskPriority } from '../../types';
import { darkStitchTheme, lightStitchTheme } from '../../theme/colors';

export const DashboardScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const effectiveTheme = useAppSelector((state) => state.theme.effectiveTheme);
  const theme = effectiveTheme === 'dark' ? darkStitchTheme : lightStitchTheme;
  const insets = useSafeAreaInsets();

  const metrics = useAppSelector((state) => state.dashboard.metrics);
  const goals = useAppSelector((state) => state.dashboard.goals);

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

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
      >
        <Header subtitle="Good Morning" title="Here's your momentum" />

        {/* Priority Banner (Sunset Energy Gradient Box) */}
        <View style={styles.priorityCardContainer}>
          <View style={styles.sunsetCard}>
            <View style={styles.priorityHeaderRow}>
              <BellRing size={18} color="#FFFFFF" />
              <Text style={styles.priorityHeaderTitle}>Priority</Text>
            </View>

            <View style={styles.priorityContentBox}>
              <Text style={styles.priorityDateText}>TODAY, 2:00 PM</Text>
              <Text style={styles.priorityItemTitle}>
                Client Presentation & System Demo
              </Text>
            </View>
          </View>

          {/* Interactive Start Focus Session Button */}
          <TouchableOpacity
            style={[
              styles.focusSessionBtn,
              {
                backgroundColor: theme.surfaceContainerHigh,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <Text style={[styles.focusSessionText, { color: theme.textPrimary }]}>
              Start Focus Session
            </Text>
            <View
              style={[
                styles.playIconCircle,
                { backgroundColor: theme.primary },
              ]}
            >
              <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Daily Progress Card */}
        <View
          style={[
            styles.heroCard,
            {
              backgroundColor: theme.surfaceContainer,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <View style={styles.heroHeader}>
            <View>
              <Text style={[styles.heroTitle, { color: theme.textPrimary }]}>
                Daily Goal
              </Text>
              <Text style={[styles.heroSubtitle, { color: theme.textMuted }]}>
                {metrics.dailyGoalPercentage}% Complete
              </Text>
            </View>

            <View
              style={[
                styles.badge,
                { backgroundColor: `${theme.primary}20` },
              ]}
            >
              <Award size={14} color={theme.primary} />
              <Text style={[styles.badgeText, { color: theme.primary }]}>
                In Progress
              </Text>
            </View>
          </View>

          <ProgressRing
            percentage={metrics.dailyGoalPercentage}
            centerTitle={`${metrics.dailyGoalPercentage}%`}
            centerSubtitle="Completed"
            gradientColors={['#f97316', '#fd56a7']}
          />

          <View
            style={[
              styles.metricsBar,
              { borderTopColor: theme.cardBorder },
            ]}
          >
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: theme.textMuted }]}>
                Streak
              </Text>
              <Text style={[styles.metricValue, { color: theme.textPrimary }]}>
                🔥 {metrics.activeStreak} Days
              </Text>
            </View>

            <View
              style={[
                styles.metricItem,
                styles.metricBorderHorizontal,
                { borderColor: theme.cardBorder },
              ]}
            >
              <Text style={[styles.metricLabel, { color: theme.textMuted }]}>
                Focus Time
              </Text>
              <Text style={[styles.metricValue, { color: theme.textPrimary }]}>
                ⏱ {metrics.focusMinutes} mins
              </Text>
            </View>

            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: theme.textMuted }]}>
                Growth
              </Text>
              <Text style={[styles.metricValue, { color: theme.primary }]}>
                +{metrics.weeklyGrowthPercentage}%
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Stat Cards Grid */}
        <View style={styles.statsRow}>
          <StatCard
            title="Active Streak"
            value={`${metrics.activeStreak} Days`}
            trend={14.2}
            icon={Flame}
            iconColor={theme.primary}
            style={{ marginRight: 8 }}
          />
          <StatCard
            title="Total Focus"
            value={`${metrics.focusMinutes}m`}
            subtitle="Today's deep work"
            icon={Clock}
            iconColor={theme.secondary}
            style={{ marginLeft: 8 }}
          />
        </View>

        {/* Today's Tasks */}
        <View style={styles.checklistSection}>
          <View style={styles.checklistHeader}>
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
              Today's Tasks
            </Text>
            <TouchableOpacity
              onPress={handleOpenAddModal}
              style={[
                styles.addButton,
                { backgroundColor: theme.primary },
              ]}
            >
              <Plus size={14} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>
          </View>

          {goals.map((goal) => {
            const priorityColor = getPriorityAccentColor(goal.priority);
            const categoryTagStyle = getCylindricalTagStyle(goal.category);
            return (
              <TouchableOpacity
                key={goal.id}
                onPress={() => handleOpenEditModal(goal)}
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
                      onPress={() => dispatch(toggleGoalCompletion(goal.id))}
                      style={styles.checkTouch}
                    >
                      {goal.completed ? (
                        <CheckCircle2 size={22} color={theme.primary} />
                      ) : (
                        <Circle size={22} color={theme.textMuted} />
                      )}
                    </TouchableOpacity>

                    <Text
                      style={[
                        styles.taskTitleText,
                        {
                          color: goal.completed
                            ? theme.textMuted
                            : theme.textPrimary,
                          textDecorationLine: goal.completed
                            ? 'line-through'
                            : 'none',
                        },
                      ]}
                      numberOfLines={1}
                    >
                      {goal.title}
                    </Text>
                  </View>

                  {/* Row 2: Metadata Bar (Timestamp + Category Tag) */}
                  <View style={styles.rowMeta}>
                    <View style={styles.timeWrapper}>
                      <Clock size={12} color={theme.textMuted} />
                      <Text style={[styles.timeText, { color: theme.textMuted }]}>
                        {goal.timestamp || '02:00 PM'}
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
                        {goal.category}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
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
  priorityCardContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sunsetCard: {
    backgroundColor: '#f97316',
    padding: 18,
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  priorityHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  priorityHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  priorityContentBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 14,
  },
  priorityDateText: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  priorityItemTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  focusSessionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  focusSessionText: {
    fontSize: 15,
    fontWeight: '700',
  },
  playIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCard: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  metricsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricBorderHorizontal: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  metricValue: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  checklistSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  checklistHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 4,
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
});
