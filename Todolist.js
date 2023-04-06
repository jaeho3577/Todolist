const btn = document.getElementById('btn'); //버튼
let addValue = document.getElementById('addValue'); //할일 입력
let result = document.getElementById('result');// 추가된 할일


window.addEventListener("load", function(){
    let savedList = localStorage.getItem("todoList");
    if(savedList !== null){ // 저장된 목록이 있다면
      result.innerHTML = savedList; // 목록 불러오기
      // 각 삭제 버튼에 이벤트 리스너 추가
      let deleteButtons = document.querySelectorAll("li button");
      for(let i=0; i<deleteButtons.length; i++){
        deleteButtons[i].addEventListener("click", deleteList);
      }
    }
  });




addValue.addEventListener("keydown", function(event){
    if(event.keyCode === 13){ // 엔터키를 누른 경우
      event.preventDefault(); // 기본 동작 (페이지 새로고침) 막기
      addTodo(); // 할일 추가 함수 호출
    }
  });


//할일 추가시
function addTodo(){
    if(addValue.value==false){ /*''가능 */
        alert('내용을 입력하세요!');
    }else{
    let list = document.createElement("li");
    let del = document.createElement('button');
    list.innerHTML = addValue.value;
    result.appendChild(list); //추가된 할일에 할일 리스트 추가하기
    list.appendChild(del);    //할일 리스트 추가시 삭제버튼도 추가    
    del.innerText = "x";      //삭제버튼에 들어갈 'x'자 문자
    del.style.fontSize = "20px";
    del.style.border = "none";
    del.style.float = "right";
    del.style.right = "17px";
    del.style.marginTop = "10px";
    del.style.cursor = "pointer";
    del.addEventListener("click", deleteList); //삭제버튼 클릭시 리스트지우기 이벤트 실행
    del.style.position='relative';




    // 로컬 스토리지에 목록 추가하기  2222
    localStorage.setItem("todoList", result.innerHTML);
    
    
    
    addValue.value = "";                            //할일 입력창 초기화
    addValue.focus();                               //강제 커서 깜빡임
    list.addEventListener("click", function(){      //할일 완료 후 클릭시 밑줄로 표시
        list.style.textDecoration = "line-through";
        list.style.color = "gray";                  //클릭시 색변환
    })
}
}
//할일 목록 삭제시
function deleteList(e){ //삭제 버튼(x) 클릭시 
    let removeOne = e.target.parentElement;  //선택한 목록 한개만 지우기(부모 객체를 지운다)
    removeOne.remove();

    // 로컬 스토리지에서 목록 제거하기 333333333
  localStorage.setItem("todoList", result.innerHTML);


}
// //모두 삭제시
function allClearList(e){
    if(confirm("모두 삭제하시겠습니까?")==true){ //취소메시지가 true(ok)일때
        if(result.innerText==''){                      //목록칸이 비어있다면
            alert("삭제할 목록이 없습니다");            //삭제할 목록이 없다는 경고창뜨기
        }else{                                         //삭제할 목록이 있다면
            result.innerText=''; 
            localStorage.removeItem("todoList"); // 로컬 스토리지에서 목록 모두 제거하기                     
        }
    }else{                                      //취소메시지가 false(no)일때
        return false;                           //삭제 취소
    }
}



