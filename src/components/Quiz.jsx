import { useState } from "react";

export default function Quiz({ subject, questions, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      onComplete(score);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Subject Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-white dark:bg-slate-800 rounded-lg">
          {subject === "html" && "🌐"}
          {subject === "css" && "🎨"}
          {subject === "javascript" && "📜"}
          {subject === "accessibility" && "♿"}
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white capitalize">
          {subject}
        </h2>
      </div>

      {/* Progress Text */}
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="max-w-2xl flex-1">
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Question {currentQuestion + 1} of {questions.length}
          </p>

          {/* Question */}
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
            {questions[currentQuestion].question}
          </h1>
        </div>

        <div className="max-w-3xl flex-1">
          {/* Options */}
          <div className="space-y-4 mb-8">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(option)}
                className={`w-full text-left bg-white dark:bg-slate-800 rounded-xl p-4 flex items-center gap-4 transition-all
              ${
                selectedAnswer === option
                  ? "ring-2 ring-purple-500 dark:ring-purple-400"
                  : "hover:translate-x-2"
              }`}
              >
                <div className="w-10 h-10 flex items-center justify-center text-xl font-medium bg-slate-100 dark:bg-slate-700 rounded-lg">
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-xl font-medium text-slate-900 dark:text-white">
                  {option}
                </span>
              </button>
            ))}
          </div>
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="w-full bg-purple-600 text-white rounded-xl py-4 px-6 font-medium text-xl
          disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
          >
            Submit answer
          </button>
        </div>
      </div>
    </div>
  );
}
