// 퀴즈 문제 데이터
const quizData = [
  {
    question: 'span 태그는 인라인(inline) 형식으로 크기 지정이 가능하다.',
    options: ['O', 'X'],
    answers: 2,
    explanation:
      'span 태그는 인라인 형식이므로 크기 지정이 불가능합니다. 크기 지정이 가능한 형식은 블록(block) 형식입니다.',
  },
  {
    question: 'input 관련 속성에서 필수 입력 필드로 지정 가능한 속성은?',
    options: ['required', 'disabled', 'checked', 'readonly'],
    answers: 1,
    explanation:
      'disabled는 입력 필드를 비활성화, checked는 체크박스나 라디오 버튼의 초기 선택 상태를 지정, readonly는 입력 필드를 읽기 전용으로 지정하는 속성입니다.',
  },
  {
    question: 'id가 중복되면 JS에서는 문제가 없지만 CSS에서는 문제가 발생한다.',
    options: ['O', 'X'],
    answers: 2,
    explanation:
      'id 중복 문제는 CSS에서는 문제가 없고 JS에서 문제가 발생합니다.',
  },
  {
    question: '클래스 선택자의 형태로 올바른 것은?',
    options: ['.클래스명', '#클래스명', '!클래스명', '*클래스명'],
    answers: 1,
    explanation: '클래스 선택자의 형태는 .클래스명 입니다.',
  },
  {
    question:
      '반응 선택자인 active와 hover 중 우선 순위가 더 높은 것은 active이다.',
    options: ['O', 'X'],
    answers: 1,
    explanation:
      '동시 반응 시 조금 더 구체적인 반응이 우선순위가 높으므로 active가 더 높습니다.',
  },
  {
    question: '카멜 케이스(camel case)로 올바른 것은?',
    options: ['camel_case', 'camelCase', 'camel-case', 'CamelCase'],
    answers: 2,
    explanation:
      '카멜 케이스는 중간 단어들은 대문자로 시작하지만 첫 단어가 소문자로 시작하는 표기법으로 낙타와 모양이 비슷하여 카멜 케이스라고 합니다.',
  },
  {
    question: 'null은 자바스크립트 엔진이 변수를 초기화할 때 사용하는 값이다.',
    options: ['O', 'X'],
    answers: 2,
    explanation:
      'null은 변수에 값이 없다는 것을 개발자가 의도적으로 명시할 때 사용하는 값입니다. 자바스크립트 엔진이 변수를 초기화할 때 사용하는 값은 undefined로 undefined는 개발자가 의도적으로 변수에 할당하지 않는 것이 좋습니다.',
  },
  {
    question:
      'CSS 선택자가 일치하는 요소 중 첫 번째 문서 객체를 선택하는 메서드는?',
    options: [
      'document.getElementById()',
      'document.querySelector()',
      'document.querySelectorAll()',
      'document.getElementsByName()',
    ],
    answers: 2,
    explanation:
      'document.getElementById()는 ID로 단일 문서 객체 선택, document.querySelectorAll()는 CSS 선택자가 일치하는 모든 문서 객체를 선택, document.getElementsByName()은 클래스 이름으로 문서 객체들을 선택하는 메서드입니다.',
  },
  {
    question:
      "특정 요소의 직계 자식 요소만 선택하는 자손 선택자는 '선택자A 선택자B'의 형태로 나타낸다.",
    options: ['O', 'X'],
    answers: 2,
    explanation:
      "'선택자A 선택자B'는 후손 선택자의 형태입니다. 자손 선택자는 '선택자A > 선택자B'의 형태로 나타냅니다.",
  },
  {
    question: '다음 중 상태 선택자가 아닌 것은?',
    options: [':enabled', ':disabled', ':first-child', ':focus'],
    answers: 3,
    explanation: ':first-child는 첫번째 자식을 선택하는 구조 선택자입니다.',
  },
];

// 변수 초기화
let currentQuestion = 1; // 첫 번째 문제부터 시작
score = 0;
let userAnswers = new Array(quizData.length).fill(-1);

