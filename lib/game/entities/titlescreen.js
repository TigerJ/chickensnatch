ig.module(
	'game.entities.titlescreen'
)
.requires(
	'plusplus.core.entity'
)
.defines(function(){
	"use strict";
	
	var _c = ig.CONFIG;
	var _ut = ig.utils;
	ig.EntityTitlescreen = ig.global.EntityTitlescreen = ig.EntityExtended.extend({
	size: {x: 960, y:720},
	gravityFactor:0,//VERY IMPORTANT. if your title screen falls off the level. this is why :)
	animSheet: new ig.AnimationSheet( 'media/chickensnatchsized.png', 960, 720 ),
	ignoreSystemScale:true,
	scale:1,
	animInit:'idleX',
	animSettings: {
		idleX: {
			frameTime: 1,
			sequence: [0]
		}
	},
	init:function(settings,x,y)
	{
		this.parent(settings,x,y);
	},
	update: function() {
		this.parent();
		//your stuff here
		if(ig.input.pressed("jump"))
		{

			ig.game.loadLevelDeferred(LevelProto);
		}
	}
});
});