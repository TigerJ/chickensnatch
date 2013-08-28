/**
 * Simple torch that gives off a glow.
 */
ig.module(
	'game.entities.doghouse'
)
.requires(
    // note that anything in abstractities
    // is an abstract entity that needs to be extended
	'plusplus.abstractities.character',
	// require the glow ability
	// lets see some lights!
	// if you want to use the config
    // don't forget to require it
    'plusplus.core.config',
	// and some utils
	'plusplus.helpers.utils'
)
.defines(function(){
	"use strict";

	var _c = ig.CONFIG;
	var _ut = ig.utils;
		
	ig.EntityDoghouse = ig.global.EntityDoghouse = ig.Character.extend({
		
		size: {x: 24, y: 24},
		// name:"doghouse",
		zIndex:30,
		// torches don't need to collide
		
		collides: ig.Entity.COLLIDES.NONE,
		
		// torches don't move or update
		
		performance: _c.STATIC,
		// animations the Impact++ way
		// note that these animations are for
		// both side scrolling and top down mode
		// you will likely only need one or the other
		// so your animSettings will be much simpler
		
		animSheet: new ig.AnimationSheet( 'media/doghouse.png', 24, 24 ),
		
		animInit: "idleX",
		
		animSettings: {
			idleX: {
				frameTime: 1,
				sequence: [0]
			}
		},
		
		// never needs to flip on y
		
		canFlipX: true,
		canFlipY: false,
		
		// torches never die
		
		invulnerable: true,
	});
});