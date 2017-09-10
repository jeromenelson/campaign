import React, { Component }         from 'react';
import Campaign                     from '../core/Campaign.js'
import { withStyles }               from 'material-ui/styles';
import Button                       from 'material-ui/Button';
import { IconButton }               from 'material-ui';
import { Delete as DeleteIcon }     from 'material-ui-icons';
import FilterListIcon               from 'material-ui-icons/FilterList';
import {getAppStyles}               from '../styles/styles.js'
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
            campaignList: Campaign.load(),
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

        this.setState({ campaignList: Campaign.load(), confirmOpen: false, campaign: null });
    };

    //
    // Deletes the campaign and closes the the dialog
    //
    handleRequestSaveAndClose = () => {

        if (this.state.campaign)
            this.state.campaign.remove();

        // update the list 
        this.setState({ campaignList: Campaign.load(), confirmOpen: false, campaign: null });
    };


    //
    // render
    //
    render = () => (
        <div>
            <List className={this.props.classes.list}>
            {
                this.state.campaignList.map(c => (
                    <ListItem key={c.id} button onClick={() => window.location.href = "/edit/" + c.id}>
                        <ListItemIcon>
                            <FilterListIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary   = {c.title}
                            secondary = { c.toString() }
                        />
                        <ListItemSecondaryAction >
                                <IconButton aria-label="Delete" onClick={ () => this.onDeleteClick(c.id) }>
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