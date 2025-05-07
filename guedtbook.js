const sendButton = document.querySelector(".commentInput button"); //send버튼
const nameInput = document.querySelector(".nameInput input"); //닉네임
const commentInput = document.querySelector(".commentInput input"); //내용
const apiUrl = "http://13.125.189.218:8080/articles"; // 서버 API 주소

//코멘트 추가
sendButton.addEventListener("click", function () {
  const nickname = nameInput.value;
  const commentText = commentInput.value;

  if (nickname === "" || commentText === "") {
    alert("닉네임과 메시지를 모두 입력하세요!");
    return;
  }

  const newComment = {
    nickname: nickname,
    content: commentText,
  }; // 새로운 코멘트 객체 생성

  fetch(apiUrl, {
    method: "POST", // POST 요청을 보내기
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
    .then(() => {
      nameInput.value = "";
      commentInput.value = "";
      alert("방명록이 등록되었습니다!");
      getComment();
    })

    .catch((error) => {
      console.error("할 일 추가 실패:", error);
    });
});

//서버에서 코멘트 목록 가져오기
const getComment = async () => {
  try {
    let response = await fetch(apiUrl);
    let data = await response.json();

    const commentList = document.querySelector(".chat-messages"); // 방명록 전체를 담을 곳
    commentList.innerHTML = ""; // 기존 목록 초기화

    data.forEach((comment) => {
      // comment박스 만들기
      const commentBox = document.createElement("div");
      commentBox.classList.add("message");

      //아이콘
      const logoMini = document.createElement("img");
      logoMini.src = "logoMini.png";
      logoMini.alt = "미니로고아이콘";
      logoMini.classList.add("logoMini-icon");

      // 닉네임 요소 생성
      const nicknameEl = document.createElement("span");
      nicknameEl.classList.add("sender");
      nicknameEl.textContent = comment.nickname;

      //날짜 요소 생성
      const date = document.createElement("span");
      date.classList.add("date");
      date.textContent = comment.createdAt;

      // 메시지 요소 생성
      const commentEl = document.createElement("p");
      commentEl.classList.add("text");
      commentEl.textContent = comment.content;

      // 하위 요소들 추가
      commentBox.appendChild(logoMini);
      commentBox.appendChild(nicknameEl);
      commentBox.appendChild(date);
      commentBox.appendChild(commentEl);

      // 전체 목록에 추가
      commentList.prepend(commentBox);
    });
  } catch (err) {
    console.error("방명록 불러오기 실패:", err);
    alert("등록에 실패했습니다. 다시 시도해 주세요.");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  getComment();
});
