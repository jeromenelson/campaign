import React, {Component} from 'react';
import { HashRouter, BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import {withStyles}       from 'material-ui/styles';
import {getAppStyles}     from './styles.js'
import EditCampaign from './EditCampaign.js'
import ListCampaigns from './ListCampaigns.js'
import './App.css';

class App extends Component {
    
    render = () => (
        <div className="App">

            <BrowserRouter>
                <div>
                    <nav>
                        <ul>
                            <li><Link to="/list">List</Link></li>
                            <li><Link to="/edit">Edit</Link></li>
                        </ul>
                    </nav>            
                    <Switch>
                        <Route exact path='/list' render={props => (
                            <ListCampaigns classes={this.props.classes} />   
                        )} />
                
                        <Route exact path='/edit' render={props => (
                            <EditCampaign classes={this.props.classes} />
                        )} />

                        <Route path='/edit/:name' render={props => (
                            <EditCampaign classes={this.props.classes} name={props.match.params.name} />
                        )} />

                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(getAppStyles)(App);
