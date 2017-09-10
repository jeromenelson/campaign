import { grey, red, purple, green } from 'material-ui/colors';
import { createMuiTheme }           from 'material-ui/styles';
import createPalette                from 'material-ui/styles/palette';

//
// Returns the application theme object
//
export function getTheme()  { 

    return createMuiTheme({
        palette: createPalette({
            primary: purple,
            accent: {...green, A400: '#00e677',},
            error: red,
        }),
    });
}

//
// Returns the style for the app components
//
export function getAppStyles(theme) {
    
    return {
        container: {

        },

        dateField: {
          width: 200
        },

        group: {
            margin: `${theme.spacing.unit}px 0`,
            width: 400,
            display: "inline-flex"
        },

        label: {
            marginTop: 70,
            textAlign: "left",
            width: 400,
            display: "inline-block"
        },

        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 400,
        },

        audiance: {
            width: 400,
            textAlign: "left",
            display: "inline-block"
        },

        aside: {
            display: "inline-block",
            position: "absolute",
            right: 10,
            fontWeight: 300,
            fontSize: "90%",
            textTransform: "capitalize",
            color: "#ccc"
        },

        list: {
            display: "inline-block",
            width: 600,
            textAlign: "left"
        },

        deleteIcon: {
            marginLeft: 20
        }
    };
}

//
// Returns the style object for auto suggestion 
//
export function getSuggestBoxStyles(theme) {
  
    return {
        autosuggestBox: {
        },
        hidden: {
          display: "none"
        },
        container: {
            flexGrow: 1,
            position: 'relative',
            zIndex: 3
        },
        suggestionsContainerOpen: {
            display: 'inline-flex',
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit * 3,
            width: 400
        },
        suggestion: {
            display: 'block',
        },
        suggestionsList: {
            margin: 0,
            padding: 0,
            listStyleType: 'none',
            width: "100%"
        },
        textField: {
            width: 400,
        },
        chip: {
            margin: theme.spacing.unit,
        },
        svgIcon: {
            color: grey[800],
        },
        row: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
        }, 
    };
}