/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */
import 'react-table/react-table.css';
import React from 'react';
import ReactTable from 'react-table';
import Modal from 'react-modal';
import Autocomplete from 'react-autocomplete';

import './style.css';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();

    this.state = {
      data: [],
      items: [],
      modalIsOpen: false,
      searchValue: '',
    };
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  addEntry = () => {
    const { data } = this.state;
    const entry = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      birth: this.birth.value,
      phone: this.phone.value,
    };
    this.setState({
      data: [entry, ...data],
      modalIsOpen: false,
    });
    this.searchItems([entry, ...data], this.state.searchValue);
  }

  openEntryModal = () => {
    this.setState({
      modalIsOpen: true,
    });
  }

  searchItems = (data, value) => {
    const results = data.filter((item) => item.phone.indexOf(value) !== -1);
    this.setState({ items: results });
  }

  handleChange = (value) => {
    this.setState({ searchValue: value });
    this.searchItems(this.state.data, value);
  };

  render() {
    const columns = [{
      Header: 'First Name',
      accessor: 'firstName',
    }, {
      Header: 'Last Name',
      accessor: 'lastName',
    }, {
      Header: 'Date of birth',
      accessor: 'birth',
    }, {
      Header: 'Phone number',
      accessor: 'phone',
    }];

    const customStyles = {
      overlay: {
        zIndex: 2,
      },
      content: {
        maxWidth: '500px',
        margin: 'auto',
      },
    };

    const { modalIsOpen, data, searchValue, items } = this.state;
    return (
      <div>
        <button className="button" onClick={this.openEntryModal}>Add</button>
        <Autocomplete
          getItemValue={(item) => item.phone}
          items={data}
          menuStyle={{
            borderRadius: '3px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '2px 0',
            fontSize: '90%',
            position: 'fixed',
            overflow: 'auto',
            maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
            zIndex: 999,
          }}
          inputProps={{
            placeholder: 'Search for phone number',
          }}
          renderItem={(item, isHighlighted) => (
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              {item.phone}
            </div>
          )}
          value={searchValue}
          onChange={(e) => this.handleChange(e.target.value)}
          onSelect={this.handleChange}
        />
        <div>
          <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            contentLabel="Modal"
            onRequestClose={this.closeModal}
            style={customStyles}
          >
            <div className="modal-actions">
              <button className="button" onClick={this.addEntry}>Add</button>
              <button onClick={this.closeModal}>x</button>
            </div>
            <form className="modal-content">
              <div className="form-row">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  className="form-input"
                  type="text"
                  ref={(c) => (this.firstName = c)}
                />
              </div>
              <div className="form-row">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  className="form-input"
                  type="text"
                  ref={(c) => (this.lastName = c)}
                />
              </div>
              <div className="form-row">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  id="dateOfBirth"
                  className="form-input"
                  type="text"
                  ref={(c) => (this.birth = c)}
                />
              </div>
              <div className="form-row">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  className="form-input"
                  type="text"
                  ref={(c) => (this.phone = c)}
                />
              </div>
            </form>
          </Modal>
        </div>
        <ReactTable
          data={items}
          columns={columns}
        />
      </div>
    );
  }
}
