import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Book = props => (
    <tr>
      <td>{props.book.username}</td>
      <td><b><u>{props.book.title}</u></b></td>
      <td>{props.book.description}</td>
      <td>{props.book.dateStarted.substring(0,10)}</td>
      <td>{props.book.dateFinished.substring(0,10)}</td>
      <td>{props.book.rating}</td>
      <td>
        <Link to={"/edit/"+props.book._id}>edit</Link> | <a href="#" onClick={() => { props.deleteBook(props.book._id) }}>delete</a>
      </td>
    </tr>
  )


export default class BookList extends Component {
    constructor(props) {
        super(props);
        this.deleteBook = this.deleteBook.bind(this);
        this.state = {books: []};
        //this.activeMonthToPass = 0;
      }

      state = {
        thisDate: new Date()
      }
    
      onChange = thisDate => this.setState(
        { thisDate }
        )


      //passActiveDate(activeDate) {
      //  const monthAfterPress = activeDate.getMonth() + 1;
      //  this.props.activeMonthToPass(monthAfterPress); 
      //}


      componentDidMount() {
        axios.get('http://localhost:5000/books/')
         .then(response => {
           this.setState({ books: response.data });
         })
         .catch((error) => {
            console.log(error);
         })
      }

      deleteBook(id) {
        axios.delete('http://localhost:5000/books/'+id)
          .then(res => console.log(res.data));
        this.setState({
          books: this.state.books.filter(el => el._id !== id)
        })
      }

      bookList() {

        if(this.state.thisDate !== undefined){
          var month = this.state.thisDate.getMonth();
          var newMonth = month + 1;
          var monthString = newMonth.toString();

          if(monthString != "10" && monthString != "11" && monthString != "12" ){
              var zeroMonth = "0";
              monthString = zeroMonth.concat(monthString);
          }
      }


        return this.state.books.filter(book => book.dateStarted.substring(5, 7) == monthString).map(currentbook => { 
          return <Book book={currentbook} deleteBook={this.deleteBook} key={currentbook._id}/>;
        })
      }

  render() {
    return (
   
        <div class="container-fluid">
          <div class="row">
        <div class="col-sm-3 margin-xl"> 
          <Calendar
          onChange={this.onChange}
          //onActiveDateChange={({ activeStartDate }) => this.passActiveDate(activeStartDate)}
          value={this.state.date}/>
          </div> 

        <div class="col-md-9"><h3>Completed Books</h3>
        
        <table className="table table-striped padding-xl">
          <thead className="thead">
            <tr>
              <th>Username</th>
              <th>Title</th>
              <th width="30%">Description</th>
              <th>Date Started</th>
              <th>Date Finished</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.bookList() }
          </tbody>
        </table>
        </div>
      </div>
      </div>
    )
  }
}