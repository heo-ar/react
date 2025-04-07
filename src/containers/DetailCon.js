import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getList } from "../service/member/member";
import HeaderCom from "../components/common/HeaderCom";
import DetailCom from "../components/DetailCom";

function DetailCon() {
const { id } = useParams();
const [member, setMember] = useState(null);
const [currentUser, setCurrentUser] = useState(null);

  // 로그인한 사용자 정보 로드
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const user = storedUser ? JSON.parse(storedUser) : null;
    console.log("현재 로그인한 사용자:", user); // 확인용
    setCurrentUser(user);
  
    const foundMember = getList().find((user) => user.id.toString() === id.toString());
    setMember(foundMember);
  }, [id]);
  

  // 권한 확인 및 alert 띄우기
  const handlePermissionCheck = () => {
    if (!currentUser || !member) return; // currentUser와 member가 둘 다 있어야만 진행

    if (currentUser.id !== member.id) {
    alert("권한이 없습니다.");
    }
  };

  // currentUser나 member가 없으면 로딩 중 화면 표시
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
        <DetailCom data={member} currentUser={currentUser} onPermissionCheck={handlePermissionCheck} />
        </>
    );
}

export default DetailCon;