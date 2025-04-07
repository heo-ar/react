import { useContext, useReducer } from 'react';
import LoginCom from './../components/LoginCom';
import { initialState, reducer } from '../moduls/member_red';
import { loginCheck } from '../service/member/member';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/store/AuthContext';

function LoginCon() { // 컴포넌트와 다르게 속성 값을 넣지 않는 이유 : 그냥 js함수 호출 방식이기 때문에 파라미터를 직접 인자를 넘겨줘야 함, 그래서 속성 안 씀.
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const onChange = (e) => {
    console.log("onChange e.target : ", e.target );
    const { name, value } = e.target;
    dispatch( {type:"CHANGE_INPUT", name, value, form:"login"} )
  }
  console.log("login con state :", state );

  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (e) => {   // 로그인 버튼 클릭 시
    e.preventDefault();       // 새로고침 방지

    dispatch({ type: "LOADING" }) 
    const user = loginCheck(state.login.id, state.login.pwd);   // 사용자가 입력한 아이디, 비번 정보 저장
    dispatch({type:"FINISHED"}) 
    
    // 🔥 로그인 실패 처리 (존재하지 않는 아이디)
    if (user === -1) {
      alert("존재하지 않는 아이디입니다.");
      return;
    }

    // 🔥 로그인 실패 처리 (비밀번호 틀림)
    if (user === null) {
      alert("비밀번호가 틀렸습니다.");
      return;
    }

    // context 로그인
    login(user);  
    localStorage.setItem("currentUser", JSON.stringify(user));  // 로컬스토리지에 저장
    console.log("로그인된 유저:", user);
    navigate("/");
  }

  // ---------------------------------------------------------
  return (<>
  <LoginCom onSubmit={onSubmit} loading={ state.loading }
          username={state.login.id} password={state.login.pwd} onChange={onChange} />
    </>);
}
export default LoginCon;
