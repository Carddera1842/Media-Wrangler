import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Services/AuthContext";
import "./Answers.css"

const QuestionDetail = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        setLoading(true);

        const questionResponse = await fetch(
          `http://localhost:8080/questions/${questionId}`
        );
        if (!questionResponse.ok) {
          throw new Error("Failed to fetch question details");
        }
        const questionData = await questionResponse.json();
        setQuestion(questionData);

        const answersResponse = await fetch(
          `http://localhost:8080/answers/${questionId}`
        );
        if (!answersResponse.ok) {
          throw new Error("Failed to fetch answers");
        }
        const answersData = await answersResponse.json();
        setAnswers(answersData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuestionDetails();
  }, [questionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to submit an answer.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/answers/response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answerText: answerText,
          user: { id: user.id },
          question: { id: question.id },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit answer");
      }

      const newAnswer = await response.json();
      setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
      setAnswerText("");
    } catch (err) {
      console.error("Error submitting answer:", err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!question) return <p>Question data is unavailable.</p>;

  return (
    <div className="answer-container">
      <div className="answer-box">
        <h2 className="answer-title">{question.questionText}</h2>
        
      <div className="mt-5">
        {answers.length > 0 ? (
          <ul className="answer-list">
            {answers.map((answer) => (
              <li key={answer.id} className="answers">
                <p className="answer"><strong>{answer.answerText}</strong></p>
                <p className="answer">Posted by: {answer.user.username}</p>
                <p className="answer">{" "}{new Date(answer.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No answers yet.</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="answer-form-container">
          <textarea
            className="answer-textarea"
            placeholder="Enter your answer"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="answer-button">
            Submit Answer
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default QuestionDetail;