//퀴즈화면
const quizContainer = document.querySelector('.quiz-container');
const buttonContainer = document.getElementById('mv-btns');
const questionElement = document.getElementById('question');
const optionsContainer = document.querySelector('.options');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const startButton = document.getElementById('start-btn');
const resultsElement = document.getElementById('results');
const selectMoveBtnElement = document.querySelector('.mv-btn-container');
//결과 화면
const reButtonContainer = document.getElementById('button-container'); //결과화면 버튼 컨테이너
const correctAnswerElement = document.getElementById('correctAnswer'); //정답 여부 표시
const reQuestionElement = document.getElementById('resultQuestion'); //결과화면 - 문제
const scoreElement = document.getElementById('score'); //결과화면 - 총점 출력
const myAnswerElement = document.getElementById('resultMyAnswer'); //결과화면 - 나의 답변
const answerElement = document.getElementById('resultAnswer'); ///결과화면 - 정답 출력
const explanationElement = document.getElementById('resultExplanation'); //결과화면 -설명 출력
const resetButton = document.getElementById('retry-btn'); //결과화면 - 리셋버튼

const alert = document.getElementById('alert');
const alertContent = document.getElementById('alert-content');
const alertButton = document.getElementById('alert-btn');

// 사용자 선택지 선택/저장 함수
function selectOption(currentOption, questionIndex, optionIndex) {
  const optionButtons = document.querySelectorAll('.quiz-option');
  optionButtons.forEach((item) => item.classList.remove('selected'));
  userAnswers[questionIndex - 1] = optionIndex;
  currentOption.classList.add('selected');
  console.log(userAnswers);
}

function checkQuestion(questionIndex) {
  const quizButton = document.querySelectorAll(
    `.quiz-button[data-index="${questionIndex}"]`
  )[0];
  if (quizButton.textContent.startsWith('✅') === false) {
    quizButton.textContent = '✅' + quizButton.textContent;
  }
}

// 문제 로드 함수
function loadQuestion(questionIndex) {
  const currentQuizData = quizData[questionIndex - 1];
  // 문제 텍스트 업데이트
  questionElement.textContent = `${questionIndex}. ${currentQuizData.question}`;
  // 선택지 초기화
  optionsContainer.innerHTML = '';
  // 선택지 버튼 생성
  currentQuizData.options.forEach((option, index) => {
    const optionButton = document.createElement('button');
    optionButton.classList.add('quiz-option');
    // 선택 답안 남아있도록 수정
    if (
      userAnswers[questionIndex - 1] !== -1 &&
      userAnswers[questionIndex - 1] === index + 1
    ) {
      optionButton.classList.add('selected');
    }
    optionButton.textContent = option;
    optionButton.dataset.index = index + 1;
    // 정답 확인 기능 추가
    optionButton.addEventListener('click', () => {
      if (index + 1 === currentQuizData.answers) {
        // alert('정답입니다! ✅');
        alertContent.innerHTML = '정답입니다! ✅';
        alert.style.display = 'block';
      } else {
        alertContent.innerHTML = `틀렸습니다. ❌<br/><br/>설명: ${currentQuizData.explanation}`;
        alert.style.display = 'block';
        // alert(`틀렸습니다. ❌\n\n설명: ${currentQuizData.explanation}`);
      }
      selectOption(optionButton, questionIndex, index + 1);
      checkQuestion(questionIndex);
    });

    optionsContainer.appendChild(optionButton);
  });
}

alertButton.addEventListener('click', () => {
  alert.style.display = 'none';
});

// "이전" 버튼 클릭 이벤트
prevButton.addEventListener('click', () => {
  if (currentQuestion === 1) {
    alertContent.innerHTML = '첫 문제입니다.';
    alert.style.display = 'block';
  } else {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
});

// "다음" 버튼 클릭 이벤트
nextButton.addEventListener('click', () => {
  if (currentQuestion === quizData.length) {
    alertContent.innerHTML = '마지막 문제입니다.';
    alert.style.display = 'block';
  } else {
    currentQuestion++;
    loadQuestion(currentQuestion);
  }
});

// 문제 선택 버튼 클릭 이벤트 리스너 추가
buttonContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('quiz-button')) {
    const questionIndex = Number(event.target.dataset.index);
    currentQuestion = questionIndex;
    loadQuestion(currentQuestion);
  }
});

