import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/store/AuthContext"; // 경로 확인!
import "./HeaderCom.css";

function HeaderCom() {
  const { auth, logout } = useContext(AuthContext); // ✅ auth로 바꿈
  const navigate = useNavigate(); // 🔥 페이지 이동용 훅

  const handleLogout = () => {
    logout();          // 로그아웃 처리
    navigate("/");     // 메인페이지로 이동
  };

  return (
    <div className="header-container">
      <nav className="nav-links">
        <div className="left-links">
          <Link to="/">HOME</Link>
          <Link to="/list">LIST</Link>
        </div>

        <div className="right-user">
          {auth.isLoggedIn ? (
            <>
              <span className="welcome-msg">안녕하세요, {auth.user.name}님!</span>
              <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
            </>
          ) : (
            <Link to="/login">LOGIN</Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default HeaderCom;
