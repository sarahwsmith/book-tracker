import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateBook extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDateStarted = this.onChangeDateStarted.bind(this);
        this.onChangeDateFinished = this.onChangeDateFinished.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          username: '',
          title: '',
          description: '',
          dateStarted: new Date(),
          dateFinished: new Date(),
          rating: 0,
          users: []
        }
      }
    
      componentDidMount() {
        axios.get('http://localhost:5000/users/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({ 
            users: response.data.map(user => user.username),
            username: response.data[0].username
          });
        }
  })
  .catch((error) => {
    console.log(error);
  })
      }
    
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }

      onChangeTitle(e) {
          this.setState({
              title: e.target.value
          });
      }
    
      onChangeDescription(e) {
        this.setState({
          description: e.target.value
        });
      }
    
      onChangeDateStarted(date) {
        this.setState({
          dateStarted: date
        });
      }
    
      onChangeDateFinished(date) {
        this.setState({
          dateFinished: date
        });
      }

      onChangeRating(e) {
          this.setState({
              rating: e.target.value
          });
      }
    
      onSubmit(e) {
        e.preventDefault();
      
        const book = {
          username: this.state.username,
          title: this.state.title,
          description: this.state.description,
          duration: this.state.duration,
          dateStarted: this.state.dateStarted,
          dateFinished: this.state.dateFinished,
          rating: this.state.rating
        };
      
        console.log(book);
        axios.post('http://localhost:5000/books/add', book)
        .then(res => console.log(res.data));
        
        window.location = '/';
      }
    
      render() {
        return (
          <div class="px-4">
            <h3>Create New Book Entry</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {
                      this.state.users.map(function(user) {
                        return <option 
                          key={user}
                          value={user}>{user}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group"> 
                <label>Title: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    />
              </div>
              <div className="form-group"> 
                <label>Description: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
              </div>
              <div className="form-group">
                <label>Date Started: </label>
                <div>
                  <DatePicker
                    selected={this.state.dateStarted}
                    onChange={this.onChangeDateStarted}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Date Finished: </label>
                <div>
                  <DatePicker
                    selected={this.state.dateFinished}
                    onChange={this.onChangeDateFinished}
                  />
                </div>
              </div>
              <div className="form-group"> 
                <label>Rating: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.rating}
                    onChange={this.onChangeRating}
                    />
              </div>
    
              <div className="form-group">
                <input type="submit" value="Create Book Entry" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
      }
    }