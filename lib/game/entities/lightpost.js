/**
 * Simple torch that gives off a glow.
 */
ig.module(
	'game.entities.lightpost'
)
.requires(
    // note that anything in abstractities
    // is an abstract entity that needs to be extended
	'plusplus.abstractities.character',
	// require the glow ability
	// lets see some lights!
	'plusplus.abilities.glow',
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
		
	ig.EntityLightpost = ig.global.EntityLightpost = ig.Character.extend({
		
		size: {x: 8, y: 16},
		name:"lightpost",
		zIndex:25,
		// torches don't need to collide
		
		collides: ig.Entity.COLLIDES.NONE,
		
		// torches don't move or update
		
		performance: _c.STATIC,
		// animations the Impact++ way
		// note that these animations are for
		// both side scrolling and top down mode
		// you will likely only need one or the other
		// so your animSettings will be much simpler
		
		animSheet: new ig.AnimationSheet( 'media/lightpost.png', 8, 16 ),
		
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
		
		// settings for glow
		
		glowSettings: {
			sizeMod: 6,
			// these directly correlate
			// to ig.Entity light properties
			light: {
				alpha:.35,
				r: 1,
				g: 0.85,
				b: 0.7,
				// cast shadows only on static entities
				castsShadows: true
			},
			pixelPerfect:true,
		},
		// use this method to add properties
		// that need to be initialized one time
		// before the entity is added to the game
		
		initProperties: function () {
			this.parent();
			this.glow = new ig.AbilityGlow( this );
			this.abilities.addDescendants( [
				this.glow
			]);
			this.name="lightpost";
		}
		
	});
	
	/**
	 * Ability for glowing like a torch. This should probably have its own module!
	 **/
	// ig.TorchGlow = ig.AbilityGlow.extend( {
		
	// 	activate: function () {
			
	// 		this.entity.animOverride( this.entity.getDirectionalAnimName( "on" ), { loop: true } );
			
	// 		this.parent();
			
	// 	},
		
	// 	deactivate: function () {
			
	// 		var animName = this.entity.getDirectionalAnimName( "on" );
			
	// 		if ( this.entity.anims[ animName ] && this.entity.currentAnim === this.entity.anims[ animName ] ) {
				
	// 			this.entity.animRelease();
			
	// 		}
			
	// 		this.parent();
			
	// 	}
		
	// } );

});