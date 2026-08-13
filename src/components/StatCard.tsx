import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react-native';
import { useAppSelector } from '../store/store';
import { darkStitchTheme, lightStitchTheme } from '../theme/colors';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  icon: LucideIcon;
  iconColor?: string;
  style?: object;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  iconColor,
  style,
}) => {
  const effectiveTheme = useAppSelector((state) => state.theme.effectiveTheme);
  const theme = effectiveTheme === 'dark' ? darkStitchTheme : lightStitchTheme;

  const isPositiveTrend = trend !== undefined && trend >= 0;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surfaceContainer,
          borderColor: theme.cardBorder,
        },
        style,
      ]}
    >
      <View style={styles.headerRow}>
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: `${iconColor || theme.primary}20` },
          ]}
        >
          <Icon size={20} color={iconColor || theme.primaryLight} />
        </View>

        {trend !== undefined && (
          <View
            style={[
              styles.trendBadge,
              {
                backgroundColor: isPositiveTrend
                  ? `${theme.secondary}20`
                  : `${theme.error}20`,
              },
            ]}
          >
            {isPositiveTrend ? (
              <TrendingUp size={12} color={theme.secondary} />
            ) : (
              <TrendingDown size={12} color={theme.error} />
            )}
            <Text
              style={[
                styles.trendText,
                { color: isPositiveTrend ? theme.secondary : theme.error },
              ]}
            >
              {isPositiveTrend ? `+${trend}%` : `${trend}%`}
            </Text>
          </View>
        )}
      </View>

      <Text style={[styles.title, { color: theme.textMuted }]}>{title}</Text>
      <Text style={[styles.value, { color: theme.textPrimary }]}>{value}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 14,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  title: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 4,
  },
});
