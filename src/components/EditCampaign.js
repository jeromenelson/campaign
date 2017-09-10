import React, {Component}       from 'react';
import {withStyles}             from 'material-ui/styles';
import TextField                from 'material-ui/TextField';
import Button                   from 'material-ui/Button';
import Radio, {RadioGroup}      from 'material-ui/Radio';
import {FormControlLabel}       from 'material-ui/Form';
import Switch                   from 'material-ui/Switch';

import Suggest                  from './SuggestBox.js';
import {getAppStyles}           from '../styles/styles.js'
import Campaign                 from '../core/Campaign.js'

import {getUsCities}            from '../data/data.cities.js'
import {getLanguages}           from '../data/data.languages.js'
import {getDevices}             from '../data/data.others.js'
import {getUsers}               from '../data/data.users.js'
import {getShows}               from '../data/data.shows.js'
import {getEvents}              from '../data/data.events.js'
import {getInterests}           from '../data/data.interests.js'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
}                               from 'material-ui/Dialog';


import '../styles/App.css';

class KeywordItem extends Component {

    render = () => (
        <article key={this.props.key}>
            {this.props.label}
            <aside className={this.props.classes.aside}>
                {this.props.comment} 
            </aside> 
        </article>
    );        
}

class EditCampaign extends Component{
  
    //
    // Initializes the campaign control
    //
    constructor(props) {
        super(props);

        const c = new Campaign(props.name);

        this.state = {
            ...c,

            checkedEvents       : c.events.length > 0,
            checkedLanguages    : c.languages.length > 0,
            checkedDevices      : c.devices.length > 0,
            checkedInterests    : c.interests.length > 0,
            checkedFollowers    : c.followers.length > 0,
            checkedKeywords     : c.keywords.length > 0,
            checkedShows        : c.shows.length > 0
        };
        
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.onSuggestChange    = this.onSuggestChange.bind(this);
    }
   
    //
    // Handle gender gaps
    //
    handleGenderChange = (event, value) => {
        
        this.setState({
            gender: value
        });
    };

    keywordItem__ = props => (
        <article>{ props.broadMatch  }
            {this.props.label}
            <aside className={props.classes.aside}>
                {props.comment} 
            </aside> 
        </article>
    ) 

    onSuggestChange = () => {
        this.setState(this.state);
    };

    //
    // Returns keyword suggestions
    //
    getKeywordSuggestions = v => {
        
        
        const broadMatch = v;
        const phraseMatch = '"' + v + '"';
        const exactMatch = '[' + v + ']';

        return [
            <KeywordItem key="0" text={ v } label={ broadMatch        } comment="Broad Match"     classes={this.props.classes} />,
            <KeywordItem key="1" text={ v } label={ phraseMatch       } comment="Phrase Match"    classes={this.props.classes} />,
            <KeywordItem key="2" text={ v } label={ exactMatch        } comment="Exact Match"     classes={this.props.classes} />,
            <KeywordItem key="3" text={ v } label={ "-" + broadMatch  } comment="Negative Match"  classes={this.props.classes} />,
            <KeywordItem key="4" text={ v } label={ "-" + phraseMatch } comment="Negative Phrase" classes={this.props.classes} />,
            <KeywordItem key="5" text={ v } label={ "-" + exactMatch  } comment="negative Exact"  classes={this.props.classes} />,                
        ];
    };

    //
    // Returns the value of the suggested value
    //
    getKeywordSuggestionValue = v => {
        
        return v.props.text + ' (' + v.props.comment + ')';
    
    };

    //
    // Dismisses the confirmation dialog
    //
    handleRequestClose = () => {

        this.setState({ confirmOpen: false });
        window.location.href = "/list";
    };

    //
    // Saves the campaign
    //
    handleSave = () => {

        new Campaign(this.state).save();
        this.setState({ confirmOpen: true });
    };

