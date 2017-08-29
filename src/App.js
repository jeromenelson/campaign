import React, { Component }                         from 'react';
import PropTypes                                    from 'prop-types';

import { withStyles }                               from 'material-ui/styles';
import TextField                                    from 'material-ui/TextField';
import Radio, { RadioGroup }                        from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';
import Switch                                       from 'material-ui/Switch';
import { MuiThemeProvider, createMuiTheme }         from 'material-ui/styles';

import './App.css';
import Suggest from  './SuggestBox.js';

import {getAppStyles, getTheme} from './styles.js'

import {getUsCities}  from './data.cities.js'
import {getLanguages} from './data.languages.js'
import {getDevices}   from './data.others.js'
import {getUsers}     from './data.users.js'
import {getShows}     from './data.shows.js'
import {getEvents}    from './data.events.js'
import {getInterests} from './data.interests.js'

class KeywordItem extends Component {

    render() {        
        
        return (
            <article>{ this.props.broadMatch  }
                {this.props.label}
                <aside className={this.props.classes.aside}>
                    {this.props.comment} 
                </aside> 
            </article>
        );        
    }
}

class Campaign extends Component{
  
    //
    // Initializes the campaign control
    //
    constructor(props) {
        super(props);
        
        this.state = {
            gender: "anyGender",
            isScheduled: false,
            checkedLanguages: false,
            checkKeywords: true
        };
        
        this.handleScheduleChange = this.handleScheduleChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
    }
  
    //
    // handle schedule change
    //
    handleScheduleChange = (event, value) => {
        this.setState({
            isScheduled: !this.state.isScheduled
        });
    };
    
    //
    // Handle gender gaps
    //
    handleGenderChange = (event, value) => {
        
        this.setState({
            gender: value
        });
    };

    keywordItem_NeedToLearnHowToRenderThis = props => {

        return (
            <article>{ props.broadMatch  }
                {this.props.label}
                <aside className={props.classes.aside}>
                    {props.comment} 
                </aside> 
            </article>
        );        
    }
  
    //
    // Returns keyword suggestions
    //
    getKeywordSuggestions = v => {
        
        
        let broadMatch = v;
        
        let phraseMatch = '"' + v + '"';
        
        let exactMatch = '[' + v + ']';
        
        //return [broadMatch, phraseMatch, exactMatch];
        
        return [
                <KeywordItem text={ v } label={ broadMatch        } comment="Broad Match"     classes={this.props.classes} />,
                <KeywordItem text={ v } label={ phraseMatch       } comment="Phrase Match"    classes={this.props.classes} />,
                <KeywordItem text={ v } label={ exactMatch        } comment="Exact Match"     classes={this.props.classes} />,
                <KeywordItem text={ v } label={ "-" + broadMatch  } comment="Negative Match"  classes={this.props.classes} />,
                <KeywordItem text={ v } label={ "-" + phraseMatch } comment="Negative Phrase" classes={this.props.classes} />,
                <KeywordItem text={ v } label={ "-" + exactMatch  } comment="negative Exact"  classes={this.props.classes} />,                
        ];
    };
    
    getKeywordSuggestionValue = v => {
        
        return v.props.text + ' (' + v.props.comment + ')';
    
    };
    
