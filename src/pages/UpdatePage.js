import { useParams } from "react-router-dom"; // 추가
import HeaderCon from "../containers/HeaderCon";
import UpdateCon from "../containers/UpdateCon";

function UpdatePage() {
  const { id } = useParams(); // URL 파라미터에서 id 가져옴

  return (
    <>
      <HeaderCon />
      <UpdateCon id={id} /> 
    </>
  );
}

export default UpdatePage;
