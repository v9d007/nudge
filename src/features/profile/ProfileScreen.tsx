import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Award, Flame, Zap, Clock, Shield, LogOut, ChevronRight, UserCheck, Star } from 'lucide-react-native';
import { useAppSelector } from '../../store/store';
import { darkStitchTheme, lightStitchTheme } from '../../theme/colors';

export const ProfileScreen: React.FC = () => {
  const effectiveTheme = useAppSelector((state) => state.theme.effectiveTheme);
  const theme = effectiveTheme === 'dark' ? darkStitchTheme : lightStitchTheme;
  const insets = useSafeAreaInsets();

  const user = useAppSelector((state) => state.dashboard.user);
  const metrics = useAppSelector((state) => state.dashboard.metrics);

  const achievements = [
    { id: '1', title: '14-Day Streak', icon: '🔥', desc: 'Consistent daily completion', color: theme.tertiary },
    { id: '2', title: 'Focus Master', icon: '🧘‍♂️', desc: 'Over 150 mins deep work', color: theme.primaryLight },
    { id: '3', title: 'Early Riser', icon: '🌅', desc: 'First nudge done before 8 AM', color: theme.secondary },
    { id: '4', title: 'Nudge Legend', icon: '⚡', desc: 'Level 7 unlocked', color: '#EC4899' },
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
            User Profile
          </Text>
          <Text style={[styles.pageSubtitle, { color: theme.textMuted }]}>
            Personal statistics, level progress & achievements
          </Text>
        </View>

        {/* Profile Info & XP Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.surfaceContainer,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: user.avatarUrl }}
              style={[styles.avatar, { borderColor: theme.primary }]}
            />
            <View style={styles.profileTextContainer}>
              <Text style={[styles.userName, { color: theme.textPrimary }]}>
                {user.name}
              </Text>
              <Text style={[styles.userEmail, { color: theme.textMuted }]}>
                alex.rivera@nudge.app
              </Text>
              <View
                style={[
                  styles.levelBadge,
                  { backgroundColor: `${theme.tertiary}20` },
                ]}
              >
                <Zap size={14} color={theme.tertiary} />
                <Text style={[styles.levelText, { color: theme.tertiary }]}>
                  Level {user.level} Productive Member
                </Text>
              </View>
            </View>
          </View>

          {/* XP Progress Track */}
          <View style={styles.xpSection}>
            <View style={styles.xpHeader}>
              <Text style={[styles.xpTitle, { color: theme.textSecondary }]}>
                Level {user.level} Progress
              </Text>
              <Text style={[styles.xpValue, { color: theme.primaryLight }]}>
                {user.xpPoints} / 5,000 XP
              </Text>
            </View>
            <View
              style={[styles.xpTrack, { backgroundColor: theme.ringBackground }]}
            >
              <View
                style={[
                  styles.xpFill,
                  {
                    width: `${(user.xpPoints / 5000) * 100}%`,
                    backgroundColor: theme.primary,
                  },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Lifetime Stats Overview */}
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
            <View style={[styles.iconBox, { backgroundColor: `${theme.primary}20` }]}>
              <Award size={18} color={theme.primaryLight} />
            </View>
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>
              {metrics.completedNudgesCount * 31}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>
              Total Done
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
            <View style={[styles.iconBox, { backgroundColor: `${theme.tertiary}20` }]}>
              <Flame size={18} color={theme.tertiary} />
            </View>
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>
              {metrics.activeStreak} Days
            </Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>
              Best Streak
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
            <View style={[styles.iconBox, { backgroundColor: `${theme.secondary}20` }]}>
              <Clock size={18} color={theme.secondary} />
            </View>
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>
              {Math.round(metrics.focusMinutes * 24 / 60)} hrs
            </Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>
              Focus Hours
            </Text>
          </View>
        </View>

        {/* Achievements Grid */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.surfaceContainer,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <View style={styles.sectionHeaderRow}>
            <Star size={18} color={theme.tertiary} />
            <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
              Unlocked Achievements
            </Text>
          </View>

          <View style={styles.achievementsGrid}>
            {achievements.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.achievementItem,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.cardBorder,
                  },
                ]}
              >
                <Text style={styles.achievementIcon}>{item.icon}</Text>
                <View style={styles.achievementTextContainer}>
                  <Text
                    style={[styles.achievementTitle, { color: theme.textPrimary }]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[styles.achievementDesc, { color: theme.textMuted }]}
                  >
                    {item.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Profile Action Items */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.surfaceContainer,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.actionItem,
              { borderBottomColor: theme.cardBorder },
            ]}
          >
            <View style={styles.actionLeft}>
              <UserCheck size={18} color={theme.textMuted} />
              <Text style={[styles.actionTitle, { color: theme.textPrimary }]}>
                Edit Account Information
              </Text>
            </View>
            <ChevronRight size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionItem,
              { borderBottomColor: theme.cardBorder },
            ]}
          >
            <View style={styles.actionLeft}>
              <Shield size={18} color={theme.textMuted} />
              <Text style={[styles.actionTitle, { color: theme.textPrimary }]}>
                Security & Authentication
              </Text>
            </View>
            <ChevronRight size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItemLast}>
            <View style={styles.actionLeft}>
              <LogOut size={18} color={theme.error} />
              <Text style={[styles.actionTitle, { color: theme.error }]}>
                Log Out
              </Text>
            </View>
            <ChevronRight size={18} color={theme.textMuted} />
          </TouchableOpacity>
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
  card: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    marginRight: 14,
  },
  profileTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  userEmail: {
    fontSize: 12,
    marginTop: 1,
    marginBottom: 6,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  levelText: {
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },
  xpSection: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#4a445520',
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  xpTitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  xpValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  xpTrack: {
    width: '100%',
    height: 10,
    borderRadius: 9999,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    borderRadius: 9999,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  miniStatCard: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  iconBox: {
    padding: 8,
    borderRadius: 10,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
  },
  achievementIcon: {
    fontSize: 22,
    marginRight: 8,
  },
  achievementTextContainer: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  achievementDesc: {
    fontSize: 10,
    marginTop: 1,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  actionItemLast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
  },
});
