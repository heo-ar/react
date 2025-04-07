import ListCom from "../components/ListCom";
import { reducer, initialState } from "../moduls/member_red";
import { useEffect, useReducer } from "react";
import { getList } from "../service/member/member"; //더미데이터 부르기

function ListCon() {

  const [state, dispatch] = useReducer(reducer, initialState); //변수 선언
  //const [data, setData] = useState();

  // ---------------------------------------------------------
  useEffect(() => {
    // setData //서버 데이터 저장
    try {
      dispatch({ type: "LOADING" });       // ----- 로딩 상태로 변경
  
      setTimeout(() => {  // 위의 로딩이 끝난 후 등장시키기 위해 셋타임 사용
        const data = getList();            // 더미 데이터 가져오기
        dispatch({ type: "FINISHED" });    // ----- 로딩 완료 상태 변경
        dispatch({ type: "LIST", data });  // 데이터 저장
      }, 2);  // - 불러올 시간, 1000에 1초
    } catch (e) {
      dispatch({ type: "ERROR", error: e.toString() });  // 에러 발생 시 저장
    }
  }, [])
  console.log("state : ", state)
// ---------------------------------------------------------

  return (<>
    <ListCom data = {state.data} loading={state.loading} error={state.error} /> 
    {/* 데이터를 가져올 때 성공/로딩/에러 상태를 관리하고 처리 */}
    </>);
}
export default ListCon;