import {
  BrowserRouter as Router,
  Routes,
  Route,
  useInRouterContext,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListingDetails from "./pages/ListingDetails";
import BookingPage from "./pages/BookingPage";
import SignupPage from "./pages/SignupPage";
import UserBookingsPage from "./pages/UserBookingsPage";
import { AuthContext } from "./context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import UserListingsPage from "./pages/UserListingsPage";
import AddListingPage from "./pages/AddListingPage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminBookingsPage from "./pages/admin/AdminBookingsPage";
import AdminListingsPage from "./pages/admin/AdminListingsPage";

function App() {
  const ADMIN_ID = import.meta.env.VITE_ADMIN_ID;
  let tokenTimer;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);

  const login = useCallback((token, user, expirationDate) => {
    setIsLoggedIn(true);
    setToken(token);
    setUser(user);

    const newExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); //date after 1hr
    setTokenExpiration(newExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        user: user,
        expiration: newExpirationDate.toISOString(),
      })
    );

    console.log("Logged In");
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    setTokenExpiration(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      tokenTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(tokenTimer);
    }
  }, [token, logout, tokenExpiration]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (
      userData &&
      userData.user &&
      userData.token &&
      userData.expiration &&
      new Date(userData.expiration) > new Date()
    ) {
      console.log("Try to Auto Login");
      login(userData.token, userData.user, new Date(userData.expiration));
    }
  }, [login]);

  let routes;
  if (isLoggedIn && user.userId !== ADMIN_ID) {
    routes = (
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/listing/add" element={<AddListingPage />} />
        <Route exact path="/book/:id" element={<BookingPage />} />
        <Route exact path="/bookings/:userId" element={<UserBookingsPage />} />
        <Route
          exact
          path="/listings/user/:userId"
          element={<UserListingsPage />}
        />
        <Route exact path="/listings/:id" element={<ListingDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    );
  } else if (isLoggedIn && user.userId === ADMIN_ID) {
    routes = (
      <Routes>
        <Route exact path="/" element={<AdminHomePage />} />
        <Route exact path="/listing/add" element={<AddListingPage />} />
        <Route exact path="/book/:id" element={<BookingPage />} />
        <Route exact path="/admin/bookings/" element={<AdminBookingsPage />} />
        <Route exact path="/admin/listings/" element={<AdminListingsPage />} />
        <Route exact path="/listings/:id" element={<ListingDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/listings/:id" element={<ListingDetails />} />
        <Route exact path="/listing/add" element={<LoginPage />} />
        <Route exact path="/auth/register" element={<SignupPage />} />
        <Route exact path="/auth/login" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  return (
    <Router>
      <AuthContext.Provider value={{ isLoggedIn, token, user, login, logout }}>
        <div className="flex flex-col min-h-screen">
          <Header />
          {routes}
          <Footer />
        </div>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
