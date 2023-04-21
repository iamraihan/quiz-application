import { useRef } from "react";

const Question = ({
  currentQuestion,
  quizes,
  setCurrentQuestion,
  setScore,
  score,
  setShowResult,
}) => {
  const ref = useRef(null);

  //   console.log(quizes);

  let answerList = quizes[currentQuestion]?.incorrect_answers.concat(
    quizes[currentQuestion]?.correct_answer
  );
  let shuffleAns = answerList?.sort((a, b) => 0.5 - Math.random());
  //   let bgColor;
  const getAnsHandler = (ans) => {
    if (ans === quizes[currentQuestion]?.correct_answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < quizes.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };
  return (
    <div>
      <h2 className="text-center text-lg font-medium">
        Question out {currentQuestion + 1} out of {quizes.length}
      </h2>
      <ul>
        <h3 className="text-2xl font-semibold py-5 ">
          {quizes[currentQuestion]?.question}
        </h3>

        {shuffleAns?.map((option, index) => (
          <li
            // style={bgColor}
            onClick={() => getAnsHandler(option)}
            key={index}
            className="bg-item rounded-lg mb-7 px-6 py-7 font-semibold text-dark cursor-pointer  "
            ref={ref}
          >
            <span className="mr-3"> {index + 1}) </span> {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
