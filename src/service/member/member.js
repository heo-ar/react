// 저장 함수는 항상 먼저 정의
const saveData = () => {
    sessionStorage.setItem("members", JSON.stringify(data_set));
  };
  
  // 초기 더미 데이터
  const defaultData = [
    { id: "user01", pwd: "user01", name: "유재석", addr: "서울시 종로구" },
    { id: "user02", pwd: "user02", name: "박명수", addr: "서울시 강북구" },
    { id: "user03", pwd: "user03", name: "정준하", addr: "서울시 강남구" },
    { id: "user04", pwd: "user04", name: "노홍철", addr: "서울시 강동구" },
    { id: "user05", pwd: "user05", name: "정형돈", addr: "서울시 강서구" },
    { id: "user06", pwd: "user06", name: "하동훈", addr: "서울시 동대문구" },
  ];
  
  // 세션스토리지에 저장된 값이 있으면 그걸로 불러오고, 없으면 기본값 사용
  let data_set = JSON.parse(sessionStorage.getItem("members")) || defaultData;
  
  // 전체 회원 목록 반환
  const getList = () => [...data_set];
  
  
  // 회원 삭제
  const deleteMember = (id) => {
    data_set = data_set.filter(user => user.id !== id);
    saveData();
  };
  
  // 로그인 체크
  const loginCheck = (id, pwd) => {
    const user = data_set.find(user => user.id === id);
    if (user) {
      return user.pwd === pwd ? user : null;
    } else {
      return -1;
    }
  };
  
  export { getList, loginCheck, deleteMember };
  