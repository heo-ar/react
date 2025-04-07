import { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getList } from "../service/member/member";
import UpdateCom from "../components/UpdateCom";
import { reducer, initialState } from "../moduls/member_red";

function UpdateCon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "LOADING" });

    const data = getList();
    const user = data.find(user => user.id === id);

    if (!user) {
      alert("존재하지 않는 회원입니다.");
      navigate("/");
      return;
    }

    dispatch({ type: "DETAIL", data: user });
    dispatch({ type: "FINISHED" });
  }, [id, navigate]);
  console.log("state.detail", state.detail);
  
  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE_INPUT", name, value, form: "detail" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "LOADING" });

    const updatedUser = state.detail;
    const updatedList = getList().map(user =>
      user.id === id ? updatedUser : user
    );

    sessionStorage.setItem("members", JSON.stringify(updatedList));
    dispatch({ type: "FINISHED" });
    alert("수정 완료!");
    navigate(`/detail/${id}`);
  };

  if (state.loading || !state.detail) return <p>로딩 중...</p>;

  return (
    <UpdateCom
      user={state.detail}
      loading={state.loading}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

export default UpdateCon;
