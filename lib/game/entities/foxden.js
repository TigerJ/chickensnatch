ig.module(
	'game.entities.foxden'
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
	ig.EntityFoxden = ig.global.EntityFoxden = ig.EntityTrigger.extend({
		target:"player",
		suicidal:false,
		check:function(entity){
			this.parent(entity);
			entity.safeZone=true;
			if(entity.hasChicken)
			{
				ig.game.sfx_foxeat.volume=0.4;
				ig.game.sfx_foxeat.play();
				entity.health=10;
				ig.game.getEntitiesByClass(UIMeterHealth)[0].setValue(1.0);
				entity.hasChicken=false;
				entity.addAnim("idleX",{
					frameTime: 1,
					sequence: [0]
				});
				entity.addAnim("moveX",{
					frameTime: 0.07,
					sequence: [1,2]
				});
				entity.addAnim("jumpX",{
					frameTime: 1,
					sequence: [3]
				});
				entity.addAnim("fallX",{
					frameTime: 1,
					sequence: [3]
				});
				entity.setChickenAnimations=false;
				entity.deathTimer=new ig.Timer(10);
				ig.game.totalChickens--;
				if(ig.game.totalChickens==0)
				{
					$.post("https://api.scoreoid.com/v1/createScore", {api_key:"7de8a863f2fec1abd48ba6bb067e3d367d10bf5b",game_id:"7d234e392a",response:"json",score:entity.scoreTimer.delta(),username:$("#username").val()},
				       function(data) {
				         //alert("Data Loaded: " + data);
				         // console.log("Data Loaded: " + data);
				       });
					// ig.game.getEntitiesByClass(UIOverlay)[0].alpha=0.6;
					ig.game.loadLevelDeferred(LevelWinscreen2);

				}
			}
			ig.game.ChickenCounterUI.text="x"+ig.game.totalChickens;
			ig.game.ChickenCounterUI.refresh(true);
		}
	});

});