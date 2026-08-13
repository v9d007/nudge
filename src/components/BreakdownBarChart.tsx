import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CategoryBreakdown } from '../types';
import { useAppSelector } from '../store/store';
import { darkStitchTheme, lightStitchTheme } from '../theme/colors';

interface BreakdownBarChartProps {
  categories: CategoryBreakdown[];
}

export const BreakdownBarChart: React.FC<BreakdownBarChartProps> = ({ categories }) => {
  const effectiveTheme = useAppSelector((state) => state.theme.effectiveTheme);
  const theme = effectiveTheme === 'dark' ? darkStitchTheme : lightStitchTheme;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surfaceContainer,
          borderColor: theme.cardBorder,
        },
      ]}
    >
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        Category Distribution
      </Text>

      {categories.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={styles.labelRow}>
            <View style={styles.categoryLeft}>
              <View
                style={[styles.colorDot, { backgroundColor: item.color }]}
              />
              <Text style={[styles.categoryName, { color: theme.textPrimary }]}>
                {item.category}
              </Text>
            </View>
            <Text style={[styles.categoryMeta, { color: theme.textMuted }]}>
              {item.count} Nudges ({item.percentage}%)
            </Text>
          </View>

          <View
            style={[styles.track, { backgroundColor: theme.ringBackground }]}
          >
            <View
              style={[
                styles.fillBar,
                {
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 14,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '600',
  },
  categoryMeta: {
    fontSize: 12,
    fontWeight: '500',
  },
  track: {
    width: '100%',
    height: 10,
    borderRadius: 9999,
    overflow: 'hidden',
  },
  fillBar: {
    height: '100%',
    borderRadius: 9999,
  },
});
