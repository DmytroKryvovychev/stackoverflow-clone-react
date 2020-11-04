import { Switch, Route, Redirect, Link } from 'react-router-dom';

import { Home, AskNewQuestion, Question } from './pages/index';

const routes = [
  {
    name: 'Home',
    path: '/questions',
    exact: true,
    main: () => <Home />,
  },
  {
    name: 'Question',
    path: '/questions/:id',
    exact: true,
    main: () => <Question />,
  },
  {
    name: 'NewQuestion',
    path: '/new_question',
    exact: true,
    main: () => <AskNewQuestion />,
  },
  {
    name: 'ErrorPath',
    path: '*',
    exact: true,
    main: () => <Redirect to="/questions" />,
  },
];

function App() {
  return (
    <div>
      <Link to="/questions">
        <header>Stackoverflow clone</header>
      </Link>
      <Switch>
        {routes.map((route, idx) => (
          <Route
            key={`route-${route.name}-idx-${idx}`}
            path={route.path}
            exact={route.exact}
            render={() => <route.main />}
          />
        ))}
      </Switch>
    </div>
  );
}

export default App;
