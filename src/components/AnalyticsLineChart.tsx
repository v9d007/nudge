import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Line, Defs, LinearGradient, Stop } from 'react-native-svg';
import { AnalyticsDataPoint } from '../types';
import { useAppSelector } from '../store/store';
import { darkStitchTheme, lightStitchTheme } from '../theme/colors';

interface AnalyticsLineChartProps {
  data: AnalyticsDataPoint[];
  height?: number;
  lineColor?: string;
}

export const AnalyticsLineChart: React.FC<AnalyticsLineChartProps> = ({
  data,
  height = 210,
  lineColor = '#7c3aed',
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(data.length - 1);
  const effectiveTheme = useAppSelector((state) => state.theme.effectiveTheme);
  const theme = effectiveTheme === 'dark' ? darkStitchTheme : lightStitchTheme;

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 64;
  const paddingBottom = 30;
  const paddingTop = 20;
  const usableHeight = height - paddingBottom - paddingTop;

  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value), 10);

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1 || 1)) * (chartWidth - 30) + 15;
    const y = height - paddingBottom - (item.value / maxValue) * usableHeight;
    return { x, y, item };
  });

  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const cp1x = curr.x + (next.x - curr.x) / 2;
    const cp1y = curr.y;
    const cp2x = curr.x + (next.x - curr.x) / 2;
    const cp2y = next.y;
    pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }

  const fillPathD = `${pathD} L ${points[points.length - 1].x} ${
    height - paddingBottom
  } L ${points[0].x} ${height - paddingBottom} Z`;

  const selectedPoint = selectedIndex !== null ? points[selectedIndex] : null;

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
      {selectedPoint && (
        <View style={styles.selectedRow}>
          <View>
            <Text style={[styles.selectedDate, { color: theme.textMuted }]}>
              {selectedPoint.item.date}
            </Text>
            <Text style={[styles.selectedValue, { color: theme.textPrimary }]}>
              {selectedPoint.item.value} Nudges Completed
            </Text>
          </View>

          <View style={[styles.pillBadge, { backgroundColor: `${theme.primary}20` }]}>
            <Text style={[styles.pillText, { color: theme.primaryLight }]}>
              {selectedPoint.item.label}
            </Text>
          </View>
        </View>
      )}

      <Svg height={height} width={chartWidth}>
        <Defs>
          <LinearGradient id="stitchChartFill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={lineColor} stopOpacity="0.4" />
            <Stop offset="100%" stopColor={lineColor} stopOpacity="0.0" />
          </LinearGradient>
        </Defs>

        {[0, 0.33, 0.66, 1].map((ratio, idx) => (
          <Line
            key={idx}
            x1="0"
            y1={paddingTop + ratio * usableHeight}
            x2={chartWidth}
            y2={paddingTop + ratio * usableHeight}
            stroke={theme.chartGrid}
            strokeDasharray="4 4"
            strokeWidth="1"
          />
        ))}

        <Path d={fillPathD} fill="url(#stitchChartFill)" />

        <Path
          d={pathD}
          fill="none"
          stroke={lineColor}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {points.map((pt, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <React.Fragment key={idx}>
              <Circle
                cx={pt.x}
                cy={pt.y}
                r={isSelected ? '6' : '4'}
                fill={isSelected ? lineColor : theme.surfaceContainer}
                stroke={lineColor}
                strokeWidth="2.5"
                onPress={() => setSelectedIndex(idx)}
              />
            </React.Fragment>
          );
        })}
      </Svg>

      <View style={styles.labelsRow}>
        {data.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => setSelectedIndex(idx)}
            style={styles.labelButton}
          >
            <Text
              style={[
                styles.labelText,
                {
                  color:
                    selectedIndex === idx
                      ? theme.textPrimary
                      : theme.textMuted,
                  fontWeight: selectedIndex === idx ? '700' : '500',
                },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  selectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  selectedDate: {
    fontSize: 12,
  },
  selectedValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  pillBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 4,
  },
  labelButton: {
    alignItems: 'center',
  },
  labelText: {
    fontSize: 12,
  },
});
