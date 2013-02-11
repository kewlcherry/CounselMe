var counsel = new Application();

counsel.Router = Backbone.Router.extend({

    routes: {
        "":                         "welcome",
        "me":                       "me",
		"me/notifications":         "notifications",
		"me/requests":         		"requests",
        "categories":               "categories",
        "person/:id":               "userprofile",
        "categories/:id":    		"usersincategories",
        "person/:id/reviews": 		"userreviews",
		"person/:id/counsel": 		"counsel"
       
    },

    initialize: function() {
        // Caching the Welcome View
        this.welcomeView = new counsel.views.Welcome({model: counsel.user});
    },

    welcome: function () {
        $('#content').html(this.welcomeView.el);
    },

    me: function () {
		
		this.myself('me');
	
    },
	
	notifications: function () {
		
		this.mynotifications('me');
	
    },
	
	requests: function () {
		
		this.myrequests('me');
	
    },
	
	categories: function () {
		
		this.mycategories('me');
	
    },
	
    mynotifications: function (id) {
	$('#content').html('');
        var self = this;
        try {
            FB.api("/" + id + "/likes?limit=20", function (response) {
                if (response.error) {
                    self.showErrorPage();
                } else {
                    $('#content').append(new counsel.views.Notifications({model: new Backbone.Model(response)}).el);
                }
            });
        } catch (e) {
            this.showErrorPage();
        }
    },
	
	myrequests: function (id) {
	$('#content').html('');
        var self = this;
        try {
            FB.api("/" + id + "/feed?limit=20", function (response) {
                if (response.error) {
                    self.showErrorPage();
                } else {
                    $('#content').append(new counsel.views.MyRequests({model: new Backbone.Model(response)}).el);
                }
            });
        } catch (e) {
            this.showErrorPage();
        }
    },

    mycategories: function (id) {
	$('#content').html('');
         var self = this;
        try {
            FB.api("/" + id + "/friends?limit=20", function (response) {
                if (response.error) {
                    self.showErrorPage();
                } else {
                    $('#content').append(new counsel.views.Categories({model: new Backbone.Model(response)}).el);
                }
            });
        } catch (e) {
            this.showErrorPage();
        }
    },
	
	myself: function (id) {
	$('#content').html('');
          var self = this;
        try {
            FB.api("/" + id, function (response) {
                if (response.error) {
                    self.showErrorPage();
                } else {
                    $('#content').append(new counsel.views.MySelf({model: new counsel.models.Person(response)}).el);
                }
            });
        } catch (e) {
            this.showErrorPage();
        }
    },

    userprofile: function (id) {
	$('#content').html('');
          var self = this;
        try {
            FB.api("/" + id, function (response) {
                if (response.error) {
                    self.showErrorPage();
                } else {
                    $('#content').append(new counsel.views.Person({model: new counsel.models.Person(response)}).el);
                }
            });
        } catch (e) {
            this.showErrorPage();
        }
    },

    usersincategories: function (id) {
        var self = this;
        $('#content').html('');
        try {
            FB.api("/" + id + "/mutualfriends?limit=20", function (response) {
                if (response.error) {
                    self.showErrorPage();
                } else {
                    $('#content').append(new counsel.views.Users({model: new Backbone.Model(response)}).el);
                }
            });
        } catch (e) {
            this.showErrorPage();
        }
    },

    userreviews: function (id) {
        var self = this;
	  try {
            FB.api("/" + id + "/feed?limit=20", function (response) {
                if (response.error) {
                    self.showErrorPage();
                } else {
                    $('#review').append(new counsel.views.Reviews({model: new Backbone.Model(response)}).el);
                }
            });
        } catch (e) {
            this.showErrorPage();
        }
    },
	
	counsel: function () {
        $('#content').html('');
        $('#content').append(new counsel.views.Counsel().el);
    },

    showErrorPage: function () {
        $('#content').append(new counsel.views.Error().el);
    }

});

$(document).on('ready', function() {
    counsel.user = new counsel.models.Person(); // Holds the authenticated Facebook user
    // Load HTML templates for the app
    counsel.templateLoader.load(['shell', 'welcome', 'login', 'myself','person', 'categories', 'users', 'counsel', 'notifications','myrequests','counsel','reviews'], function () {
        counsel.shell = new counsel.views.Shell({el: "#shell", model: counsel.user});
        counsel.router = new counsel.Router();
        Backbone.history.start();
    });
});

$(document).on('fbStatusChange', function (event, data) {
    if (data.status === 'connected') {
        FB.api('/me', function (response) {
            counsel.user.set(response); // Store the newly authenticated FB user
        });
    } else {
        counsel.user.set(counsel.user.defaults); // Reset current FB user
    }
});

$(document).on('logout', function () {
    FB.logout();
    return false;
});

$(document).on('login', function () {
    FB.login(function(response) {
    }, {scope: 'publish_actions'});
    return false;
});