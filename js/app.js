var pokemon = Backbone.Model.extend({});

 // url: 'https://www.googleapis.com/books/v1/volumes?q=python&maxResults=10&startIndex=20&fields=totalItems,items%28id,volumeInfo/title,volumeInfo/subtitle,volumeInfo/authors,volumeInfo/publishedDate,volumeInfo/description,volumeInfo/imageLinks%29',

var Pokedex = Backbone.Collection.extend({
    model: pokemon,
    url: 'pokemons.json',
    parse: function( response ) {
        return response;
    },
});




var viewPokedex = Backbone.View.extend({

  el: $('.row-render'),
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
   
   events:{
      "click":"pokemonSelected",  
   },
   
   render: function() {
        // Fill the html with the template and the collection
        this.$el.html(this.template({ pokemon: this.collection.toJSON() }));
        // this.$el.html('hola');
        return this
    },
   
   pokemonSelected: function(e){
       if(e.which === $(this).click()){
           Pokedex.get($(this).attr('a').parent());
       }
   }

});

var app = new viewPokedex;