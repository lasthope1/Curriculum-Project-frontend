
import {useState} from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import Student from './pages/Student';
import Advicer from './pages/Advicer';
import Admin from './pages/Admin';
import AdminFaculty from './pages/AdminFaculty';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';


const client = new ApolloClient({
  uri : "http://localhost:4002/graphql",
  cache : new InMemoryCache()
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
          <Routes>
            <Route path="/Student" element={<Student/>}/>
            <Route path="/Advicer" element={<Advicer/>}/>
            <Route path="/Admin" element={<Admin/>}/>
            <Route path="/Admin/:id" element={<AdminFaculty/>}/>
          </Routes>
      </Router>
    </ApolloProvider>
  )
};

export default App;
