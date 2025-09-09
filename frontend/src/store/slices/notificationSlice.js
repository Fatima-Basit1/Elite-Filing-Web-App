import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: []
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const notification = {
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        ...action.payload
      };
      state.notifications.unshift(notification);
      
      // Keep only the last 50 notifications
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50);
      }
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find(
        notification => notification.id === action.payload
      );
      if (notification) {
        notification.read = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    }
  }
});

export const {
  addNotification,
  removeNotification,
  clearNotifications,
  markAsRead,
  markAllAsRead
} = notificationSlice.actions;

export default notificationSlice.reducer;

// Selectors
export const selectNotifications = (state) => state.notifications.notifications;
export const selectUnreadNotifications = (state) => 
  state.notifications.notifications.filter(notification => !notification.read);
export const selectNotificationCount = (state) => state.notifications.notifications.length;
export const selectUnreadCount = (state) => 
  state.notifications.notifications.filter(notification => !notification.read).length;