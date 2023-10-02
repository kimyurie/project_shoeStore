import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardGroup, Container, Nav, Navbar} from 'react-bootstrap';
import bg from './img/bg.png';
import { lazy, Suspense, useDeferredValue, useEffect, useState, useTransition } from 'react';
import data from './data';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import axios from 'axios';

import { useQuery } from 'react-query';

// import Detail from './routes/detail';
// import Cart from './routes/Cart';

// lazy import => ("Detail 컴포넌트가 필요해지면 import 해주세요")
// 첫 페이지 로딩속도 향상시킬 수 있음
const Detail = lazy(() => import('./routes/detail'));
const Cart = lazy(() => import('./routes/Cart'));


let a = new Array(10000).fill(0)

function App() {
  // 상세페이지 들어가면 현재 페이지에 있는 상품 id를 
  // localStorage에 저장되게 만들어오면 됩니다

  // 누가 detail 페이지 접속하면
  // 그 페이지에 보이는 상품id 가져와서
  // localStorage에 watched 항목에 추가

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify( [] ))

    // 응용사항 - 미완
    // 새로고침해도 localStorage 안 항목 사라지지 않게
    // let 꺼낸거 = localStorage.getItem('watched')
    // 꺼낸거 = JSON.parse(꺼낸거)
    // 꺼낸거 = new Set(꺼낸거)
    // 꺼낸거 = Array.from(꺼낸거)
    // localStorage.setItem('watched', JSON.stringify(꺼낸거))
    
  },[]) 
  


  // // localStorage에 array/object 자료를 저장하려면
  // // array/object -> JSON 이렇게 변환해서 저장
  // let obj = {name : 'kim'}
  // localStorage.setItem('data', JSON.stringify(obj))
  // let 꺼낸거 = localStorage.getItem('data')
  // // JSON  -> array/object
  // console.log( JSON.parse(꺼낸거));






  // 상품 데이터 넣기 - 많은 데이터는 따로 data.js 에 저장해서 불러오는 방식으로
  // use~ => 훅 (유용한 것들 들어있는 함수같은거)
  let [shoes, setShoes] = useState(data);

  let navigate = useNavigate();  // 페이지 이동 도와줌
  let [num, setNum] = useState(0); // 버튼 클릭 횟수
  let [load, setLoad] = useState(false); /// 로딩중 문구
  let [재고] = useState([10, 11, 12]); 

// 새로고침했을 때 state가 초기값 돌아가는 거 막으려면 localStorage 사용




// <실시간 데이터가 중요하면 react-query> 서버에서 유저이름 가져와 보여주기
let result = useQuery('작명', () => 
  axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
    console.log('요청됨') // 장점2. 틈만나면 자동으로 재요청(refetch)해줌 ex)실시간 sns, 코인거래소 등에 유용
  return a.data
  }),
  {staleTime : 2000} // refetch 간격 설정 가능
)
// 사용 시 장점 1. 성공/실패/로딩중 쉽게 파악가능
// result.data
// result.isLoading
// result.error

// 장점2. 틈만나면 자동으로 재요청(refetch)해줌
// 장점3. 요청 실패시 재시도 알아서 해줌
// 장점4. ajax로 가져온 결과는 state 공유 필요없음
// 장점5. ajax 결과 캐싱기능



let [name, setName] = useState('')




