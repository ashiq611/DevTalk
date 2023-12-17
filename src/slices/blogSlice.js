// src/features/blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../firebase.confiq";

export const fetchAllBlogs = createAsyncThunk(
  "blog/fetchAllBlogs",
  async () => {
    try {
      const q = query(collection(fireDB, "blogPost"), orderBy("time"));
      const snapshot = await onSnapshot(q);

      if (!snapshot.docs) {
        console.error("No documents found in the snapshot");
        return [];
      }

      const blogArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(blogArray);
      return blogArray;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return []; // Return an empty array in case of an error
    }
  }
);


const blogSlice = createSlice({
  name: "blog",
  initialState: {
    searchkey: "",
    loading: false,
    allBlogs: [],
  },
  reducers: {
    setSearchkey: (state, action) => {
      state.searchkey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.allBlogs = action.payload;
      })
      .addCase(fetchAllBlogs.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSearchkey } = blogSlice.actions;
export default blogSlice.reducer;
