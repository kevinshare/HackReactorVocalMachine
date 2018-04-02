'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');

const config = {
    logging: true,
};

const app = new App(config);
const axios = require('axios');

// =================================================================================
// App Logic
// =================================================================================

app.setHandler({
    'LAUNCH': function() {
        this.toIntent('hello');
    },
    'hello': function() {
        this.ask("Hello welcome to a brilliant application. Ask me questions.")
    },
    'Ask': function() {
        this.ask('Absolutely. What is your question?');
    },
    'findTaco': function(name) {
        axios({
            method: 'GET',
            url: `http://taco-randomizer.herokuapp.com/random/`,
            contentType: 'application/json'
        }).then((data) => {
            console.log(data.data.seasoning.name)
            this.ask(`Interesting. ${name.value} could sauce up a taco with: ${data.data.seasoning.name}`);
        }).catch((err) => {
            console.log(err);
            this.ask('Sorry I didn\'t understand that taco request. Try again.');
        })
    },
    'kev': function() {
        this.ask('Kevin. Kevin Share is a quality young man, but can be seen as a complete goon.')
    },
    'story': function(name) {
        const poss = [
            `Ah yes that beautiful specimen ${name.value}. So beautiful as if they were crafted in the lavas of mordor.`,
            `Oh I have heard of this ${name.value}. Debugging skills off the chain bro.`,
            `Ah yes that beautiful specimen ${name.value}. Such a friend, such a champion, a creator of excellence.`
        ]
        const asker = poss[Math.floor(Math.random() * poss.length)];
        this.ask(asker);
    },
    'functiony': function(numberssequence, number) {
        if (number.value && numberssequence.value.length === 0) {
            console.log(number.value, "This is number")
            const list = number.value.split('');
            const array = list.sort((a,b) =>{
                return a - b;
            });
            const value = list.reduce((acc, val) => {
                return acc + Number(val);
            }, 0);
            this.ask(`Okay heres your sorted array ${array} and reduced value, ${value}`);
        } else if (!numberssequence.value) {
            this.ask('Sorry. Thats not a number sequence. Try that again.');
        } else {
            console.log(numberssequence.value, "This is sequence");
            const list = numberssequence.value.split('');
            const array = list.sort((a,b) =>{
                return a - b;
            });
            const value = list.reduce((acc, val) => {
                return acc + Number(val);
            }, 0);
            this.ask(`Okay heres your sorted array ${array} and reduced value, ${value}`);
        }
    },
    'HackReactor': function() {
        this.ask('hack reactor. hack reactor will sauce you up. Every other bootcamp is inferior.');
    },
    'beth': function() {
        this.ask('any Backbone convention, but regularly you can be roasted by her superior debugging, and suspensful hums at hack reactor');
    },
    'made': function() {
        this.ask('Jovo, a brilliant npm package for creating a node application, connecting smoothly with dialogflow, your express server, the google actions api, amazon web services, and the world.');
    },
    'whatDoYouThink': function() {
        this.ask('It would be better if you actually made something visually pleasing. Ha. You know Like french snack pleasing.');
    },
});

module.exports.app = app;