import React from "react";
import "./HomePage.css";
import { useData } from "../context/Context";

function HomePage () {
    const {quiz, handlechange, handleSubmit,error} = useData();
    return(
        <>
         <div className="container">
            <div className="row">
                <div className="col-sm">
                    <form className="form" onSubmit={handleSubmit}>
                        <h2 className="heading">Setup Quiz</h2>
                        <div className="form-controll">
                            <label htmlFor="no of questions">Number of Questions</label>
                            <input 
                            className="form-input"
                            type="number"
                            name="amount" 
                            id="no of questions"
                            min={1}
                            max={50}
                            value={quiz.amount}
                            onChange={handlechange}
                            />
                        </div>
                        <div className="form-controll">
                            <label htmlFor="category">Category</label>
                            <select id="category" name="category" className="form-input"
                            value={quiz.category}
                            onChange={handlechange}
                            >
                                <option value="sports">sports</option>
                                <option value="history">history</option>
                                <option value="politics">politics</option>
                            </select>
                        </div>
                        <div className="form-controll">
                            <label htmlFor="difficulty">difficulty</label>
                            <select id="difficulty" name="difficulty" className="form-input"
                            value={quiz.difficulty}
                            onChange={handlechange}
                            >
                                <option value="easy">easy</option>
                                <option value="medium">medium</option>
                                <option value="hard">hard</option>
                            </select>
                        </div>
                        <div className="error">
                           {error &&  <p>can't generates questions , pls try again</p>}
                        </div>
                        <button className="submit-btn" >Start Quiz</button>
                    </form>
                </div>
            </div>
         </div>
        </>
    )
};

export default HomePage;