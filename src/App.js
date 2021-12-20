import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './custom.css';

import '../node_modules/bootstrap/dist/css/bootstrap.css';

import Navbar from "./components/navbar.component"
import BookList from "./components/book-list.component";
import EditBook from "./components/edit-book.component";
import CreateBook from "./components/create-book.component";
import CreateUser from "./components/create-user.component";
 
function App() {
 return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={BookList} />
      <Route path="/edit/:id" component={EditBook} />
      <Route path="/create" component={CreateBook} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
 );
}
 
export default App;