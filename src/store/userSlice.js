// 파일 분할 하는 법
import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({ // useState랑 비슷한 역할
    name : 'user', // state 이름
    // initialState : 'kim', // 값
    
    // state가 object/array일 경우 변경하는 법 -> 편리해서 일부러 문자 하나인 경우에도 object 형으로 많이 씀
    initialState : {name : 'kim', age : 20},

    // 리덕스 state 변경하는 법
    // 1. state 수정해주는 함수 만들기
    // 위에 원래 이름 kim -> john kim으로 변경
    reducers : { 
        changeName(state){
            // return 'john ' + state

             // {name: 'park'}으로 변경하는 법 m1)
            //  return {name : 'park', age : 20}

            // m2) 직접 수정해도 state 변경됨
            state.name = 'park'
        },
        increase(state, action){ // state 변경함수에 파라미터 뚫는 법
            state.age += action.payload;
        },
    }  
})

// 2. 만든 함수 export
export let {changeName, increase} = user.actions

export default user

