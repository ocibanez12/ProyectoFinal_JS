import AppInit from './AppInit'
import CartProvider from './store/CartContext'
import FavoritoProvider from './store/FavoritoContext'
import UserProvider from './store/UserContext'

function App() {

  return (
    <UserProvider>
      <CartProvider>
        <FavoritoProvider>
          <AppInit/>
        </FavoritoProvider>
      </CartProvider>
    </UserProvider>
  )
}

export default App
