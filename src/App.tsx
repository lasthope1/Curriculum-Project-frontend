
import './styles/App.css';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

import Student from './pages/Student';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom'

import NavigationBar from './components/Layout/NavigationBar';

const client = new ApolloClient({
  uri : "http://localhost:4000/graphql",
  cache : new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Routes>
            <Route path="/" element={<Student/>}/>
          </Routes>
          <NavigationBar/>
      </Router>
    </ApolloProvider>
  )
};

export default App;
