ig.module(
        'plusplus.config-user'
    )
    .defines(function () {

        /**
         * User configuration of Impact++.
         * <span class="alert alert-info"><strong>Tip:</strong> it is recommended to modify this configuration file!</span>
         * @example
         * // in order to add your own custom configuration to Impact++
         * // edit the file defining ig.CONFIG_USER, 'plusplus/config-user.js'
         * // ig.CONFIG_USER is never modified by Impact++ (it is strictly for your use)
         * // ig.CONFIG_USER is automatically merged over Impact++'s config
         * @static
         * @readonly
         * @memberof ig
         * @namespace ig.CONFIG_USER
         * @author Collin Hover - collinhover.com
         **/
        ig.CONFIG_USER = {
        SCALE:3,
            GAME_WIDTH_PCT: 0,
            GAME_HEIGHT_PCT: 0,
            GAME_WIDTH:960,
            GAME_HEIGHT:720,
            CAMERA:{
                KEEP_INSIDE_LEVEL:true
            },
            FONT:{
                MAIN_NAME:"font_04b03_white_8.png",
                MAIN_PATH:"media/font_04b03_white_8.png"
                // SCALE: 2
            },
            CHARACTER:{
                SIZE_OFFSET_X:0,
                SIZE_OFFSET_Y:-5,
            }
        }
    });