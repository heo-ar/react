import { useState } from "react";
import "./LoginCom.css";

function LoginCom({ loading, onSubmit, error, username, onChange, password }) {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="login-main">
      {loading ? (
        <h3 className="loading">로그인 시도 중...</h3>
      ) : error ? (
        <h3 className="error">{error}</h3>
      ) : (
        <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
          {/* 회원가입 폼 */}
          <div className="form-container sign-up-container">
            <form onSubmit={onSubmit}>
              <h1>Create Account</h1>
              <span>or use your email for registration</span>
              <input type="text" name="name" placeholder="Name" onChange={onChange} />
              <input type="email" name="email" placeholder="Email" onChange={onChange} />
              <input type="password" name="pwd" placeholder="Password" onChange={onChange} />
              <button className="button" type="submit">Sign Up</button>
            </form>
          </div>

          {/* 로그인 폼 */}
          <div className="form-container sign-in-container">
            <form onSubmit={onSubmit}>
              <h1>Sign in</h1>
              <span>or use your account</span>
              <input type="text" name="id" value={username} onChange={onChange} placeholder="아이디" />
              <input type="password" name="pwd" value={password} onChange={onChange} placeholder="비밀번호" />
              <a href="#">Forgot your password?</a>
              <button className="button" type="submit">Sign In</button>
            </form>
          </div>

          {/* 전환 오버레이 */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="button" id="ghost" onClick={() => setIsSignUp(false)}>Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="button" id="ghost" onClick={() => setIsSignUp(true)}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginCom;