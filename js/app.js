var pokemon = Backbone.Model.extend({});

 // url: 'https://www.googleapis.com/books/v1/volumes?q=python&maxResults=10&startIndex=20&fields=totalItems,items%28id,volumeInfo/title,volumeInfo/subtitle,volumeInfo/authors,volumeInfo/publishedDate,volumeInfo/description,volumeInfo/imageLinks%29',

var Pokedex = Backbone.Collection.extend({
    model: pokemon,
    url: 'pokemons.json',
    parse: function( response ) {
        return response;
    }

    // id: function (id) {
    //   console.log(this.id);
    // },
});




var viewPokedex = Backbone.View.extend({

  el: $('.row-render'),
  template: _.template($('#pokedex-template').html()),

   events: {
    'click .btn-primary': 'display' 
  },
   
   
   initialize: function () {
  
      // create a collection
      this.collection = new Pokedex();
      // Fetch the collection and call render() method
      var that = this;
      this.collection.fetch({
        success: function () {
            that.render();
        }
      });
   },
   
   
   render: function() {
        // Fill the html with the template and the collection
        this.$el.html(this.template({ pokemon: this.collection.toJSON() }));
        // this.$el.html('hola');
        return this
    },

    display: function (e) {

    var id = $(e.target).attr('data-id');

      appRouter.navigate('pokemon/'+id, true);

    }

   // id: function (e) {
   //  e.preventDefault();

   //  this.collection.each( function(index) {

   //    console.log(index);

   //  });

   // }
   

});


var viewPokemon = Backbone.View.extend({

  el: $('.row-pokemon'),
  template: _.template($('#pokemon-template').html()),

 
   initialize: function () {
  
      // create a collection
      this.collection = new Pokedex();
      // Fetch the collection and call render() method
      var that = this;


     //  this.collection.each( function(index) {

     //    var hola = this.model.get("name");
     //    console.log(hola)

     // });


      this.collection.fetch({
        success: function () {
            that.render();
            that.collection.each( function(index) {

      // console.log(index);
        that.$el.html(that.template({ pokemon: index }));

    });
        }
      });
   },   
   
   render: function() {
        // Fill the html with the template and the collection
        this.$el.html(this.template({ pokemon: this.collection[1] }));
        // this.$el.html('hola');
        return this
    }
   

});


var pokeRouter = Backbone.Router.extend({
    routes: {

        '': 'home',

        'pokemon/:id': 'pokemon' 
    },

    initialize: function () {
      // this.view = new viewPokedex();
      this.loadView(new viewPokedex());
    },

    pokemon: function () {

      // this.view = new viewPokemon();
      this.loadView(new viewPokemon());


    },
    loadView : function(view) {
        this.view && this.view.remove();
        this.view = view;
      }

});


var appRouter = new pokeRouter();
// var app = new viewPokedex;
Backbone.history.start(); 

Backbone.history.start({pushState: true});