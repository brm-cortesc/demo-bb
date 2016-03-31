var pokemon = Backbone.Model.extend({});

var Pokedex = Backbone.Collection.extend({
    model: pokemon,
    url: 'pokemons.json',
    parse: function( response ) {
        return response;
    }
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

   

});


var viewPokemon = Backbone.View.extend({

  el: $('.row-pokemon'),
  template: _.template($('#pokemon-template').html()),

 
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
        this.$el.html(this.template({ Pokemon: this.collection}));
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
