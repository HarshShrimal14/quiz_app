import React, { useState , useEffect} from 'react'
import { QuizData } from '../Data/QuizData'
import QuizResult from './QuizResult';
function Quiz() {
    const [currentQuestion,setCurrentQuestion]=useState(0);
    const [score,setScore] = useState(0);
    const [clickedOption,setClickedOption]=useState(0);
    const [showResult,setShowResult]=useState(false);
    
    const changeQuestion = ()=>{
        updateScore();
        if(currentQuestion< QuizData.length-1){
            setCurrentQuestion(currentQuestion+1);
            setClickedOption(0);
        }else{
            setShowResult(true)
        }
    }
    const updateScore=()=>{
        if(clickedOption===QuizData[currentQuestion].answer){
            setScore(score+1);
        }
    }
    const resetAll=()=>{
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(0);
        setScore(0);
    }
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [canTakeQuiz, setCanTakeQuiz] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
      setCanTakeQuiz(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
      setCanTakeQuiz(false);
    }
  };
  useEffect(() => {
    // Check if the document is in full-screen mode
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
      setCanTakeQuiz(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);
  const showBlockerPopup = !isFullScreen;
  return (
    <div>
        <p className="heading-txt">Quiz APP</p>
       {canTakeQuiz &&
        <div className="container">
            {showResult ? (
                <QuizResult score={score} totalScore={QuizData.length} tryAgain={resetAll}/>
            ):(
            <>
            <div className="question">
                <span id="question-number">{currentQuestion+1}. </span>
                <span id="question-txt">{QuizData[currentQuestion].question}</span>
            </div>
            <div className="option-container">
                {QuizData[currentQuestion].options.map((option,i)=>{
                    return(
                        <button 
                        // className="option-btn"
                        className={`option-btn ${
                            clickedOption == i+1?"checked":null
                        }`}
                        key={i}
                        onClick={()=>setClickedOption(i+1)}
                        >
                        {option}
                        </button>
                    )
                })}                
            </div>
            <input type="button" value="Next" id="next-button" onClick={changeQuestion}/>
            </>)}
        </div>}
        <button onClick={toggleFullScreen}>
        {isFullScreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
      </button>

      {/* Show the blocker popup if not in full-screen */}
      {!canTakeQuiz && (
        <div className="blocker-popup">
          <p className='full-screen'>Please take the quiz in full-screen mode.</p>
        </div>
      )}
    </div>
  )
}

export default Quiz