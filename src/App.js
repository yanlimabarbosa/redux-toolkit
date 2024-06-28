import { useDispatch, useSelector } from "react-redux"
import CartContainer from "./components/CartContainer"
import Navbar from "./components/Navbar"
import { useEffect } from "react"
import { calculateTotals } from "./features/cart/cartSlice"

function App() {
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  return (
    <h2>
      <Navbar />
      <CartContainer />
    </h2>
  )
}
export default App
