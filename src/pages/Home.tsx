import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const { login, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1 className="welcome-title">
          Welcome {user ? user.displayName?.split(" ")[0] : ""}
        </h1>
        <p className="welcome-message">
          {user ? "Explore the shop or manage your profile!" : "Please login to continue"}
        </p>
      </div>

      <div className="action-buttons">
        {user ? (
          <>
            <button className="btn profile-btn" onClick={() => navigate("/profile")}>
              Go to Profile
            </button>
            <button className="btn shop-btn" onClick={() => navigate("/shop")}>
              Shop
            </button>
            <button className="btn logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <button className="btn login-btn" onClick={login}>
            Login with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
