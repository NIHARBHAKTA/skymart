import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import HomePage from '../Screens/HomePage';
import AboutPage from '../Screens/AboutPage';
import Shop from '../Screens/Shop';
import Footer from '../Components/Footer';
import ProductDetails from '../Screens/ProductDetails';
import SidebarCart from '../Screens/SidebarCart';
import { useContext, useState } from 'react';
import { Mystore } from '../ContextApi/Context';
import ToasterNotification from '../Components/ToasterNotification';
import LoginScreen from '../Screens/LoginScreen';
import CreateAccountForm from '../Components/CreateAccountForm';

const AppRoutes = () => {
    const { isCartOpen } = useContext(Mystore);
    const [showToast, setShowToast] = useState(false);
    const location = useLocation();

    // Updated: Now includes "/" so the Login screen doesn't show the Navbar/Footer
    const isAuthPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup';

    return (
        <>
            {/* Navbar, Cart, and Footer only show if we are NOT on the landing/auth pages */}
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
                    {/* --- AUTH ROUTES --- */}
                    {/* This makes Login the very first screen at the root URL */}
                    <Route path="/" element={<LoginScreen />} />
                    <Route path="/login" element={<Navigate to="/" />} /> 
                    <Route path="/signup" element={<CreateAccountForm />} />

                    {/* --- APP ROUTES --- */}
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/productDetails/:id" element={<ProductDetails />} />
                    
                    {/* Fallback: if user types a random URL, send them to login */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>

            {!isAuthPage && <Footer />}
        </>
    );
};

export default AppRoutes;