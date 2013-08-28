/** 
 * Ghost is used to demo complex pathfinding.
 */
ig.module(
    'game.entities.dog'
)
.requires(
    // note that anything in abstractities
    // is an abstract entity that needs to be extended
    'plusplus.abstractities.creature',
	// a melee ability
    'plusplus.abilities.melee',
	// if you want to use the config
    // don't forget to require it
    'plusplus.core.config',
	// and some utils
	'plusplus.helpers.utils'
)
.defines(function () {
    "use strict";
	
	var _c = ig.CONFIG;
	var _ut = ig.utils;
	
    ig.EntityDog = ig.global.EntityDog = ig.Creature.extend({
		
		size: {x: 24, y: 10},
		offset:{x:0,y:-2},
		collides: ig.EntityExtended.COLLIDES.NEVER,
		zIndex:95,
		// animations the Impact++ way
		
		animSheet: new ig.AnimationSheet( 'media/dog.png', 24, 16 ),	
		
		animInit: "idleX",
		
		animSettings: {
			idleX: {
				frameTime: .08, 
				sequence: [1,0,2,0]
			},
			moveX:{
				frameTime: .08, 
				sequence: [1,0,2,0]
			}
		},
		// don't flip y
		
		canFlipX: true,
		canFlipY: false,
		
		gravityFactor: 1,
		
		// lets slow it downnnnnnn
		
		maxVelGrounded: { x: 45, y: 25 },
		frictionGrounded: { x: 800, y: 800 },
		speed: { x: 100, y: 100 },
		
		// can't jump and climb
		
		canJump: false,
		canClimb: false,
		
		// can't be hurt or killed
		// except by instagib areas
		
		invulnerable: true,
		
		canWanderX: true,
		// canWanderY: true,
		
		// instead of switching wander direction
		// when hitting a wall, lets switch at random also
		
		// wanderSwitchChance: 0,
		// wanderSwitchChanceStopped: 0,
		
		// don't wander too far away from tether
		tether:true,
		// tetherName:"doghouse1",
		tetherDistance: 40,
		
		// don't notice prey too far away
		
		reactionDistance: 70,
		
		// // but once we've got the scent
		// // follow prey beyond reaction distance
		
        moveToPreySettings: {
            searchDistance: 150
        },
		
		// use this method to add types for checks
		// since we are using bitwise flags
		// we can take advantage of the fact that they can be added
		
		initTypes: function () {
			
			this.parent();
			
			// ghosts are in enemy group and will not collide with or hurt other enemies
			
            _ut.addType(ig.EntityExtended, this, 'group', "ENEMY", "GROUP");
			
			// ghosts seeks friend group
			
			_ut.addType(ig.EntityExtended, this, 'preyGroup', "FRIEND", "GROUP");

			_ut.addType(ig.EntityExtended, this, 'checkAgainst', "CHARACTER");
			
		},
		
		// use this method to add properties
		// that need to be initialized one time
		// before the entity is added to the game
		
		initProperties: function () {

			this.parent();

			
		},
		check:function(entity){
			this.parent(entity);
			if(entity.name=="player")
			{
				entity.receiveDamage(10,this);
			}
		}
		
	});

});