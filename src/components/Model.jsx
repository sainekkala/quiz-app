import React from 'react'
import "./Model.css"
import { useData } from '../context/Context';

function Model() {
  const {model, closemodel, correct, questions} = useData();
  return (
    <div className={`${model ? "modal-container isOpen" : "modal-container"}`}>
    <div className="modal-content">
      <h2>congrats</h2>
      <p>You answered {((correct / questions.length) * 100).toFixed(0)}%</p>
      <button className="close-btn" onClick={closemodel}>
        play again
      </button>
    </div>
  </div>
  )
}

export default Model;
