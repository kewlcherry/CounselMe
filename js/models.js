counsel.models.Person = Backbone.Model.extend({
    defaults: {
        "id":  "",
        "name":     "",
        "first_name":    "",
        "last_name":    "",
        "gender":    "",
        "username":    "",
        "link":    "",
        "locale":    "",
        "timezone":    ""
    }
});

counsel.models.PersonCollection = Backbone.Collection.extend({

    model: counsel.models.Person

});