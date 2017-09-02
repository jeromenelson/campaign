import React, {Component} from 'react';
import { HashRouter, BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
import { Button } from 'material-ui'
import { withStyles } from 'material-ui/styles';
import {
    Add as AddIcon,
    Edit as EditIcon,
    List as ListIcon
} from 'material-ui-icons';

import {getAppStyles}     from './styles.js'
import EditCampaign from './EditCampaign.js'
import ListCampaigns from './ListCampaigns.js'
import './App.css';

class App extends Component {

    render = () => {

        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Switch>
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
            </div>
        );
    }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(getAppStyles)(App);
