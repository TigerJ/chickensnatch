ig.module(
	'game.entities.winscreen'
)
.requires(
	'plusplus.core.entity'
)
.defines(function(){
	"use strict";
	
	var _c = ig.CONFIG;
	var _ut = ig.utils;
	ig.EntityWinTitlescreen = ig.global.EntityWinscreen = ig.EntityExtended.extend({
	size: {x: 960, y:720},
	gravityFactor:0,//VERY IMPORTANT. if your title screen falls off the level. this is why :)
	animSheet: new ig.AnimationSheet( 'media/chickensnatchwinsized.png', 960, 720 ),
	ignoreSystemScale:true,
	scale:1,
	animInit:'idleX',
	animSettings: {
		idleX: {
			frameTime: 1,
			sequence: [0]
		}
	},
	init: function(settings,x,y){
		this.parent(settings,x,y);

		// ig.game.removeEntity(ig.game.getEntitiesByClass(EntityPlayer)[0]);
		// ig.game.getEntitiesByClass(UIOverlay)[0].alpha=0;
		ig.game.getEntitiesByClass(UIOverlay)[0].alpha=0;
		ig.game.removeEntity(ig.game.getEntitiesByClass(UIRemainingChickens)[0]);
		ig.game.removeEntity(ig.game.getEntitiesByClass(UIMeterHealth)[0]);
		ig.game.removeEntity(ig.game.getEntitiesByClass(UIText)[0]);
		// ig.game.ChickenCounterUI.text="";
		// ig.game.ChickenCounterUI.refresh(true);

		// ig.game.removeEntity(ig.game.getEntitiesByClass();
	},
	update: function() {
		this.parent();
		//your stuff here
		if(ig.input.pressed("jump"))
		{
			location.reload(false);
			 window.location.assign(window.location.href+"?un="+$("#username").val());
		}
	}
});
});