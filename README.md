# HEIRUKICHI MULTIPLE ITEMS ON EVENT - MV PLUGIN

## INTRODUCTION
This plugin allows you to use multiple items when interacting with events, creating combinations of items that you can use for crafting systems and/or puzzles. The default way you use items to interact with events is the same as the one that happens in the required plugin.

------------------------------

## Table of contents
* [Instructions](#instructions)
  - Requirements
  - Item Notetag
  - Event Notetag
  - Plugin Commands
  - Script Calls
* [License](#license)
  - Important Notice
  - Important Notice 2
* [Credits](#credits)
* [Tutorial](#tutorial)

------------------------------

## INSTRUCTIONS
Please, read the following instructions carefully before using this plugin.
I do not provide support if you fail to understand these instructions and/or if your lack of knowledge of the engine does not allow you to let this plugin work at its best potential.

Should something like that occur, I strongly recommend following tutorials about how the engine works and how to interact with events/variables, and to read carefully what you can do with RPG Maker MV Script calls.
This basic information can be found on RPG Maker Web, the official Degica forum.

### Requirements
 This plugin requires dsiver144 DSI-UseItemOnEvent plugin. Be sure to have it installed before using this one.

### Item Notetag
 There is no difference in how event notetags are handled between this plugin and dsiver144's. Check the original plugin for information on item notetags.

### Event Notetag
 This plugin handles event notetags differently from the original plugin in order to store multiple items interaction with the same event.
```
 <InteractItem:item1Id,item2Id,item3Id,etc>
```
 As you can see, compared to the original plugin, you can now add more than just one item id in the notetag. Be sure to separate them using a comma and to list all the items you want to be able to interact with the event there.
 Any item id not listed will have no effect when used.

### Plugin Commands
 It is possible to instantly reset stored items for a certain event by using the following plugin command inside the said event:
```
 ResetStoredItems
```
 Doing so does not reset all the stored items, but just the items related to the event where the plugin command is used.

### Script Calls
 This plugin also provides script calls to make interaction with RPG Maker MV default Event Commands easier, especially with Conditional Branches. You can use these script calls in a normal script call or in a Conditional Branch event command using the script option (4th page).

- ```this.storedItemsLength()``` 
  Using this script call returns the amount of items stored for the current event. You can use it to check if the number of items used to interact with the event is sufficient or if it is over the limit and let your event act accordingly.
- ```this.storedItems()```
  This script call returns the array with the items currently stored. It is an array of item IDs, not actual items.
- ```this.checkItemsCombination(combination)```
  In this case "combination" is an array of IDs. When using this, the engine checks if the combination used as argument is the same as the one stored in the dedicated variable. If it is, it returns true, otherwise it returns false. Using this script call in nested Conditional Branches in combination with the one used to check the amount of stored items, allows you to create a wide variety of combinations and a wide variety of effects.

---------------------------
## LICENSE

This plugin is licensed under the GNU General Public License 3.0. This means that you can:
- use this plugin for both commercial and non commercial projects as long as
  * proper credit is given to me (Heirukichi);
  * a link to my website is provided;
- modify this plugin as much as you want as long as
  * you do not pretend you wrote the whole plugin;
  * you still give credit to me for the original work;
  * you provide a link to my website instead of reposting my plugin when you post the modified version of the plugin.

You can review the complete license here or in the license file:
https://www.gnu.org/licenses/gpl-3.0.html

If you are using this plugin for a commercial game, I would like to receive a link of your game page. The link does not need to contain a free copy of your game and it is only used to keep track of games where my plugins are being used.

While this is not mandatory for non commercial games, I really appreciate if you could send me a link regardless of your game being commercial or not.
You can contact me using the Contacts form on my website or by sending me a private message on RPG Maker Web forum.

#### IMPORTANT NOTICE
You are free to distribute this plugin as long as you provide a link to my website with it. In case you downloaded this plugin from my website, provide a link to its download page instead of copy/pasting the code.

#### IMPORTANT NOTICE 2
Credits for the original plugin go to dsiver144 and since you must include his plugin to be able to run this one, he must be included in your credits as well.

---------------
## Credits
Credits go to dsiver144 for the original plugin.

---------------
## Tutorial

There are many things you can do with this plugin. It can be used to create crafting systems, complex interactions and puzzles. All those things, however, require a certain knowledge of the engine itself, including how to use script calls, plugin commands and how to properly take advantage of event commands.

In this tutorial I am going to show a couple of event pages containing useful information on how to create an event that checks a certain combination and allows the player to automatically select a new item if the selected one matches one of the possible combinations.

![alt text](https://github.com/Heirukichi/MultipleItemsOnEvent-MV/blob/master/Images/PluginEventTutorial.png)

This event, however, does not automatically open your item menu when a viable item is selected (in this example either item 1 or item 2). What it does, instead, is turning on self switch B. Another page, triggered by that said self switch, is what is going to call that scene.

![alt text](https://github.com/Heirukichi/MultipleItemsOnEvent-MV/blob/master/Images/PluginEventTutorial2.png)

What each element of the previous event page does is explained in this picture. Of course, this is not the only way to do this. This tutorial simply shows you a few possible ways to use the script calls included in this plugin, but do not let it limit you and let your imagination run wild, there are many more things that you can do using this plugin.

![alt text](https://github.com/Heirukichi/MultipleItemsOnEvent-MV/blob/master/Images/PluginEventTutorial%5BText%5D.png)
