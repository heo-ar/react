import { useNavigate } from "react-router-dom";
import './DetailCom.css';

function DetailCom({ data, currentUser, onPermissionCheck }) {
  const navigate = useNavigate();

  const handleAction = (action) => {
    const currentId = (currentUser?.id + '').trim();
    const dataId = (data?.id + '').trim();
  
    console.log("currentUser.id:", currentId);
    console.log("data.id:", dataId);

    // 권한 체크
    if (currentId === dataId) {
      if (action === 'delete') {
        console.log(`${dataId} 삭제`);
        // 삭제 로직
      } else if (action === 'edit') {
        navigate(`/edit/${dataId}`);
      }
    } else {
      // 권한이 없으면 alert 띄우기
      onPermissionCheck();
    }
  };
  
  return (
    <div className="detail-container">
      <h2 className="detail-title">{data.name}님의 상세정보입니다</h2>

      <div className="detail-info">
        <span className="detail-label">아이디:</span>
        <span className="detail-value">{data.id}</span>
      </div>
      <div className="detail-info">
        <span className="detail-label">주소:</span>
        <span className="detail-value">{data.addr}</span>
      </div>

      <div className="detail-buttons">
        <button className="btn-delete" onClick={() => handleAction('delete')}>삭제</button>
        <button className="btn-edit" onClick={() => handleAction('edit')}>수정</button>
      </div>
    </div>
  );
}

export default DetailCom;
