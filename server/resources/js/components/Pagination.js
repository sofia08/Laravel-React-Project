import React, { Component } from "react";


export default class Pagination extends Component {
    constructor(props) {
        super(props);
        
        this.buildNavItem = this.buildNavItem.bind(this);
        }

        buildNavItem(text, pageAction) {
            let action = (e) => {
              this.props.updatePage(pageAction);
              e.preventDefault();
            }
        
            let state = '';
        
            // Style it based on state
            if (pageAction == 0 || pageAction > this.props.pageCount) {
              // Disable
              state = 'disabled';
            } else if (pageAction == this.props.currentPage) {
              state = 'active';
            }
        
            return (
              <li key={pageAction} className={`page-item ${state}`}>
                <a className='page-link' href='#' onClick={action}>{text}</a>
              </li>
            );
          }
        
          /**
           * Returns the list of numbers that appear between the Previous and Next buttons
           * 
           * @param {*} page the current page
           * @param {*} count of all pages
           */
          buildNavList(page, count) {
            let nav = [];
        
            // The number of items we want on each side of the current page
            const navItems = 2;
            const totalItems = navItems * 2;
        
            // Calculate the first and last item we want in the list
            let start = page - navItems;
            let end = page + navItems;
        
            // If we are trying to build a list that is before the first page
            if (start < 1) {
              // We will start at the first page, and build the total number of items required
              start = 1;
              end = totalItems + 1;
            } else if (end > count) { // If we are trying to build a list that will run after the final page
              // Start from the total number of pages - the items we want in the list
              start = count - totalItems;
              // The final item will be the last page
              end = count;
            }
        
            for (let i = start; i <= end; i++) {
              // If the item is outside of normal bounds
              if (i < 1 || i > count) {
                continue;
              }
        
              nav.push(
                this.buildNavItem(i, i)
              );
            }
        
            return nav;
          }
        
          render() {
            return (
              <nav>
                <ul className='pagination justify-content-center'>
                  {/* {this.buildNavItem('First', this.props.currentPage - 1)} */}
                  {this.buildNavItem('Previous', this.props.currentPage - 1)}
                  {this.buildNavList(this.props.currentPage, this.props.pageCount)}
                  {this.buildNavItem('Next', this.props.currentPage + 1)}
                  {/* {this.buildNavItem('Last', this.props.currentPage - 1)} */}
                </ul>
              </nav>
            );
          }
    }

    // render() {
    //     return (
    //         <nav>
    //             <ul className='pagination'>
    //                 {this.item('Previous', () => this.state.updatePage(this.state.currentPage - 1))}
    //                 {this.item(1, () => this.state.updatePage(1))}
    //                 {this.item('Next', () => this.state.updatePage(this.state.currentPage + 1))}
    //             </ul>
    //         </nav>
    //     );
    // }

    // item(text, action) {
    //     // Change the class names based on currentPage

    //     // Highlight the current page
    //     // Disable previous and next based on current page

    //     return (
    //             <li className="page-item">
    //                 <a className="page-link" href="#" onClick={action}>{text}</a>
    //             </li>
    //         );
    // }
