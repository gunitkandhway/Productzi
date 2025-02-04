import type React from "react"
import { useEffect } from "react"
import { useAuth } from "../AuthContext"
import { useNavigate } from "react-router-dom"
import "./Profile.css"

const Profile: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user, navigate])

  if (!user) {
    return null
  }
  console.log(user.photoURL)
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2 className="profile-title">Your TechHub Profile</h2>
        </div>
        <div className="profile-content">
          {user.photoURL && (
            <div className="profile-image-container">
              <img src={user.photoURL || "/placeholder.svg"} alt="Profile" className="profile-image" />
            </div>
          )}
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{user.displayName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <button className="btn logout-btn" onClick={logout}>
            <span className="btn-text">Logout</span>
            <span className="btn-icon">🚪</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile

