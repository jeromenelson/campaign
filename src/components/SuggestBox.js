import React, { Component }     from 'react';
import PropTypes                from 'prop-types';
import Autosuggest              from 'react-autosuggest';
import match                    from 'autosuggest-highlight/match';
import parse                    from 'autosuggest-highlight/parse';
import { MenuItem }             from 'material-ui/Menu';
import TextField                from 'material-ui/TextField';
import Paper                    from 'material-ui/Paper';
import Chip                     from 'material-ui/Chip';
import Avatar                   from 'material-ui/Avatar';
import { withStyles }           from 'material-ui/styles';
import {getSuggestBoxStyles}    from '../styles/styles.js'

class SuggestBox extends Component {
  
    constructor(props) {
        
        super(props);
        
        this.state = {
            //
            // Value in the suggestion box
            //
            value             : '',
            
            //
            // List of active suggestions
            //
            suggestions       : [],
            
            //
            // List of selected suggestions
            //
            selectedItems     : props.selectedItems || []
        };
        
        // setup get suggestion delegate if it is not overriden,
        // use a default implementation
        this.getSuggestions = props.getSuggestions 
            ? props.getSuggestions 
            : this.getSuggestionsDefault;
        
        // setup get suggestion value delegate if it is not overriden,
        // use a default implementation
        this.getSuggestionValue = props.getSuggestionValue
            ? props.getSuggestionValue
            : this.getSuggestionValueDefault;
            
        // setup render suggestion delegate if it is not overriden,
        // use a default implementation
        this.shouldRenderSuggestions = props.shouldRenderSuggestions
            ? props.shouldRenderSuggestions
            : d => d.length > 0;
    
        // mandatory props - datasource
        if (!(props.dataSource instanceof Function)) {
            throw new Error("dataSource delegate missing");
        }
        // mandatory props - getItem
        if (!(props.getItem instanceof Function)) {
            throw new Error("getItem delegate missing");
        }

        this.data = props.dataSource();
        this.getItem = props.getItem;
    }
  
    //
    // Renders the text box used for the selection
    //
    renderInput = inputProps => {
    
        const { classes, home, value, ref, ...other } = inputProps;

        return (
            <div>
                <TextField autoFocus        ={home}
                           className        ={classes.textField}
                           value            ={value}
                           inputRef         ={ref}
                           InputProps       ={{ classes : { input  : classes.input },
                            ...other,
                  }}
                />
                <br/>
        </div>
        );
    };

    //
    // Renders the suggestions
    //
    renderSuggestion = (data, { query, isHighlighted }) => {
        
      const matches = match(this.getItem(data), query);
      const parts   = parse(this.getItem(data), matches);

      return (
        <MenuItem selected={isHighlighted} component="div">
          <div>
            {parts.map((part, index) => {
              return part.highlight
                ? <span key={index} style={{ fontWeight: 300 }}>
                    {part.text}
                  </span>
                : <strong key={index} style={{ fontWeight: 500 }}>
                    {part.text}
                  </strong>;
            })}
          </div>
        </MenuItem>
      );
    }

    //
    // Renders the suggestions container
    //
    renderSuggestionsContainer = options => {
      const { containerProps, children } = options;

      return (
        <Paper {...containerProps} square>
          {children}
        </Paper>
      );
    }

    //
    // Returns the suggestion value
    //
    getSuggestionValueDefault = data => this.getItem(data);
  
    //
    // Returns the suggestions for the given value
    //
    getSuggestionsDefault = value => {
        
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
      const containsMatch = this.props.applyContainsMatch;
      let count = 0;

      return this.data.filter(data => {

        const dataL   = this.getItem(data).toLowerCase();
        const match   = dataL.slice(0, inputLength);
        const isMatch = (containsMatch && dataL.indexOf(inputValue) > -1) || 
                        (!containsMatch && match === inputValue);
        
        const keep = count < 5 && isMatch;
                        
        if (keep) {
          count += 1;
        }

        return keep;
      });
    }  

    //
    // Fetches the suggestions
    //
    handleSuggestionsFetchRequested = ({ value }) => {

        this.setState({
          suggestions: this.getSuggestions(value),
        });
    };

    //
    // Clears the suggestions
    //
    handleSuggestionsClearRequested = () => {
        this.setState({
          suggestions: [],
        });
    };

    //
    // Handles Change event
    //
    handleChange = (event, { newValue }) => {

        this.setState({
          value: newValue,
        });
    };

  //
  // For every selected items, it adds a chip
  //
  handleSuggestionSelected = (event, {suggestion}) => {
      
      if (this.state.selectedItems.indexOf(suggestion) !== -1)
          return;
      
      const data = this.state.selectedItems;
      data.push(suggestion);
      
      this.setState({
          selectedItems : data,
          value         : ""
      });

      if (this.props.onChange instanceof Function)
          this.props.onChange();
      
  };

  //
  // Removes a item
  //
  handleChipDelete = data => () => {

      const l = this.state.selectedItems;
      const i = l.indexOf(data);

      if (i > -1) {
          l.splice(i, 1);
          this.setState({ selectedItems: l });
      }

      if (this.props.onChange instanceof Function)
          this.props.onChange();
  };
  
  //
  // Renders the component
  //
  render() {
      
    const { classes } = this.props;

    return (
      <section className = {[classes.autosuggestBox, this.props.hidden ? classes.hidden : ""].join(" ")}>
          <Autosuggest
            
            theme={{
              container                 : classes.container,
              suggestionsContainerOpen  : classes.suggestionsContainerOpen,
              suggestionsList           : classes.suggestionsList,
              suggestion                : classes.suggestion,
            }}
            renderInputComponent        = {this.renderInput}
            suggestions                 = {this.state.suggestions}
            onSuggestionsFetchRequested = {this.handleSuggestionsFetchRequested}
            onSuggestionsClearRequested = {this.handleSuggestionsClearRequested}
            onSuggestionSelected        = {this.handleSuggestionSelected}
            renderSuggestionsContainer  = {this.renderSuggestionsContainer}
            getSuggestionValue          = {this.getSuggestionValue}
            renderSuggestion            = {this.renderSuggestion}
            shouldRenderSuggestions     = {this.shouldRenderSuggestions}
            inputProps                  = {{
              autoFocus     : true,
              classes,
              placeholder   : this.props.placeholder,
              value         : this.state.value,
              onChange      : this.handleChange,
            }}
          />
          
        <div className={classes.row}>
            {
                this.state.selectedItems.map(data => {
                  return (
                    <Chip
                        avatar            = {<Avatar>{this.getSuggestionValue(data)[0]}</Avatar>}
                        label             = {this.getSuggestionValue(data)}
                        key               = {this.getSuggestionValue(data)}
                        onRequestDelete   = {this.handleChipDelete(data)}
                        className         = {classes.chip}
                    />);
                })
            }
        </div>          
          
      </section>
    );
  }
}

SuggestBox.propTypes = {classes: PropTypes.object.isRequired};

export default withStyles(getSuggestBoxStyles)(SuggestBox);