    render() {
        const classes = this.props.classes;

        
        return (
        
            <div className={classes.container}>
                <h2>Create Campaign</h2>
                <blockquote>
                    {new Campaign(this.state).toString()}
                </blockquote>
                <br />
                <TextField
                    label       = "Name your campaign"
                    placeholder = "Enter the campaign name"
                    className   = {classes.textField}
                    onChange    = { e => this.setState({ title: e.target.value }) }
                    value       = {this.state.title}
                /><br />

                <div className={classes.label}>
                    When do you want your campaign to run?
                </div>
                <br/>
                
                <RadioGroup
                  name      = "schedule"
                  className = {classes.group}
                  value     = {this.state.schedule}
                  onChange  = {e => this.setState({ schedule: e.target.value })}
                >
                  <FormControlLabel value="startNow" control={<Radio />} label="Start Immediately" />
                  <FormControlLabel value="schedule" control={<Radio />} label="Set start and end dates" />
                </RadioGroup>            
                
                <br/>
                
                <section style={{display: (this.state.schedule === "schedule" ? "block" : "none") }}>
                    <TextField
                        id                ="fromDate"
                        label             ="From date"
                        type              ="date"
                        className         = {classes.dateField}
                        margin            = "normal"
                        InputLabelProps   = {{ shrink: true }}
                        value             = {this.state.scheduleStartDate}
                        onChange          = {e => this.setState({ scheduleStartDate: e.target.value })}
                    />
                    <TextField
                        id              = "toDate"
                        label           = "To date"
                        type            = "date"
                        className       = {classes.dateField}
                        margin          = "normal"
                        InputLabelProps = {{ shrink: true }}
                        value           = {this.state.scheduleEndDate}
                        onChange          = {e => this.setState({ scheduleEndDate: e.target.value })}
                    />    

                </section>

                <section>
                    <h3>Select your audiance</h3>
                    <Suggest 
                        placeholder     = "Search for US cities"
                        dataSource      = {getUsCities}
                        getItem         = {x => x}
                        onChange        = {this.onSuggestChange}
                        selectedItems   = {this.state.cities}
                    />

                    <RadioGroup
                        name        = "schedule"
                        className   = {classes.group}
                        value       = {this.state.gender}
                        onChange    = {this.handleGenderChange}>

                        <FormControlLabel value="anyGender" control={<Radio />} label="Any Gender" />
                        <FormControlLabel value="male"      control={<Radio />} label="Male" />
                        <FormControlLabel value="female"    control={<Radio />} label="Female" />
                    </RadioGroup>            
                    <br />
                    
                    <div className={classes.audiance}>
                        <FormControlLabel control={ 
                            <Switch checked  = {this.state.checkedLanguages}
                                    onChange = {(event, checked) => this.setState({ checkedLanguages: checked })} /> }
                            label="Select Languages" />     
                        <br/>               
                        <Suggest style    = {{display: (this.state.checkedLanguages ? "block" : "none") }}
                            placeholder   = "Search for a language"
                            hidden        = {!this.state.checkedLanguages}
                            dataSource    = {getLanguages}
                            getItem       = {x => x}
                            selectedItems = {this.state.languages}
                            onChange      = {this.onSuggestChange}
                        />

                        <FormControlLabel control={ 
                            <Switch checked={this.state.checkedDevices}
                                onChange={(event, checked) => this.setState({ checkedDevices: checked })} /> }
                            label="Select devices, platforms & carriers"
                        />           
                        <Suggest style={{display: (this.state.checkedDevices ? "block" : "none") }}
                              placeholder               = "Choose devices to target"
                              hidden                    = {!this.state.checkedDevices}
                              dataSource                = {getDevices}
                              getItem                   = {x => x}
                              shouldRenderSuggestions   = { () => true }
                              selectedItems             = {this.state.devices}
                              onChange                  = {this.onSuggestChange}
                        />
                        
                        <br/>                    
                        <FormControlLabel control={ 
                            <Switch checked={this.state.checkKeywords}
                                onChange={(event, checked) => this.setState({ checkKeywords: checked })} /> }
                            label="Add Keywords"
                        />
                        
                        <Suggest style={{display: (this.state.checkKeywords ? "block" : "none") }}
                            placeholder         = "Enter a keyword or phrase"
                            hidden              = {!this.state.checkKeywords}
                            dataSource          = {() => []}
                            getItem             = { x => x }
                            getSuggestions      = { this.getKeywordSuggestions }
                            getSuggestionValue  = { this.getKeywordSuggestionValue }
                            selectedItems       = { this.state.keywords }
                            onChange            = {this.onSuggestChange}
                        />                        
                        <br />
                        
                        <FormControlLabel control={ 
                            <Switch checked={this.state.checkedFollowers}
                                onChange={(event, checked) => this.setState({ checkedFollowers: checked })} /> }
                            label="Add followers"
                        />                    
                        <Suggest style={{display: (this.state.checkedFollowers ? "block" : "none") }}
                            placeholder         = "Enter a follower name"
                            hidden              = {!this.state.checkedFollowers}
                            dataSource          = {getUsers}
                            getItem             = {x => x}
                            applyContainsMatch  = { true }
                            selectedItems       = { this.state.followers }
                            onChange            = {this.onSuggestChange}
                        />                                                
                        <br/>                    
                        <FormControlLabel control={ 
                            <Switch checked={this.state.checkedInterests}
                                onChange={(event, checked) => this.setState({ checkedInterests: checked })} /> }
                            label="Add interests"
                        />                    
                        <Suggest style={{display: (this.state.checkedInterests ? "block" : "none") }}
                            placeholder         = "Search for interests"
                            hidden              = {!this.state.checkedInterests}
                            dataSource          = {getInterests}
                            getItem             = {x => x}
                            applyContainsMatch  = { true }
                            selectedItems       = { this.state.interests }
                            onChange            = {this.onSuggestChange}
                        />
                        <br/>                    
                        <FormControlLabel control={ 
                            <Switch checked={this.state.checkedShows}
                                onChange={(event, checked) => this.setState({ checkedShows: checked })} /> }
                            label="Add TV targetting"
                        />                    
                        <Suggest style={{display: (this.state.checkedShows ? "block" : "none") }}
                            placeholder         = "Search for shows"
                            hidden              = {!this.state.checkedShows}
                            dataSource          = {getShows}
                            getItem             = {x => x}
                            applyContainsMatch  = { true }
                            selectedItems       = { this.state.shows }
                            onChange            = {this.onSuggestChange}

                        />
                        <br/>                    
                        <FormControlLabel control={ 
                            <Switch checked={this.state.checkedEvents}
                                onChange={(event, checked) => this.setState({ checkedEvents: checked })} /> }
                          label="Add Event targetting"
                        />                    
                        <Suggest style={{display: (this.state.checkedEvents ? "block" : "none") }}
                            placeholder         = "Search for events"
                            hidden              = {!this.state.checkedEvents}
                            dataSource          = {getEvents}
                            getItem             = {x => x}
                            applyContainsMatch  = { true }
                            selectedItems       = {this.state.events}
                            onChange            = {this.onSuggestChange}
                        />                        
                        <br />                    

                        <div className={"buttons"}>
                            <Button raised color="primary" onClick={ this.handleSave } >
                                Save
                            </Button>
                        </div>
                        <br />
                    </div>
                </section>
                    <Dialog open={this.state.confirmOpen} onRequestClose={this.handleRequestClose}>
                        <DialogTitle>Changes Saved</DialogTitle>
                        <DialogContent>
                            <DialogContentText></DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleRequestClose} color="primary">
                                Okay
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
        )
    }
}

export default withStyles(getAppStyles)(EditCampaign);