import { Switch, Route, Redirect, Link } from 'react-router-dom';

import { Home, AskNewQuestion, Question } from './pages/index';

function App() {
  return (
    <div>
      <Link to="/questions">
        <header>Stackoverflow clone</header>
      </Link>
      <Switch>
        <Route path="/questions" exact>
          <Home />
        </Route>
        <Route path="/questions/:id" exact>
          <Question />
        </Route>
        <Route path="/new_question" exact>
          <AskNewQuestion />
        </Route>
        <Route path="*" exact children={<Redirect to="/questions" />} />
      </Switch>
    </div>
  );
}

export default App;
