import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "../store/userSlice";
import { addCount } from "../store/store";

//Redux 사용 시 컴포넌트들이 props 없이 state 공유 가능
// 부모 자식간 props 전송 필요없어짐
// 리덕스 사용하면 컴포넌트간 state 공유 편해짐

// 컴포넌트 간 공유 필요 없으면 굳이 리덕스 안써도 되고
// 그냥 useState() 쓰기

function Cart() {
  //  // Redux store의 state 꺼내는 법
  // let a = useSelector((state) => {return state.user}) // 여기서 state는 store 안에 있던 모든 state가 된다
  // console.log(a)

  let state = useSelector((state) => state);
  let dispatch = useDispatch(); // store.js로 요청 보내주는 함수

  return (
    <div>
      {/* 버튼 누르면 age가 +1되는 기능 */}
      <h6>
        {state.user.name} {state.user.age}의 장바구니
      </h6>
      <button
        onClick={() => {
          dispatch(increase(100)); // 4. dispatch(state변경함수())
        }}
      >
        버튼
      </button>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => (
            <tr key={i}>
              <td>{state.cart[i].id}</td>
              <td>{state.cart[i].name}</td>
              <td>{state.cart[i].count}</td>
              <td>안녕</td>
              <td>
                {/* 1. + 버튼을 누르면 해당 상품의 수량부분이 +1 되는 기능을 만들어옵시다. */}
                {/* 근데 나중에 Cart페이지에 있는 상품들 정렬 순서같은게 바뀌거나 그럴 경우
 "버튼을 누르면 옆에 있는 상품id와 동일한 상품id 가진걸 state에서 찾은 다음에 그걸 +1"  */}
                <button
                  onClick={() => {
                    dispatch(addCount(state.cart[i].id))// 버튼 옆의 id 
                  }}
                >+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
