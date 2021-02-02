import {BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import About from'./components/About'
import SingleArticle from './components/SingleArticle';
import Post from './components/Articles';
import Breakdowns from './components/Breakdowns';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Switch>
        <Route component={Home} path='/' exact />
        <Route component={About} path='/about/:slug' />
        <Route component={SingleArticle} path='/article/:slug' />
        <Route component={Post} path='/articles' />
        <Route component={Breakdowns} path='/breakdowns' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
