import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            filteredOptions: [],
            currentFocus: -1
        }
    }

    onChange = (e) => {
        const {options } = this.props;
        let userInput = e.currentTarget.value;
        let filteredOptions = options.filter(
            option => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
            );
        this.setState({
            filteredOptions,
            inputValue: e.currentTarget.value,
            currentFocus:-1
        })
    }

    onClick = (e) => {
        this.setState({
            inputValue: e.currentTarget.innerText,
            filteredOptions: [],
            currentFocus:-1
        })
    }

    onKeyDown = (e) => {
        const {currentFocus, filteredOptions} = this.state;
        if (e.keyCode === 40) {
            currentFocus < filteredOptions.length-1? 
            this.setState({
                currentFocus: currentFocus + 1,
            }) : this.setState({ currentFocus: 0})
        } else if (e.keyCode === 38) {
            currentFocus > 0? 
            this.setState({
                currentFocus: currentFocus - 1,
            }) : this.setState({ currentFocus: filteredOptions.length - 1})
        } else if (e.keyCode === 13) {
          if (this.state.currentFocus >= 0) {
            this.setState({ 
                inputValue: filteredOptions[currentFocus],
                filteredOptions: [],
                currentFocus:-1
            });
          }
        }
      };

    
    render() {
        const { filteredOptions, inputValue, currentFocus} = this.state;
        let optionList;
        if(filteredOptions.length && inputValue){
            optionList=(
            <ul className="options">{filteredOptions.map((option, index) => {
                let className;
                if (index === currentFocus) {
                className = 'option-active';
                }
                return (
                  <li key={option} onClick = { this.onClick } className={ className }>
                    {option}
                  </li>
                );
              })}
            </ul>)
        }

        return (
            <div>
                <div className="search">
                    <input 
                    type="text" 
                    className="search-box" 
                    onChange={ this.onChange }
                    onKeyDown = { this.onKeyDown }
                    value={ this.state.inputValue }
                    />
                    <input type="submit" value="" className="search-btn" />
                </div>
                {optionList}
            </div>
        )
    }
}

Autocomplete.propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
}

export default Autocomplete;


