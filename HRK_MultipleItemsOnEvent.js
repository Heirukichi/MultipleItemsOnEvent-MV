/*****************************************************************************
 * Filename       : HRK_MultipleItemsOnEvent.js
 * Last Update    : October 4th 2019
 ****************************************************************************/
/*:
 * @plugindesc v1.0.0 - Last update: 10-04-2019 [MM-DD-YYYY]
 * This plugin allows you to use multiple items to interact with events.
 * @author Heirukichi
 * ----------------------------------------------------------------------------
 *
 * @param Dedicated Variable
 * @desc
 * A variable used to store used items in a save file.
 * Refrain from using it in your game.
 * @default 5
 *
 * @param Dedicated Switch
 * @desc
 * A switch dedicated to this plugin.
 * Refrain from using it in your game.
 * @default 1
 *
 * @param Always Consume
 * @desc
 * When true, items are consumed when using them twice and failing.
 * When false, items used twice are refunded. Default is false.
 * @default false
 *
 * @help
 * This plugin was originally a commission from Treynor from the RPG Maker Web
 * community. since this plugin would have never existed without the said
 * commission, special thanks go to him.
 *
 * ============================================================================
 * INSTRUCTIONS
 * ============================================================================
 * Please, read the following instructions carefully before using this plugin.
 * I do not provide support if you fail to understand these instructions and/or
 * if your lack of knowledge of the engine does not allow you to let this
 * plugin work at its best potential.
 *
 * Should something like that occur, I strongly recommend following tutorials
 * about how the engine works and how to interact with events/variables, and to
 * read carefully what you can do with RPG Maker MV Script calls.
 * This basic information can be found on RPG Maker Web, the official Degica
 * forum.
 *
 * ----------------------------------------------------------------------------
 * > Requirements
 * ----------------------------------------------------------------------------
 * This plugin requires dsiver144 DSI-UseItemOnEvent plugin. Be sure to have it
 * installed before using this one.
 *
 * ----------------------------------------------------------------------------
 * > Item Notetag
 * ----------------------------------------------------------------------------
 * There is no difference in how event notetags are handled between this plugin
 * and dsiver144's. Check the original plugin for information on item notetags.
 *
 * ----------------------------------------------------------------------------
 * > Event Notetag
 * ----------------------------------------------------------------------------
 * This plugin handles event notetags differently from the original plugin in
 * order to store multiple items interaction with the same event.
 *
 * <InteractItem:item1Id,item2Id,item3Id,etc>
 *
 * As you can see, compared to the original plugin, you can now add more than
 * just one item id in the notetag. Be sure to separate them using a comma and
 * to list all the items you want to be able to interact with the event there.
 * Any item id not listed will have no effect when used.
 *
 * ----------------------------------------------------------------------------
 * > Plugin Commands
 * ----------------------------------------------------------------------------
 * It is possible to instantly reset stored items for a certain event by using
 * the following plugin command inside the said event:
 *
 * ResetStoredItems
 *
 * Doing so does not reset all the stored items, but just the items related to
 * the event where the plugin command is used.
 *
 * ----------------------------------------------------------------------------
 * > Script Calls
 * ----------------------------------------------------------------------------
 * This plugin also provides script calls to make interaction with RPG Maker MV
 * default Event Commands easier, especially with Conditional Branches.
 * You can use these script calls in a normal script call or in a Conditional
 * Branch event command using the script option (4th page).
 *
 * - this.storedItemsLength()
 *   Using this script call returns the amount of items stored for the current
 *   event. You can use it to check if the number of items used to interact 
 *   with the event is sufficient or if it is over the limit and let your event
 *   act accordingly.
 *
 * - this.storedItems()
 *   This script call returns the array with the items currently stored. It is 
 *   an array of item IDs, not actual items.
 *
 * - this.checkItemsCombination(combination)
 *   In this case "combination" is an array of IDs. When using this, the engine
 *   checks if the combination used as argument is the same as the one stored
 *   in the dedicated variable. If it is, it returns true, otherwise it returns
 *   false.
 *   Using this script call in nested Conditional Branches in combination with
 *   the one used to check the amount of stored items, allows you to create
 *   a wide variety of combinations and a wide variety of effects.
 *
 * ============================================================================
 * LICENSE
 * ============================================================================
 * This plugin is licensed under the GNU General Public License 3.0. This means
 * that you can:
 * - use this plugin for both commercial and non commercial projects as long as
 *  * proper credit is given to me (Heirukichi);
 *  * a link to my website is provided;
 * - modify this plugin as much as you want as long as
 *  * you do not pretend you wrote the whole plugin;
 *  * you still give credit to me for the original work;
 *  * you provide a link to my website instead of reposting my plugin when you
 *    post the modified version of the plugin.
 *
 * You can review the complete license here:
 * https://www.gnu.org/licenses/gpl-3.0.html
 *
 * If you are using this plugin for a commercial game, I would like to receive
 * a link of your game page. The link does not need to contain a free copy of
 * your game and it is only used to keep track of games where my plugins are
 * being used.
 *
 * While this is not mandatory for non commercial games, I really appreciate if
 * you could send me a link regardless of your game being commercial or not.
 * You can contact me using the Contacts form on my website or by sending me a
 * private message on RPG Maker Web forum.
 *
 * IMPORTANT NOTICE:
 * You are free to distribute this plugin as long as you provide a link to my
 * website with it. In case you downloaded this plugin from my website, provide
 * a link to its download page instead of copy/pasting the code.
 *
 * My website: https://heirukichiworks.wordpress.com
 *
 * IMPORTANT NOTICE 2:
 * Credits for the original plugin go to dsiver144 and since you must include
 * his plugin to be able to run this one, he must be included in your credits
 * as well.
 *
 * ============================================================================
 * CREDITS
 * ============================================================================
 * Credits go to dsiver144 for the original plugin.
 *
 */
