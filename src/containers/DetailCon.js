import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getList } from "../service/member/member";
import HeaderCom from "../components/common/HeaderCom";
import DetailCom from "../components/DetailCom";

function DetailCon() {
  const { id } = useParams();
  const location = useLocation(); // location 객체 사용
  const [member, setMember] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // 로그인한 사용자 정보 및 멤버 정보 로드
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const user = storedUser ? JSON.parse(storedUser) : null;
    setCurrentUser(user);

    // ✅ 수정된 데이터가 있다면 그걸 먼저 사용
    if (location.state) {
      setMember(location.state);
    } else {
      const foundMember = getList().find(user => user.id.toString() === id.toString());
      setMember(foundMember);
    }
  }, [id, location.state]); // location.state 변경될 때도 실행

  // 권한 확인
  const handlePermissionCheck = () => {
    if (!currentUser || !member) return;
    if (currentUser.id !== member.id) {
      alert("권한이 없습니다.");
    }
  };

  if (!member || !currentUser) {
    return (
      <>
        <HeaderCom />
        <div style={{ padding: "2rem" }}>
          <h2>로딩 중...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderCom />
      <DetailCom
        data={member}
        currentUser={currentUser}
        onPermissionCheck={handlePermissionCheck}
      />
    </>
  );
}

export default DetailCon;
