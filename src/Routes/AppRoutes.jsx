import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import HomePage from '../Screens/HomePage';
import AboutPage from '../Screens/AboutPage';
import Shop from '../Screens/Shop';
import Footer from '../Components/Footer';
import ProductDetails from '../Screens/ProductDetails';
import SidebarCart from '../Screens/SideBarCart';
import { useContext, useState } from 'react';
import { Mystore } from '../ContextApi/Context';
import ToasterNotification from '../Components/ToasterNotification';
import LoginScreen from '../Screens/LoginScreen';
import CreateAccountForm from '../Components/CreateAccountForm';


const AppRoutes = () => {
    const { isCartOpen } = useContext(Mystore);
    const [showToast, setShowToast] = useState(false);
    const location = useLocation();

    // Check if the current path is login or signup
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <>
            {/* Only show Navbar/Footer/Cart if NOT on Auth pages */}
            {!isAuthPage && <Navbar />}

            {!isAuthPage && isCartOpen && <SidebarCart setShowToast={setShowToast} />}

            {showToast && (
                <ToasterNotification
                    message="Order placed successfully!"
                    onClose={() => setShowToast(false)}
                />
            )}

            <div className={!isAuthPage ? "pt-20" : ""}>
                <Routes>
                    {/* Main App Routes */}
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/productDetails/:id" element={<ProductDetails />} />

                    {/* Auth Routes */}
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/signup" element={<CreateAccountForm />} />

                    {/* Optional: Default redirect */}
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </div>

            {!isAuthPage && <Footer />}
        </>
    );
};;

export default AppRoutes