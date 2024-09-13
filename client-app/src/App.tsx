
import './App.css'
import {ducks} from "./demo.ts";
import DuckItem from "./duckItem.tsx";

function App() {

  return (
      <div>
        <h1>Reactivities</h1>
        {ducks.map(duck => (
            <DuckItem key = {duck.name} duck = {duck}/>
        ))}
      </div>
  )
}

export default App
