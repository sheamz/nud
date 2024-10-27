import React from "react";
import "./FeedbackQuestions.css";
import FeedbackRadio from "./FeedbackRadio";

function FeedbackQuestions({ handleChange, questions }) {
  return (
    <>
      <div className="feedback-question">
        <div className="comment-input">
          <div className="form-floating" style={{ marginBottom: "2%" }}>
            <textarea
              className="form-control"
              id="likeAboutNU"
              style={{ height: "100px" }}
              value={questions.likeAboutNU}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="floatingTextarea1">
              What I like about NU Community is...
            </label>
          </div>

          <div className="form-floating" style={{ marginBottom: "2%" }}>
            <textarea
              className="form-control"
              id="concernsAboutNU"
              style={{ height: "100px" }}
              value={questions.concernsAboutNU}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="floatingTextarea2">
              My concern about NU Community are...
            </label>
          </div>
        </div>

        <div className="form-floating">
          <textarea
            className="form-control"
            id="additionalComments"
            style={{ height: "100px" }}
            value={questions.additionalComments}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="floatingTextarea3">
            Additional questions or comments:
          </label>
        </div>
      </div>
    </>
  );
}

export default FeedbackQuestions;
