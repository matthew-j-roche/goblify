import { useEffect, useState } from 'react'
import pazuzuTransparentImage from "../assets/pazuzuTransparent.png"
import { useAuth } from '../Contexts/AuthContext';

  
function Gobxam() {
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  } = useAuth();
  console.log(authUser);
  console.log(isLoggedIn);

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/gobxam-questions');
        const data = await response.json();
        if (Array.isArray(data) && data.length === 4) {
          setQuestions(data);
          setQuestion(data[0].question);
          setChoices([
            data[0].choice1,
            data[0].choice2,
            data[0].choice3,
            data[0].choice4
          ]);
          setCorrectAnswer(data[0].correct_answer);
        } else {
          console.error('Invalid response format or missing questions');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const onClickNext = async () => {
    const isAnswerCorrect = selectedAnswer === correctAnswer;

    setResult((prev) => ({
      ...prev,
      score: isAnswerCorrect ? prev.score + 5 : prev.score,
      correctAnswers: isAnswerCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      wrongAnswers: isAnswerCorrect ? prev.wrongAnswers : prev.wrongAnswers + 1,
    }));

    if (activeQuestion + 1 < questions.length) {
      setActiveQuestion((prev) => prev + 1);
      setQuestion(questions[activeQuestion + 1].question);
      setChoices([
        questions[activeQuestion + 1].choice1,
        questions[activeQuestion + 1].choice2,
        questions[activeQuestion + 1].choice3,
        questions[activeQuestion + 1].choice4
      ]);
      setCorrectAnswer(questions[activeQuestion + 1].correct_answer);
      setSelectedAnswer('');
      setSelectedAnswerIndex(null);
    } else {
      setShowResult(true);

      try {
        const data = {
          user_id: authUser.id,
          score: result.score
        };
        const response = await fetch('/user-gobxams', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        response
          .json()
          .then(data => {
            if (data.message === 'You have already taken the Gobxam for today.') {
              console.log(data.message);
            } else {
              console.log(data.message);
            }
          })
          .catch(error => {
            console.error('Error', error);
          });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
    
    const onAnswerSelected = (answer, index) => {
      setSelectedAnswer(answer);
      setSelectedAnswerIndex(index);
    };    
  
    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)
  
    return (
      <div className="quiz-container">
        {!showResult ? (
          <div>
            <div>
              <span className="active-question-no">
                {addLeadingZero(activeQuestion + 1)}
              </span>
              <span className="total-question">
                /{addLeadingZero(questions.length)}
              </span>
            </div>
            <h2>{question}</h2>
            <ul>
              {choices.map((answer, index) => (
                <li
                  onClick={() => onAnswerSelected(answer, index)}
                  key={answer}
                  className={
                    selectedAnswerIndex === index ? 'selected-answer' : null
                  }
                >
                  {answer}
                </li>
              ))}
            </ul>
            <div className="flex-right">
              <button
                onClick={onClickNext}
                disabled={selectedAnswerIndex === null}
              >
                {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        ) : (
          <div className="result">
            <h3>Result</h3>
            <p>
              Total Question: <span>{questions.length}</span>
            </p>
            <p>
              Total Score:<span> {result.score}</span>
            </p>
            <p>
              Correct Answers:<span> {result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers:<span> {result.wrongAnswers}</span>
            </p>
          </div>
        )}
      </div>
)}

  export default Gobxam;