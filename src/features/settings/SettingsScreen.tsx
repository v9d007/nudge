import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sun, Moon, Monitor, Shield, Bell, Database, ChevronRight, User } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setThemeMode } from '../../store/themeSlice';
import { ThemeMode } from '../../types';
import { darkStitchTheme, lightStitchTheme } from '../../theme/colors';

export const SettingsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentMode = useAppSelector((state) => state.theme.mode);
  const effectiveTheme = useAppSelector((state) => state.theme.effectiveTheme);
  const theme = effectiveTheme === 'dark' ? darkStitchTheme : lightStitchTheme;
  const insets = useSafeAreaInsets();

  const themeOptions: { label: string; mode: ThemeMode; icon: any }[] = [
    { label: 'Light', mode: 'light', icon: Sun },
    { label: 'Dark', mode: 'dark', icon: Moon },
    { label: 'System', mode: 'system', icon: Monitor },
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
            Settings & Theme
          </Text>
          <Text style={[styles.pageSubtitle, { color: theme.textMuted }]}>
            Customize app appearance and backend preferences
          </Text>
        </View>

        {/* Theme Mode Selector Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.surfaceContainer,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
            Appearance Theme
          </Text>

          <View style={styles.themeOptionsRow}>
            {themeOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = currentMode === opt.mode;
              return (
                <TouchableOpacity
                  key={opt.mode}
                  onPress={() => dispatch(setThemeMode(opt.mode))}
                  style={[
                    styles.themeBtn,
                    {
                      borderColor: isSelected
                        ? theme.primary
                        : theme.cardBorder,
                      backgroundColor: isSelected
                        ? `${theme.primary}20`
                        : 'transparent',
                    },
                  ]}
                >
                  <Icon
                    size={20}
                    color={isSelected ? theme.primaryLight : theme.textMuted}
                  />
                  <Text
                    style={[
                      styles.themeBtnText,
                      {
                        color: isSelected
                          ? theme.primaryLight
                          : theme.textMuted,
                        fontWeight: isSelected ? '700' : '500',
                      },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Backend & Data Layer Settings */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.surfaceContainer,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
            Backend & Services Layer
          </Text>

          <View style={styles.serviceRow}>
            <View style={styles.serviceLeft}>
              <Database size={18} color={theme.primaryLight} />
              <View style={styles.serviceTextContainer}>
                <Text
                  style={[styles.serviceTitle, { color: theme.textPrimary }]}
                >
                  API Service Mode
                </Text>
                <Text
                  style={[styles.serviceSubtitle, { color: theme.textMuted }]}
                >
                  REST / GraphQL / Firebase Ready
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.activeBadge,
                { backgroundColor: `${theme.secondary}20` },
              ]}
            >
              <Text style={[styles.activeText, { color: theme.secondary }]}>
                Mock Mode Active
              </Text>
            </View>
          </View>
        </View>

        {/* Preferences List */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.surfaceContainer,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
            Preferences & Security
          </Text>

          <TouchableOpacity
            style={[
              styles.prefItem,
              { borderBottomColor: theme.cardBorder },
            ]}
          >
            <View style={styles.prefLeft}>
              <Bell size={18} color={theme.textMuted} />
              <Text style={[styles.prefTitle, { color: theme.textPrimary }]}>
                Push Notifications & Reminders
              </Text>
            </View>
            <ChevronRight size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.prefItem,
              { borderBottomColor: theme.cardBorder },
            ]}
          >
            <View style={styles.prefLeft}>
              <Shield size={18} color={theme.textMuted} />
              <Text style={[styles.prefTitle, { color: theme.textPrimary }]}>
                Privacy & Data Controls
              </Text>
            </View>
            <ChevronRight size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.prefItemLast}>
            <View style={styles.prefLeft}>
              <User size={18} color={theme.textMuted} />
              <Text style={[styles.prefTitle, { color: theme.textPrimary }]}>
                Profile Information
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
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  themeOptionsRow: {
    flexDirection: 'row',
  },
  themeBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  themeBtnText: {
    marginTop: 6,
    fontSize: 12,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  serviceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceTextContainer: {
    marginLeft: 12,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  serviceSubtitle: {
    fontSize: 11,
  },
  activeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  activeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  prefItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  prefItemLast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  prefLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
  },
});
