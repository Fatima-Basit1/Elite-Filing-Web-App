import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Modal states
  modals: {
    createFile: false,
    editFile: false,
    deleteFile: false,
    userProfile: false,
  },
  // Notification system
  notifications: [],
  // Global loading states
  globalLoading: false,
  // Sidebar state
  sidebarOpen: true,
  // Theme
  theme: 'light',
  // Mobile menu
  mobileMenuOpen: false,
};

let notificationId = 0;

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Modal actions
    openModal: (state, action) => {
      const modalName = action.payload;
      if (state.modals.hasOwnProperty(modalName)) {
        state.modals[modalName] = true;
      }
    },
    closeModal: (state, action) => {
      const modalName = action.payload;
      if (state.modals.hasOwnProperty(modalName)) {
        state.modals[modalName] = false;
      }
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(modal => {
        state.modals[modal] = false;
      });
    },
    
    // Notification actions
    addNotification: {
      reducer: (state, action) => {
        state.notifications.push(action.payload);
      },
      prepare: ({ type, title, message, duration = 5000 }) => {
        return {
          payload: {
            id: ++notificationId,
            type, // 'success', 'error', 'warning', 'info'
            title,
            message,
            duration,
            timestamp: Date.now(),
          },
        };
      },
    },
    removeNotification: (state, action) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.filter(
        notification => notification.id !== notificationId
      );
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    
    // Global loading
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    
    // Sidebar
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    
    // Theme
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    
    // Mobile menu
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  closeAllModals,
  addNotification,
  removeNotification,
  clearAllNotifications,
  setGlobalLoading,
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  toggleTheme,
  toggleMobileMenu,
  setMobileMenuOpen,
} = uiSlice.actions;

// Selectors
export const selectModals = (state) => state.ui.modals;
export const selectNotifications = (state) => state.ui.notifications;
export const selectGlobalLoading = (state) => state.ui.globalLoading;
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectTheme = (state) => state.ui.theme;
export const selectMobileMenuOpen = (state) => state.ui.mobileMenuOpen;

export default uiSlice.reducer;