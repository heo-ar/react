// 문의사항 더미 데이터
let inquiry_data = [
    { id: 1, title: "배송 기간이 얼마나 걸리나요?", content: "주문하면 며칠 내에 받을 수 있나요?", author: "user01", date: "2024-04-04", status: "답변 대기" },
    { id: 2, title: "상품 교환이 가능한가요?", content: "색상이 마음에 안 드는데 교환할 수 있을까요?", author: "user02", date: "2024-04-03", status: "답변 완료" },
    { id: 3, title: "A/S 신청 방법이 궁금합니다.", content: "고장 난 제품은 어떻게 접수하면 되나요?", author: "user03", date: "2024-04-02", status: "답변 대기" },
];

// 전체 문의 목록을 가져오는 함수
const getInquiryList = () => inquiry_data;

// 특정 문의 상세 정보를 가져오는 함수
const getInquiryDetail = (id) => inquiry_data.find(inquiry => inquiry.id === id);

// 새 문의를 등록하는 함수
const addInquiry = (inquiry) => {
    inquiry.id = inquiry_data.length + 1; // ID 자동 증가
    inquiry.date = new Date().toISOString().split("T")[0]; // 현재 날짜 추가
    inquiry.status = "답변 대기"; // 기본 상태
    inquiry_data.push(inquiry);
    return inquiry;
};

// 문의 삭제 함수
const deleteInquiry = (id) => {
    const index = inquiry_data.findIndex(inquiry => inquiry.id === id);
    if (index !== -1) {
        inquiry_data.splice(index, 1);
        return true;
    }
    return false;
};

// 문의 수정 함수
const updateInquiry = (id, updatedInquiry) => {
    const index = inquiry_data.findIndex(inquiry => inquiry.id === id);
    if (index !== -1) {
        inquiry_data[index] = { ...inquiry_data[index], ...updatedInquiry };
        return inquiry_data[index];
    }
    return null;
};

// 문의 상태 변경 (답변 완료 처리)
const markInquiryAsAnswered = (id) => {
    const inquiry = inquiry_data.find(inquiry => inquiry.id === id);
    if (inquiry) {
        inquiry.status = "답변 완료";
        return inquiry;
    }
    return null;
};

export { getInquiryList, getInquiryDetail, addInquiry, deleteInquiry, updateInquiry, markInquiryAsAnswered };