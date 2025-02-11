import { useDispatch, useSelector } from "react-redux"
import CartContainer from "./components/CartContainer"
import Navbar from "./components/Navbar"
import { useEffect } from "react"
import { calculateTotals, getCartItems } from "./features/cart/cartSlice"
import Modal from "./components/Modal"

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart)
  const { isOpen } = useSelector((state) => state.modal)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  useEffect(() => {
    dispatch(getCartItems("random"))
  }, [])

  return (
    <h2>
      {isOpen && <Modal />}
      <Navbar />
      {isLoading ? (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      ) : (
        <CartContainer />
      )}
    </h2>
  )
}
export default App
