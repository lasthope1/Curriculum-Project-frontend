
import './styles/App.css';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
//import LeafNode from './components/Data/LeafNode';

import LeafNode from './components/Data/LeafNode'
import CatNode from './components/Data/CatNode';
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
      <NavigationBar/>
        <Routes>
          <Route path="/" element={<CatNode/>}/>
          <Route path="/leafNode" element={<LeafNode/>}/>
        </Routes>
      </Router>
    </ApolloProvider>
  )
};

export default App;
