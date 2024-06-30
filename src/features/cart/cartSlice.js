import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import cartItems from "../../cartItems"
import axios from "axios"

const url = "https://www.course-api.com/react-useReducer-cart-project"

const initialState = {
  cartItems: [],
  amount: 2,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {}
})

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => {
        return item.id !== itemId
      })
    },
    increase: (state, action) => {
      const itemId = action.payload
      const cartItem = state.cartItems.find((item) => item.id === itemId)
      cartItem.amount += 1
    },
    decrease: (state, action) => {
      const itemId = action.payload
      const cartItem = state.cartItems.find((item) => item.id === itemId)
      cartItem.amount = cartItem.amount - 1
    },
    calculateTotals: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount = item.amount + amount
        total = total + item.amount * item.price
      })
      state.amount = amount
      state.total = total.toFixed(2)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false
        state.cartItems = action.payload
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action)
        state.isLoading = false
      })
  },
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions

export default cartSlice.reducer
