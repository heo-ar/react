import "./UpdateCom.css";

function UpdateCom({ user, loading, onChange, onSubmit }) {
  if (!user) return <p>로딩 중입니다...</p>;

  return (
    <div className="update-container">
      <h2 className="update-title">회원 정보 수정</h2>
      {loading && <p className="loading-text">처리 중입니다...</p>}
      <form onSubmit={onSubmit} className="update-form">
        <div className="form-group">
            <label>아이디(수정 불가)</label>
        <div className="static-text">{user.id}</div>
        </div>

        <div className="form-group">
          <label>비밀번호(수정 불가)</label>
          <div className="static-text">{user.pwd}</div>
        </div>
        <div className="form-group">
          <label>이름 수정</label>
          <input type="text" name="name" value={user.name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label>주소 수정</label>
          <input type="text" name="addr" value={user.addr} onChange={onChange} />
        </div>
        <button type="submit" className="btn-update" disabled={loading}>
          {loading ? "처리 중..." : "수정하기"}
        </button>
      </form>
    </div>
  );
}

export default UpdateCom;
