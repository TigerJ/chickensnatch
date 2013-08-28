ig.module(
	'game.entities.chicken1'
)
.requires(
    // note that anything in abstractities
    // is an abstract entity that needs to be extended
	'plusplus.abstractities.creature',
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
	ig.EntityChicken1 = ig.global.EntityChicken1 = ig.Creature.extend({
		size: {x: 16, y: 16},
		zIndex:100,
		// offset:{x:0,y:-5},
		// animations the Impact++ way
		// note that these animations are for
		// both side scrolling and top down mode
		// you will likely only need one or the other
		// so your animSettings will be much simpler
		
		animSheet: new ig.AnimationSheet( 'media/chicken1.png', 16, 16 ),
		
		animInit: "moveX",
		collides:ig.Entity.COLLIDES.NEVER,
		// for example, a sidescroller's animSettings
		// will only use idleX and moveX
		// while a top down where entities can flip on X and Y
		// will use idleX/Y, moveX/Y
		// but if the entities CANNOT flip on X and Y
		// will use idleLeft/Right/Up/Down, moveLeft/Right/Up/Down
		
		animSettings: {
			moveX: {
				frameTime: (Math.random()*.12)+.08,
				sequence: [0,1,0,1,0,1,0,1,0,2,0,1,0,1,0,1]
			}
			
		},
		setAlternateAnim:false,
		// lets slow it downnnnnnn
		
		maxVelGrounded: { x: 25, y: 25 },
		frictionGrounded: { x: 800, y: 800 },
		speed: { x: 100, y: 100 },
		
		// spikes can't jump or climb
		invulnerable: true,
		canJump: false,
		canClimb: false,
		
		// stats
		
		health: 10,
		
		// explode with a few red particles when killed
		
		deathSettings: {
			spawnCountMax: 50,
			spawnSettings: {
				animTileOffset: ig.EntityParticleColor.colorOffsets.RED,
				offset:{x:_c.CHARACTER.SIZE_OFFSET_X, y:_c.CHARACTER.SIZE_OFFSET_Y}	
			}
			
		},
		name:'chicken1',
		// use this method to add types for checks
		// since we are using bitwise flags
		// we can take advantage of the fact that they can be added
		init:function (settings, x, y)
		{
			this.parent(settings,x,y);
			ig.game.totalChickens++;
		},
		initTypes: function () {
			
			this.parent();
			
			// spikes can be damaged
			
			_ut.addType(ig.EntityExtended, this, 'type', "DAMAGEABLE");
			
			// spikes are in enemy group and will not collide with or hurt each other
			
            _ut.addType(ig.EntityExtended, this, 'group', "ENEMY", "GROUP");
			
			// spikes will collide and hurt any character not in their group
			
			_ut.addType(ig.EntityExtended, this, 'checkAgainst', "CHARACTER");
			
		},
		updateChanges:function(){
			if(this.setAlternateAnim==true)
			{
				this.addAnim("moveX",{
				frameTime: (Math.random()*.12)+.08,
				sequence: [0,1,0,1,0,2,0,1,0,1,0,1,0,1,0,1]
			});
				this.setAlternateAnim=false;
			}
			this.parent();
		},
		check: function( entity ) {
			
			this.parent(entity);
			if(entity.name=="player")
			{
				
				if(!entity.hasChicken)
				{
					ig.game.sfx_chickenhurt.volume=0.5;
					ig.game.sfx_chickenhurt.play();
					entity.hasChicken=true;
					this.receiveDamage(10,entity);
					this.die();
				}
			}
		}
		
	});

});