import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const fetchFiles = createAsyncThunk(
  'files/fetchFiles',
  async ({ page = 1, limit = 10, search = '', category = '' }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(category && { category }),
      });
      
      const response = await api.get(`/files?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch files'
      );
    }
  }
);

export const createFile = createAsyncThunk(
  'files/createFile',
  async (fileData, { rejectWithValue }) => {
    try {
      const response = await api.post('/files', fileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create file'
      );
    }
  }
);

export const updateFile = createAsyncThunk(
  'files/updateFile',
  async ({ id, ...fileData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/files/${id}`, fileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update file'
      );
    }
  }
);

export const deleteFile = createAsyncThunk(
  'files/deleteFile',
  async (fileId, { rejectWithValue }) => {
    try {
      await api.delete(`/files/${fileId}`);
      return fileId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete file'
      );
    }
  }
);

export const fetchFileById = createAsyncThunk(
  'files/fetchFileById',
  async (fileId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/files/${fileId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch file'
      );
    }
  }
);

export const downloadFile = createAsyncThunk(
  'files/downloadFile',
  async (fileId, { rejectWithValue }) => {
    try {
      // For now, just simulate download - in real app this would trigger actual download
      const response = await api.get(`/files/${fileId}/download`, {
        responseType: 'blob'
      });
      return { fileId, success: true };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to download file'
      );
    }
  }
);

const initialState = {
  files: [],
  currentFile: null,
  totalPages: 0,
  currentPage: 1,
  total: 0,
  loading: false,
  error: null,
  filters: {
    search: '',
    category: '',
  },
};

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        category: '',
      };
    },
    setCurrentFile: (state, action) => {
      state.currentFile = action.payload;
    },
    clearCurrentFile: (state) => {
      state.currentFile = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Files
      .addCase(fetchFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload.files;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.total = action.payload.total;
        state.error = null;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create File
      .addCase(createFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFile.fulfilled, (state, action) => {
        state.loading = false;
        state.files.unshift(action.payload);
        state.total += 1;
        state.error = null;
      })
      .addCase(createFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update File
      .addCase(updateFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFile.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.files.findIndex(file => file._id === action.payload._id);
        if (index !== -1) {
          state.files[index] = action.payload;
        }
        if (state.currentFile && state.currentFile._id === action.payload._id) {
          state.currentFile = action.payload;
        }
        state.error = null;
      })
      .addCase(updateFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete File
      .addCase(deleteFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.loading = false;
        state.files = state.files.filter(file => file._id !== action.payload);
        state.total -= 1;
        if (state.currentFile && state.currentFile._id === action.payload) {
          state.currentFile = null;
        }
        state.error = null;
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch File by ID
      .addCase(fetchFileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFileById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFile = action.payload;
        state.error = null;
      })
      .addCase(fetchFileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Download File
      .addCase(downloadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  setFilters,
  clearFilters,
  setCurrentFile,
  clearCurrentFile,
  setLoading,
} = fileSlice.actions;

export default fileSlice.reducer;