import CreateAccountForm from './Components/CreateAccountForm'
import LoginForm from './Components/LoginForm'
import AppRoutes from './Routes/AppRoutes'
import LoginScreen from './Screens/LoginScreen'

const App = () => {
  return (
    <>
      <div className="bg-[#0a0a0a] min-h-screen">
        <AppRoutes />
        {/* <LoginForm/> */}
        {/* <LoginScreen></LoginScreen> */}
      </div>

    </>
  )
}

export default App
