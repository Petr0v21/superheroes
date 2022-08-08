import "./App.css";
import CreateHeroForm from "./components/CreateHeroForm/index";
import List from "./components/List";

function App() {
  return (
    <div className="App">
      <h1>Heroes DataBase </h1>
      <CreateHeroForm />
      <List />
    </div>
  );
}

export default App;
