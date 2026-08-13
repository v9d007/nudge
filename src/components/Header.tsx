import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Sun, Moon, Zap } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../store/store';
import { toggleTheme } from '../store/themeSlice';
import { darkStitchTheme, lightStitchTheme } from '../theme/colors';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const dispatch = useAppDispatch();
  const effectiveTheme = useAppSelector((state) => state.theme.effectiveTheme);
  const user = useAppSelector((state) => state.dashboard.user);
  const theme = effectiveTheme === 'dark' ? darkStitchTheme : lightStitchTheme;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.userRow}>
        <Image
          source={{ uri: user.avatarUrl }}
          style={[styles.avatar, { borderColor: theme.primary }]}
        />
        <View style={styles.userTextContainer}>
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>
            {subtitle || 'Welcome Back'}
          </Text>
          <Text
            style={[styles.title, { color: theme.textPrimary }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title || `Hello, ${user.name}`}
          </Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <View
          style={[
            styles.levelBadge,
            { backgroundColor: `${theme.tertiary}20` },
          ]}
        >
          <Zap size={14} color={theme.tertiary} />
          <Text style={[styles.levelText, { color: theme.tertiary }]}>
            Lvl {user.level}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => dispatch(toggleTheme())}
          style={[
            styles.themeButton,
            {
              backgroundColor: theme.surfaceContainer,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          {effectiveTheme === 'dark' ? (
            <Sun size={20} color={theme.tertiary} />
          ) : (
            <Moon size={20} color={theme.primary} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    marginRight: 12,
  },
  userTextContainer: {
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
    flexShrink: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    marginRight: 8,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  themeButton: {
    padding: 10,
    borderRadius: 9999,
    borderWidth: 1,
  },
});
