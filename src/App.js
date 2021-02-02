import {BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import About from'./components/About'
import SinglePost from './components/SinglePost';
import Post from './components/Post';
import Breakdown from './components/Breakdown';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Switch>
        <Route component={Home} path='/' exact />
        <Route component={About} path='/about/:slug' />
        <Route component={SinglePost} path='/post/:slug' />
        <Route component={Post} path='/post' />
        <Route component={Breakdown} path='/breakdown' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
