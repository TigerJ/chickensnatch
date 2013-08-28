ig.module(
	'game.entities.foxdenexit'
)
.requires(
    // note that anything in abstractities
    // is an abstract entity that needs to be extended
	'plusplus.entities.trigger',
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
	ig.EntityFoxdenexit = ig.global.EntityFoxdenexit = ig.EntityTrigger.extend({
		target:"player",
		suicidal:false,
		check:function(entity){
			this.parent(entity);
			entity.safeZone=false;
			ig.game.ChickenCounterUI.text="x"+ig.game.totalChickens;
			ig.game.ChickenCounterUI.refresh(true);
		}
	});

});