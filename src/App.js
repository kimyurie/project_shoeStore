import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardGroup, Container, Nav, Navbar} from 'react-bootstrap';
import bg from './img/bg.png';
import { useState } from 'react';
import data from './data';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import Detail from './routes/detail';

function App() {
  // 상품 데이터 넣기 - 많은 데이터는 따로 data.js 에 저장해서 불러오는 방식으로
  // use~ => 훅 (유용한 것들 들어있는 함수같은거)
  let [shoes] = useState(data);
  let navigate = useNavigate();  // 페이지 이동 도와줌

  return (
    <div className="App">

       <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Shop</Navbar.Brand>
          <Nav className="me-auto">
            {/* 페이지 이동 버튼 */}
            {/* <Link to="/">홈</Link>
            <Link to="/detail">상세페이지</Link> */}
            <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
            {/* navigate(-1)은 뒤로가기 1은 앞으로 가기 */}
            <Nav.Link onClick={() => {navigate('/detail')}}> Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>



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
            </>
          </div>}/>
          <Route path='/detail' element= {<Detail/>}/>
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