    render() {
        const classes = this.props.classes;

        
        return (
        <MuiThemeProvider theme={getTheme()}>
            <div className={classes.container}>
            
                <TextField
                    label="Name your campaign"
                    placeholder="Enter the campaign name"
                    className={classes.textField}
                /><br />
                
                <div className={classes.label}>
                    When do you want your campaign to run?
                </div>
                <br/>
                
                <RadioGroup
                  name="schedule"
                  className={classes.group}
                  value={this.state.isScheduled ? "schedule" : "startNow"}
                  onChange={this.handleScheduleChange}
                >
                  <FormControlLabel value="startNow" control={<Radio />} label="Start Immediately" />
                  <FormControlLabel value="schedule" control={<Radio />} label="Set start and end dates" />
                </RadioGroup>            
                
                <br/>
                
                <section style={{display: (this.state.isScheduled ? "block" : "none") }}>
                    <TextField
                    
                      id="fromDate"
                      label="From date"
                      type="date"
                      defaultValue="2017-05-24"
                      className={classes.dateField}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      id="toDate"
                      label="To date"
                      type="date"
                      defaultValue="2017-05-24"
                      className={classes.dateField}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />    

                </section>

                <section>
                    <h3>Select your audiance</h3>
                    <Suggest 
                        placeholder="Search for US cities"
                        dataSource={getUsCities}
                        getItem={x => x["city"]}
                    />
                    
                    <RadioGroup
                      name="schedule"
                      className={classes.group}
                      value={this.state.gender}
                      onChange={this.handleGenderChange}
                    >
                      <FormControlLabel value="anyGender" control={<Radio />} label="Any Gender" />
                      <FormControlLabel value="male"      control={<Radio />} label="Male" />
                      <FormControlLabel value="female"    control={<Radio />} label="Female" />
                    </RadioGroup>            
                    <br />
                    
                    <div className={classes.audiance}>
                        <FormControlLabel control={ <Switch checked={this.state.checkedLanguages}
                                                            onChange={(event, checked) => this.setState({ checkedLanguages: checked })} />
                                  }
                          label="Select Languages"
                        />     
                        <br/>               
                        <Suggest style={{display: (this.state.checkedLanguages ? "block" : "none") }}
                            placeholder="Search for a language"
                            hidden={!this.state.checkedLanguages}
                            dataSource={getLanguages}
                            getItem={x => x}
                        />

                        
                        <FormControlLabel control={ <Switch checked={this.state.checkedDevices}
                                                            onChange={(event, checked) => this.setState({ checkedDevices: checked })} />
                                  }
                          label="Select devices, platforms & carriers"
                        />           
                        <Suggest style={{display: (this.state.checkedDevices ? "block" : "none") }}
                            placeholder="Choose devices to target"
                            hidden={!this.state.checkedDevices}
                            dataSource={getDevices}
                            getItem={x => x}
                            shouldRenderSuggestions={ () => true }
                        />
                        
                        <br/>                    
                        <FormControlLabel control={ <Switch checked={this.state.checkKeywords}
                                                            onChange={(event, checked) => this.setState({ checkKeywords: checked })} />
                                  }
                          label="Add Keywords"
                        />
                        <Suggest style={{display: (this.state.checkKeywords ? "block" : "none") }}
                            placeholder="Enter a keyword or phrase"
                            hidden={!this.state.checkKeywords}
                            dataSource={() => []}
                            getItem={ x => x }
                            getSuggestions={ this.getKeywordSuggestions }
                            getSuggestionValue={ this.getKeywordSuggestionValue }
                        />                        
                        <br />
                        
                        <FormControlLabel control={ <Switch checked={this.state.checkedFollowers}
                                                            onChange={(event, checked) => this.setState({ checkedFollowers: checked })} />
                                  }
                          label="Add followers"
                        />                    
                        <Suggest style={{display: (this.state.checkedFollowers ? "block" : "none") }}
                            placeholder="Enter a follower name"
                            hidden={!this.state.checkedFollowers}
                            dataSource={getUsers}
                            getItem={x => x}
                            applyContainsMatch={ true }
                        />                                                
                        <br/>                    
                        <FormControlLabel control={ <Switch checked={this.state.checkedInterests}
                                                            onChange={(event, checked) => this.setState({ checkedInterests: checked })} />
                                  }
                          label="Add interests"
                        />                    
                        <Suggest style={{display: (this.state.checkedInterests ? "block" : "none") }}
                            placeholder="Search for interests"
                            hidden={!this.state.checkedInterests}
                            dataSource={getInterests}
                            getItem={x => x}
                            applyContainsMatch={ true }
                        />
                        <br/>                    
                        <FormControlLabel control={ <Switch checked={this.state.checkedShows}
                                                            onChange={(event, checked) => this.setState({ checkedShows: checked })} />
                                  }
                          label="Add TV targetting"
                        />                    
                        <Suggest style={{display: (this.state.checkedShows ? "block" : "none") }}
                            placeholder="Search for shows"
                            hidden={!this.state.checkedShows}
                            dataSource={getShows}
                            getItem={x => x}
                            applyContainsMatch={ true }
                        />
                        <br/>                    
                        <FormControlLabel control={ <Switch checked={this.state.checkedEvents}
                                                            onChange={(event, checked) => this.setState({ checkedEvents: checked })} />
                                  }
                          label="Add Event targetting"
                        />                    
                        <Suggest style={{display: (this.state.checkedEvents ? "block" : "none") }}
                            placeholder="Search for events"
                            hidden={!this.state.checkedEvents}
                            dataSource={getEvents}
                            getItem={x => x}
                            applyContainsMatch={ true }
                        />                        
                        <br/>                    
                    </div>
                </section>

            </div>
        </MuiThemeProvider>
    )
        
    }
}

class App extends Component {
  render() {
    return (
      <div className="App">
          <h2>Create Campaign</h2>
          <Campaign 
            classes={this.props.classes}
          />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(getAppStyles)(App);
