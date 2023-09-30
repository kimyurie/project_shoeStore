// 이게 state들을 보관하는 파일
import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./userSlice";

// 3. 만든 함수 import 해서 사용

// 오늘의 숙제 :
// 하단에 있는 데이터를 Redux store 안에 보관해둡시다.
// 그리고 Cart.js 페이지에 가져와서 데이터바인딩해봅시다.
// 데이터 갯수에 맞게 표 생성해달라고 반복문쓰는 것도 좋을듯요
// [
//     {id : 0, name : 'White and Black', count : 2},
//     {id : 2, name : 'Grey Yordan', count : 1}
// ]
let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],

  reducers: {
    addCount(state, action) {
      // "payload와 같은 id를 가진 상품을 찾아서 +1 해달라~"
      let 번호 = state.findIndex((a) => {return a.id === action.payload}) // state 안에 있는 id == 버튼 옆 id
      state[번호].count++;
    },

    // 2. 상세페이지 주문하기 버튼을 누르면 새로운 상품이 state에 추가되는 기능을 만들어옵시다.
    addItem(state, action){
      state.push(action.payload)
    }
  },
});

export let { addCount, addItem } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer, // state 등록
    cart: cart.reducer,
  },
});
