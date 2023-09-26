import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardGroup, Container, Nav, Navbar} from 'react-bootstrap';
import bg from './img/bg.png';
import { useState } from 'react';
import data from './data';


function App() {
  // 상품 데이터 넣기 - 많은 데이터는 따로 data.js 에 저장해서 불러오는 방식으로
  let [shoes] = useState(data);

  return (
    <div className="App">
       <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

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
    </div>
  );
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