// useTransition - 아래 성능저하 개선 시키기
// isPending은 startTransition이 처리중일 때 true로 변함
let [isPending, 늦게처리] = useTransition()
// // useDeferredValue써도 느린 컴포넌트 성능 향상 가능
// // -> state 변동 사항 생기면 늦게 처리(위와 동일한 기능)
// let state = useDeferredValue(state)


  return (
    <div className="App">

{/* 유저가 뭐 입력하면 위 name에 저장되게 하기 */}
     <input onChange={(e) => {
      // 아래 성능저하 개선
        늦게처리(() => {
          setName(e.target.value) // 이걸 다른 코드들보다 나중에 처리해줌
        })
      }}/>
     {
      isPending ? '로딩중' :
      // 성능저하 일으키기
        a.map(() => {
          return <div>{name}</div>
        })
     }






       <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Shop</Navbar.Brand>
          <Nav className="me-auto">
            {/* 페이지 이동 버튼 */}
            {/* <Link to="/">홈</Link>
            <Link to="/detail">상세페이지</Link> */}
            <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
            {/* navigate(-1)은 뒤로가기 1은 앞으로 가기 */}
            <Nav.Link onClick={() => {navigate('/cart')}}> Cart</Nav.Link>
            <Nav.Link onClick={() => {navigate('/detail/0')}}> Detail</Nav.Link>
            <Nav.Link onClick={() => {navigate('/detail/1')}}> Detail1</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            { result.isLoading && '로딩중' }{/* 로딩중일때 '로딩중입니다' 보여주고 싶으면 */}
            { result.error && '에러남'}
            { result.data && result.data.name }
          </Nav>  

        </Container>
      </Navbar>



{/* lazy 사용시 컴포넌트 지연시간 발생 시 suspense import 해줌 */}
      <Suspense fallback={<div>로딩중임</div>}>
      {/* 라우트는 페이지! 각 페이지도 컴포넌트로 만들면 좋음*/}
      <Routes>
          <Route path='/' element={<div>
            <> 
                  {/* html에서 이미지 넣을 때 */}
            <div className='main-bg' style={{backgroundImage : 'url(' + bg + ')'}}></div>
            <div className="container">
              <div className="row">
                {/* <div className="col-md-4"> */}
                  {/* 수백개 이미지 넣을 때 - public 폴더 이용 이미지 넣기 */}
                  {/* <img src="/logo192.png" width="80%"/> */}
                  {/* 아래가 이미지 넣는 권장 방식 - codingapple.com/어쩌구/ 경로에 배포시 */}
                  {/* <img src={process.env.PUBLIC_URL + '/logo192.png'} width="80%"/> */}
                  {/* <img src="https://codingapple1.github.io/shop/shoes1.jpg"  width="80%"/>
                  <h4>{shoes[0].title}</h4>
                  <p>{shoes[0].price}</p>
                </div> */}
                
      {/*  <Card 쓸 때마다 살짝 다른 내용 보여주고 싶으면 props 잘쓰면 댐*/}
            {/* <Card shoes = {shoes[0]} i = {1}/>
            <Card shoes = {shoes[1]} i = {2}/>
            <Card shoes = {shoes[2]} i = {3}/> */}
            {
              shoes.map((a, i) => {
                return(
                  <Card shoes = {shoes[i]} i ={i}/>
                )
              })
            }
              </div>
            </div>
            {/* 버튼을 누르면 서버에서 상품데이터 3개를 가져와서 메인페이지에 상품카드 3개를 더 생성 */}
            {/* -> 원래 데이터인 shoes에 결과.data 더해야됨 */}
            <button onClick={() => {
              setLoad(true);
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((결과) => {
                  // console.log(결과.data) // 얘가 서버에서 가져온 데이터
                  // console.log(shoes)
                  let arr = [...shoes, ...결과.data];
                  // 이렇게 하면 배열괄호([]겉에꺼 띈 형태로 남음 {},{},{},{},{},{} 형태로)
                  setShoes(arr);
                  setNum(num+1);
                  setLoad(false);
                }).catch(() => {
                  console.log('실패함ㅅㄱ'); // 위 url 이상하게 적으면 나옴
                  setLoad(false);
                })

              // 응용1. 버튼을 2번 누르면 7,8,9번 상품을 가져와서 html로 보여주려면?
              if(num == 1){
                axios.get('https://codingapple1.github.io/shop/data3.json')
                .then((결과2) => {
                  let arr2 = [...shoes, ...결과2.data];
                  setShoes(arr2);
                }).catch(() => {
                  console.log('실패했어용')
                })
              }

              // 응용2. 버튼을 3번 누르면 더 상품이 없다고 안내문을 띄우려면?
              // 아니면 버튼을 숨기거나 그래도 되겠군요.
              if(num == 2){
                alert('상품이 없습니다.');
                document.querySelector('button').style.display = 'none';
              }

              // 응용3. 버튼을 누른 직후엔 "로딩중입니다" 이런 글자를 주변에 띄우고 싶으면?



              

              //   서버로 데이터 보내는 post 방식
              // axios.post('/sdasdf', {name: 'kim'})

              // // 동시에 ajax 요청 여러개하려면
              // Promise.all([axios.get('/url1'), axios.get('/url2')])
              // .then(()=>{
              // })

              // // fetch로도 get,post요청 가능한데 axios가 더편리
              // fetch('https://codingapple1.github.io/shop/data2.json')

            }}>더보기</button>
            </>
          </div>}/>
        
          {/*  URL 파라미터(/:id)로 상세페이지 100개 만들기 */}
          <Route path='/detail/:id' element= {
            
               <Detail shoes = {shoes} />
           
          }/>

          <Route path='/cart' element = {<Cart/>}/>


          {/* 404페이지 */} {/* *은 이외 모든 것 */}
          <Route path='*' element= {<div>없는 페이지에요</div>}/> 

          {/* Nested Routes - 아래 코드와 동일 */}
            {/* <Route path='/about/member' element = {<About/>}/>
          <Route path='/about/location' element = {<About/>}/> */} 

          {/* 언제씀 ? 여러 유사한 페이지 필요할 때 / 동적인 ui */}
         <Route path='/about' element = {<About/>}>
             <Route path='member' element = {<div>멤버임</div>}/>
             <Route path='location' element = {<div>위치정보임</div>}/>
          </Route>    

        <Route path='/event' element = {<EventPage/>}>
            <Route path='one' element = {<p>첫 주문시 양배추즙 서비스</p>}/>
            <Route path='two' element = {<p>생일기념 쿠폰받기</p>}/>
          </Route>
      </Routes>
    </Suspense>

          {
            load == true ? <h4>로딩중입니다.</h4> : null
          }

    </div>
  );
}

function EventPage(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}


function About(){
  return (
    <div>
      <h4>회사 정보임</h4>
      <Outlet></Outlet> {/* 위 Nested routes의 element 보여줄 자리*/}
    </div>
  )
}

function Card(props){
      return(
        <div className="col-md-4">
          <img src={'https://codingapple1.github.io/shop/shoes' + (props.i+1) +'.jpg'}  width="80%"/>
          <h4>{props.shoes.title}</h4>
          <p>{props.shoes.price}</p>
        </div>
      )
}



export default App;
