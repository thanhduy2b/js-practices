(function(global, $) {
    
    // 'new' an object
    var Greetr = function (firstname, lastname, language) {
        return new Greetr.init(firstname, lastname, language);
    }
    
    // hidden within the scope of the IIFIIFE and never directly accessible
    var supportedLangs = ['en', 'es'];
    
    // informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };
    
    // formal greetings
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };
    
    // logger messages
    var logMessages = {
        en: 'Logged in',
        es: 'Inició sesion'
    };
    
    Greetr.prototype = {
        
        // 'this' refers to the calling object at execution time
        fullname: function () {
            return this.firstname + ' ' + this.lastname;
        },
        
        validate: function () {
            // check that is a valid language
            // references the externally inaccessible 'supportedLangs' within the closure
            if (supportedLangs.indexOf(this.language) == -1) {
                throw "Invalid language";
            }
        },
        
        // retrieve messages from object by referring to properties using [] syntax
        greeting: function () {
            return greetings[this.language] + ' ' + this.firstname + '!';
        },
        
        formalGreeting: function () {
            return formalGreetings[this.language] + ' ' + this.firstname + '!';
        },
        
        // chainable methods return their own containing object
        greet: function (formal) {
            var msg;
            
            // if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            
            if(console) {
                console.log(msg);
            }
            
            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        
        log: function () {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullname());
            }
            
            return this;
        },
        
        setLang: function (lang) {
            
            // set the language
            this.language = lang;
            
            // validate
            this.validate();
            
            // make chainable
            return this;
        },
        
        HTMLGreeting: function (selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';
            }
            
            if (!selector) {
                throw 'Missing jQuery selector';
            }
            
            // determine the message
            var msg;
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            
            // inject the message in the chosen place in the DOM
            $(selector).html(msg);
            
            // make chainable
            return this;
        }
    };
    
    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Greetr.init = function (firstname, lastname, language) {
        
        var self = this;
        self.firstname = firstname || '';
        self.lastname = lastname || '';
        self.language = language || 'en';
        
        self.validate();
    }
    
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;
    
    // attach our Greetr to the global object, and provide a shorthand '$G' for ease our poor fingers
    global.Greetr = global.G$ = Greetr;
    
}(window, jQuery));