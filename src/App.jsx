import { useState } from "react"
import Quiz from "./components/Quiz"
import questions from './questions.json'
import htmllogo from "./images/html_logo.jpeg"
import csslogo from "./images/css_logo.png"
import jslogo from "./images/js_logo.png"
import accesslogo from "./images/access_logo.png"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [finalScore, setFinalScore] = useState(0)

  const subjects = [
    { name: "html", icon: htmllogo },
    { name: "css", icon:csslogo},
    { name: "javascript", icon: jslogo},
    { name: "accessibility", icon: accesslogo },
  ]

  const handleQuizComplete = (score) => {
    setFinalScore(score)
    setQuizCompleted(true)
  }

  const handleReset = () => {
    setSelectedSubject(null)
    setQuizCompleted(false)
    setFinalScore(0)
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 px-4 py-8 md:px-8 lg:px-12">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-16">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400">☀️</span>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300 dark:bg-purple-600"
            >
              <span className="sr-only">Toggle theme</span>
              <span
                className={`${
                  isDarkMode ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </button>
            <span className="text-slate-600 dark:text-slate-400">🌙</span>
          </div>
        </div>

        {/* Main Content */}
        {!selectedSubject ? (
          // Welcome Screen
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row  gap-6">
            <div className="mb-12 md:mb-16 flex-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                Welcome to the
                <br />
                Frontend Quiz!
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Pick a subject to get started.
              </p>
            </div>

            <div className="space-y-4 flex-1">
              {subjects.map((subject) => (
                <button
                  key={subject.name}
                  onClick={() => setSelectedSubject(subject.name)}
                  className="w-full group bg-white dark:bg-slate-800 rounded-xl p-4 flex items-center gap-4 transition-transform hover:transform hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <img 
                      src={subject.icon} 
                      alt={`${subject.name} icon`}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <span className="text-xl font-medium text-slate-900 dark:text-white capitalize">
                    {subject.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : quizCompleted ? (
          // Quiz Complete Screen
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Quiz Complete!
            </h1>
            <p className="text-xl mb-8 text-slate-600 dark:text-slate-400">
              You scored {finalScore} out of {questions[selectedSubject].length}
            </p>
            <button
              onClick={handleReset}
              className="bg-purple-600 text-white rounded-xl py-4 px-6 font-medium text-xl hover:bg-purple-700 transition-colors"
            >
              Try Another Quiz
            </button>
          </div>
        ) : (
          // Quiz Questions
          <Quiz
            subject={selectedSubject}
            questions={questions[selectedSubject]}
            onComplete={handleQuizComplete}
          />
        )}
      </div>
    </div>
  )
}

export default App

