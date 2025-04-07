import React from "react";
import { Link } from "react-router-dom"; // ✅ Link 임포트 추가
import "./ListCom.css";

function ListCom({ data, loading, error }) {
  return (
    <div className="list-container">
      <h2>회원 목록</h2>

      {loading ? (
        <h3 className="loading">Loading . . .</h3>
      ) : error ? (
        <h3 className="error">{error}</h3>
      ) : (
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>주소</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>
                    <Link to={`/detail/${d.id}`} className="name-link">
                      {d.name}
                    </Link>
                  </td>
                  <td>{d.addr}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListCom;
