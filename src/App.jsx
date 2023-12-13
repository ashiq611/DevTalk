

import './App.css'
import Blog from './components/Blog'
import Features from './components/Features'
import Nav from './components/Nav'




function App() {
    

  return (
    <>
      <Nav />
      <div className="flex">
        <Blog />
        <Features />
      </div>
    </>
  );
}

export default App
