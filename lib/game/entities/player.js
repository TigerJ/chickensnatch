ig.module(
	'game.entities.player'
)
.requires(
	'plusplus.abstractities.player',
	'plusplus.helpers.utils',
	'plusplus.helpers.utilsvector2',
	'plusplus.core.config',
	'plusplus.abilities.glow',
	'plusplus.ui.ui-meter',
	'plusplus.ui.ui-element'
	
	// and some utils

)
.defines(function(){
	 "use strict";
	
	var _c = ig.CONFIG;
	var _ut = ig.utils;
	var _utv2 = ig.utilsvector2;
ig.EntityPlayer = ig.global.EntityPlayer = ig.Player.extend({
	size: {x: 24, y:16},
	zIndex:90,
	// offset: {x:0,y:-5},
	//gravityFactor:0,//VERY IMPORTANT. if your title screen falls off the level. this is why :)
	animSheet: new ig.AnimationSheet( 'media/fox.png', 24, 16 ),	
	// flip:false,
	// accelGround:400,
	// accelAir:200,
	// friction:{x:600,y:0},
	// maxVel:{x:100,y:200},
	// animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'player.png', 16, 16 ),	
	
	// animations the Impact++ way
	jumpSteps:9,
	jumpForce:10,
	animInit:'idleX',
	animSettings: {
		idleX: {
			frameTime: 1,
			sequence: [0]
		},
		moveX: {
			frameTime: 0.07, 
			sequence: [1,2]
		},
		moveY: {
			frameTime: 0.07, 
			sequence: [1,2]
		},
		jumpX: {
			frameTime: 1, 
			sequence: [3]
		},
		jumpY: {
			frameTime: 1, 
			sequence: [3]
		},
		fallX: {
			frameTime: 1, 
			sequence: [3]
		},
		fallY: {
			frameTime: 1, 
			sequence: [3]
		}
	},
	glowSettings: {
			alpha:.45,

			// these directly correlate
			// to ig.Entity light properties
			light: {
				r: 0.5,
				g: 0.5,
				b: 0.5,
				// cast shadows only on static entities
				castsShadows: true
			}
		},
	deathSettings: {
			spawnCountMax: 50,
			spawnSettings: {
				animTileOffset: ig.EntityParticleColor.colorOffsets.RED,
				offset:{x:_c.CHARACTER.SIZE_OFFSET_X, y:_c.CHARACTER.SIZE_OFFSET_Y}	
			}
		},
	name:"player",
	hasChicken:false,
	setChickenAnimations:false,
	deathTimer:null,
	safeZone:false,
	scoreTimer:null,
	initProperties: function () {
		this.parent();
		// this.glow = new ig.AbilityGlow( this );
		this.abilities.addDescendants( [
			// this.glow
		]);
		
	},
	init:function(x,y,settings)
	{
		this.parent(x,y,settings);
		//////////////////////////
		this.scoreTimer=new ig.Timer();
		if(!ig.global.wm)
		{
			ig.game.initUI();
			// ig.game.getEntitiesByClass(UIOverlay)[0].alpha=0.6;
			ig.game.spawnEntity(UIMeterHealth,0,0);
			ig.game.spawnEntity(UIRemainingChickens,0,0);
			// ig.game.spawnEntity(UIRemainingChickensText,0,0);

		}
	},
	updateChanges: function() {
		/////////////////////////
		if(this.hasChicken && !this.setChickenAnimations)
		{
			// console.log("chicken meat");
			this.addAnim("idleX",{
				frameTime: 1,
				sequence: [4]
			});
			this.addAnim("moveX",{
				frameTime: 0.07,
				sequence: [5,6]
			});
			this.addAnim("jumpX",{
				frameTime: 1,
				sequence: [7]
			});
			this.addAnim("fallX",{
				frameTime: 1,
				sequence: [7]
			});
			this.setChickenAnimations=true;
		}
		//if the fox can die (is not in a safezone)
		if(!this.deathTimer)
			this.deathTimer=new ig.Timer(10);
		if(!this.safeZone)
		{
			
			this.deathTimer.unpause();
			this.health=Math.round(this.deathTimer.delta())*-1;
			ig.game.getEntitiesByClass(UIMeterHealth)[0].setValue(this.health*.1);
		}
		else
		{
			this.deathTimer.pause();
		}
		// console.log(this.safeZone);
		if(this.health<=0)
		{
			this.die();
			// ig.game.loadLevelDeferred(LevelProto);
		}
		
		this.parent();
	},
	// restoreStats:function(from){
	// 	////////////////////////////

	// 	this.parent(from);
	// },
	die:function(){
		this.parent();	
		this.health=10;
		this.deathTimer=null;
		ig.game.sfx_foxhurt.volume=0.4;
		ig.game.sfx_foxhurt.play();
		
	}
});
// it is easy to create a basic health meter
ig.UIMeterHealth = ig.global.UIMeterHealth = ig.UIMeter.extend({
     // set the fill to a red color
     fillStyle: 'rgb(218,2,5)',
     // give it a 2% margin so it isn't smooshed against the screen edge
     // ui elements have a default position of top left
     margin: { x: 0.02, y: 0.02 },
     // we can also add animations to the meter
     animSheet: new ig.AnimationSheet( 'media/hearticon.png', 8, 8 ),
     // set the base size of our animated area (not the bar)
     // the bar has a default size based on ig.CONFIG.ENTITY.SIZE_X and ig.CONFIG.ENTITY.SIZE_Y
     size: { x: 8, y: 8 },
     // and automatically create idle animation from the sheet
     animSettings: true
});
ig.UIRemainingChickens = ig.global.UIRemainingChickens = ig.UIElement.extend({
	margin: { x: .22, y: 0.02 },
     // we can also add animations to the meter
     animSheet: new ig.AnimationSheet( 'media/chickenhead.png', 8, 8 ),
     // set the base size of our animated area (not the bar)
     // the bar has a default size based on ig.CONFIG.ENTITY.SIZE_X and ig.CONFIG.ENTITY.SIZE_Y
     size: { x: 8, y: 8 },
     // and automatically create idle animation from the sheet
     animSettings: true
});
ig.UIRemainingChickensText = ig.global.UIRemainingChickensText = ig.UIText.extend({
	font: new ig.Font('media/font_04b03_white_8.png'),
	margin: { x: .28, y: 0.02 },
	text:"0"
});
// then spawn an instance of the ig.UIMeterHealth when the player is added to the game
// and update the meter's value whenever the player takes damage or is healed
});