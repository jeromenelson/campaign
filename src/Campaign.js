export default class Campaign {

    constructor(c) {

        if (typeof c === "string") {

            // load from local storage
            var flat = localStorage.getItem(c);

            // load empty campaign
            if (!flat)
                c = undefined;
            else
                c = JSON.parse(flat);
        }

        if (!c) {
            this.title              = "";
            this.schedule           = "startNow"; // or this can be "schedule"
            this.scheduleStartDate  = "";
            this.scheduleEndDate    = "";
            this.gender             = "anyGender"; // {"anyGender", "male", "female"}
            this.cities             = [];
            this.languages          = [];
            this.devices            = [];
            this.keywords           = [];
            this.followers          = [];
            this.interests          = [];
            this.shows              = [];
            this.events             = [];
        }
        else {
            this.title              = c.title;
            this.schedule           = c.schedule;
            this.scheduleStartDate  = c.scheduleStartDate;
            this.scheduleEndDate    = c.scheduleEndDate;
            this.gender             = c.gender;
            this.cities             = c.cities;
            this.languages          = c.languages;
            this.devices            = c.devices;
            this.keywords           = c.keywords;
            this.followers          = c.followers;
            this.interests          = c.interests;
            this.shows              = c.shows;
            this.events             = c.events;
        }
    }

    remove = () => {

        localStorage.removeItem(this.title);

    }

    toString = () => {

        var self = this;

        const getSchedule =  () => (
            !!self.schedule
                ? "is scheduled to starts on " + self.scheduleStartDate + " and ends on " + self.scheduleEndDate
                : " starts immediately "
            );

        const getAudianceGender = () => (
            !self.gender || self.gender != "anyGender" ? " targeting " + self.gender : " of any gender "
            );

        const getLocation = () => (
            self.cities.length > 0 ? " live in " + self.cities.join(", ") : ""
            );

        const getLanguage = () => (
            self.languages.length > 0 ? " speaking " + self.languages.join(", ") : ""
            );

        const getDevice = () => (
            this.devices.length > 0 ? " use " + self.devices.join(", ") : ""
        );

        const getFollowers = () => (
            this.followers.length > 0 ? " following " + self.followers.join(", ") : ""
        );

        const getInterests = () => (
            this.interests.length > 0 ? " interested in " + self.interests.join(", ") : ""
        );

        const getShows = () => (
            this.shows.length > 0 ? " watches " + self.shows.join(", ") : ""
        );

        const getEvents = () => (
            this.events.length > 0 ? " interested in " + self.events.join(", ") : ""
        );

        return `The campaign ${this.title} ${getSchedule()} and targets audiences 
            ${getAudianceGender()} ${getLocation()} ${getLanguage()} ${getDevice()}
            ${getFollowers()} ${getInterests()} ${getShows()}
        `;

    }

    save = () => {
        
        if (!this.title)
            throw new Error("Title is empty");

        localStorage.setItem(this.title, JSON.stringify(this));
    }
}