import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { X, Clock, Tag, Flag, Trash2, Check } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addNewTask, editTask, deleteTask } from '../store/dashboardSlice';
import { TaskItem, TaskPriority, TaskCategory } from '../types';
import { darkStitchTheme, lightStitchTheme } from '../theme/colors';

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  taskToEdit?: TaskItem | null;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  visible,
  onClose,
  taskToEdit,
}) => {
  const dispatch = useAppDispatch();
  const effectiveTheme = useAppSelector((state) => state.theme.effectiveTheme);
  const theme = effectiveTheme === 'dark' ? darkStitchTheme : lightStitchTheme;

  const [title, setTitle] = useState('');
  const [timestamp, setTimestamp] = useState('02:00 PM');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [category, setCategory] = useState<TaskCategory>('design');

  const categories: { label: string; value: TaskCategory; color: string }[] = [
    { label: 'Design', value: 'design', color: '#fd56a7' },
    { label: 'Product', value: 'product', color: '#f97316' },
    { label: 'Engineering', value: 'engineering', color: '#7c3aed' },
    { label: 'Health', value: 'health', color: '#10b981' },
    { label: 'Learning', value: 'learning', color: '#f9bd22' },
  ];

  const priorities: { label: string; value: TaskPriority; color: string }[] = [
    { label: 'High', value: 'high', color: '#fd56a7' },
    { label: 'Medium', value: 'medium', color: '#f97316' },
    { label: 'Low', value: 'low', color: '#795900' },
  ];

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setTimestamp(taskToEdit.timestamp || '02:00 PM');
      setPriority(taskToEdit.priority);
      setCategory(taskToEdit.category);
    } else {
      setTitle('');
      setTimestamp('02:00 PM');
      setPriority('medium');
      setCategory('design');
    }
  }, [taskToEdit, visible]);

  const handleSave = () => {
    if (title.trim().length === 0) return;

    if (taskToEdit) {
      dispatch(
        editTask({
          id: taskToEdit.id,
          title: title.trim(),
          timestamp: timestamp.trim() || '02:00 PM',
          priority,
          category,
        })
      );
    } else {
      dispatch(
        addNewTask({
          title: title.trim(),
          timestamp: timestamp.trim() || '02:00 PM',
          priority,
          category,
        })
      );
    }
    onClose();
  };

  const handleDelete = () => {
    if (taskToEdit) {
      dispatch(deleteTask(taskToEdit.id));
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: theme.surfaceContainer,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <View style={styles.headerRow}>
            <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
              {taskToEdit ? 'Edit Task' : 'Add New Task'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={theme.textMuted} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Task Title Input */}
            <Text style={[styles.fieldLabel, { color: theme.textMuted }]}>
              Task Title
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Review Design System & Tokens..."
              placeholderTextColor={theme.textMuted}
              style={[
                styles.textInput,
                {
                  color: theme.textPrimary,
                  backgroundColor: theme.background,
                  borderColor: theme.cardBorder,
                },
              ]}
            />

            {/* Time / Scheduled Stamp */}
            <Text style={[styles.fieldLabel, { color: theme.textMuted }]}>
              Scheduled Time
            </Text>
            <View
              style={[
                styles.timeInputContainer,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Clock size={16} color={theme.textMuted} style={styles.fieldIcon} />
              <TextInput
                value={timestamp}
                onChangeText={setTimestamp}
                placeholder="e.g. 02:00 PM"
                placeholderTextColor={theme.textMuted}
                style={[styles.timeInput, { color: theme.textPrimary }]}
              />
            </View>

            {/* Priority Selector */}
            <Text style={[styles.fieldLabel, { color: theme.textMuted }]}>
              Priority Level
            </Text>
            <View style={styles.pillRow}>
              {priorities.map((p) => {
                const isSelected = priority === p.value;
                return (
                  <TouchableOpacity
                    key={p.value}
                    onPress={() => setPriority(p.value)}
                    style={[
                      styles.pillBtn,
                      {
                        backgroundColor: isSelected
                          ? p.color
                          : `${p.color}20`,
                      },
                    ]}
                  >
                    <Flag
                      size={14}
                      color={isSelected ? '#FFFFFF' : p.color}
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={[
                        styles.pillText,
                        { color: isSelected ? '#FFFFFF' : p.color },
                      ]}
                    >
                      {p.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Category Tag Selector */}
            <Text style={[styles.fieldLabel, { color: theme.textMuted }]}>
              Category Tag
            </Text>
            <View style={styles.pillRow}>
              {categories.map((c) => {
                const isSelected = category === c.value;
                return (
                  <TouchableOpacity
                    key={c.value}
                    onPress={() => setCategory(c.value)}
                    style={[
                      styles.pillBtn,
                      {
                        backgroundColor: isSelected
                          ? c.color
                          : `${c.color}20`,
                      },
                    ]}
                  >
                    <Tag
                      size={14}
                      color={isSelected ? '#FFFFFF' : c.color}
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={[
                        styles.pillText,
                        { color: isSelected ? '#FFFFFF' : c.color },
                      ]}
                    >
                      {c.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Modal Actions */}
            <View style={styles.actionButtonsRow}>
              {taskToEdit && (
                <TouchableOpacity
                  onPress={handleDelete}
                  style={[styles.deleteBtn, { backgroundColor: `${theme.error}20` }]}
                >
                  <Trash2 size={18} color={theme.error} />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={onClose}
                style={[styles.cancelBtn, { borderColor: theme.cardBorder }]}
              >
                <Text style={{ color: theme.textMuted, fontWeight: '600' }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSave}
                style={[styles.saveBtn, { backgroundColor: theme.primary }]}
              >
                <Check size={18} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>
                  {taskToEdit ? 'Save Changes' : 'Create Task'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    padding: 20,
    maxHeight: '85%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  closeBtn: {
    padding: 4,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
    marginTop: 10,
  },
  textInput: {
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    fontSize: 14,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  fieldIcon: {
    marginRight: 8,
  },
  timeInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  pillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9999,
    marginRight: 8,
    marginBottom: 8,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 10,
  },
  deleteBtn: {
    padding: 12,
    borderRadius: 14,
    marginRight: 'auto',
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginRight: 8,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },
});
