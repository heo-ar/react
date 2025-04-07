
// 회원정보 데이터를 저장할 더미 데이터를 배열로 저장
let data_set = [
    {id: "user01", pwd: "user01", name: "유재석", addr: "서울시 종로구"},
    {id: "user02", pwd: "user02", name: "박명수", addr: "서울시 강북구"},
    {id: "user03", pwd: "user03", name: "정준하", addr: "서울시 강남구"},
    {id: "user04", pwd: "user04", name: "노홍철", addr: "서울시 강동구"},
    {id: "user05", pwd: "user05", name: "정형돈", addr: "서울시 강서구"},
    {id: "user06", pwd: "user06", name: "하동훈", addr: "서울시 동대문구"},
];

// 전체 회원 목록을 갖고 오는 함수, 위의 data_set을 반환해서 등록된 모든 회원 정보를 제공
const getList = () => data_set;

// 새로운 회원을 등록하는 함수
const register = (user) => {
    data_set = data_set.concat(user); // 기존 data_set에 새로운 회원 추가 가능
    return 1; // 성공했을 때 1 반환
}

// 로그인 정보가 맞는지 확인하는 로직
const loginCheck = (id, pwd) => {
    const user = data_set.find(user => user.id === id);   // data_set에서 입력한 id가 데이터에 있나 찾기
    if (user) { // 아이디가 존재하는 경우, (아랫 줄로 내려가 비밀번호가 같은지도 확인)
        if (user.pwd === pwd) {
            return user;    // id, pwd 둘 다 동일, 로그인 성공
        }else{
            return null;    // pwd 틀림, 로그인 실패
        }
    }else{
        return -1   // id 없음, 로그인 실패
    }
}
export { register, getList, loginCheck }