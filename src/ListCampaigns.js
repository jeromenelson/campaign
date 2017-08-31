import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, {
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import {getAppStyles} from './styles.js'

class ListCampaigns extends Component {

    constructor(props) {

        super(props);

        this.data = [
            "Item 1",
            "Item 2",
            "Item 3"
        ];
    }

    render = () => (
        <List className={this.props.classes.list}>
        {
            Object.keys(localStorage).map(d => (
                <ListItem button onClick={() => window.location.href = "/edit/" + d}>
                    <ListItemIcon>
                        <FilterListIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary   = {d}
                        secondary = "Secondary text"
                    />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Delete">
                            <a><DeleteIcon /></a>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                )
            )
        }
        </List>
    );

}

export default withStyles(getAppStyles)(ListCampaigns);