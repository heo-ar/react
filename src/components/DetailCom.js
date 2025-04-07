import { useNavigate } from "react-router-dom";
import './DetailCom.css';
import { deleteMember, getList } from '../service/member/member';
import { useContext } from "react";
import { AuthContext } from "../store/store/AuthContext";
import { useMemberContext } from "../store/store/MemberContext";

function DetailCom({ data, currentUser, onPermissionCheck }) {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // 로그아웃 함수
  const { dispatch, state } = useMemberContext(); // 멤버 context에서 dispatch, state 가져옴

  const handleAction = (action) => {
    const currentId = (currentUser?.id + '').trim();
    const dataId = (data?.id + '').trim();

    if (currentId === dataId) {
      if (action === 'delete') {
        const confirmed = window.confirm("정말 삭제하시겠습니까?");
        if (confirmed) {
          try {
            dispatch({ type: "LOADING" }); // 로딩 시작

            deleteMember(dataId); // 회원 삭제 (service 접근)
            logout();             // 로그아웃
            alert("삭제되었습니다.");
            navigate("/");        // index.html로 이동
          } catch (error) {
            alert("삭제 중 오류 발생");
          } finally {
            dispatch({ type: "FINISHED" }); // 로딩 종료
          }
        }
      } else if (action === 'update') {
        navigate(`/update/${dataId}`);
      }
    } else {
      onPermissionCheck(); // 권한 없을 때
    }
  };

  return (
    <div className="detail-container">
      <h2 className="detail-title">{data.name}님의 상세정보입니다</h2>

      {state.loading && <p className="loading-text">처리 중입니다...</p>} {/* 로딩 중 출력 */}

      <div className="detail-info">
        <span className="detail-label">아이디:</span>
        <span className="detail-value">{data.id}</span>
      </div>
      <div className="detail-info">
        <span className="detail-label">주소:</span>
        <span className="detail-value">{data.addr}</span>
      </div>
      <div className="detail-buttons">
        {currentUser?.id?.toString().trim() === data?.id?.toString().trim() && (
          <>
            <button className="btn-delete" onClick={() => handleAction('delete')} disabled={state.loading}>삭제</button>
            <button className="btn-edit" onClick={() => handleAction('update')} disabled={state.loading}>
              {state.loading ? "로딩 중..." : "수정"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailCom;
