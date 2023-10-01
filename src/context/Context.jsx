import React, {useState, useContext } from "react";
import { createContext } from "react";
import axios from "axios"

const AppContext = createContext();

 function ContextProvider ({children}) {
    const [waiting, setWeiting] = useState(true); //waiting
    const [loading, setLoading] = useState(false); //loading
    const [questions, setQuestions] = useState([]); //questions
    const [index, setIndex] = useState(0); //index
    const [correct, setCorrect] = useState(0); //correct
    const [error, setError] = useState(false); //error
    const [quiz, setQuiz] = useState({
        amount: 10,
        category: "sports",
        difficulty: "easy",
    });
    const [model, setModel] = useState(false);
   
    const handlechange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setQuiz({...quiz,[name]: value})
    }
    const table = {
        sports: 21,
        history: 23,
        politics: 24,
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const {amount, category, difficulty} = quiz;
        const Url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
        fetchData(Url);
    }

    const fetchData = async (Url) => {
        setLoading(true)
        setWeiting(false)
         try{
            const response = await axios.get(Url)
            setQuestions(response.data.results)
            setLoading(false)
            setWeiting(false)
            setError(false)
         }catch(error){
            setError(true)
            setWeiting(true)
         }
    };

    const nextQuestion = () => {
        setIndex((oldIndex) => {
            const index = oldIndex + 1;
            if(index > questions.length -1){
                openmodel();
                return 0;
            } else {
                return index;
            }
        });
    };

    const checkanswers = (value) => {
        if(value){
            setCorrect((oldstate) => oldstate + 1);
        }
        nextQuestion();
    }

    const openmodel = () => {
        setModel(true)
    }
    const closemodel = () => {
        setModel(false);
        setWeiting(true);
        setCorrect(0)
    }
   
    return (
        <AppContext.Provider value={{
            quiz,
         handlechange,
          handleSubmit,
           questions,
           index,
           nextQuestion,
           checkanswers,
           waiting,
           loading,
           correct,
           model,
           closemodel,
           error
           }}>
            {children}
        </AppContext.Provider>
    )
};

    export const useData = () => {
        return useContext(AppContext);
    };

    export { AppContext, ContextProvider}