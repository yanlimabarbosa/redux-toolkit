import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import cartItems from "../../cartItems"
import axios from "axios"
import { openModal } from "../modal/modalSlice"

const url = "https://www.course-api.com/react-useReducer-cart-project"

const initialState = {
  cartItems: [],
  amount: 2,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      // 1st parameter: recieving value from component:
      console.log(name)

      // 2nd parameter: ThunkApi
      console.log(thunkAPI)
      // with thunk api we can do things such as accesing state
      // from all the application
      // example:
      console.log(thunkAPI.getState())

      // we also can dispatch anything, things that aren't even on
      // the actual slice, for example:
      thunkAPI.dispatch(openModal())

      const response = await axios.get(url)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong")
    }
  }
)

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
        // see reject value from thunk API on action payload:
        console.log(action)
        state.isLoading = false
      })
  },
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions

export default cartSlice.reducer
