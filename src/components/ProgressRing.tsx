import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useAppSelector } from '../store/store';
import { darkStitchTheme, lightStitchTheme } from '../theme/colors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps {
  percentage: number;
  radius?: number;
  strokeWidth?: number;
  centerTitle?: string;
  centerSubtitle?: string;
  gradientColors?: [string, string];
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  radius = 90,
  strokeWidth = 16,
  centerTitle,
  centerSubtitle = 'Completed',
  gradientColors = ['#f97316', '#fd56a7'],
}) => {
  const effectiveTheme = useAppSelector((state) => state.theme.effectiveTheme);
  const theme = effectiveTheme === 'dark' ? darkStitchTheme : lightStitchTheme;

  const progress = useSharedValue(0);

  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  useEffect(() => {
    progress.value = withTiming(percentage / 100, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [percentage]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - progress.value * circumference;
    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={styles.container}>
      <Svg height={radius * 2} width={radius * 2} style={styles.svg}>
        <Defs>
          <LinearGradient id="sunsetRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={gradientColors[0]} />
            <Stop offset="100%" stopColor={gradientColors[1]} />
          </LinearGradient>
        </Defs>

        {/* Background Circle */}
        <Circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          stroke={theme.ringBackground}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Animated Sunset Circle */}
        <AnimatedCircle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          stroke="url(#sunsetRingGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
          fill="transparent"
        />
      </Svg>

      <View style={styles.centerOverlay}>
        <Text style={[styles.centerTitle, { color: theme.textPrimary }]}>
          {centerTitle || `${percentage}%`}
        </Text>
        {centerSubtitle ? (
          <Text style={[styles.centerSubtitle, { color: theme.textMuted }]}>
            {centerSubtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 12,
  },
  svg: {
    transform: [{ rotate: '-90deg' }],
  },
  centerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTitle: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  centerSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
