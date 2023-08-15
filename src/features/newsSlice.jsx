import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  news: [],
  loading: false,
  error: false,
}

export const getNews = createAsyncThunk(
  "getNewsFunc", 
  
  async () => {
    const API_KEY = "760864dade7247118c0f1a8815db4c16"
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`

    const { data } = await axios(url)
    console.log(data)
    return data.articles
  }
)

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNews: (state) => {
      state.news = []
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.loading = true
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.news = action.payload
        state.loading = false
      })
      .addCase(getNews.rejected, (state) => {
        state.error = true
        state.loading = false
      })
  },
})

export const { clearNews } = newsSlice.actions

export default newsSlice.reducer
