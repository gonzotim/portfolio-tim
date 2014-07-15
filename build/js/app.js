// Custom JS Application Code

// If using JSLint for syntax debugging, include the following
/*global $, console, alert, App*/

$(function() { 
	App.init();
});

var App = { 

	settings: { 
		name: "My Application",	
		version: "1.0.0",
		ga: {
			urchin: "UA-XXXXXX-XX",
			url: "yourdomain.com"
		}
	},

	listen: function() { 
		// Application Listeners can be loaded here for easy configuration		
		console.log("Ready and Listening");
		
		$( ".slideshow_launch, .hero_image .mock" ).click(function( event ) {
  			var section_id = $(this).parent().parent().data("section-id");
  			//console.log(section_id)
  			event.preventDefault();
  			App.slideshow_launch( section_id );
		});

		$( ".slideshow_close" ).click(function( event ) {
  			event.preventDefault();
  			App.slideshow_close();
		});	

		$( ".slideshow_next" ).click(function( event ) {
  			event.preventDefault();
  			App.slideshow_next();
		});	

		$( ".slideshow_previous" ).click(function( event ) {
  			event.preventDefault();
  			App.slideshow_previous();
		});						
	},	

	init: function() {
		// Kick off the listeners
		this.listen();
		// Application has been initalized
		console.log(this.settings.name + "(v" + this.settings.version + ") Started");	

		this.add_attr_to_images();

	},

	tim: function() {
		console.log("hell yeah");
	},

	add_attr_to_images: function() {
		var images = $( ".slide_show_image" );
		var image_ids = [];
		$.each(images, function( index ) {
  			$(this).attr("data-image_id", index);
  			//console.log('add data0image_id', index);
  			image_ids.push(index.toString());
		});
		$.data( document.body, "image_ids", image_ids );
	},

	push_slideshow_image: function( image_id ) {
		var image = $( ' .slide_show_image[data-image_id = "' + image_id + '"] ');
		var images_from_set = $( ' .slide_show_image[data-image_id = "' + image_id + '"] ').parent().children();
		var image_ids = [];
		$.each(images_from_set, function( ) {
  			image_ids.push($(this).attr("data-image_id"));
		});
		$( ".slideshow_image_container" ).html( image.clone() );
		var project_name = $( ".slideshow_image_container img" ).attr("data-project_name");
		$( ".slideshow_text .project_name" ).html( "<strong>" + project_name + "</strong>" + ". Image " + ($.inArray(image_id.toString(), image_ids) + 1 ) + " of " + image_ids.length  );
		var caption = $( ".slideshow_image_container img" ).attr("data-caption");
		$( ".slideshow_text .caption" ).html( caption );
	},

	slideshow_launch: function( section_id ) {
		$( ".slideshow" ).css( "display", "block");
		var distance_to_top = $(window).scrollTop();
		$( ".slideshow" ).css( "margin-top", distance_to_top);
		$( "body" ).css( "overflow", "hidden");
		var image_ids = $.data( document.body, "image_ids" );
		console.log("section id", section_id);
		var first_image_id = $( "li[data-section-id='" + section_id + "'] .slide_show_image" ).first().attr("data-image_id" );
		var position = $.inArray( first_image_id, image_ids );
		$.data( document.body, "position", position );
		console.log("first image id", first_image_id);
		App.push_slideshow_image( first_image_id );
	},

	slideshow_close: function() {
		$( ".slideshow" ).css( "display", "none");
		$( "body" ).css( "overflow", "auto");
	},

	slideshow_next: function(){
		var current_position = $.data( document.body, "position" );
		var image_ids = $.data( document.body, "image_ids" );
		var new_position;
		if ( current_position + 1 === image_ids.length ) {
		    new_position = 0;
		} else { 
		    new_position = current_position + 1;
		}
		var image_id = image_ids[new_position];
		App.push_slideshow_image( image_id );
		$.data( document.body, "position", new_position );
	},

	slideshow_previous: function(){
		var current_position = $.data( document.body, "position" );
		var image_ids = $.data( document.body, "image_ids" );
		var new_position;
		if ( current_position  === 0 ) {
		    new_position = image_ids.length - 1;
		} else { 
		    new_position = current_position - 1;
		}
		var image_id = image_ids[new_position];
		App.push_slideshow_image( image_id );
		$.data( document.body, "position", new_position );
	}

};












