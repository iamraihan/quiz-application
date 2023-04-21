import { useEffect, useRef, useState } from "react";
import Score from "./Score";
import Question from "./Question";
import FinalScore from "./FinalScore";
import { FaEdit } from "react-icons/fa";
import Timer from "./Timer";

const QuizeHome = () => {
  //get local storage data
  let localData = JSON.parse(localStorage.getItem("items"));
  const getLocalDataUser = () => {
    if (localData?.userName) {
      return localData?.userName;
    } else {
      return "";
    }
  };
  const getLocalDataQuestion = () => {
    if (localData?.currentQuestion) {
      return localData?.currentQuestion;
    } else {
      return 0;
    }
  };
  const getLocalDataScore = () => {
    if (localData?.score) {
      return localData?.score;
    } else {
      return 0;
    }
  };

  const [quizes, setQuizes] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(getLocalDataScore());
  const [currentQuestion, setCurrentQuestion] = useState(
    getLocalDataQuestion()
  );
  const [userName, setUserName] = useState(getLocalDataUser());
  const userRef = useRef(null);

  // console.log(currentQuestion);
  // console.log(quizes);
  const fetchQuiz = async () => {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
    );
    if (!res) {
      throw new Error("Data couldn't fetched");
    } else {
      return res.json();
    }
  };
  useEffect(() => {
    fetchQuiz()
      .then((res) => {
        // console.log(res.results.length);
        setQuizes(res.results);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const previousHandler = () => {
    if (currentQuestion >= 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const nextHandler = () => {
    if (currentQuestion - 1 <= quizes.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  // input handler

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = userRef.current.value;
    setUserName(name);
    userRef.current.value = "";
  };

  // console.log(setLocalData);
  useEffect(() => {
    const setLocalData = {
      userName,
      currentQuestion,
      score,
    };
    localStorage.setItem("items", JSON.stringify(setLocalData));
  }, [userName, currentQuestion, score]);

  // user name edit handler
  const userNameEdit = () => {};
  return (
    <div className="max-w-2xl mx-auto h-screen flex flex-col justify-center">
      <h2 className="text-dark text-4xl mb-10 text-center">Quizes</h2>

      {!userName && (
        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl py-5">
              You must provide a username to
              <br /> participate in the Q&A{" "}
              <span className="text-red-600">*</span>
            </h2>
            <input
              className="py-2 px-3 bg-item rounded-md"
              type="text"
              ref={userRef}
              placeholder="Name"
            />
            <button
              className="bg-item rounded-lg ml-3 mb-7 px-6 py-2 font-semibold text-dark cursor-pointer"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {/* {userName && <p >Hello, {userName}</p>} */}

      {userName && (
        <div className="">
          <p className="text-center text-lg font-medium">
            Hello,{" "}
            <span className="font-bold text-xl relative ">
              {userName}
              <span
                onClick={() => userNameEdit()}
                className="absolute right-[-24px] cursor-pointer"
              >
                {" "}
                <FaEdit></FaEdit>
              </span>
            </span>
          </p>
          <Score score={score} />
          {showResult ? (
            <FinalScore
              score={score}
              setShowResult={setShowResult}
              setScore={setScore}
              setCurrentQuestion={setCurrentQuestion}
            />
          ) : (
            <Question
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              quizes={quizes}
              setScore={setScore}
              score={score}
              setShowResult={setShowResult}
            />
          )}
          <div>
            <h2 className="text-xl font-semibold text-center">Your Time!</h2>
            <Timer showResult={showResult} />
          </div>
          {!showResult && (
            <div className="flex justify-between">
              <button
                onClick={() => previousHandler()}
                className="bg-item rounded-lg mb-7 px-6 py-3 font-semibold text-dark cursor-pointer "
              >
                Previous
              </button>
              <button
                onClick={() => nextHandler()}
                className=" bg-item rounded-lg mb-7 px-6 py-3 font-semibold text-dark cursor-pointer"
              >
                Skip
              </button>
              <button
                onClick={() => nextHandler()}
                className=" bg-item rounded-lg mb-7 px-6 py-3 font-semibold text-dark cursor-pointer"
                disabled={currentQuestion >= quizes.length}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizeHome;
