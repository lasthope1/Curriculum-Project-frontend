import React from 'react';
import './App.css';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import LeafNode from './components/LeafNode';
import CatNode from './components/CatNode';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom'

import NavigationBar from './components/Layout/NavigationBar';

const client = new ApolloClient({
  uri : "http://localhost:4000/graphql",
  cache : new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client = {client}>
      <Router>
      <NavigationBar/>
        <Routes>
          <Route path = "/" element = {<LeafNode />} />
          <Route path = "/catNode" element = {<CatNode />} /> 
        </Routes>
      </Router>
    </ApolloProvider>
  )
};

export default App;
