import React, { Component } from 'react';
import './Table.css'
import Pagination from './Pagination';

export default class Table extends Component {

    constructor(props) {
        super(props);
        this.state= {
            filterValue:'',
            pageCount: 0,
            currentPage: 1,
            members: []
        }

        // Bind the methods
        this.retrieveMembers = this.retrieveMembers.bind(this);
        
        // Get the initial state of members and page count
        this.retrieveMembers('', 1);
    }

    fetchTable() {
        return this.state.members.map((member, index) => {
            const {id, firstname, surname, email, gender, joined_date} = member
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{firstname}</td>
                    <td>{surname}</td>
                    <td>{email}</td>
                    <td>{gender}</td>
                    <td>{joined_date}</td>
                </tr>
            )
        })
    }

    filterMembers(event) {
        this.setState({
            ...this.state,
            filterValue: event.target.value,
            page: 1
        });

        this.retrieveMembers(event.target.value, 1)
   
    }

    retrieveMembers(query, page) {
        let formData = new FormData();
        formData.append('query', query);
        formData.append('page', page);

         fetch('/api/member', {body: formData, method: "POST"})
            .then(response => response.json())
            .then(data => this.setState({
                ...this.state,
                members: data.members,
                currentPage: page,
                pageCount:data.pageCount
            })).catch(err => console.error('You are most likely being rate-limited'));
    }

    updatePage(page) {
        if (page < 1 || page > this.state.pageCount) {
            console.error('Attempting to navigate to invalid page');
            return;
          }

          // Fetch the new page from server
          this.retrieveMembers(this.state.filterValue, page);
    }

    render() {
        return(
            <div>
                <input 
                    type='text'
                    placeholder='Filter members...'
                    className="mb-2"
                    value={this.state.filterValue} 
                    onChange={this.filterMembers.bind(this)}/>

                <table id='members-table' className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Firstname</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Joined Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.fetchTable()}
                    </tbody>
                </table>

                <Pagination updatePage={this.updatePage.bind(this)} 
                    currentPage={this.state.currentPage} 
                    pageCount={this.state.pageCount}/>
            </div>
        )
    }
} 