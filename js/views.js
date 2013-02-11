counsel.views.Shell = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(counsel.templateLoader.get('shell'));
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        new counsel.views.Login({model: this.model, el: '#login'});
        return this;
    },

    events: {
        'mousedown li': 'mouseDown',
        'mouseup li': 'mouseUp',
        'click .btn-login': 'login'
    },

    mouseDown: function (e) {
        $(e.currentTarget).addClass('active');
    },

    mouseUp: function () {
        $('li').removeClass('active');
    },

    login: function () {
        $(document).trigger('login');
        return false;
    }

});

counsel.views.Welcome = Backbone.View.extend({

    initialize: function () {
        var self = this;
        this.template = _.template(counsel.templateLoader.get('welcome'));
        this.model.on("change", this.showHideButtons, this);
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        this.showHideButtons();
        return this;
    },

    showHideButtons: function () {
        if (this.model.get('id') !== '') {
            $('.btn-login', this.el).addClass('hidden');
            $('.btn-profile', this.el).removeClass('hidden');
        } else {
            $('.btn-login', this.el).removeClass('hidden');
            $('.btn-profile', this.el).addClass('hidden');
        }
    }

});

counsel.views.Login = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(counsel.templateLoader.get('login'));
        this.model.on("change", this.render, this);
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        'click .login': 'login',
        'click .logout': 'logout'
    },

    login: function (e) {
        $(document).trigger('login');
        return false;
    },

    logout: function (e) {
        $(document).trigger('logout');
        return false;
    }

});

counsel.views.Person = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(counsel.templateLoader.get('person'));
        this.model.on("change", this.render, this);
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});

counsel.views.MySelf = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(counsel.templateLoader.get('myself'));
        this.model.on("change", this.render, this);
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});

counsel.views.Error = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(counsel.templateLoader.get('error'));
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events: {
        'click .retry':'retry'
    },

    retry: function () {
        Backbone.history.loadUrl(Backbone.history.fragment);
    }

});



counsel.views.Categories = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(counsel.templateLoader.get('categories'));
        this.model.on("change", this.render, this);
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        'click .next': 'next',
        'click .previous': 'previous'
    },

    next: function () {
        this.fetch(this.model.get('paging').next);
        return false;
    },

    previous: function () {
        this.fetch(this.model.get('paging').previous);
        return false;
    },

    fetch: function (url) {
        var self = this;
        $.ajax({url:url, dataType:"json"}).done(function (response) {
            self.model.set(response);
        }).fail(function (e) {
                alert('Error fetching data');
            });
    }

});


counsel.views.Users = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(counsel.templateLoader.get('users'));
        this.model.on("change", this.render, this);
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        'click .next': 'next',
        'click .previous': 'previous'
    },

    next: function () {
        this.fetch(this.model.get('paging').next);
        return false;
    },

    previous: function () {
        this.fetch(this.model.get('paging').previous);
        return false;
    },

    fetch: function (url) {
        var self = this;
        $.ajax({url:url, dataType:"json"}).done(function (response) {
            self.model.set(response);
        }).fail(function (e) {
                alert('Error fetching data');
            });
    }

});

counsel.views.Notifications = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(counsel.templateLoader.get('notifications'));
        this.model.on("change", this.render, this);
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        'click .next': 'next',
        'click .previous': 'previous'
    },

    next: function () {
        this.fetch(this.model.get('paging').next);
        return false;
    },

    previous: function () {
        this.fetch(this.model.get('paging').previous);
        return false;
    },

    fetch: function (url) {
        var self = this;
        $.ajax({url:url, dataType:"json"}).done(function (response) {
            self.model.set(response);
        }).fail(function (e) {
                alert('Error fetching data');
            });
    }

});

counsel.views.Reviews = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(counsel.templateLoader.get('reviews'));
        this.model.on("change", this.render, this);
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        'click .next': 'next',
        'click .previous': 'previous'
    },

    next: function () {
        this.fetch(this.model.get('paging').next);
        return false;
    },

    previous: function () {
        this.fetch(this.model.get('paging').previous);
        return false;
    },

    fetch: function (url) {
        var self = this;
        $.ajax({url:url, dataType:"json"}).done(function (response) {
            self.model.set(response);
        }).fail(function (e) {
                alert('Error fetching data');
            });
    }

});

counsel.views.MyRequests = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(counsel.templateLoader.get('myrequests'));
        this.model.on("change", this.render, this);
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        'click .next': 'next',
        'click .previous': 'previous'
    },

    next: function () {
        this.fetch(this.model.get('paging').next);
        return false;
    },

    previous: function () {
        this.fetch(this.model.get('paging').previous);
        return false;
    },

    fetch: function (url) {
        var self = this;
        $.ajax({url:url, dataType:"json"}).done(function (response) {
            self.model.set(response);
        }).fail(function (e) {
                alert('Error fetching data');
            });
    }

});

counsel.views.Counsel = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(counsel.templateLoader.get('counsel'));
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events: {
        "click .post": "postMessage"
    },

    postMessage: function () {
        var status = {
                name:$('.itemName').val(),
                link:$('.link').val(),
                picture:$('.picture').val(),
                caption:$('.caption').val(),
                description:$('.description').val()
            };
        FB.api('/me/feed', 'post', status, function(response) {
            if (response && response.id) {
                alert('Your post was published.');
            } else {
                alert('Your post was not published.');
            }
        });
        return false;
    }

});
