import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL =
  "https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos";

export const getTasks = createAsyncThunk("getTasks", async (object, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (error) {
    return rejectWithValue("Error obtaining tasks " + error);
  }
});

export const addTask = createAsyncThunk("addTask", async (task, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(API_URL, {
      label: task,
      checked: false,
    });
    return data;
  } catch (error) {
    return rejectWithValue("Error adding task " + error);
  }
});

export const updateTask = createAsyncThunk(
  "updateTask",
  async (data, { rejectWithValue }) => {
    const { todoId, isChecked } = data;
    try {
      await axios.patch(`${API_URL}/${todoId}`, {
        checked: !isChecked,
      });
      return todoId;
    } catch (error) {
      return rejectWithValue("Error updating task " + error);
    }
  }
);

export const deleteTask = createAsyncThunk("deleteTask", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue("Error deleting task " + error);
  }
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [getTasks.pending]: (state, action) => {
      state.loading = true;
    },
    [getTasks.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getTasks.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
      toast.error(payload)
    },
    [addTask.pending]: (state, action) => {
      state.loading = true;
    },
    [addTask.fulfilled]: (state, { payload }) => {
      state.data.push(payload);
    },
    [addTask.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
      toast.error(payload)
    },
    [updateTask.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTask.fulfilled]: (state, { payload }) => {
      state.data = state.data.map((task) =>
        task.id === payload ? { ...task, checked: !task.checked } : task
      );
    },
    [updateTask.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
      toast.error(payload)
    },
    [deleteTask.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTask.fulfilled]: (state, { payload }) => {
      state.data = state.data.filter((task) => task.id !== payload);
    },
    [deleteTask.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
      toast.error(payload)
    },
  },
});

export default tasksSlice;