const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Patient presents with shortness of breath, chest pain, and a cough.',
    answers: [
      { text: 'Pneumonia', correct: true },
      { text: 'Bronchitis', correct: false }
    ]
  },
  {
    question: 'Patient presents with a fever, sore throat, and swollen glands.',
    answers: [
      { text: 'Strep throat', correct: true },
      { text: 'Common cold', correct: false },
      { text: 'Flu', correct: false },
      { text: 'Mono', correct: false }
    ]
  },
  {
    question: 'Patient presents with fatigue, weight gain, and sensitivity to cold.',
    answers: [
      { text: 'Diabetes', correct: false },
      { text: 'Hypothyroidism', correct: true },
      { text: 'Anemia', correct: false },
    ]
  },
  {
    question: 'Patient presents with a rash that spreads from the face to the body, along with fever and fatigue.',
    answers: [
      { text: 'Shingles', correct: false },
      { text: 'Measles', correct: true }
    ]
  },
  {
    question: 'Patient presents with abdominal pain, bloating, and constipation.',
    answers: [
      { text: 'Crohns disease', correct: false },
      { text: 'Irritable bowel syndrome (IBS)', correct: true },
      { text: 'Diverticulitise', correct: false }
    ]
  },
  {
    question: 'Patient presents with abdominal pain, nausea, and yellowing of the skin and eyes',
    answers: [
      { text: 'Liver Disease', correct: true },
      { text: 'Gallstones', correct: false }
    ]
  },
  {
    question: 'Patient presents with a sudden and severe headache, along with vomiting and confusion.',
    answers: [
      { text: 'Migraine', correct: false },
      { text: 'Stroke', correct: true }
    ]
  },
  {
    question: 'Patient presents with a fever, headache, and stiff neck.',
    answers: [
      { text: 'Encephalitis', correct: false },
      { text: 'Meningitis', correct: true },
      { text: 'Lyme disease', correct: false }
    ]
  }
]