(function(){
  /***************************************************************************
   * Plugin Parameters
   ***************************************************************************/
  var params = PluginManager.parameters("HRK_MultipleItemsOnEvent");
  var paramVarId = Number(params["Dedicated Variable"] || 0);
  var paramSwitchId = Number(params["Dedicated Switch"] || 0);
  var alwaysConsume = (params["Always Consume"] == "true");
  /***************************************************************************
   * Plugin Command
   ***************************************************************************/
  var HRK_MITOE_pluginCommand_old = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    HRK_MITOE_pluginCommand_old.apply(this, arguments);
    if (command == 'ResetStoredItems') {
      var event = this.eventId();
      var map = $gameMap.mapId();
      $gameVariables.value(paramVarId)[[map, event]] = [];
    }
  }; // Plugin Command
  /***************************************************************************
   * Check Items Combination
   ***************************************************************************/
  Game_Interpreter.prototype.checkItemsCombination = function(combination) {
    var itemsStored = this.storedItems();
    var found = false;
    if (itemsStored) {
      console.log("Checking stored items"); // DEBUG
      found = true;
      combination.forEach(function(itemId) {
        if (!itemsStored.includes(itemId)) {
          found = false;
        }
      }, this);
    }
    return found;
  }; // Check Items Combination
  /***************************************************************************
   * Stored Items Length
   ***************************************************************************/
  Game_Interpreter.prototype.storedItemsLength = function() {
    return this.storedItems().length;
  }; // Stored Items Length
  /***************************************************************************
   * Stored Items
   ***************************************************************************/
  Game_Interpreter.prototype.storedItems = function() {
    var map = $gameMap.mapId();
    var event = this.eventId();
    return $gameVariables.value(paramVarId)[[map, event]];
  }; // Stored Items
  /***************************************************************************
   * Update Scene Map (Override)
   ***************************************************************************/
  var HRK_MITOE_Scene_Map_update_old = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    if ($gameTemp._usedItem) {
      $gameTemp._preUsedItem = $gameTemp._usedItem;
      var pdir = $gamePlayer._direction
      var cx = $gameMap.roundXWithDirection($gamePlayer._x, pdir);
      var cy = $gameMap.roundYWithDirection($gamePlayer._y, pdir);
      var found = false;
      $gameMap.eventsXy(cx, cy).forEach(function(event){
        var note = event.event().meta['InteractItem'];
        if (note) {
          note.split(',').forEach(function(itemId) {
            if (this.itemStorable(event.eventId(), $gameMap.mapId())) {
              if (Number(itemId) === $gameTemp._usedItem.id) {
                SoundManager.playUseItem();
                var key = [$gameMap.mapId(), event.eventId(), 'D'];
                $gameSelfSwitches.setValue(key, true);
                this.storeItem($gameMap.mapId(), event.eventId());
                event.refresh();
                event.start();
                found = true;
              }
            } // Item can be stored
          }, this);
        } // Item has a note
      }, this);
      if (!found) {
        SoundManager.playBuzzer();
        if (!alwaysConsume) {
          $gameParty.gainItem($gameTemp._preUsedItem, 1);
        } // Do not automatically consume items
      }
      /*
       * Resetting this means that the original plugin will no longer be able
       * to check if the item used is correct, making the original plugin's
       * override completely useless.
       */
      $gameTemp._usedItem = null;
    }
    HRK_MITOE_Scene_Map_update_old.call(this);
  }; // Update Map Scene
  /***************************************************************************
   * Can Store Item?
   ***************************************************************************/
  Scene_Map.prototype.itemStorable = function(event, map) {
    var item = $gameTemp._preUsedItem.id;
    var itemsStored = $gameVariables.value(paramVarId);
    var key = [map, event];
    if (!this.storedItemsInitialized()) {
      this.initializeStoredItems();
      itemsStored = $gameVariables.value(paramVarId);
    }
    if (itemsStored[key] && itemsStored[key].includes(item)) {
      return false;
    }
    return true;
  }; // Can Store Item?
  /***************************************************************************
   * Stored Items Initialized
   ***************************************************************************/
  Scene_Map.prototype.storedItemsInitialized = function() {
    return $gameSwitches.value(paramSwitchId);
  }; // Stored Items Initialized
  /***************************************************************************
   * Initialize Stored Items
   ***************************************************************************/
  Scene_Map.prototype.initializeStoredItems = function() {
    var storedItemsHash = {};
    $gameVariables.setValue(paramVarId, storedItemsHash);
    $gameSwitches.setValue(paramSwitchId, true);
  }; // Initialize Stored Items
  /***************************************************************************
   * Store Item
   ***************************************************************************/
  Scene_Map.prototype.storeItem = function(map, event) {
    var storedItemsHash = $gameVariables.value(paramVarId);
    var key = [map, event];
    if (!storedItemsHash[key]) {
      storedItemsHash[key] = [$gameTemp._preUsedItem.id];
    }
    else {
      storedItemsHash[key].push($gameTemp._preUsedItem.id);
    }
  }; // Store Item
})();
