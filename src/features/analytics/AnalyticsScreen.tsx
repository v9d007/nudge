import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarChart3, CheckCircle, Zap } from 'lucide-react-native';
import { AnalyticsLineChart } from '../../components/AnalyticsLineChart';
import { BreakdownBarChart } from '../../components/BreakdownBarChart';
import { StatCard } from '../../components/StatCard';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setTimeframe } from '../../store/analyticsSlice';
import { AnalyticsTimeframe } from '../../types';
import { darkStitchTheme, lightStitchTheme } from '../../theme/colors';

export const AnalyticsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const effectiveTheme = useAppSelector((state) => state.theme.effectiveTheme);
  const theme = effectiveTheme === 'dark' ? darkStitchTheme : lightStitchTheme;
  const insets = useSafeAreaInsets();

  const timeframe = useAppSelector((state) => state.analytics.timeframe);
  const trendData = useAppSelector((state) => state.analytics.trendData);
  const categoryBreakdown = useAppSelector((state) => state.analytics.categoryBreakdown);
  const totalNudges = useAppSelector((state) => state.analytics.totalNudgesThisMonth);
  const avgRate = useAppSelector((state) => state.analytics.avgCompletionRate);
  const peakHour = useAppSelector((state) => state.analytics.peakProductivityHour);

  const timeframes: { label: string; value: AnalyticsTimeframe }[] = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
      >
        <View style={styles.titleSection}>
          <Text style={[styles.pageTitle, { color: theme.textPrimary }]}>
            Analytics & Insights
          </Text>
          <Text style={[styles.pageSubtitle, { color: theme.textMuted }]}>
            Track performance trends and completion velocity
          </Text>
        </View>

        {/* Timeframe Selector Pills */}
        <View style={styles.timeframeContainer}>
          <View
            style={[
              styles.timeframeBox,
              {
                backgroundColor: theme.surfaceContainer,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            {timeframes.map((item) => {
              const isSelected = timeframe === item.value;
              return (
                <TouchableOpacity
                  key={item.value}
                  onPress={() => dispatch(setTimeframe(item.value))}
                  style={[
                    styles.timeframeBtn,
                    {
                      backgroundColor: isSelected
                        ? theme.primary
                        : 'transparent',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.timeframeText,
                      {
                        color: isSelected ? '#FFFFFF' : theme.textMuted,
                        fontWeight: isSelected ? '700' : '500',
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Interactive Line Chart */}
        <View style={styles.chartWrapper}>
          <AnalyticsLineChart data={trendData} lineColor={theme.primary} />
        </View>

        {/* Key Metrics Cards */}
        <View style={styles.statsRow}>
          <StatCard
            title="Total Nudges"
            value={totalNudges}
            trend={18.5}
            icon={BarChart3}
            iconColor={theme.primary}
            style={{ marginRight: 8 }}
          />
          <StatCard
            title="Avg Completion"
            value={`${avgRate}%`}
            trend={5.2}
            icon={CheckCircle}
            iconColor={theme.secondary}
            style={{ marginLeft: 8 }}
          />
        </View>

        {/* Peak Productivity Insight Card */}
        <View
          style={[
            styles.insightCard,
            {
              backgroundColor: theme.surfaceContainer,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <View style={styles.insightLeft}>
            <View
              style={[
                styles.insightIconBox,
                { backgroundColor: `${theme.tertiary}20` },
              ]}
            >
              <Zap size={22} color={theme.tertiary} />
            </View>
            <View>
              <Text
                style={[styles.insightLabel, { color: theme.textMuted }]}
              >
                Peak Productivity Window
              </Text>
              <Text
                style={[styles.insightValue, { color: theme.textPrimary }]}
              >
                {peakHour}
              </Text>
            </View>
          </View>
        </View>

        {/* Category Breakdown Bar Chart */}
        <View style={styles.chartWrapper}>
          <BreakdownBarChart categories={categoryBreakdown} />
        </View>
      </ScrollView>
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
  timeframeContainer: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  timeframeBox: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 16,
    borderWidth: 1,
  },
  timeframeBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  timeframeText: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
  chartWrapper: {
    paddingHorizontal: 16,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  insightCard: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  insightLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  insightIconBox: {
    padding: 12,
    borderRadius: 14,
    marginRight: 12,
  },
  insightLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  insightValue: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
});
