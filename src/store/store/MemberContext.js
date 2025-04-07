import React, { createContext, useContext, useReducer } from "react";

// 초기 상태
const initialState = {
  members: [],
};

// 리듀서
const memberReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return { ...state, members: action.data };
    case "DELETE":
      return {
        ...state,
        members: state.members.filter((m) => m.id !== action.id),
      };
    default:
      return state;
  }
};

// Context 만들기
const MemberContext = createContext();

export const MemberProvider = ({ children }) => {
  const [state, dispatch] = useReducer(memberReducer, initialState);

  return (
    <MemberContext.Provider value={{ state, dispatch }}>
      {children}
    </MemberContext.Provider>
  );
};

// 쉽게 쓰기 위한 훅
export const useMemberContext = () => useContext(MemberContext);
