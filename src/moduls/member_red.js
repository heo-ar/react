// 사이트의 상태를 바꾸는 파일

// 초기 상태값
const initialState = {
    login: { id: "", pwd: "" }, // 로그인 입력 상태
    register: { id: "", pwd: "", name: "", addr: "" }, // 회원가입 입력 상태
    data: null,      // 서버에서 가져온 데이터 (회원 목록 등)
    detail: null,    // 회원 상세 정보 상태 (수정용)
    loading: false,  // 데이터 로딩 여부
    error: null      // 오류 발생 시 저장될 에러 메시지
};

// 리듀서 함수
// 현재 상태(state)와 액션(action)을 받아서 새로운 상태를 반환하는 함수
const reducer = (state, action) => {
    switch (action.type) {
        // 입력값 변경 (로그인/회원가입 입력값 업데이트)
        case "CHANGE_INPUT":
            // 수정폼(detail)인 경우
            if (action.form === "detail") {
                return {
                    ...state,
                    detail: {
                        ...state.detail,
                        [action.name]: action.value
                    }
                };
            }

            // 로그인 또는 회원가입 폼인 경우
            return {
                ...state,
                [action.form]: {
                    ...state[action.form],
                    [action.name]: action.value
                }
            };

        // 리스트 데이터 저장 (회원 목록 가져오기)
        case "LIST":
            return {
                ...state,
                data: action.data // 서버에서 가져온 회원 목록을 저장
            };

        // 상세 정보 저장 (수정 페이지용)
        case "DETAIL":
            return {
                ...state,
                detail: action.data // 선택한 회원의 정보를 저장
            };

        // 로딩 시작 (데이터 요청 시작할 때)
        case "LOADING":
            return {
                ...state,
                loading: true,  // 로딩 중 표시
                error: null     // 기존 에러 초기화
            };

        // 로딩 완료 (데이터 가져오기 끝났을 때)
        case "FINISHED":
            return {
                ...state,
                loading: false, // 로딩 완료
                error: null     // 에러 없음
            };

        // 에러 발생 시 (데이터 가져오는 중 오류 발생)
        case "ERROR":
            return {
                ...state,
                loading: false, // 로딩 종료
                error: action.error // 에러 메시지 저장
            };

        // 정의되지 않은 action.type일 경우 기본 상태 반환
        default:
            return state;
    }
};

// 다른 파일에서 사용할 수 있도록 export
export { initialState, reducer };
