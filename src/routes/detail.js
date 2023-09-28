import { useParams } from "react-router-dom";

function Detail(props){

  let {id} = useParams(); // 현재 url의 파라미터 정보(/:id)

// .find() 사용
// https://devinserengeti.tistory.com/20 참고
let 찾은상품 = props.shoes.find(function(x){
  return x.id == id;
});

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

      //   응용문제 :
// Q. 자료의 순서가 변경되면 상세페이지도 고장나는 문제는 어떻게 해결할까요?
//  현재 /:id 자리에 입력한 값과 영구번호가 같은 상품을 찾아서 데이터바인딩
       <div className="container">
        <div className="row">
            <div className="col-md-6">
              <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
              </div>
              <div className="col-md-6">
              <h4 className="pt-5">{찾은상품.title}</h4>
              <p>{찾은상품.content}</p>
              <p>{찾은상품.price}원</p>
              <button className="btn btn-danger">주문하기</button> 
            </div>
        </div>
      </div> 
    )
  }

export default Detail;