// 문제 선택 버튼 동적 생성
buttonContainer.innerHTML = Array.from(
  { length: quizData.length },
  (_, i) =>
    `<button class="quiz-button" data-index="${i + 1}">문제 ${i + 1}</button>` +
    (i === 4 ? `<br>` : ``)
).join('');

// 제출 버튼 눌렀을 때 이벤트 리스너
submitButton.addEventListener('click', () => {
  quizContainer.style.display = 'none';
  buttonContainer.style.display = 'none';
  selectMoveBtnElement.style.display = 'none';

  resultsElement.style.display = 'block';
  loadScore();
  resultLoadQuestion(1); //1번 문제 출력
});

// 시작 버튼 눌렀을 때 이벤트 리스너
startButton.addEventListener('click', () => {
  questionElement.style.display = 'block';
  selectMoveBtnElement.style.display = 'block';
  prevButton.style.display = 'inline-block';
  nextButton.style.display = 'inline-block';
  submitButton.style.display = 'inline-block';

  startButton.style.display = 'none';

  // 첫 번째 문제 로드
  loadQuestion(currentQuestion);
});

// 결과페이지 문제 바로이동 로드
function resultLoadQuestion(currentQuestion) {
  // 문제
  const currentQuizData = quizData[currentQuestion - 1];
  reQuestionElement.textContent = `${currentQuestion}. ${currentQuizData.question}`;

  // OX 문제인지 확인 (선택지가 'O', 'X'인지 체크)
  const isOXQuestion =
    currentQuizData.options.length === 2 &&
    currentQuizData.options.includes('O') &&
    currentQuizData.options.includes('X');

  // 나의 답변 (배열 범위 초과 방지)
  const myAnswerData = userAnswers[currentQuestion - 1];
  let myAnswerText = '미선택';
  if (myAnswerData > 0 && myAnswerData <= currentQuizData.options.length) {
    myAnswerText = isOXQuestion
      ? myAnswerData === 1
        ? 'O'
        : 'X'
      : currentQuizData.options[myAnswerData - 1];
  }
  myAnswerElement.textContent = `[ 내 답변 ] ` + myAnswerText;

  // 정답
  let answerText = '알 수 없음';
  if (
    currentQuizData.answers > 0 &&
    currentQuizData.answers <= currentQuizData.options.length
  ) {
    answerText = isOXQuestion
      ? currentQuizData.answers === 1
        ? 'O'
        : 'X'
      : currentQuizData.options[currentQuizData.answers - 1];
  }
  correctAnswerElement.textContent =
    myAnswerText == answerText ? `💖💖 정답!!! 💖💖` : `❌❌ 땡 ❌❌`;
  answerElement.textContent = `[ 정답 ] ${answerText}`;

  // 해설
  explanationElement.textContent = `[ 해설 ] ${currentQuizData.explanation}`;
}

// 결과화면 문제 선택 버튼 동적 생성
reButtonContainer.innerHTML = Array.from(
  { length: quizData.length },
  (_, i) =>
    `<button id="result-button" class="quiz-button" data-index="${
      i + 1
    }">결과 ${i + 1}</button>` + (i === 4 ? `<br>` : ``)
).join('');

// 결과화면의 문제번호 버튼 클릭 이벤트 리스너
reButtonContainer.addEventListener('click', (event) => {
  //if (event.target.classList.contains('result-button')) {
  const questionIndex = Number(event.target.dataset.index);
  currentQuestion = questionIndex;
  resultLoadQuestion(currentQuestion);
  //}
});

// 결과 페이지 버튼 클릭 시 1회 실행
function loadScore() {
  for (let i in userAnswers) {
    let userAnswer = userAnswers[i];
    let answer = `${quizData[i].answers}`;
    userAnswer == answer ? score++ : score;
  }
  console.log('정답 개수', score);
  scoreElement.textContent = `총점 : ${score}점 / ${quizData.length}점`;
}

// 다시 입력하기 버튼 클릭 시 폼으로 돌아가기
resetButton.addEventListener('click', function () {
  userAnswers = new Array(quizData.length).fill(-1);
  window.location.href = 'index.html'; // 초기화면으로 이동
});
