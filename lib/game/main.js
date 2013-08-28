ig.module( 
	'game.main' 
)
.requires(
	'plusplus.core.plusplus',

	'impact.font',

	// 'game.entities.player',
	// 'game.entities.chicken1',
	// 'game.entities.foxden',
	// 'game.entities.foxdenexit',

	'game.levels.proto',
	'game.levels.titlescreen',
	'game.levels.winscreen',
	'game.levels.winscreen2',

	'plusplus.ui.ui-text'
	// 'plusplus.debug.debug'

)
// define the main module
.defines(function () {
    "use strict";
    var _c = ig.CONFIG;
	
	// we probably want to go ahead and debug while developing
	if (_c.DEBUG) {
		ig.module(
                'game.game-debug'
            )
            .requires(
                'plusplus.debug.debug'
            )
            .defines(function () {
                start();
            });
    }
    // and don't forget to turn off debugging
    // in the config when releasing your game!
    else {
        start();
    }

    function start() {
        // have your game class extend Impact++'s game class
        var game = ig.GameExtended.extend({
			
			// get the collision map shapes for lighting and shadows
			shapesPasses: [
				{
					ignoreClimbable: true,
					discardBoundaryInner: true
				}
			],
			totalChickens:0,
			
			//music
			// musicTitleIntro: new ig.Sound( 'media/sound/music/fateoftexasintro.ogg', true),
			musicLoop: new ig.Sound( 'media/sound/quirky.*', true),
			musicLoop2: new ig.Sound( 'media/sound/chickenscratch.*', true),

			//sfx
			sfx_chickenhurt: new ig.Sound( 'media/sound/chickendeath_bit.*', true),
			sfx_foxhurt: new ig.Sound( 'media/sound/foxdeath_bit.*', true),
			sfx_foxeat: new ig.Sound( 'media/sound/chickencollect.*', true),
			// sfx_shoot1: new ig.Sound( 'media/sound/shoot1.*', true),
			letsStartLooping:false,
            // override the game init function

            init: function () {
                this.parent();

    //             ig.music.add( this.musicTitleIntro,'fateoftexasintro' );
				ig.music.add( this.musicLoop2,'chickenscratch' );

				ig.music.volume = 0.4;
				ig.music.play();
				// this.startPlayingMusic=true;
                ig.input.initMouse();
			},
			
			// add a few extra inputs
			// this is just to mimic the original example
			// Impact++ adds a few basics already
			// tap / click to shoot
			// spacebar / swipe to jump
			// wasd / arrows to move
			inputStart: function () {
				
				this.parent();
				
				ig.input.bind(ig.KEY.X, 'jump');
				ig.input.bind(ig.KEY.C, 'shoot');
				ig.input.bind(ig.KEY.TAB, 'jump');
                // so we can load the first level
                // which of course you didn't forget to require above


                this.loadLevel(ig.global.LevelTitlescreen);
				ig.game.spawnEntity(ig.UIOverlay, 0, 0, {
				     // set its layer to ui so it doesn't get paused
				     layerName: 'ui',
				     fillStyle: '#000000',
				     // start its alpha at 0
				     alpha: 0
				     // ui elements have a default position of top left
				});
				// initialize the example UI
				
				
			},
			update:function(){
				// if(this.startPlayingMusic==true)
				// {
				// 	ig.music.currentIndex=0;
				// 	if(!ig.global.wm)
				// 		ig.music.play('fateoftexasintro');
				// 	ig.music.loop=false;
				// 	ig.game.letsStartLooping=false;
				// 	this.startPlayingMusic=false;
				// }
				// if(!this.letsStartLooping)
				// {		
				// 	switch (ig.music.currentTrack)
				// 	{
				// 		case ig.music.tracks[0]:
								
				// 			break;
				// 		case ig.music.tracks[1]:
				// 				ig.music.loop=true;
				// 				this.letsStartLooping=true;
				// 			break;
				// 	}
				
				// }
				if(this.ChickenCounterUI!=null)
				{
					
				}
				this.parent();
			},
			inputEnd: function () {
				
				this.parent();
				
				ig.input.unbind(ig.KEY.X, 'jump');
				ig.input.unbind(ig.KEY.C, 'shoot');
				
			},
			
			// quick and dirty UI for example
			// in your own game you probably want to
			// create separate classes for UI elements
			// instead of defining them dynamically as below
			initUI: function () {
				this.ChickenCounterUI= this.spawnEntity(ig.UIText,0,0,{
					font: new ig.Font('media/font_04b03_white_8.png'),
					posPct: { x: .22, y: .045 },
					text:"x"+ig.game.totalChickens
				});
				// add a basic pause button
				
				// var togglePause = this.spawnEntity( ig.UITogglePause, 0, 0, {
				// 	// position to top left
				// 	posPct: { x: 0, y: 0 },
				// 	// set the margin
				// 	// treated as a pct
				// 	margin: { x: 0.02, y: 0.02 }
				// } );
				
				// add a few buttons to toggle performance
				
				// var toggleGfxMin = this.spawnEntity( ig.UIToggleGfxMin, 0, 0, {
					
				// 	// link to pause
				// 	linkedTo: togglePause,
					
				// 	// set vertical so it is positioned next to linked
				// 	vertical: true,
					
				// 	activateCallback: function () {
						
				// 		// deactivate other
						
				// 		if ( toggleGfxMax.activated ) {
							
				// 			toggleGfxMax.deactivate();
							
				// 		}
						
				// 	},
					
				// 	deactivateCallback: function () {
						
				// 		if ( !toggleGfxMax.activated ) {
							
				// 			toggleGfxMax.activate();
							
				// 		}
						
				// 	}
					
				// } );
				
				// var toggleGfxMax = this.spawnEntity( ig.UIToggleGfxMax, 0, 0, {
					
				// 	// link
				// 	linkedTo: toggleGfxMin,
					
				// 	// set vertical so it is positioned next to linked
				// 	vertical: true,
					
				// 	activateCallback: function () {
						
				// 		// deactivate other
						
				// 		if ( toggleGfxMin.activated ) {
							
				// 			toggleGfxMin.deactivate();
							
				// 		}
						
				// 	},
					
				// 	deactivateCallback: function () {
						
				// 		if ( !toggleGfxMin.activated ) {
							
				// 			toggleGfxMin.activate();
							
				// 		}
						
				// 	}
					
				// } );
				
				// // toggle max graphics
				
				// toggleGfxMax.activate();
				
			}
			
        });
		
        // now lets boot up impact with
        // our game and config settings
		// we've modified Impact++'s 'config-user.js' file
		// to override some of the default settings
        ig.main(
            '#canvas',
            game,
            60,
            _c.GAME_WIDTH,
            _c.GAME_HEIGHT,
            _c.SCALE,
            ig.LoaderExtended
        );
		
        // and resize to make sure everything looks fine
        ig.system.resize(
            ig.global.innerWidth * _c.CANVAS_WIDTH_PCT * ( 1 / _c.SCALE ),
            ig.global.innerHeight * _c.CANVAS_HEIGHT_PCT * ( 1 / _c.SCALE ),
            _c.SCALE
        );
		
    }
});
