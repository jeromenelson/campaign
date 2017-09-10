import React, {Component} from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Button } from 'material-ui'
import { withStyles } from 'material-ui/styles';
import { MuiThemeProvider } from 'material-ui/styles';
import {
    Add as AddIcon,
    List as ListIcon
} from 'material-ui-icons';

import { getAppStyles, getTheme}     from './styles/styles.js'
import EditCampaign from './components/EditCampaign.js'
import ListCampaigns from './components/ListCampaigns.js'
import './styles/App.css';

class App extends Component {

    render = () => {

        return (
            <div className="App">
                <MuiThemeProvider theme={getTheme()}>
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route exact path='/' render={props => (
                                <nav>
                                    <ul>
                                        <li><Link to="/edit"><Button fab color="primary"><AddIcon /></Button></Link></li>
                                        <li><Link to="/list"><Button fab color="accent"><ListIcon /></Button></Link></li>
                                    </ul>
                                </nav>
                            
                                )} />
                            <Route exact path='/list' render={props => (
                                <section>
                                    <nav><ul>
                                        <li><Link to="/edit"><Button fab><AddIcon /></Button></Link></li>
                                    </ul></nav>

                                    <ListCampaigns classes={this.props.classes} />
                                </section>
                            )} />

                            <Route exact path='/edit' render={props => (
                                <section>
                                    <nav><ul>
                                        <li><Link to="/list"><Button fab><ListIcon /></Button></Link></li>
                                    </ul></nav>

                                    <EditCampaign classes={this.props.classes} />
                                </section>
                            )} />

                            <Route path='/edit/:name' render={props => (
                                <section>
                                    <nav><ul>
                                        <li><Link to="/list"><Button fab><ListIcon /></Button></Link></li>
                                    </ul></nav>
                                    <EditCampaign classes={this.props.classes} name={props.match.params.name} />
                                </section>
                            )} />

                        </Switch>
                    </div>
                </BrowserRouter>
                </MuiThemeProvider>
            </div>
        );
    }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(getAppStyles)(App);
