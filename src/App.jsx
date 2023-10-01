import './App.css'
import HomePage from './components/HomePage'
import { useData } from './context/Context'
import Loading from './components/Loading'
import Model from './components/Model'

function App() {
  const{
    questions,
     index,
     nextQuestion,
     checkanswers,
      waiting,
     loading,
     correct
    } = useData();
  if(waiting){
    return <HomePage />
  }
  if(loading){
    return <Loading />
  }
  const {incorrect_answers, correct_answer, question} = questions[index];
  let answers = [...incorrect_answers];
  const randomIndex = Math.floor(Math.random() * 4);
  if(randomIndex === 3){
    answers.push(correct_answer);
  } else {
    answers.push(answers[randomIndex]);
    answers[randomIndex] = correct_answer;
  }
  return (
    <main>
      <Model />
            <section className='quiz'>
              <p className='correct-answers'> Correct Answers :{correct}/{index} </p>
                <article className='containerr'>
                  <h2 dangerouslySetInnerHTML={{__html : question}}/>
                  <div className="btn-container">
                    {answers?.map((answer, index) => {
                      return (
                        <button key={index}
                        className='answer-btn'
                        dangerouslySetInnerHTML={{__html : answer}}
                        onClick={() => checkanswers(correct_answer === answer)}
                        />
                      )
                    })}
                  </div>
                </article>
              <button className= "next-question" onClick={nextQuestion}>Next Question</button>
            </section>
   </main>
  )
}

export default App
