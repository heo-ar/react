import { createContext, useState, useEffect } from "react";

// 로그인 전, 기본 상태
const initalState = {
    isLoggedIn: false, user: null
}

// 전체적으로 로그인 상태 공유하게 만듦
const AuthContext = createContext();

//App.js에서 다른 컴포넌트를 감쌀 때 사용, 칠드런은 App.js에서 <AuthProvider>여기 안에 오는 내용</AuthProvider>을 의미
const AuthProvider = ({children}) => {
    // 로그인 정보를 세션 스토리지에서 불러옴
    const [auth, setAuth] = useState(initalState);

useEffect(() => {
  const savedAuth = sessionStorage.getItem("auth");
  if (savedAuth) {
    setAuth(JSON.parse(savedAuth));
  }
}, []); 

    // 로그인 시 호출됨, 로그인 상태 + 사용자 정보를 auth에 저장, 브라우저 세션 스토리지에서도 저장해서 새로고침해도 유지
    const login = (user) => {   
        setAuth({isLoggedIn:true, user})
        sessionStorage.setItem("auth",
            JSON.stringify({isLoggedIn:true, user}) );
    }

    // 로그아웃 시, auth를 초기 상태로 복귀 + 세션 스토리지도 초기화
    const logout = () => {  
        setAuth(initalState)
        sessionStorage.clear();
    }

    const value = {login, logout, auth}

    return ( <>
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
    </>)
}
export { AuthContext, AuthProvider }