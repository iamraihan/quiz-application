import scoreImg from "../assets/results.png";
const FinalScore = ({ score, setShowResult, setCurrentQuestion, setScore }) => {
  const clearLocalDataHandler = () => {
    localStorage.removeItem("items");
    setShowResult(false);
    setCurrentQuestion(0);
    setScore(0);
  };
  return (
    <div>
      {/* I can use image components for this but i use img because i have not cdn right now like digital ocean or vercel has limit to use image components */}
      <div className="flex justify-center">
        <img src={scoreImg} alt="Results" />
      </div>
      <div className="flex justify-center mt-5">
        <h2>Final Score {score} correct out of - 10 </h2>
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={() => clearLocalDataHandler()}
          className=" bg-item rounded-lg mb-7 px-6 py-3 font-semibold text-dark cursor-pointer"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default FinalScore;
