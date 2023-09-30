import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { addItem } from "../store/store";
import { useDispatch } from "react-redux";

// let YellowBtn = styled.button`
//   background : ${props => props.bg};
//   color :  ${props => props.bg == 'blue' ? 'white' : 'black'};
//   padding : 10px;
// `

// let NewBtn = styled.button(YellowBtn)``

function Detail(props){
  let [count, setCount] = useState(0)
  let [alert, setAlert] = useState(true)
  let [num, setNum] = useState('') 

  // 탭 상태 저장해둘 state 
  let [탭, 탭변경] = useState(0) // 0이면 0번째 내용, 1이면 1번째, 2이면 2번째


  useEffect(() => {
    // 컴포넌트 mount(페이지 장착), update 시 여기 코드 실행
     // useEffect 안에 있는 코드는 html 렌더링 후에 동작한다 -> 더 효율적!
     // useEffect 안에 적는 코드들?
     // 어려운 연산 / 서버에서 데이터 가져오는 작업 / 타이머 장착하는 거 

    // 타이머
    let a = setTimeout(() => {setAlert(false)}, 2000)

    return () => {
      // 기존 타이머는 제거해주세요~
      // 위 useEffect 동작 전에 실행됨
      // mount 시 실행안되고 unmount시 실행됨
      clearTimeout(a)}
  }, []) // []는 useEffect 실행조건 넣을 수 있는 곳, mount 시 1회만 적용하게 하고 싶으면 빈괄호[]만 써주기

  // ** useEffect 사용법
  // useEffect(() => { 실행할 코드 }) //1. 재랜더링마다 코드 실행하고 싶으면
  // useEffect(() => {실행할 코드}, []) //2. mount 시 1회 코드 실행하고 싶으면
  // useEffect(() => {return() => {
  //   실행할 코드
  // }}, []) // 3. unmount시 1회 코드 실행하고 싶으면 (코드 실행 전 항상 실행)
  // // 4. useEffect 실행 전에 뭔가 실행하려면 언제나 {} 안에 return() => {}
  // useEffect(() => {실행할 코드}, [state1])// 5. 특정 state 변경시에만 실행


useEffect(() => {
  if (isNaN(num) == true){
    console.log('그러지마세요')
  }}, [num])


  let {id} = useParams(); // 현재 url의 파라미터 정보(/:id)

// .find() 사용
// https://devinserengeti.tistory.com/20 참고
let 찾은상품 = props.shoes.find(function(x){
  return x.id == id;
});

let [fade2, setFade2] = useState('')

useEffect(() => {
  setFade2('end')

  return () => {
    setFade2('')
  }
}, [])


let dispatch = useDispatch(); // store.js로 요청 보내주는 함수

    return (
      // <div className="container">
      //   <div className="row">
      //       <div className="col-md-6">
      //         <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
      //         </div>
      //         <div className="col-md-6">
      //         <h4 className="pt-5">{props.shoes[id].title}</h4>
      //         <p>{props.shoes[id].content}</p>
      //         <p>{props.shoes[id].price}원</p>
      //         <button className="btn btn-danger">주문하기</button> 
      //       </div>
      //   </div>
      // </div> 

// Q. 자료의 순서가 변경되면 상세페이지도 고장나는 문제는 어떻게 해결할까요?
//  현재 /:id 자리에 입력한 값과 영구번호가 같은 상품을 찾아서 데이터바인딩
      <div className={'container start ' + fade2}>
          {/* <YellowBtn bg = "blue">버튼</YellowBtn>
          <YellowBtn bg = "orange">버튼</YellowBtn> */}


          {/* 오늘의 숙제 :
Detail 페이지 안에 노란 박스 하나 만들고
Detail 페이지 방문 후 2초 후에 박스가 사라지게 해보십시오. */}
        {
           alert == true ? 
          <div className="alert alert-warning">
            2초 이내 구매시 할인</div>
          : null
        }


        <div className="row">
          {count}
          <button onClick={() => setCount(count +1)}>버튼</button>
            <div className="col-md-6">
              <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
              </div>


              <div className="col-md-6">
              {/* 오늘의 숙제 : 
      <input> 하나 만들고 거기에 유저가 숫자 말고 다른걸 입력하면
      "그러지마세요"라는 안내메세지를 출력해봅시다. */}
              <input onChange={(e) => setNum(e.target.value)}></input>

              <h4 className="pt-5">{찾은상품.title}</h4>
              <p>{찾은상품.content}</p>
              <p>{찾은상품.price}원</p>
              {/* 주문버튼누르면 state에 새로운 상품추가 */}
              <button className="btn btn-danger" onClick={() => {
                  dispatch(addItem({ id: 1, name: "Red Knit", count: 1 }))
              }}>주문하기</button> 
            </div>
        </div>

          {/* 탭 UI */}
          <Nav variant="tabs"  defaultActiveKey="link0">
              <Nav.Item>
                <Nav.Link onClick ={() => 탭변경(0)} eventKey="link0">버튼0</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick ={() => 탭변경(1)} eventKey="link1">버튼1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick ={() => 탭변경(2)} eventKey="link2">버튼2</Nav.Link>
              </Nav.Item>
          </Nav>
          <TabContent 탭 = {탭}/> 
      </div> 
    )
  }




  // function TabContent(props){ // props 대신 {탭}도 가능!
  //   if (props.탭 == 0){
  //     return <div>내용0</div>
  //   }
  //   if (props.탭 == 1){
  //     return <div>내용1</div>
  //   }
  //   if (props.탭 == 2){
  //     return <div>내용2</div> 
  //   }  
  // } 

    
  function TabContent({탭, shoes}){
    // 탭 state가 변할 때 end 부착
    let [fade, setFade] = useState('') 

    useEffect(() => {
      // fade라는 state를 end로 바꿔주세요~
      setTimeout(() => {setFade('end')}, 100) // 제렌더링 떄문에 위아래 시간차 둬야됌

      return () => { // 위 useEffect 실행되기 전 수행
        setFade('') // 탭 state가 변할 때 end 뗐다가 부착
      }
    }, [탭])
    return (<div className={'start ' + fade}> {/* 전환 애니메이션  */}
     {/* 위와 같은 if문 대신 아래와 같이 array 자료형으로도 가능 */}
      { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭] }  {/* 탭 클릭에 따라 내용 바뀜 */}
    </div>)
  }

// 오늘의 숙제 : 
// Detail 컴포넌트 로드시 투명도가 0에서 1로 서서히 증가하는 애니메이션을 주려면?

 
export default Detail;