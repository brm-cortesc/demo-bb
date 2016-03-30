/*var Biblioteca = Backbone.Model.extend({
	titulo: '',
	titulo: '',
	titulo: '',
	toTemplateJSON: function() {
		var json = this.toJSON();
		json.area = this.area();
		return json;
	}
});

titulo: '',*/

// var libro = Backbone.Model.extend({});
/*var Libro = Backbone.Model.extend({
    id:[]
});
*/
var libro = Backbone.Model;



var NoteStore = Backbone.Collection.extend({
    model: libro,
    url: 'https://www.googleapis.com/books/v1/volumes?q=python&maxResults=10&startIndex=20&fields=totalItems,items%28id,volumeInfo/title,volumeInfo/subtitle,volumeInfo/authors,volumeInfo/publishedDate,volumeInfo/description,volumeInfo/imageLinks%29',
    parse: function( response ) {
        return response;
    },
    // Overwrite the sync method to pass over the Same Origin Policy
        sync: function(method, model, options) {
            var that = this;
                var params = _.extend({
                    type: 'GET',
                    dataType: 'jsonp',
                    url: that.url,
                    processData: false
                }, options);

            return $.ajax(params);
        }
});


var viewLista = Backbone.View.extend({
	 
	 initialize: function () {
	 	
	 	_.bindAll(this, 'render');
      // create a collection
      this.collection = new NoteStore();
      // Fetch the collection and call render() method
      var that = this;
      this.collection.fetch({
        success: function () {
            that.render();
        }
      });
	 },
	 
	 template: _.template($('#libros-template').html()),
	 
	 render: function() {
        // Fill the html with the template and the collection
        $(this.el).html(this.template({ libro: this.collection.toJSON() }));
    },
	 

});

var app = new viewLista({
    // define the el where the view will render
    el: $('.row-render')
});

/*
var viewLista = new viewLista();

 var Router = Backbone.Router.extend({
      routes: {
        '': 'home'
      }
    });

    var router = new Router();
    router.on('route:home', function () {
      viewLista.render();
    });


var notes = new NoteStore();
console.log(notes);
notes.fetch();*/