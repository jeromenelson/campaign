import React, { Component }         from 'react';
import PropTypes                    from 'prop-types';
import Campaign                     from './Campaign.js'
import { withStyles }               from 'material-ui/styles';
import Button                       from 'material-ui/Button';
import { IconButton }               from 'material-ui';
import { Delete as DeleteIcon }     from 'material-ui-icons';
import FilterListIcon               from 'material-ui-icons/FilterList';
import {getAppStyles}               from './styles.js'
import List, {
       ListItem,
       ListItemIcon,
       ListItemSecondaryAction,
       ListItemText,
}                                   from 'material-ui/List';
import Dialog, {
       DialogActions,
       DialogContent,
       DialogContentText,
       DialogTitle,
}                                   from 'material-ui/Dialog';

class ListCampaigns extends Component {

    //
    // List campaign constructor
    //
    constructor(props) {

        super(props);

        this.state = {
            campaignList: localStorage,
            confirmOpen : false
        };
    }

    //
    // Opens confirmation dialog
    //
    onDeleteClick = key => {
        const c = new Campaign(key);
        this.setState({ confirmOpen: true, campaign: c });
    };

    //
    // Dismisses the confirmation dialog
    //
    handleRequestClose = () => {

        this.setState({ campaignList: localStorage, confirmOpen: false, campaign: null });
    };

    //
    // Deletes the campaign and closes the the dialog
    //
    handleRequestSaveAndClose = () => {

        if (this.state.campaign)
            this.state.campaign.remove();

        // update the list 
        this.setState({ campaignList: localStorage, confirmOpen: false, campaign: null });
    };


    //
    // render
    //
    render = () => (
        <div>
            <List className={this.props.classes.list}>
            {
                Object.keys(this.state.campaignList).map(d => (
                    <ListItem key={d} button onClick={() => window.location.href = "/edit/" + d}>
                        <ListItemIcon>
                            <FilterListIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary   = {d}
                            secondary = { new Campaign(d).toString() }
                        />
                        <ListItemSecondaryAction >
                                <IconButton aria-label="Delete" onClick={ () => this.onDeleteClick(d) }>
                                    <a><DeleteIcon className={this.props.classes.deleteIcon}/></a>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    )
                )
            }
            </List>

            <Dialog open={this.state.confirmOpen} onRequestClose={this.handleRequestClose}>
                <DialogTitle>Are you sure you want to delete the following campaing ?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <h4>{ this.state.campaign ? this.state.campaign.title : null }</h4>
                        { this.state.campaign ? this.state.campaign.toString() : null }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleRequestSaveAndClose} color="primary">
                        Okay
                </Button>
                    <Button onClick={this.handleRequestClose} color="secondary">
                        Nope
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}

export default withStyles(getAppStyles)(ListCampaigns);