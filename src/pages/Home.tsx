import { useAuth } from "../AuthContext"
import { useNavigate } from "react-router-dom"
import type React from "react" 
import "./Home.css"

const Home: React.FC = () => {
  const { login, user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1 className="welcome-title">
          Welcome to <span className="highlight">TechHub,</span>
          {user && <span className="user-name"> {user.displayName?.split(" ")[0]}</span>}
        </h1>
        <p className="welcome-message">
          {user
            ? "Explore our cutting-edge tech shop or manage your profile!"
            : "Please login to access our futuristic platform"}
        </p>
      </div>

      <div className="action-buttons">
        {user ? (
          <>
            <button className="btn profile-btn" onClick={() => navigate("/profile")}>
              <span className="btn-text">Profile</span>
              <span className="btn-icon">👤</span>
            </button>
            <button className="btn shop-btn" onClick={() => navigate("/shop")}>
              <span className="btn-text">Shop</span>
              <span className="btn-icon">🛒</span>
            </button>
            <button className="btn logout-btn" onClick={logout}>
              <span className="btn-text">Logout</span>
              <span className="btn-icon">🚪</span>
            </button>
          </>
        ) : (
          <button className="btn login-btn" onClick={login}>
            <span className="btn-text">Login with Google</span>
            <span className="btn-icon">🔑</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Home

