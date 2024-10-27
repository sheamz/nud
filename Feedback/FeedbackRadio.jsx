import React from "react";
import "./FeedbackRadio.css";
import { useState, useEffect } from "react";
import axios from "axios";

function FeedbackRadio({ handleChange, responses }) {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("Form submitted");
  //   console.log(responses);
  // };

  // const [responses, setResponses] = useState({});
  // const handleChange = (questionIndex, value) => {
  //   setResponses((prevResponses) => ({
  //     ...prevResponses,
  //     [questionIndex]: value,
  //   }));
  // };

  const questions = [
    "How would you rate the variety and quality of events at NU?",
    "How satisfied are you with the condition of campus facilities (e.g., classrooms, study spaces, gym)?",
    "How would you rate the support for students’ mental health and well-being at NU?",
    "How would you rate the quality of academic programs at NU?",
    "How would you rate the overall sense of community at NU?",
    "How would you rate the accessibility and inclusiveness of NU’s campus and services?",
    "How likely are you to recommend NU to other students?",
  ];

  const options = [
    "Very Satisfied",
    "Satisfied",
    "Neutral",
    "Unsatisfied",
    "Very Unsatisfied",
  ];

  return (
    <div className="feedback-radio" style={{margin: '65px'}}>
      <ul>
        <li id="form-field-3" className="likert">
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>&nbsp;</th>
                {options.map((option, idx) => (
                  <td key={idx}>{option}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "statement" : "alt statement"}
                >
                  <th>
                    <label htmlFor={`Field${index + 3}`}>{question}</label>
                  </th>
                  {options.map((option, idx) => (
                    <td key={idx} title={option}>
                      <input
                        id={`Field${index + 3}_${idx + 1}`}
                        name={`Field${index + 3}`}
                        type="radio"
                        value={option}
                        onChange={() => handleChange(index, option)}
                      />
                      <label htmlFor={`Field${index + 3}_${idx + 1}`}></label>{" "}
                      {/* Custom label for styling */}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </li>
      </ul>
    </div>
  );
}

export default FeedbackRadio;
