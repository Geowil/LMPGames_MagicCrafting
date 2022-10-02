/*:
* @plugindesc Enables magic crafting system.  Requires Geowil_MagicSchools
* @author Geowil
*
*
* @param Main Settings
* @default
*
*
* @param Craft Magic Damage Rate
* @desc This setting sets the rate at which damage will be
* calculted and added to crafted magic.  100 = no change.
* @type text
* @default 75
* @parent Main Settings
*
*
* @param Starting Skill ID
* @desc Starting ID for new versions existing skills
* Be sure this ID is after your last skill.
* @type text
* @default 500
* @parent Main Settings
*
*
* @param Display mode
* @desc Sets the display mode for the plugin.  For more info, see GitHub page.
* @type number
* @min 1
* @max 2
* @default 1
* @parent Main Settings
*
*
* @param Max Number of Obfuscation Characters
* @desc Sets the Max number of obfuscation characters to use in Display Mode 1
* @type number
* @min 1
* @max 10
* @default 3
* @parent Main Settings
*
*
* @param Max Refine Level
* @desc Sets the max magic refine level if spell renaming is turned off.  0 means no maximum.  See GitHub for more details.
* @type number
* @min 0
* @default 0
* @parent Main Settings
*
*
* @param Obfuscation Character
* @desc Allows you to choose the character to use to hide data in Display Mode 1
* @type text
* @default ?
* @parent Main Settings
*
*
* @param Enable Currency Cost System
* @desc When enabled, requires currency to craft spells.  If turned on, cost formula in note tag is required.
* @type boolean
* @default false
* @parent Main Settings
*
*
* @param Enable Item Cost System
* @desc When enabled, requires item(s) to craft spells.  If turned on, item reqs note tag is required.
* @type boolean
* @default false
* @parent Main Settings
*
*
* @param Restrict Spell Renaming
* @desc When enabled, prevents players from renaming spells when crafting.  See GitHub for more details on the limitations of this option.
* @type boolean
* @default false
* @parent Main Settings
*
*
* @param Enable Gold Cost System
* @desc When enabled, allows you to define a currency cost to craft spells.  See GitHub for full information.
* @type boolean
* @default false
*
*
* @param Enable Item Cost System
* @desc When enabled, allows you to define an item cost to craft spells.  See GitHub for full information.
* @type boolean
* @default false
*
*
* @param Cost Settings
* @desc Settings related to the Item/Gold cost systems
*
*
* @param Gold Cost Formula
* @desc This defines the formula for calculating gold cost.  Do not change the placeholder variables.
* @type text
* @default "Math.floor((baseCost * ((baseCost * skLvl)^^baseFactor)) + ((baseCost * (numComp * numCat) * skLvl)^^baseFactor))"
* @parent Cost Settings
*
*
* @param Gold Base Cost
* @desc This setting defines the base cost for the gold cost formula.  Change this first when adjusting the gold cost for crafting.
* @type Text
* @default 50
* @parent Cost Settings
*
*
* @param Gold Base Factor
* @desc This setting defines the base factor for the gold cost formula.  Be careful changing this, it will have a large impact on the gold cost.
* @type Text
* @default 1.1
* @parent Cost Settings
*
*
* @param Item Cost Formula
* @desc This defines the formula for calculating item cost.  Do not change the placeholder variables.
* @type text
* @default "Math.floor((((baseCost / 4) + ((skLvl / 2.45) * (numComp + numCat))) * (((baseCost / 4) + (skLvl / 2.8))^^baseFactor)) / (20 * (baseFactor + (numComp + numCat))))"
* @parent Cost Settings
*
*
* @param Item Base Cost
* @desc This setting defines the base cost for the item cost formula.  Change this first when adjusting the item cost for crafting.
* @type Text
* @default 50
* @parent Cost Settings
*
*
* @param Item Base Factor
* @desc This setting defines the base factor for the item cost formula.  Be careful changing this, it will have a large impact on the item cost.
* @type Text
* @default 1.1
* @parent Cost Settings
*
*
* @param 
*
*
* @param Format Settings
* @default
*
*
* @param Palette Formatting
* @desc Formatting for component spell info display
* @type note
* @default "<WordWrap>\n%1\n%2"
* @parent Format Settings
*
*
* @param Component Formatting
* @desc Formatting for component spell info display
* @type note
* @default "<WordWrap>\n%1\n%2\n%3"
* @parent Format Settings
*
*
* @param Catalyst Formatting
* @desc Formatting for catalyst item info display
* @type note
* @default "<WordWrap>\n%1\n%2\n%3"
* @parent Format Settings
*
*
* @param Blueprint Formatting
* @desc Formatting for spell blueprint info display
* @type note
* @default "<WordWrap>\n%1\n%2\n%3\n%4\n%5\n%6"
* @parent Format Settings
*
*
* @param Font Settings
* @default
*
*
* @param Color Settings
* @default
* @parent Font Settings
*
*
* @param Can Use Catalyst Color
* @desc Sets the color used when the player has can
* use a catalyst when crafting
* @type text
* @default #FFFFFF
* @parent Color Settings
*
*
* @param Cannot Use Catalyst Color
* @desc Sets the color used when the player has cannot
* use a catalyst when crafting
* @type text
* @default #983430
* @parent Color Settings
*
*
*
* @help
*
*
* Change Log:
*
*     1.0.0 - Initial version
*
*/


/*

Magic Crafting:
	New Features:
		Cost System			
			Item Cost
				Cost Item Setting
					Can be overridden by skill
					
			Gold Cost
			Default cost formulas and values as plugin settings
				Can override with individual skills values
				
			Formula
				Cost based on
					number of components
					number of catalysts
					level of the skill
			
			Create a cost window
				Set up like info window
					Maybe horizontal?
					Between Info and Command windows
		
		
		Create Gold Window
		
		
		Add Catalyst Info Section to Final Info

		
		Ability to enable or disable showing all final spell info at any point not obfuscated - remove
		
		
		Add operational mode to decouple from Magic Schools Plugin
			Should be able to unlock spells directly from the plugin to be crafted instead having to learn them first
			Will require adding in level check on crafting spells because the gating on MS plugin won't exist for this mode
			
			
		Add in optional setting to prevent auto-unlocking the next skill on crafting
			Check to see if there is a plugin command existing to unlock said next skill and if not add it.
			
			
		Name Alias System
			Allow item and skill names to be shortened
		
		
		Move plugin data into separate objects from the database
			Everything should be stored in a plugin settings object with the skill and item data stored in their
			child objects.
			
			Any property that is updated on skills and items should be moved to this object.
			
			The skill/item child objects should be id indexed array of objects like the database objects are constructed.
			
			
		Save/Load plugin data
			Save crafted spells into the plugin data object
			On load, load the crafted spells back into the database and then remove them from the plugin data object
						
		
		
		
		
		Allow crafting directly to a selected character, bypassing the need for Magic Schools plugin (maybe)
		
		Add element icons - done
		indent effect data for catalysts - done
		Ability to hide crafted spells from blueprint list - Done
		Ability to overwrite an existing crafted skill - done
		Allow limiting the max refinement level - done
		Ability to restrict name change - done		
		Catalyst states not being added to crafted spells OR they aren't showing in any info windows - done
		Display Mode - done
			Show Names in Blueprint List/Data in info window
		Hide Name in BP List/Obfuscate data in info window
		
	Bugs:		
		When catalyst effects were added to the formula, formula structure would sometimes be incorrect - kind of done]
		
		Show all component/catalyst effects in pallet info window - Done
		Final spell info is not showing - Done
		Add break between component data - done
		Once crafted, no obfuscation - done
		In DM1, dont show final info if plugin setting not turned on - done
		After crafting, a duplicate recipe spell is being created - done
		When hitting Craft Spell when its disabled, crashes game - done
		When select component spells, sometimes multiples of the same name are added - done
		refinement level not being added to name - done
		crafting overwrite recipe skill id in database - done
		base damage in formula was calculated to NaN - done
		base damage calculated value too high - done
		
		
		
		
		
		
Magic Schools:
	New Features:								
		Recode data proccessing to save plugin into its own object that can be saved - done	
		
		Saving/Loading of plugin data - done		
		
		Recode of info window to use utility functions for line breaks, line placement, and others. - done
				
		Add option for name aliasing - done
			Add support for alias note tag attrs - done
				Items - done
				Spells - done
				
			Add coding to implement aliased names. - done
			
		Recode cost window to display info similar to info window - done
			Resize cost list, and info windows - done
				Info window should have reduced width and increased height - done
				List windows should have increased width - done
				Cost window should have increased width and height - done
				Standardize the formatting - done

			Move gold window down to be level with bottom of info window - done
			Hide cost if init pri school being selected - done
		
		Add in operation mode for crafting plugin, if it is turned off should still be able to learn magic you just won't have to
		craft it first. - Done
			Help documentation will have to have different instructions for using this plugin with the crafting plugin vs standalone.
					
		When Crafting is enabled, add a option to disable unlocking skills for crafting after learning the previous skill. - done
		
		If a requirement is missing, highlight it with red text color - done
				
		See if we can reduce the number of cost formula plugin settings - didnt do
			Move these settings into the schools themselves so that they can be configured per school. - done
			Add in an additional note tag attribute to further allow skill cost to be customized - done
		
		Add an option to show either named spells that have not been crafted in the tree selection skill info window or to show them
		with obfuscated names - done
			Display Mode option - done
				Mode 0 = current functionality - done
				Mode 1 = show all skills in a tree w/ locked skills grayed out - done
					Recipe skills should be hidden from list when they have been crafted and magic crafting plugin is being used. - done
				Mode 2 = Same as Mode 1 except that the skill names are obfuscated - done
			Recipe skills should be hidden from list when they have been crafted and magic crafting plugin is being used. - done
		
		Add " - Learned" to tree spell list if the character knows the spell - optional - done		
		
		After learning a spell, kick the player back to the tree selection window if there are no more learnable spells in a tree - done
		
		If there are no learnable spells in a tree, disable that tree from being selected in the tree selection list - done
		
		Add Item Cost System - done
			Configurable per school type but there will also be a global setting if the school setting is not used - done
				Cost formula will be per school, no global or skill setting - done
			Add an attribute per skill/school type; will override the cost item used set by global setting if it exists - done
		
		
	
	Bugs:
		Crash on plugin data creation
		Sometimes crashes in between school select and main window	

		Getting incorrect values from magic schools list caused crash - done
		Filtering on select Learn skills caused crash after selecting character - done
		Tree list window not getting learned skills for checks - done
		Tree spell info not showing - done
		Spell list window not showing spells - done
		After buying spell, not return to tree view
		Cancel not showing in spell list - done
		Learned school types not showing on main info window - done
		No break after title in info window tree list - done
		Missing var caused crash - done
		Misnamed var caused crash - done
		Not all skill info showing on info window - done
		Tree List window info section not showing properly, showing main info window data - done
		Br's not working in cost window - done
		Broke entire plugin, again - done
		Item icon undefined - done
		Skill data overwritten by item data - done
		Limit window title not showing correctly - done
		Req level has NaN - done
		Formatting issues - done
		Can select a secondary school while not meeting requirements - done
		Missing functions to get costs from cost window caused crashes - done
		Schools not removing money when bought - done
		Gold not removed when buying school because gold cost calculated and set from a new location and was not updated to pull the cost from that location - done
		Gold was being removed when buying skill because code to calculate and set the gold cost from the spell list window was not removed. - done
		Variable not being set caused a crash - done
		Variables not set up correctly in scene caused crash - done
		dataItm logic issues causing crashes - done
		Missnamed function call caused crashes - done
		Function calls missing params - done
		Variable rename type caused crashes - done
		Variable name typo caused crash - done
		"School Name" showing up in the school list window - config issue - done
		Logic issue with cost checking prevented cost checks from working. - done		
		Improper function definition caused plugin compile errors - done
		Extra ) caused plugin compile errors - done
		Code copied from one window to another but not modified to work in new window caused crash - done
		Forgot to remove "this" from some function calls, caused crashes when buying spells and schools - done
		Forgot to change code drawItem function of a window to the new implementation for getting costs; caused crash - done
		Changed some function definitions and broke the entire plugin and then fixed the entire plugin by removing those changes. - done
		Removed extra ( that was causing compile crash - done
		Forgot to update the default spell cost formulas to remove numOfSchools var as its pre-calculated in another param; caused crashes - done
		Added missing } that was causing a compiler crash - done		
		When opening spell list window, skLvl not defined error - done
		When opening spell list window, crash due to getSpellCost function missing - done
		When opening spell list window, crash due to getSpellCostItemId function missing - done
		Crashes caused by skLvl, currPrtyItems, itemCost not being defined - done
		Crash caused by bDoesNotMeetRequirements not being deinfed - done
		Crash caused by school tree initialization code being in the wrong place - done
		Crash caused by variable being in the wrong place when buying a spell - done
		Spell names not showing properly in display mode 1/2 - done
		Spell names missing ) on level - done
		Spell names, when not unlocked, show the color code because did nnot double escape - done
		When selecting a tree to learn spells, the plugin would crash - done
		When selecting a school to learn spells, the tree list would cause a crash - done
		When selecting a school to learn spells, no trees displayed - done
		On selection of a seconday school going into the tree list on an additional character, the plugin crashed - done
		In some places, not having trees after learning the school causes issues because we need to have the trees available - done
		Tree List window help text doesn't update back to original text when new spells are unlocked in a previously locked tree - done
		Tree List window help text changes to "learned all skills" for all trees when a single tree is locked - done
		Sometimes crashes after tree select window when in debugger - done
		When selecting a tree for a secondary school, plugin crashes - done
		Tree List window help text does not update properly when a tree is locked for no more learnable skills - done
		Tree Spell Info window not updating properly or something; shows Fire I instead of Fireball I for Fireball tree. - Done
		Tree Spell Info does not include newly crafted skills - done
		Gold cost not calculating correctly - done
		Some schools Pri/Sec config data is nulled - done
		Crash selecting a primary school - done
		Crash selecting a secondary school - done
		Crash when moving to cancel in the school selection list - done
		Help text list of Tree Select Window is not updating properly. - done
		On selecting Cancel in spell list window, not all of the information in the cost window is removed - done
		Can select secondary school option from main menu even after using all available school slots - done
		On selecting a tree, caused a crash - done
		On selecting a spell, caused a crash - done
		On selecting a spell, gold calculated to NaN - done
		when purchasing a secondary school or an additional primary school, the cost is not shown - done
		Cost doesnt seem to update when buy second additional school - done
		Cannot unlock secondary schools - done
		Info window - too much space - done
		When ok/cancel, papge index not being reset - done
		gold window not showing changes to party gold - done
		Always show gold window - done
		Shink cost window - done
		increase spacing between items in list windows - done
		Figure out why face sprite autoload not working - done
		Some trees are showing spells that are not unlocked yet - done
		Cancel options should not have "disabled" text coloration - done
		Sometimes spells from other trees are showing in the spell list for the wrong tree - done (config issue)
		
		
		

BC: 10
Mod: 15
Lvl: 12
Num of Sec Schools: 3
baseCost + (skLvl * (skLvl * baseCost) / costMod)
8 + (12 * (96) / 20)


((baseCost * numOfSchools) * numOfSchools * (costMod * numOfSchools)) + ((numOfSchools * costMod) * (baseCost * numOfSchools) / 0.5)

Pri Addt School: Math.ceil(baseCost*(numOfSchools+schoolMulti)*(schoolCostMod**(numOfSchools/5)))
Secd School: Math.ceil((baseCost/2)*(numOfSchools+schoolMulti)*(schoolCostMod**(numOfSchools/5)))
Pri Init Spell: Math.ceil((baseCost/1.5)+((skLvl*(baseCost/1.5))/skillCostMod))
Pri Addt Spell: Math.ceil(baseCost+(sklLvl/skillCostMod))
Secd Spell: Math.ceil((baseCost/2)+((sklLvl*(baseCost/4))/skillCostMod))


35-37 E
38-40 Wnd


*/

var Geowil = Geowil || {};

function Window_CraftPalette() { this.initialize.apply(this, arguments); };
function Window_CraftComponentSelection() { this.initialize.apply(this, arguments); };
function Window_CraftCatalystSelection() { this.initialize.apply(this, arguments); };
function Window_CraftBlueprintList() { this.initialize.apply(this, arguments); };
function Window_CraftInfo() { this.initialize.apply(this, arguments); };
function Window_CraftCommand() { this.initialize.apply(this, arguments); };
function Window_CraftGold() { this.initialize.apply(this, arguments); };
function Window_CraftCost() { this.initialize.apply(this, arguments); };
function Scene_MagicCrafting() { this.initialize.apply(this, arguments); };
function Window_MCNameEdit() { this.initialize.apply(this, arguments); };
function Scene_MCSkillName() { this.initialize.apply(this, arguments); };


var occLst = ["Always", "In Battle", "Out of Battle", "Never"];
var hitTypLst = ["Always Hits", "Normal", "Uses Mag Evasion"];
var dmgTypLst = ["None","HP Damage", "MP Damage", "Recover HP", "Recover MP", "Drain HP", "Drain MP"];
var specEffLst = ["Escape"];
var stScopeList = ["None", "Attack an Enemy", "Attack Anyone", "Attack an Ally", "Cannot Move"];
var stRmvTimingList = ["None", "After next turn", "After current turn"];
var scopeLst = [
	"None","1 Enemy", "All Enemies", "1 Random Enemy", "2 Random Enemies",
	"3 Random Enemies", "4 Random Enemies", "1 Ally", "All Allies",
	"1 Ally (Dead)", "All Allies (Dead)", "Self"
];

var staticTraits = {
	"21" : ["Max HP","Max MP","Atk","Def","MAtk","MDef","Agl","Luk"],
	"22" : ["Hit Rate","Eva Rate","Crit Rate","Crit Eva Rate","Mg Eva Rate",
	        "Mg Reflect Rate","Counter Rate","HP Regen Rate","MP Regen Rate",
	        "TP Regen Rate"],
	"23" : ["Targ Rate","Guard Eff Rate","Recv Eff Rate","Pharma Rate","MP Cost Rate",
	        "TP Chrg Rate","Phys Dmg Rate","Mg Dmg Rate","Floor Dmg Rate","Exp Rate"],
	"55" : ["Normal","Duel Wield"],
	"62" : ["Auto Battle (Berserk)","Guard","Substitute (Cover)","Preserve TP"],
	"63" : ["Normal","Boss","Instant","No Dissolve"],
	"64" : ["Enc. Rate Half","No Enc","No Ambushes","Inc Pre-Emptive","2x Gold","Double Item Drop"]
};

const lmpgamesMagicCraftingParams = PluginManager.parameters('LMPGames_MagicCrafting');
var paletteTxFmt = lmpgamesMagicCraftingParams['Palette Formatting'];
var cmpTxFmt = lmpgamesMagicCraftingParams['Component Formatting'];
var catTxFmt = lmpgamesMagicCraftingParams['Catalyst Formatting'];
var bpTxFmt = lmpgamesMagicCraftingParams['Blueprint Formatting'];
var startId = parseInt(lmpgamesMagicCraftingParams['Starting Skill ID']);
var mgDmgRate = parseInt(lmpgamesMagicCraftingParams['Craft Magic Damage Rate'])/100;
var canUseCatColor = lmpgamesMagicCraftingParams['Can Use Catalyst Color'];
var cantUseCatColor = lmpgamesMagicCraftingParams['Cannot Use Catalyst Color'];
var craftingDisplayMode = parseInt(lmpgamesMagicCraftingParams['Display mode']);
var bEnableCurrencySystem = (lmpgamesMagicCraftingParams['Enable Currency Cost System'] === 'true');
var bEnableItemSystem = (lmpgamesMagicCraftingParams['Enable Item Cost System'] === 'true');
var bPreventRename = (lmpgamesMagicCraftingParams['Restrict Spell Renaming'] === 'true');
var maxObfusChars = parseInt(lmpgamesMagicCraftingParams['Max Number of Obfuscation Characters']);
var obfuscationChar = lmpgamesMagicCraftingParams['Obfuscation Character'];
var maxRefineLevel = parseInt(lmpgamesMagicCraftingParams['Max Refine Level']);
var bEnableGoldCost = (lmpgamesMagicCraftingParams['Enable Gold Cost System'] == 'true');
var bEnableItemCost = (lmpgamesMagicCraftingParams['Enable Item Cost System'] == 'true');
var currencyCostFormula = lmpgamesMagicCraftingParams['Gold Cost Formula'];
var currencyBaseCost = parseInt(lmpgamesMagicCraftingParams['Gold Base Cost']);
var currencyBaseFactor = parseFloat(lmpgamesMagicCraftingParams['Gold Base Factor']);
var itemCostFormula = lmpgamesMagicCraftingParams['Item Cost Formula'];
var itemBaseCost = parseInt(lmpgamesMagicCraftingParams['Item Base Cost']);
var itemBaseFactor = parseFloat(lmpgamesMagicCraftingParams['Item Base Factor']);
var currentId = startId;
var $newSkillInstance = {};

var staticIconLst = {
	"11" : ["", "\\i[77]","\\i[64]","\\i[65]","\\i[66]","\\i[67]","\\i[68]","\\i[69]","\\i[70]","\\i[71]", "\\i[321]",
			"\\i[322]", "\\i[323]", "\\i[324]", "\\i[325]", "\\i[326]", "\\i[327]", "\\i[328]"]
};

/* TouchInput Functions and Aliases */
var lmpGamesCodexTouchImput_onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
  lmpGamesCodexTouchImput_onMouseMove.call(this, event);
  this._mouseOverX = Graphics.pageToCanvasX(event.pageX);
  this._mouseOverY = Graphics.pageToCanvasY(event.pageY);
};


/* Database Manager Alias Functions */
var geowilMCraftingDataManagerIsDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function(){
	if (!geowilMCraftingDataManagerIsDatabaseLoaded.call(this)) { return false;}
	this.loadMCraftingNoteTags();
	return true;
};

DataManager.loadMCraftingNoteTags = function(){
	$dataClasses = this.processMCraftingNoteTags($dataClasses, "class");
	$dataSkills = this.processMCraftingNoteTags($dataSkills, "skill");
	$dataItems = this.processMCraftingNoteTags($dataItems, "item");
};

DataManager.processMCraftingNoteTags = function(dataObj, typ){
	for(let obj of dataObj){
		if (obj){
			if (obj.note != undefined && obj.note != ""){
				let noteData = obj.note.split(/[\r\n]+/);

				if (noteData){
					let bStartMCraftingTag = false;
					let bEndMCraftingTag = false;

					if (typ == "class"){
						obj["MaxCatalysts"] = 0;
						obj["MaxComponents"] = 0;
					} else if (typ == "skill"){
						obj["ComponentElements"] = [];
						obj["ValidClasses"] = [];
						obj["CanCraft"] = false;
						obj["CraftingShowName"] = false;
						obj["IsRecipe"] = false;
						obj["Obfuscated"] = (craftingDisplayMode == 1 ? true : false);
						obj["baseSkillId"] = 0;
						obj["TimesCrafted"] = 0;
						obj["GoldBaseCost"] = 0,
						obj["ItemBaseCost"] = 0
					} else if (typ == "item"){
						obj["IsCatalyst"] = false;
						obj["CraftingEffects"] = [];
					}

					for (let noteLine of noteData){
						switch (noteLine){
							case '<MagicCrafting>':
								bStartMCraftingTag = true;
								break;
							case '</MagicCrafting>':
								bEndMCraftingTag = true;
								break;
							default:
								if (bStartMCraftingTag){
									let noteLines = noteLine.split(":");
									if (noteLines[0] == 'MaxCatalysts'){ //Classes
										obj.MaxCatalysts = parseInt(noteLines[1]);
									} else if (noteLines[0] == "MaxComponents"){
										obj.MaxComponents = parseInt(noteLines[1]);
									} else if (noteLines[0] == "MCCatalyst"){ //Items
										obj.IsCatalyst = true;
									} else if (noteLines[0] == "Effects"){
										let effectData = noteLines[1].split(";");
										for (let i1 = 0; i1 < effectData.length; i1++){
											let effect = effectData[i1].split(",");
											if (effect[0] == "STATE"){
												obj.CraftingEffects.push({"Effect":effect[0], "ID":parseInt(effect[1]), "Value1":parseFloat((parseInt(effect[2])/100).toFixed(2)), "Value2":0});
											} else {
												obj.CraftingEffects.push({"Effect":effect[0], "Value1":parseFloat((parseInt(effect[1])/100).toFixed(2)), "Value2":0});
											}
										}
									} else if (noteLines[0] == 'ComponentElements'){ //Skills
										let noteLines = noteLine.split(":");
										let listData = noteLines[1].split(",");

										for (let i1 = 0; i1< listData.length; i1++){
											obj.ComponentElements.push(parseInt(listData[i1]));
										}
									} else if (noteLines[0] == 'ValidClasses'){
										let noteLines = noteLine.split(":");
										let listData = noteLines[1].split(",");

										for (let i1 = 0; i1< listData.length; i1++){
											obj.ValidClasses.push(parseInt(listData[i1]));
										}
									} else if (noteLines[0] == "CanCraft"){
										obj.CanCraft = true;
									} else if (noteLines[0] == "IsRecipe"){
										obj.IsRecipe = true;
									} else  if (noteLines[0] == "GoldBaseCost"){
										obj.GoldBaseCost = parseInt(noteLines[1]);
									} else if (noteLines[0] == "ItemBaseCost"){
										obj.ItemBaseCost = parseInt(noteLines[1]);
									}
								}

								break;
						}

						if (bEndMCraftingTag) {
							break;
						}
					}
				}
			}

			dataObj[obj.id] = obj;
		}
	}

	return dataObj;
}


/* Game_Interpreter Functions */
var geowilGameInterpreterPluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
	if (command == "Geowil.MagicCrafting"){
		let argString = "";

		for (let i1 = 0; i1 < args.length; i1++){
			argString += " " + args[i1];
		}

		command += argString;

		if (command.match(/Geowil.MagicCrafting[ ]Open/)){
			matches = (/Geowil.MagicCrafting[ ]Open/.exec(command) || []);

			if (matches.length > 0){
				SceneManager.push(Scene_MagicCrafting);
			}
		} else if (command.match(/Geowil.MagicCrafting[ ](\d+)[ ](\w+)/)){
			matches = (/Geowil.MagicCrafting[ ](\d+)[ ](\w+)/.exec(command) || []);

			if (matches.length > 0){
				if (matches[2] == "Craftable"){
					this.setSkillCraftable(matches[1]);
				} else if (matches[2] == "Uncraftable"){
					this.setSkillUncraftable(matches[1]);
				}
			}
		}
	} else {
		geowilGameInterpreterPluginCommand.call(this, command, args);
	}
}

Game_Interpreter.prototype.setSkillCraftable = function(skillId){
	$dataSkills.find(sk => sk && sk.id == skillId).CanCraft = true;
}

Game_Interpreter.prototype.setSkillUncraftable = function(skillId){
	$dataSkills.find(sk => sk && sk.id == skillId).CanCraft = false;
}

/* Scene_MagicCrafting Functions */
Scene_MagicCrafting.prototype = Object.create(Scene_MenuBase.prototype);
Scene_MagicCrafting.prototype.constructor = Scene_MagicCrafting;

Scene_MagicCrafting.prototype.initialize = function(){
	Scene_MenuBase.prototype.initialize.call(this);
	this._craftPaletteWnd = undefined;
	this._craftCmpSelectionWnd = undefined;
	this._craftCatSelectionWid = undefined;
	this._craftBlueprintListWnd = undefined;
	this._craftInfoWnd = undefined;
	this._craftingCmdWnd = undefined;
	this._infoWndMode = 0;
	this._selectedComponents = {
		"Component1": 0,
		"Component2": 0,
		"Component3": 0
	};
	this._selectedCatalysts = {
		"Catalyst1": 0,
		"Catalyst2": 0,
		"Catalyst3": 0
	};
	this._selectedBaseId = 0;
	this._currentComponentSpell = "";
	this._currentCatalystItem = "";
}

Scene_MagicCrafting.prototype.create = function(){
	Scene_MenuBase.prototype.create.call(this);

	this.createWindows();

	this._craftPaletteWnd.setCraftListWindow(this._craftBlueprintListWnd);
	this._craftPaletteWnd.show();
	this._craftPaletteWnd.activate();
	this._craftPaletteWnd.select(0);
	this._craftInfoWnd.show();
	this._craftBlueprintListWnd.refresh();
	this._craftBlueprintListWnd.show();

}

Scene_MagicCrafting.prototype.createWindows = function(){
	this.createHelpWindow();
	this.createInfoWindow();
	this.createPaletteWindow();
	this.createCmpSelectionWindow();
	this.createCatSelectionWindow();
	this.createBlueprintListWindow();
	this.createCommandWindow();
}

Scene_MagicCrafting.prototype.createInfoWindow = function(){
	let x = 310;
	let y = this._helpWindow.height + 10;

	let w = Graphics.width - x;
	let h = 280;

	this._craftInfoWnd = new Window_CraftInfo(x, y, w, h);
	this._craftInfoWnd.hide();
	this.addWindow(this._craftInfoWnd);
}

Scene_MagicCrafting.prototype.createPaletteWindow = function(){
	let x = 0;
	let y = this._helpWindow.height + 10;

	let w = 300;
	let h = 210;

	this._craftPaletteWnd = new Window_CraftPalette(x, y, w, h, this._helpWindow);
	this._craftPaletteWnd.setHandler('ok', this.paletteOkProcessing.bind(this));
	this._craftPaletteWnd.setHandler('cancel', this.paletteCancelProcessing.bind(this));
	this._craftPaletteWnd.hide();
	this.addWindow(this._craftPaletteWnd);
}

Scene_MagicCrafting.prototype.paletteOkProcessing = function(){
	this._infoWndMode = this._craftPaletteWnd.getSelectedMode();
	this._currentComponentSpell = this._craftPaletteWnd.getCurrentComponent();
	this._currentCatalystItem = this._craftPaletteWnd.getCurrentCatalyst();
	this._craftInfoWnd.setMode(this._infoWndMode);
	this._craftInfoWnd.refresh();

	this._craftPaletteWnd.deselect();
	this._craftPaletteWnd.deactivate();

	if (this._infoWndMode == 1){ //Component
		this._craftPaletteWnd.hide();
		this._craftCmpSelectionWnd.show();
		this._craftCmpSelectionWnd.activate();
		this._craftCmpSelectionWnd.select(0);
	} else if (this._infoWndMode == 2) { //Catalyst
		this._craftPaletteWnd.hide();
		this._craftCatSelectionWnd.setSelectedCatalysts(this._selectedCatalysts);
		this._craftCatSelectionWnd.show();
		this._craftCatSelectionWnd.activate();
		this._craftCatSelectionWnd.select(0);
	} else { //BlueprintList
		this._craftBlueprintListWnd.activate();
		this._craftBlueprintListWnd.select(0);
	}
}

Scene_MagicCrafting.prototype.paletteCancelProcessing = function() { SceneManager.pop(); }
Scene_MagicCrafting.prototype.createCmpSelectionWindow = function(){
	let x = 0;
	let y = this._helpWindow.height + 10;

	let w = 300;
	let h = 280;

	this._craftCmpSelectionWnd = new Window_CraftComponentSelection(x, y, w, h, this._craftInfoWnd, this._helpWindow);
	this._craftCmpSelectionWnd.setHandler('ok', this.selectedComponent.bind(this));
	this._craftCmpSelectionWnd.setHandler('cancel', this.componentCancelProcessing.bind(this));
	this._craftCmpSelectionWnd.hide();
	this.addWindow(this._craftCmpSelectionWnd);
}

Scene_MagicCrafting.prototype.selectedComponent = function(){
	let selectedCmp = this._craftCmpSelectionWnd.getSelectedComponent();
	this._selectedComponents[this._currentComponentSpell] = selectedCmp;

	this._craftBlueprintListWnd.updateSelectedComponents(this._selectedComponents);
	this._craftPaletteWnd.updateSelectedComponents(this._selectedComponents);
	this._craftInfoWnd.setMode(0);
	this._craftInfoWnd.updateSelectedComponents(this._selectedComponents);

	this._craftCmpSelectionWnd.hide();
	this._craftCmpSelectionWnd.deselect();
	this._craftCmpSelectionWnd.deactivate();

	this._craftPaletteWnd.show();
	this._craftPaletteWnd.activate();
	this._craftPaletteWnd.select(0);
	this._craftPaletteWnd.resetSelect('reset');
}

Scene_MagicCrafting.prototype.componentCancelProcessing = function(){
	this._craftInfoWnd.setMode(0);
	this._craftCmpSelectionWnd.hide();
	this._craftCmpSelectionWnd.deselect();
	this._craftCmpSelectionWnd.deactivate();

	this._craftPaletteWnd.show();
	this._craftPaletteWnd.activate();
	this._craftPaletteWnd.select(0);
	this._craftPaletteWnd.resetSelect('reset');
}

Scene_MagicCrafting.prototype.createCatSelectionWindow = function(){
	let x = 0;
	let y = this._helpWindow.height + 10;

	let w = 300;
	let h = 280;

	this._craftCatSelectionWnd = new Window_CraftCatalystSelection(x, y, w, h, this._craftInfoWnd, this._helpWindow);
	this._craftCatSelectionWnd.setHandler('ok', this.selectedCatalyst.bind(this));
	this._craftCatSelectionWnd.setHandler('cancel', this.catalystCancelProcessing.bind(this));
	this._craftCatSelectionWnd.hide();
	this.addWindow(this._craftCatSelectionWnd);
}

Scene_MagicCrafting.prototype.selectedCatalyst = function(){
	let selectedCat = this._craftCatSelectionWnd.getSelectedCatalyst();
	this._selectedCatalysts[this._currentCatalystItem] = selectedCat;

	this._craftInfoWnd.setMode(0);
	this._craftPaletteWnd.updateSelectedCatalysts(this._selectedCatalysts);
	this._craftInfoWnd.updateSelectedCatalysts(this._selectedCatalysts);

	this._craftCatSelectionWnd.hide();
	this._craftCatSelectionWnd.deselect();
	this._craftCatSelectionWnd.deactivate();

	this._craftPaletteWnd.show();
	this._craftPaletteWnd.activate();
	this._craftPaletteWnd.select(0);
	this._craftPaletteWnd.resetSelect('reset');
}

Scene_MagicCrafting.prototype.catalystCancelProcessing = function(){
	this._craftInfoWnd.setMode(0);
	this._craftCatSelectionWnd.hide();
	this._craftCatSelectionWnd.deselect();
	this._craftCatSelectionWnd.deactivate();

	this._craftPaletteWnd.show();
	this._craftPaletteWnd.activate();
	this._craftPaletteWnd.select(0);
	this._craftPaletteWnd.resetSelect('reset');
}

Scene_MagicCrafting.prototype.createBlueprintListWindow = function(){
	let x = 0;
	let y = this._craftPaletteWnd.getHeight() + 20 + this._helpWindow.height;
	let w = 300;
	let h = 180;

	this._craftBlueprintListWnd = new Window_CraftBlueprintList(x, y, w, h, this._craftInfoWnd, this._selectedComponents);
	this._craftBlueprintListWnd.setHandler('ok', this.spellBlueprintSelected.bind(this));
	this._craftBlueprintListWnd.setHandler('cancel', this.blueprintCancelProcessing.bind(this));
	this._craftBlueprintListWnd.hide();
	this.addWindow(this._craftBlueprintListWnd);
}

Scene_MagicCrafting.prototype.spellBlueprintSelected = function(){
	this._selectedBaseId = this._craftBlueprintListWnd.getSelectedBaseId();

	if (craftingDisplayMode != 1){
		this._craftInfoWnd.setMode(4);
		this._craftInfoWnd.setSelectedBaseSpell(this._selectedBaseId);
	} else {
		this._craftInfoWnd.setSelectedBaseSpell(0);
	}

	//this._craftBlueprintListWnd.deselect();
	this._craftBlueprintListWnd.deactivate();
	this._craftCmdWnd.show();
	this._craftCmdWnd.activate();
	this._craftCmdWnd.select(0);
}

Scene_MagicCrafting.prototype.blueprintCancelProcessing = function() {
	this._craftInfoWnd.setMode(0);
	this._craftBlueprintListWnd.deactivate();
	this._craftBlueprintListWnd.deselect();
	this._craftPaletteWnd.activate();
	this._craftPaletteWnd.select(0);
}

Scene_MagicCrafting.prototype.createCommandWindow = function(){
	let x = this._craftPaletteWnd.getWidth() + 10;
	let y = this._craftInfoWnd.getHeight() + this._helpWindow.height + 120;
	let w = this._craftInfoWnd.getWidth();
	let h = 60;

	this._craftCmdWnd = new Window_CraftCommand(x, y, w, h);
	this._craftCmdWnd.setHandler('ok', this.cmdOkProcessing.bind(this));
	this._craftCmdWnd.setHandler('cancel', this.cmdCancelProcessing.bind(this));
	this._craftCmdWnd.hide();
	this._craftCmdWnd.deactivate();
	this.addWindow(this._craftCmdWnd);
}

Scene_MagicCrafting.prototype.cmdOkProcessing = function(){
	this._craftInfoWnd.setSelectedBaseSpell(this._selectedBaseId);
	this._craftCmdWnd.deselect();
	this._craftCmdWnd.deactivate();
	this._craftInfoWnd.deactivate();
	this._craftPaletteWnd.resetPallete();

	this.unlockSpell();
}

Scene_MagicCrafting.prototype.unlockSpell = function(){
	let baseSkill;
	let componentSkills = [];
	let catalystItems = [];
	let cmpIds = [];
	let catIds = [];

	if (bPreventRename){
		let existingSkill = $dataSkills.find(sk => sk && sk.BaseSkillId == this._selectedBaseId);
		if (existingSkill){
			baseSkill = existingSkill;
		} else {
			baseSkill = $dataSkills[this._selectedBaseId];
		}
	} else {
		baseSkill = $dataSkills[this._selectedBaseId];
	}

	let newSkillInst = JSON.parse(JSON.stringify(baseSkill));
	newSkillInst.id = (!bPreventRename ? currentId + 1 : (baseSkill.id < startId ? currentId + 1 : baseSkill.id));
	currentId += (!bPreventRename ? 1 : (baseSkill.id < startId ? 1 : 0));

	cmpIds = Object.values(this._selectedComponents);
	catIds = Object.values(this._selectedCatalysts);

	componentSkills = getComponentData(cmpIds);
	catalystItems = getCatalystData(catIds);
	newSkillInst.damage.formula = processFormula(newSkillInst, componentSkills, catalystItems);
	newSkillInst.effects = newSkillInst.effects.concat(processNewEffects(newSkillInst, catalystItems));
	newSkillInst.CraftingShowName = false;
	newSkillInst.BaseSkillId = (!bPreventRename ? this._selectedBaseId : (baseSkill.id < startId ? this._selectedBaseId : newSkillInst.BaseSkillId));
	newSkillInst.CanLearn = true;
	newSkillInst.IsRecipe = false;
	newSkillInst.CanCraft = false;

	baseSkill.CraftingShowName = (!bPreventRename ? true : (baseSkill.id < startId ? true : false));
	baseSkill.Obfuscated = false;

	$newSkillInstance = newSkillInst;

	//Magic Schools handling
	//Future: Possibly add in code to allow crafting to work w/o Magic Schools plugin
	let schools = Object.values($magicSchoolsData);
	let bSkillAdded = false;
	for (let i1 = 0; i1 < schools.length; i1++){
		let currSchool = schools[i1];
		let trees = Object.values(currSchool.Trees);

		for (let i2 = 0; i2 < trees.length; i2++){
			let currTree = trees[i2];
			let treeConfig = currTree.TreeConfig;

			if (treeConfig.includes(String(this._selectedBaseId))){
				if (!treeConfig.includes($newSkillInstance.id)){
					treeConfig.push(String($newSkillInstance.id));
					let priGradeConfig = Object.values(currTree.PrimaryGradeConfig);
					let secGradeConfig = Object.values(currTree.SecondaryGradeConfig);

					for (let i3 = 0; i3 < priGradeConfig.length; i3++){
						let currPriConfig = priGradeConfig[i3];
						let currSecConfig = secGradeConfig[i3];

						if (currPriConfig.Config.includes(String(this._selectedBaseId))){
							currPriConfig.Config.push(String($newSkillInstance.id));
							bSkillAdded = true;
						}

						if (currSecConfig.Config.includes(String(this._selectedBaseId))){
							currSecConfig.Config.push(String($newSkillInstance.id));
							bSkillAdded = true;
						}
					}
				}
			}

			if (bSkillAdded){
				break;
			}
		}

		if (bSkillAdded){
			break;
		}
	}

	this._selectedComponents = {
		"Component1": 0,
		"Component2": 0,
		"Component3": 0
	};
	this._selectedCatalysts = {
		"Catalyst1": 0,
		"Catalyst2": 0,
		"Catalyst3": 0
	};

	this._currentComponentSpell = "";
	this._currentCatalystItem = "";
	this._craftBlueprintListWnd.updateSelectedComponents(this._selectedComponents);
	this._craftInfoWnd.updateSelectedComponents(this._selectedComponents);
	this._craftInfoWnd.updateSelectedCatalysts(this._selectedCatalysts);
	this._craftPaletteWnd.activate();
	this._craftPaletteWnd.select(0);

	for (let itm of catalystItems){
		$gameParty.loseItem(itm, 1, false);
	}

	if (!bPreventRename){
		SceneManager.push(Scene_MCSkillName);
	} else {
		if (baseSkill.id > startId){
			let craftBaseSkill;
			craftBaseSkill = $dataSkills.find(sk => sk && sk.id == $newSkillInstance.BaseSkillId);
			if (craftBaseSkill){
				baseSkill = craftBaseSkill;
			}
		}
		if (baseSkill.TimesCrafted > 0){
			let skillName = baseSkill.name;
			$newSkillInstance.name = skillName + ' +' + String(baseSkill.TimesCrafted);
		}

		$dataSkills[$newSkillInstance.id] = $newSkillInstance;
		baseSkill.TimesCrafted++;
	}

	$dataSkills[baseSkill.id] = baseSkill;
	this._selectedBaseId = 0;
}

Scene_MagicCrafting.prototype.cmdCancelProcessing = function(){
	this._craftCmdWnd.deactivate();
	this._craftCmdWnd.deselect();
	this._craftBlueprintListWnd.activate();
	this._craftBlueprintListWnd.select(0);
}

/* Window_CraftPalette Functions */
Window_CraftPalette.prototype = Object.create(Window_Selectable.prototype);
Window_CraftPalette.prototype.constructor = Window_CraftPalette;

Window_CraftPalette.prototype.initialize = function(x, y, w, h, helpWnd){
	this._helpWindow = helpWnd;
	this._width = w;
	this._height = h;
	this._x = x;
	this._y = y;
	this._comList = [];
	this._intComList = [];
	this._pageIndex = 0;
	this._totalIndex = 1;
	this._totalItems = 0;
	this._selectedMode = 0;
	this._craftingActor = $gameParty.allMembers()[0];
	this._selectedCatalysts = [];
	this._selectedComponents = [];
	this._bCanCraft = false;
	this._craftListWnd = null;

	let actClsId = this._craftingActor._classId;

	this._numOfComponents = $dataClasses[actClsId].MaxComponents;
	this._numOfCatalysts = $dataClasses[actClsId].MaxCatalysts;

	this._currentCmp = "";
	this._currentCat = "";

	Window_Selectable.prototype.initialize.call(this, x, y, w, h);
	this.refresh();
}

Window_CraftPalette.prototype.updateSelectedComponents = function(selCmp) {
	this._selectedComponents = [];
	for (let key of Object.keys(selCmp)){
		let compSkillId = selCmp[key];
		this._selectedComponents.push(compSkillId);
	}

	this.refresh();
}

Window_CraftPalette.prototype.updateSelectedCatalysts = function(selCat) {
	this._selectedCatalysts = [];
	for (let key of Object.keys(selCat)){
		let catItemId = selCat[key];
		this._selectedCatalysts.push(catItemId);
	}
}

Window_CraftPalette.prototype.getHeight = function() { return this._height; }
Window_CraftPalette.prototype.getWidth = function() { return this._width; }
Window_CraftPalette.prototype.getSelectedMode = function() { return this._selectedMode; }
Window_CraftPalette.prototype.maxItems = function() { return (this._comList ? this._comList[this._pageIndex].length : 1); }
Window_CraftPalette.prototype.setCraftListWindow = function(subWnd) {
	this._craftListWnd = subWnd;
	this.refresh();
}

Window_CraftPalette.prototype.itemHeight = function() {
	let clientHeight = this._height - this.padding * 2;
	return Math.floor(clientHeight / this.numVisibleRows());
}

Window_CraftPalette.prototype.itemWidth = function() {
    return Math.floor((this._width - this.padding * 2 +
                   this.spacing()) / this.maxCols() - this.spacing());
}

Window_CraftPalette.prototype.getCurrentComponent = function() { return this._currentCmp; }
Window_CraftPalette.prototype.getCurrentCatalyst = function() { return this._currentCat; }
Window_CraftPalette.prototype.itemRect = function(index){
	let rect = new Rectangle();
    let maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();
    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
    return rect;
}

Window_CraftPalette.prototype.numVisibleRows = function() {
	return 4;
}
Window_CraftPalette.prototype.setCurrentCompId = function(cmpId) { this._selectedComponents[this._currentCmp] = cmpId; }
Window_CraftPalette.prototype.setCurrentCatId = function(catId) { this._selectedCatalysts[this._currentCat] = catId; }
Window_CraftPalette.prototype.resetPallete = function(){
	this._selectedComponents = [];
	this._selectedCatalysts =[];
	this._currentCat = "";
	this._currentCmp = "";
	this._selectedMode = 0;
	this.refresh();
}

Window_CraftPalette.prototype.drawItem = function(index){
	let rect = this.itemRectForText(index);
	let x = rect.width/2;
	let y = rect.y + (rect.height/2) - this.lineHeight() * 0.5;
	let w = rect.width - this.textPadding();

	let selectedIdx = this._comList[this._pageIndex][index];

	if (selectedIdx == "Craft Skill" && !this._bCanCraft){
		this.changePaintOpacity(false);
	} else{
		this.changePaintOpacity(true);
	}

	this.drawText(this._comList[this._pageIndex][index], rect.x, y, w , 'center');
}

Window_CraftPalette.prototype.buildComList = function(){
	this._comList = [];
	this._intComList = [];
	this._helpTxtList = [];
	this._totalItems = 0;

	for (let i1 = 0; i1 < this._numOfComponents; i1++){
		if (this._intComList.length < this.numVisibleRows()){
			this._intComList.push("Component " + String(i1+1));
			this._helpTxtList.push("Select a spell for Component " + String(i1+1));
			this._totalItems++;
		} else {
			this._comList.push(this._intComList);
			this._intComList = [];
			this._intComList.push("Component " + String(i1+1));
			this._helpTxtList.push("Select a spell for Component " + String(i1+1));
			this._totalItems++;
		}
	}

	for (let i1 = 0; i1 < this._numOfCatalysts; i1++){
		if (this._intComList.length < this.numVisibleRows()){
			this._intComList.push("Catalyst " + String(i1+1));
			this._helpTxtList.push("Select an item for Catalyst " + String(i1+1));
			this._totalItems++;
		} else {
		   this._comList.push(this._intComList);
		   this._intComList = [];
		   this._intComList.push("Catalyst " + String(i1+1));
		   this._helpTxtList.push("Select an item for Catalyst " + String(i1+1));
		   this._totalItems++;
	   }
	}

	let miscCmds = ["Craft Skill", "Cancel"];
	let miscCmdTxt = ["Begin crafting a skill", "Stop crafting"];

	for (let i1 = 0; i1 < miscCmds.length; i1++){
		if (this._intComList.length < this.numVisibleRows()){
			this._intComList.push(miscCmds[i1]);
			this._helpTxtList.push(miscCmdTxt[i1]);
			this._totalItems++;
		} else {
		   this._comList.push(this._intComList);
		   this._intComList = [];
		   this._intComList.push(miscCmds[i1]);
		   this._helpTxtList.push(miscCmdTxt[i1]);
		   this._totalItems++;
	   }
   }

   if (this._intComList.length > 0){
	   this._comList.push(this._intComList);
	   this._intComList = [];
   }
}

Window_CraftPalette.prototype.processCursorMove = function() {
	let bResetSelect = false;
    if (this.isCursorMovable()) {
        var lastIndex = this.index();

        if (Input.isRepeated('down')) {
			if (this._totalIndex + 1 > this._totalItems){
				this._totalIndex = 0;
			}

			this._totalIndex++;

			bResetSelect = this.setIndexPage();
            this.cursorDown(Input.isTriggered('down'));
			if (bResetSelect){
				this.resetSelect("down");
				bResetSelect = false;
			}
        } else if (Input.isRepeated('up')) {
			if (this._totalIndex - 1 < 1){
				this._totalIndex = this._totalItems;
			} else {
					this._totalIndex--;
			}

			bResetSelect = this.setIndexPage();
            this.cursorUp(Input.isTriggered('up'));

			if (bResetSelect){
				this.resetSelect("up");
				bResetSelect = false;
			}
        } else if (Input.isRepeated('right')) {
            this.cursorRight(Input.isTriggered('right'));
        } else if (Input.isRepeated('left')) {
            this.cursorLeft(Input.isTriggered('left'));
        } else if (!this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
            this.cursorPagedown();
        } else if (!this.isHandled('pageup') && Input.isTriggered('pageup')) {
            this.cursorPageup();
        }

        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    }
};

Window_CraftPalette.prototype.setIndexPage = function(lastIndex, direction){
	if (this._totalIndex >= 1){
		let calcPageIndex = Math.ceil(this._totalIndex / this.numVisibleRows())-1;

		if (calcPageIndex != this._pageIndex){
			this._pageIndex = calcPageIndex;
			this.contents.clear();
			this.drawAllItems();
			return true;
		}
	} else {
		this._pageIndex = 0;
		this.contents.clear();
		this.drawAllItems();
		return true;
	}

	return false;
}

Window_CraftPalette.prototype.resetSelect = function(direction){
	if (direction == "down") {
		this._index = 0;
		this.updateCursor();
		this.select(0);
	} else if (direction == "up") {
		let nextIndex = this._comList[this._pageIndex].length-1;
		this._index = nextIndex;
		this.updateCursor();
		this.select(nextIndex);
	} else {
		this._pageIndex = 0;
		this._totalIndex = 1;
		this._index = 0;
		this.updateCursor();
		this.select(0);
	}
}

Window_CraftPalette.prototype.updateHelp = function(){
	this._helpWindow.clear();
	this._helpWindow.setText(this._helpTxtList[this._index]);
};

Window_CraftPalette.prototype.select = function(index){
	this._index = index;
	if (this._comList.length > 0 && this._comList[this._pageIndex].length > 0){
		if (index > -1 && index != this._comList[this._pageIndex].length && this._comList[this._pageIndex][index] != "Cancel"){
			selectedCommand = this._comList[this._pageIndex][index];
			if (selectedCommand.contains("Component")){
				let commandArr = selectedCommand.split(" ");
				switch (commandArr[1]){
					case "1":
						this._currentCmp = "Component1";
						break;
					case "2":
						this._currentCmp = "Component2";
						break;
					case "3":
						this._currentCmp = "Component3";
						break;
					default:
						break;
				}

				this._selectedMode = 1;
			} else if (selectedCommand.contains("Catalyst")){
				let commandArr = selectedCommand.split(" ");
				switch (commandArr[1]){
					case "1":
						this._currentCat = "Catalyst1";
						break;
					case "2":
						this._currentCat = "Catalyst2";
						break;
					case "3":
						this._currentCat = "Catalyst3";
						break;
					default:
						break;
				}

				this._selectedMode = 2;
			} else if (selectedCommand.contains("Craft")){
				this._selectedMode = 3;
			}
		}

		this._stayCount = 0;
	    this.ensureCursorVisible();
	    this.updateCursor();
	    this.callUpdateHelp();
	}
}

Window_CraftPalette.prototype.processOk = function(){
	if (this._index > -1 && this._index < this._comList[this._pageIndex].length){
		if (this._comList[this._pageIndex][this._index] != 'Cancel'){
			if ((this._comList[this._pageIndex][this._index] == "Craft Skill" && this._bCanCraft) ||
					this._comList[this._pageIndex][this._index] != "Craft Skill"){
				Window_Selectable.prototype.processOk.apply(this);
			} else {
				SoundManager.playCancel();
			}
		} else{
			Window_Selectable.prototype.processCancel.apply(this);
		}
	} else{
		Window_Selectable.prototype.processCancel.apply(this);
	}
}

Window_CraftPalette.prototype.refresh = function(){
	let selCats = this._selectedCatalysts.filter(sc => sc != 0);
	let selCmps = this._selectedComponents.filter(sc => sc != 0)
	let craftableSkillList = [];
	if (this._craftListWnd != null) {
		this._craftListWnd.updateSelectedComponents(selCmps);
		craftableSkillList = this._craftListWnd.getCraftList();
	}

	if (craftableSkillList.length > 0){
		this._bCanCraft = true;
	} else {
		this._bCanCraft = false;
	}

	this.contents.clear();
	this.buildComList();
	this.drawAllItems();
}

Window_CraftPalette.prototype.deactivate = function(){
	Window_Base.prototype.deactivate.call(this);
}


/* Window_CraftComponentSelection Functions */
Window_CraftComponentSelection.prototype = Object.create(Window_Selectable.prototype);
Window_CraftComponentSelection.prototype.constructor = Window_CraftComponentSelection;

Window_CraftComponentSelection.prototype.initialize = function(x, y, w, h, infoWnd){
	this._width = w;
	this._height = h;
	this._x = x;
	this._y = y;
	this._infoWnd = infoWnd;
	this._comList = [];
	this._cmpIdList = [];
	this._intComList = [];
	this._intCmpIdList = [];
	this._helpTxtList = [];
	this._selectedCmpId = 0;
	this._pageIndex = 0;
	this._totalIndex = 1;
	this._totalItems = 0;

	Window_Selectable.prototype.initialize.call(this, x, y, w, h);
	this.refresh();
}

Window_CraftComponentSelection.prototype.buildComList = function(){
	this._comList = [];
	this._intComList = [];
	this._intCmpIdList = [];
	this._helpTxtList = [];
	this._totalItems = 0;
	this._cmpIdList = [];

	let actSkills = [];
	let partyMemSkillData = [];

	for (let act of $gameParty.allMembers()){
		if (act._skills.length > 0){
			for (let skillId of act._skills){
				if (!actSkills.includes(skillId)){
					actSkills.push(skillId);
				}
			}
		}
	}

	if (actSkills.length > 0){
		partyMemSkillData = $dataSkills.filter(sk => sk && actSkills.includes(sk.id));
	}

	for (let sklId of Object.keys(partyMemSkillData)){
		let skl = partyMemSkillData[sklId];

		if (this._intComList.length < this.numVisibleRows()){
			this._intComList.push(skl.name);
			this._intCmpIdList.push(skl.id);
			this._totalItems++;
		} else{
			this._comList.push(this._intComList);
			this._cmpIdList.push(this._intCmpIdList);

			this._intComList = [];
			this._intCmpIdList = [];

			this._intCmpIdList.push(skl.id);
			this._intComList.push(skl.name);
			this._totalItems++;
		}
	}

	for (let i1 = 0; i1 < 1; i1++){
		if (this._intComList.length < this.numVisibleRows()){
			this._intComList.push("Cancel");
			this._intCmpIdList.push(-1);
			this._totalItems++;
		} else{
			this._comList.push(this._intComList);
			this._cmpIdList.push(this._intCmpIdList);

			this._intComList = [];
			this._intCmpIdList = [];

			this._intComList.push("Cancel");
			this._intCmpIdList.push(-1);
			this._totalItems++;
		}
	}

	if (this._intComList.length > 0){
		this._comList.push(this._intComList);
		this._cmpIdList.push(this._intCmpIdList);

		this._intComList = [];
		this._intCmpIdList = [];
	}
}

Window_CraftComponentSelection.prototype.getTreeSkills = function(currSchool, rtnSkills){
	let schoolSkills = [];

	if (Object.keys(currSchool.Trees).length > 0){
		for(let key of Object.keys(currSchool.Trees)){
			let currTree = currSchool.Trees[key];

			if (currTree.Spells.length > 0){
				schoolSkills = schoolSkills.concat(currTree.Spells);
			}
		}

		for (let i1 = 0; i1 < schoolSkills.length; i1++){
			if (!rtnSkills.includes(schoolSkills[i1])){
				rtnSkills.push(schoolSkills[i1]);
			}
		}
	}

	return rtnSkills;
}

Window_CraftComponentSelection.prototype.getWidth = function() { return this._width; }
Window_CraftComponentSelection.prototype.getHeight = function() { return this._height; }
Window_CraftComponentSelection.prototype.getX = function() { return this._x; }
Window_CraftComponentSelection.prototype.getY = function() { return this._y; }
Window_CraftComponentSelection.prototype.getSelectedComponent = function() { return this._selectedCmpId; }
Window_CraftComponentSelection.prototype.maxItems = function() { return (this._comList ? this._comList[this._pageIndex].length : 1); }
Window_CraftComponentSelection.prototype.numVisibleRows = function() { return 4; }
Window_CraftComponentSelection.prototype.itemHeight = function() {
	let clientHeight = this._height - this.padding * 2;
	return Math.floor(clientHeight / this.numVisibleRows());
}

Window_CraftComponentSelection.prototype.itemWidth = function() {
    return Math.floor((this._width - this.padding * 2 +
                   this.spacing()) / this.maxCols() - this.spacing());
}

Window_CraftComponentSelection.prototype.processCursorMove = function() {
	let bResetSelect = false;
    if (this.isCursorMovable()) {
        var lastIndex = this.index();

        if (Input.isRepeated('down')) {
			if (this._totalIndex + 1 > this._totalItems){
				this._totalIndex = 0;
			}

			this._totalIndex++;

			bResetSelect = this.setIndexPage();
            this.cursorDown(Input.isTriggered('down'));
			if (bResetSelect){
				this.resetSelect("down");
				bResetSelect = false;
			}
        } else if (Input.isRepeated('up')) {
			if (this._totalIndex - 1 < 1){
				this._totalIndex = this._totalItems;
			} else {
					this._totalIndex--;
			}

			bResetSelect = this.setIndexPage();
            this.cursorUp(Input.isTriggered('up'));

			if (bResetSelect){
				this.resetSelect("up");
				bResetSelect = false;
			}
        } else if (Input.isRepeated('right')) {
            this.cursorRight(Input.isTriggered('right'));
        } else if (Input.isRepeated('left')) {
            this.cursorLeft(Input.isTriggered('left'));
        } else if (!this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
            this.cursorPagedown();
        } else if (!this.isHandled('pageup') && Input.isTriggered('pageup')) {
            this.cursorPageup();
        }

        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    }
};

Window_CraftComponentSelection.prototype.setIndexPage = function(lastIndex, direction){
	if (this._totalIndex >= 1){
		let calcPageIndex = Math.ceil(this._totalIndex / this.numVisibleRows())-1;

		if (calcPageIndex != this._pageIndex){
			this._pageIndex = calcPageIndex;
			this.contents.clear();
			this.drawAllItems();
			return true;
		}
	} else {
		this._pageIndex = 0;
		this.contents.clear();
		this.drawAllItems();
		return true;
	}

	return false;
}

Window_CraftComponentSelection.prototype.resetSelect = function(direction){
	if (direction == "down") {
		this._index = 0;
		this.updateCursor();
		this.select(0);
	} else if (direction == "up") {
		let nextIndex = this._comList[this._pageIndex].length-1;
		this._index = nextIndex;
		this.updateCursor();
		this.select(nextIndex);
	} else {
		this._pageIndex = 0;
		this._totalIndex = 0;
		this._index = 0;
		this.updateCursor();
		this.select(0);
	}
}

Window_CraftComponentSelection.prototype.drawItem = function(index){
	let rect = this.itemRectForText(index);
	let x = rect.width/2;
	let y = rect.y + (rect.height/2) - this.lineHeight() * 0.5;
	let w = rect.width - this.textPadding();

	/*if (this._index == this.bottomRow()){
			index = this._index + 1;
	}*/

	this.drawText(this._comList[this._pageIndex][index], rect.x, y, w , 'center');
}

Window_CraftComponentSelection.prototype.select = function(index){
	this._index = index;
	if (this._comList.length > 0 && this._comList[this._pageIndex].length > 0){
		if (index > -1 && index != this._comList[this._pageIndex].length && this._comList[this._pageIndex][index] != "Cancel"){
			this._selectedCmpId = this._cmpIdList[this._pageIndex][index];
			if (this._infoWnd !== undefined){
				this._infoWnd.setSelectedComponent(this._selectedCmpId);
			}
		} else {
			if (this._infoWnd !== undefined){
				this._selectedCmpId = this._cmpIdList[0];
				this._infoWnd.setSelectedComponent(this._selectedCmpId);
			}
		}

		this._stayCount = 0;
		this.ensureCursorVisible();
		this.updateCursor();
		this.callUpdateHelp();
	}
}

Window_CraftComponentSelection.prototype.processOk = function(){
	if (this._index > -1 && this._index < this._comList[this._pageIndex].length){
		if (this._comList[this._pageIndex][this._index] !== "Cancel"){
			this._selectedCmpId = this._cmpIdList[this._pageIndex][this._index];
			Window_Selectable.prototype.processOk.apply(this);
		} else {
			Window_Selectable.prototype.processCancel.apply(this);
		}
	} else {
		Window_Selectable.prototype.processCancel.apply(this);
	}
}

Window_CraftComponentSelection.prototype.refresh = function(){
	if (this.contents){
		this.contents.clear();
		this.buildComList();
		this.drawAllItems();
	}
}


/* Window_CraftCatalystSelection Functions */
Window_CraftCatalystSelection.prototype = Object.create(Window_Selectable.prototype);
Window_CraftCatalystSelection.prototype.constructor = Window_CraftCatalystSelection;

Window_CraftCatalystSelection.prototype.initialize = function(x, y, w, h, infoWnd, helpWnd){
	this._width = w;
	this._height = h;
	this._x = x;
	this._y = y;
	this._infoWnd = infoWnd;
	this._helpWindow = helpWnd;
	this._comList = [];
	this._catIdList = [];
	this._intComList = [];
	this._intCatIdList = [];
	this._pageIndex = 0;
	this._totalIndex = 1;
	this._totalItems = 0;
	this._selectedCatId = 0;
	this._selectedCatalysts = {};

	Window_Selectable.prototype.initialize.call(this, x, y, w, h);
	this.refresh();
}

Window_CraftCatalystSelection.prototype.buildComList = function(){
	this._comList = [];
	this._catIdList = [];
	this._intComList = [];
	this._intCatIdList = [];
	this._totalItems = 0;

	let selectedItemsData = {};
	let selectedCatIds = Object.values(this._selectedCatalysts);

	for (let i1 = 0; i1 < selectedCatIds.length; i1++){
		let currItmId = selectedCatIds[i1];
		if (selectedItemsData.hasOwnProperty(currItmId)){
			selectedItemsData[currItmId] += 1;
		} else{
			selectedItemsData[currItmId] = 1;
		}
	}

	let partyInvItems = $gameParty._items;
	let invItemData = $dataItems.filter(itm => itm && partyInvItems.hasOwnProperty(itm.id));
	let craftingItmData = invItemData.filter(itm => itm.IsCatalyst == true);

	let invCraftingItems = {};
	for (let itm of craftingItmData){
		let currItm = $dataItems.find(item => item && item.id == itm.id);
		if (!invCraftingItems.hasOwnProperty(itm.id)){
			invCraftingItems[itm.id] = $gameParty.numItems(currItm);
		}
	}

	for (let invId of Object.keys(invCraftingItems)){
		if (selectedItemsData.hasOwnProperty(invId)){
			let invAmt = invCraftingItems[invId];
			let selectedAmt = selectedItemsData[invId];

			if (invAmt - selectedAmt > 0){
				invCraftingItems[invId] -= selectedAmt;
			} else{
				invCraftingItems[invId] = 0;
			}
		} else {

		}
	}


	for (let itm of craftingItmData){
		let comName = "";
		comName += itm.name;

		if (invCraftingItems.hasOwnProperty(itm.id)){
			comName += " x" + String(invCraftingItems[itm.id]);
		}

		if (this._intComList.length < this.numVisibleRows()){
			this._intComList.push(comName);
			this._intCatIdList.push(itm.id);
			this._totalItems++;
		} else {
			this._comList.push(this._intComList);
			this._catIdList.push(this._intCatIdList);

			this._intComList = [];
			this._intCatIdList = [];

			this._intComList.push(comName);
			this._intCatIdList.push(itm.id);
			this._totalItems++;
		}
	}

	for (let i1 = 0; i1 < 1; i1++){
		if (this._intComList.length < this.numVisibleRows()){
			this._intComList.push("Cancel");
			this._intCatIdList.push(-1);
			this._totalItems++;
		} else {
			this._comList.push(this._intComList);
			this._catIdList.push(this._intCatIdList);

			this._intComList = [];
			this._intCatIdList = [];

			this._intComList.push("Cancel");
			this._intCatIdList.push(-1);
			this._totalItems++;
		}
	}

	if (this._intComList.length > 0){
		this._comList.push(this._intComList);
		this._catIdList.push(this._intCatIdList);

		this._intComList = [];
		this._intCatIdList = [];
	}
}

Window_CraftCatalystSelection.prototype.getWidth = function() { return this._width; }
Window_CraftCatalystSelection.prototype.getHeight = function() { return this._height; }
Window_CraftCatalystSelection.prototype.getX = function() { return this._x; }
Window_CraftCatalystSelection.prototype.getY = function() { return this._y; }
Window_CraftCatalystSelection.prototype.getSelectedCatalyst = function() { return this._selectedCatId; }
Window_CraftCatalystSelection.prototype.setSelectedCatalysts = function(selCats) {
	this._selectedCatalysts = selCats;
	this.refresh();
}

Window_CraftCatalystSelection.prototype.maxItems = function() { return (this._comList ? this._comList[this._pageIndex].length : 1); }
Window_CraftCatalystSelection.prototype.numVisibleRows = function() { return 4; }
Window_CraftCatalystSelection.prototype.itemHeight = function() {
	let clientHeight = this._height - this.padding * 2;
	return Math.floor(clientHeight / this.numVisibleRows());
}

Window_CraftCatalystSelection.prototype.itemWidth = function() {
    return Math.floor((this._width - this.padding * 2 +
                   this.spacing()) / this.maxCols() - this.spacing());
}

Window_CraftCatalystSelection.prototype.processCursorMove = function() {
	let bResetSelect = false;
    if (this.isCursorMovable()) {
        var lastIndex = this.index();

        if (Input.isRepeated('down')) {
			if (this._totalIndex + 1 > this._totalItems){
				this._totalIndex = 0;
			}

			this._totalIndex++;

			bResetSelect = this.setIndexPage();
            this.cursorDown(Input.isTriggered('down'));
			if (bResetSelect){
				this.resetSelect("down");
				bResetSelect = false;
			}
        } else if (Input.isRepeated('up')) {
			if (this._totalIndex - 1 < 1){
				this._totalIndex = this._totalItems;
			} else {
					this._totalIndex--;
			}

			bResetSelect = this.setIndexPage();
            this.cursorUp(Input.isTriggered('up'));

			if (bResetSelect){
				this.resetSelect("up");
				bResetSelect = false;
			}
        } else if (Input.isRepeated('right')) {
            this.cursorRight(Input.isTriggered('right'));
        } else if (Input.isRepeated('left')) {
            this.cursorLeft(Input.isTriggered('left'));
        } else if (!this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
            this.cursorPagedown();
        } else if (!this.isHandled('pageup') && Input.isTriggered('pageup')) {
            this.cursorPageup();
        }

        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    }
};

Window_CraftCatalystSelection.prototype.setIndexPage = function(lastIndex, direction){
	if (this._totalIndex >= 1){
		let calcPageIndex = Math.ceil(this._totalIndex / this.numVisibleRows())-1;

		if (calcPageIndex != this._pageIndex){
			this._pageIndex = calcPageIndex;
			this.contents.clear();
			this.drawAllItems();
			return true;
		}
	} else {
		this._pageIndex = 0;
		this.contents.clear();
		this.drawAllItems();
		return true;
	}

	return false;
}

Window_CraftCatalystSelection.prototype.resetSelect = function(direction){
	if (direction == "down") {
		this._index = 0;
		this.updateCursor();
		this.select(0);
	} else if (direction == "up") {
		let nextIndex = this._comList[this._pageIndex].length-1
		this._index = nextIndex;
		this.updateCursor();
		this.select(nextIndex);
	} else {
		this._pageIndex = 0;
		this._totalIndex = 0;
		this._index = 0;
		this.updateCursor();
		this.select(0);
	}
}

Window_CraftCatalystSelection.prototype.drawItem = function(index){
	let rect = this.itemRectForText(index);
	let x = rect.width/2;
	let y = rect.y + (rect.height/2) - this.lineHeight() * 0.5;
	let w = rect.width - this.textPadding();

	let label = this._comList[this._pageIndex][index];
	this.resetFontSettings();
	while (this.textWidth(label) >= rect.width){
		this.contents.fontSize -= 1;
	}

	this.changePaintOpacity(this.bCanUse(this._comList[this._pageIndex][index]));
	this.drawText(label, rect.x, y, w , 'center');
}

Window_CraftCatalystSelection.prototype.select = function(index){
	this._index = index;
	if (this._comList.length > 0 && this._comList[this._pageIndex].length > 0){
		if (index > -1 && index != this._comList[this._pageIndex].length && this._comList[this._pageIndex][index] != "Cancel"){
			this._selectedCatId = this._catIdList[this._pageIndex][index];
			if (this._infoWnd !== undefined){
				this._infoWnd.setSelectedCatalyst(this._selectedCatId);
			}
		} else {
			if (this._infoWnd !== undefined){
				this._selectedCatId = this._catIdList[0];
				this._infoWnd.setSelectedCatalyst(this._selectedCatId);
			}
		}

		this._stayCount = 0;
		this.ensureCursorVisible();
		this.updateCursor();
		this.callUpdateHelp();
	}
}

Window_CraftCatalystSelection.prototype.processOk = function(){
	if (this._index > -1 && this._index < this._comList[this._pageIndex].length){
		if (this._comList[this._pageIndex][this._index] !== "Cancel"){
			if (this.bCanUse(this._comList[this._pageIndex][this._index])){
				this._selectedCatId = this._catIdList[this._pageIndex][this._index];
				Window_Selectable.prototype.processOk.apply(this);
			} else {
				SoundManager.playCancel();
			}
		} else {
			Window_Selectable.prototype.processCancel.apply(this);
		}
	} else {
		Window_Selectable.prototype.processCancel.apply(this);
	}
}

Window_CraftCatalystSelection.prototype.refresh = function(){
	if (this.contents){
		this.contents.clear();
		this.buildComList();
		this.drawAllItems();
	}
}

Window_CraftCatalystSelection.prototype.drawTextEx = function(text, x, y) {
    if (text) {
        let textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.height = this.calcTextHeight(textState, false);
        while (textState.index < textState.text.length) {
            this.processCharacter(textState);
        }
        return textState.x - x;
    } else {
        return 0;
    }
};

Window_CraftCatalystSelection.prototype.bCanUse = function(label){
	let bCanUseItem = false;
	let labelArr = label.split(" x");

	if (labelArr.length > 1){
		if (parseInt(labelArr[1])){
			if (parseInt(labelArr[1]) > 0){
				bCanUseItem = true;
			}
		}
	}

	return bCanUseItem;
}


/* Window_CraftBlueprintList */
Window_CraftBlueprintList.prototype = Object.create(Window_Selectable.prototype);
Window_CraftBlueprintList.prototype.constructor = Window_CraftBlueprintList;

Window_CraftBlueprintList.prototype.initialize = function(x, y, w, h, infoWnd, selectedComponents){
	this._width = w;
	this._height = h;
	this._x = x;
	this._y = y;
	this._comList = [];
	this._intComList = [];
	this._pageIndex = 0;
	this._totalIndex = 1;
	this._totalItems = 0;
	this._baseSkillIdList = [];
	this._intBaseSkillIdList = [];
	this._infoWnd = infoWnd;
	this._selectedComponents = selectedComponents;
	this._selectedBaseId = 0;

	Window_Selectable.prototype.initialize.call(this, x, y, w, h);
	this.buildComList();
}

Window_CraftBlueprintList.prototype.updateSelectedComponents = function (selCmps){
	this._selectedComponents = selCmps;
	this._pageIndex = 0;
	this._totalItems = 0;
	this._totalIndex = 1;
	this.refresh();
}

Window_CraftBlueprintList.prototype.buildComList = function(){
	this._comList = [];
	this._intComList = [];
	this._totalItems = 0;
	this._baseSkillIdList = [];
	this._intBaseSkillIdList = [];

	let craftableSpells = $dataSkills.filter(skl => skl && skl.CanCraft && skl.IsRecipe && (bPreventRename && (maxRefineLevel == 0 || (maxRefineLevel > skl.TimesCrafted)) ? true : false));
	let displaySpells = [];
	let selectedCmpIds = Object.values(this._selectedComponents);
	let selectedElements = selectedCmpIds.filter(sk => sk)
		.reduce((obj, sk) =>{
			if ($dataSkills.hasOwnProperty(sk)){
				obj.push($dataSkills[sk].damage.elementId);
			}
			return obj;
		}, []);

	for (let spell of craftableSpells){
		if (spell.ComponentElements.length > 0){
			if (this.meetsComponentRequirements(spell.ComponentElements, selectedElements)){
				displaySpells.push(spell);
			}
		}
	}

	for (let i1 = 0; i1 < displaySpells.length; i1++){
		let spell = displaySpells[i1];
		let name = spell.name;

		if (!spell.CraftingShowName){
			let newSkillName = "";

			if (craftingDisplayMode == 1){
				newSkillName = obfuscateData(name);
			} else {
				newSkillName = name;
			}

			name = newSkillName;
		}

		if (this._intComList.length < this.numVisibleRows()){
			this._intComList.push(name);
			this._intBaseSkillIdList.push(spell.id);
			this._totalItems++;
		} else {
			this._comList.push(this._intComList);
			this._baseSkillIdList.push(this._intBaseSkillIdList);

			this._intComList = [];
			this._intBaseSkillIdList = [];

			this._intComList.push(name);
			this._intBaseSkillIdList.push(spell.id);
			this._totalItems++;
		}
	}

	for (let i1 = 0; i1 < 1; i1++){
		if (this._intComList.length < this.numVisibleRows()){
			this._intComList.push("Cancel");
			this._intBaseSkillIdList.push(-1);
			this._totalItems++;
		} else {
			this._comList.push(this._intComList);
			this._baseSkillIdList.push(this._intBaseSkillIdList);

			this._intComList = [];
			this._intBaseSkillIdList = [];

			this._intComList.push("Cancel");
			this._intBaseSkillIdList.push(-1);
			this._totalItems++;
		}
	}

	if (this._intComList.length > 0){
		this._comList.push(this._intComList);
		this._baseSkillIdList.push(this._intBaseSkillIdList);

		this._intComList = [];
		this._intBaseSkillIdList = [];
	}
}

Window_CraftBlueprintList.prototype.meetsComponentRequirements = function(requiredElements, selectedElements){
	let numOfRequiredElements = {};
	let bMeetsElementalRequirements = true;

	for (let eleId in $dataSystem.elements){
		numOfRequiredElements[String(eleId)] = 0;
	}

	for (let eleId of requiredElements){
		numOfRequiredElements[String(eleId)]++;
	}

	for (let eleId of selectedElements){
		numOfRequiredElements[String(eleId)]--;
	}

	for (let key of Object.keys(numOfRequiredElements)){
		let numOfElements = numOfRequiredElements[key];
		if (numOfElements > 0){
			bMeetsElementalRequirements = false;
		}
	}

	return bMeetsElementalRequirements;
}

Window_CraftBlueprintList.prototype.processCursorMove = function() {
	let bResetSelect = false;
    if (this.isCursorMovable()) {
        var lastIndex = this.index();

        if (Input.isRepeated('down')) {
			if (this._totalIndex + 1 > this._totalItems){
				this._totalIndex = 0;
			}

			this._totalIndex++;

			bResetSelect = this.setIndexPage();
            this.cursorDown(Input.isTriggered('down'));
			if (bResetSelect){
				this.resetSelect("down");
				bResetSelect = false;
			}
        } else if (Input.isRepeated('up')) {
			if (this._totalIndex - 1 < 1){
				this._totalIndex = this._totalItems;
			} else {
					this._totalIndex--;
			}

			bResetSelect = this.setIndexPage();
            this.cursorUp(Input.isTriggered('up'));

			if (bResetSelect){
				this.resetSelect("up");
				bResetSelect = false;
			}
        } else if (Input.isRepeated('right')) {
            this.cursorRight(Input.isTriggered('right'));
        } else if (Input.isRepeated('left')) {
            this.cursorLeft(Input.isTriggered('left'));
        } else if (!this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
            this.cursorPagedown();
        } else if (!this.isHandled('pageup') && Input.isTriggered('pageup')) {
            this.cursorPageup();
        }

        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    }
};

Window_CraftBlueprintList.prototype.setIndexPage = function(lastIndex, direction){
	if (this._totalIndex >= 1){
		let calcPageIndex = Math.ceil(this._totalIndex / this.numVisibleRows())-1;

		if (calcPageIndex != this._pageIndex){
			this._pageIndex = calcPageIndex;
			this.contents.clear();
			this.drawAllItems();
			return true;
		}
	} else {
		this._pageIndex = 0;
		this.contents.clear();
		this.drawAllItems();
		return true;
	}

	return false;
}

Window_CraftBlueprintList.prototype.resetSelect = function(direction){
	if (direction == "down") {
		this._index = 0;
		this.updateCursor();
		this.select(0);
	} else if (direction == "up") {
		let nextIndex = this._comList[this._pageIndex].length-1;
		this._index = nextIndex;
		this.updateCursor();
		this.select(nextIndex);
	} else {
		this._pageIndex = 0;
		this._totalIndex = 0;
		this._index = 0;
		this.updateCursor();
		this.select(0);
	}
}

Window_CraftBlueprintList.prototype.getWidth = function() { return this._width; }
Window_CraftBlueprintList.prototype.getHeight = function() { return this._height; }
Window_CraftBlueprintList.prototype.getX = function() { return this._x; }
Window_CraftBlueprintList.prototype.getY = function() { return this._y; }
Window_CraftBlueprintList.prototype.getSelectedBaseId = function() { return this._selectedBaseId; }
Window_CraftBlueprintList.prototype.maxItems = function() { return (this._comList ? this._comList[this._pageIndex].length : 1); }
Window_CraftBlueprintList.prototype.numVisibleRows = function() { return 4; }
Window_CraftBlueprintList.prototype.itemHeight = function() {
	let clientHeight = this._height - this.padding * 2;
	return Math.floor(clientHeight / this.numVisibleRows());
}

Window_CraftBlueprintList.prototype.itemWidth = function() {
    return Math.floor((this._width - this.padding * 2 +
                   this.spacing()) / this.maxCols() - this.spacing());
}

Window_CraftBlueprintList.prototype.drawItem = function(index){
	let rect = this.itemRectForText(index);
	let x = rect.width/2;
	let y = rect.y + (rect.height/2) - this.lineHeight() * 0.5;
	let w = rect.width - this.textPadding();

	/*if (this._index == this.bottomRow()){
			index = this._index + 1;
	}*/

	this.drawText(this._comList[this._pageIndex][index], rect.x, y, w , 'center');
}

Window_CraftBlueprintList.prototype.select = function(index){
	this._index = index;
	if (this._comList.length > 0 && this._comList[this._pageIndex].length > 0){
		if (index > -1 && index != this._comList[this._pageIndex].length && this._comList[this._pageIndex][index] != "Cancel"){
			this._selectedBaseId = this._baseSkillIdList[this._pageIndex][index];
			if (this._infoWnd !== undefined){
				this._infoWnd.setSelectedBaseSpell(this._selectedBaseId);
			}
		} else {
			if (this._infoWnd !== undefined){
				this._infoWnd.setSelectedBaseSpell(-1);
			}
		}

		this._stayCount = 0;
		this.ensureCursorVisible();
		this.updateCursor();
		this.callUpdateHelp();
	}
}

Window_CraftBlueprintList.prototype.processOk = function(){
	if (this._index > -1 && this._index < this._comList[this._pageIndex].length){
		if (this._comList[this._pageIndex][this._index] !== "Cancel"){
			this._selectedBaseId = this._baseSkillIdList[this._pageIndex][this._index];
			this._infoWnd.setSelectedBaseSpell(this._selectedBaseId);
			Window_Selectable.prototype.processOk.apply(this);
		} else {
			Window_Selectable.prototype.processCancel.apply(this);
		}
	} else {
		Window_Selectable.prototype.processCancel.apply(this);
	}
}

Window_CraftBlueprintList.prototype.refresh = function(){
	if (this.contents){
		this.contents.clear();
		this.buildComList();
		this.drawAllItems();
	}
}

Window_CraftBlueprintList.prototype.getCraftList = function() {
	let skillList = [];
	for (let i1 = 0; i1 < this._comList.length; i1++){
		for (let i2 = 0; i2 < this._comList[i1].length; i2++){
			if (this._comList[i1][i2] != 'Cancel'){
				skillList.push(this._comList[i1][i2]);
			}
		}
	}

	return skillList;
}


/* Window_CraftInfo */
Window_CraftInfo.prototype = Object.create(Window_Selectable.prototype);
Window_CraftInfo.prototype.constructor = Window_CraftInfo;

Window_CraftInfo.prototype.initialize = function(x, y, w, h){
	this._width = w;
	this._height = h;
	this._x = x;
	this._y = y;
	this._windowMode = 0;
	this._selectedComponents = {};
	this._selectedCatalysts = {};
	this._curComponent = 0;
	this._curCatalyst = 0;
	this._curBaseSpell = 0;
	this._countdown = 0;
  	this._arrowBlinkTimer = 0;
  	this._lineHeight = this.lineHeight();

	Window_Selectable.prototype.initialize.call(this, x, y, w, h);
}

Window_CraftInfo.prototype.getHeight = function() { return this._height; }
Window_CraftInfo.prototype.getWidth = function() { return this._width; }

Window_CraftInfo.prototype.setMode = function(newMode) {
	this._windowMode = newMode;
	this.refresh();
}

Window_CraftInfo.prototype.updateSelectedComponents = function(selCmps) {
	this._selectedComponents = selCmps;
	this.refresh();
}

Window_CraftInfo.prototype.updateSelectedCatalysts = function(selCats) {
	this._selectedCatalysts = selCats;
	this.refresh();
}

Window_CraftInfo.prototype.setSelectedComponent = function(selCmp) {
	this._curComponent = selCmp;
	this.refresh();
}

Window_CraftInfo.prototype.setSelectedCatalyst = function(selCat) {
	this._curCatalyst = selCat;
	this.refresh();
}

Window_CraftInfo.prototype.setSelectedBaseSpell = function(selBase){
	this._curBaseSpell = selBase;
	this.refresh();
}

Window_CraftInfo.prototype.paletteInfo = function(){
	let fmt = undefined;
	let bEnableWordwrap = true;
	let text = undefined;
	let finalText = undefined;
	let textState = undefined;
	let totalText = "";
	let cmpString = "";
	let catString = "";

	fmt = JSON.parse(paletteTxFmt || '');
	if (fmt){
		bEnableWordwrap = fmt.match(/<(?:WordWrap)>/i);
		if (Object.keys(this._selectedComponents).length > 0 ||
				Object.keys(this._selectedCatalysts).length > 0){
			if (Object.keys(this._selectedComponents).length > 0) {

				let cmpIds = Object.values(this._selectedComponents);
				let cmpData = $dataSkills.filter(sk=> (cmpIds.includes(0) && !sk) || (sk && cmpIds.includes(sk.id)));

				for (let i1 = 0; i1 < cmpIds.length; i1++){
					if (cmpIds[i1] != 0){
						let curCmp = cmpData.find(sk => sk && sk.id == cmpIds[i1]);
						if (curCmp){
							let halfWndW = this._width / 2;
							this.contents.fontSize = 26;

							let cmpTitle = "Component " + String(i1+1);
							let titleLen = this.contents.measureTextWidth(cmpTitle);
							let titlePos = Math.floor(halfWndW - (titleLen/1.5));

							titlePos = Math.floor((cmpTitle.length < 10 ? titlePos - (10 + (cmpTitle.length/2)) : titlePos + (cmpTitle.length/2)));
							cmpTitle = addXShift(cmpTitle, titlePos);
							cmpTitle = changeFontSize(cmpTitle, 26);
							cmpTitle = addBreak(cmpTitle, 'end');

							let cmpName = curCmp.name;
							let nameLen = this.contents.measureTextWidth(cmpName);
							let namePos = Math.floor(halfWndW - (nameLen/1.5));

							namePos = Math.floor((cmpName.length < 10 ? namePos - (10 + (cmpName.length/2)) : namePos + (cmpName.length/2)));
							cmpName = addXShift(cmpName, namePos);
							cmpName = changeFontSize(cmpName, 26);
							cmpName = addBreak(cmpName, 'end');
							cmpName = addBreak(cmpName, 'end');

							let elementIcon = staticIconLst["11"][curCmp.damage.elementId];
							let element = $dataSystem.elements[curCmp.damage.elementId] || "Non-Elemental";
							let damage = 0;

							let form = curCmp.damage.formula;
							let formBaseDmg = form.split(" ")[0];
							damage = Math.ceil((parseInt(formBaseDmg) * mgDmgRate));

							let elementStr = "Element: " + elementIcon + ' ' + element;
							elementStr = addBreak(elementStr, 'end');
							let dmgStr = "Damage Added: " + damage;
							dmgStr = addBreak(dmgStr, 'end');
							dmgStr = addBreak(dmgStr, 'end');
							dmgStr = addBreak(dmgStr, 'end');

							cmpString += cmpTitle + cmpName + elementStr + dmgStr;
						}
					}
				}
			}

			if (Object.keys(this._selectedCatalysts).length > 0){
				bEnableWordwrap = fmt.match(/<(?:WordWrap)>/i);
				let catIds = Object.values(this._selectedCatalysts);
				let catData = $dataItems.filter(itm=> (catIds.includes(0) && !itm) || (itm && catIds.includes(itm.id)));

				for (let i1 = 0; i1 < catIds.length; i1++){
					if (catIds[i1] != undefined){
						let curCat = catData.find(itm => itm && itm.id == catIds[i1]);
						if (curCat){
							let halfWndW = this._width / 2;
							this.contents.fontSize = 26;

							let catTitle = "Catalyst " + String(i1+1);
							let titleLen = this.contents.measureTextWidth(catTitle);
							let titlePos = Math.floor(halfWndW - (titleLen/1.5));

							titlePos = Math.floor((catTitle.length < 10 ? titlePos - (10 + (catTitle.length/2)) : titlePos + (catTitle.length/2)));
							catTitle = addXShift(catTitle, titlePos);
							catTitle = changeFontSize(catTitle, 26);
							catTitle = addBreak(catTitle, 'end');

							let catName = curCat.name;
							let nameLen = this.contents.measureTextWidth(catName);
							let namePos = Math.floor(halfWndW - (nameLen/1.5));
							let header = "";

							namePos = Math.floor((catName.length < 10 ? namePos - (10 + (catName.length/2)) : namePos + (catName.length/2)));
							catName = addXShift(catName, namePos);
							catName = changeFontSize(catName, 26);
							catName = addBreak(catName, 'end');
							catName = addBreak(catName, 'end');

							let effectString = this.generateCatEffectList(curCat);
							effectString = addBreak(effectString, 'end');

							catString += catTitle + catName + effectString;
						}
					}
				}
			}

			totalText = totalText.concat(cmpString, catString);
			text = fmt.format(cmpString, catString);

			if (totalText.length > 0){
				textState = { index: 0 };
				textState.originalText = text;
				textState.text = this.convertEscapeCharacters(text);
				let convertedTextHeight = this.calcTextHeight(textState, true);
				this._allTextHeight = (convertedTextHeight > 600 ? convertedTextHeight / 2 : convertedTextHeight);

				if (bEnableWordwrap) {
					var txtLen = (this._allTextHeight == 0 ? 300 : this._allTextHeight);
					var multi2 =  8;
					let multi3 = (txtLen >= 600 ? 4 : 10);
					var multi = Math.ceil((txtLen * multi2) / (Graphics.width - (this._width + multi3)));

					this._allTextHeight *= multi/2;
					this._allTextHeight = Math.pow(2, Math.round(Math.log(this._allTextHeight) / Math.log(2)));
				} else {
					this._allTextHeight = 2;
				}

				this.createContents();
				this.drawTextEx(text, 0, 0);
			}
		}
	}
}

Window_CraftInfo.prototype.componentInfo = function(){
	let fmt = undefined;
	let bEnableWordwrap = true;
	let text = undefined;
	let finalText = undefined;
	let textState = undefined;
	let totalText = "";

	fmt = JSON.parse(cmpTxFmt || '');
	if (fmt && this._curComponent > 0){
		bEnableWordwrap = fmt.match(/<(?:WordWrap)>/i);
		let curCmp = $dataSkills.find(sk => sk && sk.id == this._curComponent);
		let name = curCmp.name + "<br>";
		let element = $dataSystem.elements[curCmp.damage.elementId] || "Non-Elemental";
		let damage = 0;

		let form = curCmp.damage.formula;
		let formBaseDmg = form.split(" ")[0];
		damage = Math.ceil((parseInt(formBaseDmg) * mgDmgRate));

		let elementStr = "Element: " + element + "<br>";
		let dmgStr = "Damage Added: " + damage + "<br><br><br>";

		totalText = totalText.concat(name, elementStr, dmgStr);
		text = fmt.format(name, elementStr, dmgStr);

		textState = { index: 0 };
		textState.originalText = text;
		textState.text = this.convertEscapeCharacters(text);
		let convertedTextHeight = this.calcTextHeight(textState, true);
		this._allTextHeight = (convertedTextHeight > 600 ? convertedTextHeight / 2 : convertedTextHeight);

		if (bEnableWordwrap) {
			var txtLen = (this._allTextHeight == 0 ? 300 : this._allTextHeight);
			var multi2 =  8;
			let multi3 = (txtLen >= 600 ? 4 : 10);
			var multi = Math.ceil((txtLen * multi2) / (Graphics.width - (this._width + multi3)));

			this._allTextHeight *= multi/2;
			this._allTextHeight = Math.pow(2, Math.round(Math.log(this._allTextHeight) / Math.log(2)));
		} else {
			this._allTextHeight = 2;
		}

		this.createContents();
		this.drawTextEx(text, 0, 0);
	}
}

Window_CraftInfo.prototype.catalystInfo = function(){
	let fmt = "";
	let bEnableWordwrap = true;
	let text = "";
	let finalText = "";
	let textState = "";
	let totalText = "";

	fmt = JSON.parse(catTxFmt || '');
	if (fmt && this._curCatalyst > 0){
		bEnableWordwrap = fmt.match(/<(?:WordWrap)>/i);
		let curCat = $dataItems.find(itm=> itm && itm.id == this._curCatalyst);
		let name = curCat.name + "<br>";
		let effectString = "<br>" + this.generateCatEffectList(curCat);
		if (effectString.length <= 13) { effectString = ""; }

		totalText = totalText.concat(name, effectString, '');
		text = fmt.format(name, effectString, '');

		textState = { index: 0 };
		textState.originalText = text;
		textState.text = this.convertEscapeCharacters(text);
		let convertedTextHeight = this.calcTextHeight(textState, true);
		this._allTextHeight = (convertedTextHeight > 600 ? convertedTextHeight / 2 : convertedTextHeight);

		if (bEnableWordwrap) {
			var txtLen = (this._allTextHeight == 0 ? 300 : this._allTextHeight);
			var multi2 =  8;
			let multi3 = (txtLen >= 600 ? 4 : 10);
			var multi = Math.ceil((txtLen * multi2) / (Graphics.width - (this._width + multi3)));

			this._allTextHeight *= multi/2;
			this._allTextHeight = Math.pow(2, Math.round(Math.log(this._allTextHeight) / Math.log(2)));
		} else {
			this._allTextHeight = 2;
		}

		this.createContents();
		this.drawTextEx(text, 0, 0);
	}
}

Window_CraftInfo.prototype.baseSpellInfo = function(){
	let fmt = undefined;
	let bEnableWordwrap = true;
	let text = undefined;
	let finalText = undefined;
	let textState = undefined;
	let totalText = "";

	fmt = JSON.parse(bpTxFmt || '');
	if (fmt && this._curBaseSpell > 0) {
		let currSkill = $dataSkills.find(sk => sk && sk.id == this._curBaseSpell);
		let miscSkInfo = "";
		let invSkInfo = "";
		let dmgSkInfo = "";
		let effSkInfo = "";
		let name = "";
		let desc = "";
		let effStates = undefined;
		let effBuffs = undefined;
		let effRmvBuffs = undefined;
		let effRmvDebuffs = undefined;
		let effGrowth = undefined;
		let effSpecEff = undefined;
		let effComEvts = undefined;
		let effHPRecov = undefined;
		let effMPRecov = undefined;
		let effTPRecov = undefined;

		bEnableWordwrap = fmt.match(/<(?:WordWrap)>/i);


		name = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(currSkill.name) : currSkill.name);
		let halfWndW = this._width / 2;
		this.contents.fontSize = 26;
		let nameLen = this.contents.measureTextWidth(name);
		let namePos = Math.floor(halfWndW - (nameLen/1.5));
		let header = "";

		namePos = Math.floor((name.length < 10 ? namePos - (10 + (name.length/2)) : namePos + (name.length/2)));
		name = addXShift(name, namePos);
		name = changeFontSize(name, 26);
		name = addBreak(name, 'end');
		name = addBreak(name, 'end');

		if (currSkill.description.length > 0) {
			desc = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(currSkill.description) : currSkill.description);
			desc = changeFontSize(desc, 24);
			desc = addBreak(desc, 'end');
			desc = addBreak(desc, 'end');
		}

		//Misc Skl Info Section
		let mgSchoolInfo = "Magic School: ";
		let mgSchool = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData($dataSystem.elements[currSkill.damage.elementId]) : $dataSystem.elements[currSkill.damage.elementId]);
		mgSchoolInfo += mgSchool;
		mgSchoolInfo = addXShift(mgSchoolInfo, 5);
		mgSchoolInfo = addBreak(mgSchoolInfo, 'end');

		miscSkInfo += mgSchoolInfo;

		if (currSkill.mpCost > 0) {
			let mpCostInfo = "MP Cost: ";
			let mpCost = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(String(currSkill.mpCost)) : String(currSkill.mpCost));
			mpCostInfo += mpCost;
			mpCostInfo = addXShift(mpCostInfo, 5);
			mpCostInfo = addBreak(mpCostInfo, 'break');
			miscSkInfo += mpCostInfo;

		}

		if (currSkill.tpCost > 0) {
			let tpCostInfo = "TP Cost: ";
			let tpCost = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(String(currSkill.tpCost)) : String(currSkill.tpCost));
			tpCostInfo += tpCost;
			tpCostInfo = addXShift(tpCostInfo, 5);
			tpCostInfo = addBreak(tpCostInfo, 'end');
			miscSkInfo += tpCostInfo;
		}

		if (currSkill.tpGain > 0) {
			let tpGainInfo = "TP Gain: ";
			let tpGain = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(String(currSkill.tpGain)) : String(currSkill.tpGain));
			tpGainInfo += tpGain + " TP on use";
			tpGainInfo = addXShift(tpGainInfo, 5);
			tpGainInfo = addBreak(tpGainInfo, 'break');
			miscSkInfo += tpGainInfo;
		}

		if (currSkill.scope > 0) {
			let scopeInfo = "Scope: ";
			let scope = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(scopeLst[currSkill.scope]) : scopeLst[currSkill.scope]);
			scopeInfo += scope;
			scopeInfo = addXShift(scopeInfo, 5);
			scopeInfo = addBreak(scopeInfo, 'end');
			miscSkInfo += scopeInfo;
		}

		let usableInfo = "Usable: ";
		let usable = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(occLst[currSkill.occasion]) : occLst[currSkill.occasion]);
		usableInfo += usable;
		usableInfo = addXShift(usableInfo, 5);
		usableInfo = addBreak(usableInfo, 'end');
		usableInfo = addBreak(usableInfo, 'end');
		miscSkInfo += usableInfo;

		//Invocation Section Info
		invSkInfo = "Invocation Details:";
		invSkInfo = addXShift(invSkInfo, 5);
		invSkInfo = addBreak(invSkInfo, 'end');

		if (currSkill.delay > 0) {
			let delayInfo = "Delay: ";
			let delay = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(String(currSkill.speed)) : String(currSkill.speed));
			delayInfo += delay;
			delayInfo = addXShift(delayInfo, 25);
			delayInfo = addBreak(delayInfo, 'end');
			invSkInfo += delayInfo;
		}

		if (currSkill.success > 0) {
			let useChanceInfo = "Use Chance: ";
			let useChance = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(String(currSkill.success)) : String(currSkill.success));
			useChanceInfo += useChance;
			useChanceInfo = addXShift(useChanceInfo, 25);
			useChanceInfo = addBreak(useChanceInfo, 'end');
			invSkInfo += useChanceInfo;
		}

		if (currSkill.repeats > 1) {
			let repeatInfo = "Repeats ";
			let repeat = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(String(currSkill.repeats)) : String(currSkill.repeats));
			repeatInfo += repeat + " Times";
			repeatInfo = addXShift(repeatInfo, 25);
			repeatInfo = addBreak(repeatInfo, 'end');
			invSkInfo += repeatInfo;
		}

		let evasionInfo = "Evasion Type: ";
		let evasion = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(hitTypLst[currSkill.hitType]) : hitTypLst[currSkill.hitType]);
		evasionInfo += evasion;
		evasionInfo = addXShift(evasionInfo, 25);
		evasionInfo = addBreak(evasionInfo, 'end');
		evasionInfo = addBreak(evasionInfo, 'end');
		invSkInfo += evasionInfo;


		//Damage Section Info
		if (currSkill.damage.type != 0){
			dmgSkInfo = "Damage Information:";
			dmgSkInfo = addXShift(dmgSkInfo, 5);
			dmgSkInfo = addBreak(dmgSkInfo, 'end');

			let dmgTypeInfo = "Damage Type: ";
			let dmgType = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(dmgTypLst[currSkill.damage.type]) : dmgTypLst[currSkill.damage.type]);
			dmgTypeInfo += dmgType;
			dmgTypeInfo = addXShift(dmgTypeInfo, 25);
			dmgTypeInfo = addBreak(dmgTypeInfo, 'end');
			dmgSkInfo += dmgTypeInfo;

			if (currSkill.damage.elementId > 0) {
				let dmgEleInfo = "Damage Element: ";
				let dmgEle = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData($dataSystem.elements[currSkill.damage.elementId]) : $dataSystem.elements[currSkill.damage.elementId]);
				dmgEleInfo += dmgEle;
				dmgEleInfo = addXShift(dmgEleInfo, 25);
				dmgEleInfo = addBreak(dmgEleInfo, 'end');
				dmgSkInfo += dmgEleInfo;
			}

			if (currSkill.damage.variance > 0) {
				let dmgVarInfo = "Damage Variance: ";
				let dmgVar = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(String(currSkill.damage.variance)) : String(currSkill.damage.variance));
				dmgVarInfo += dmgVar + '%';
				dmgVarInfo = addXShift(dmgVarInfo, 25);
				dmgVarInfo = addBreak(dmgVarInfo, 'end');
				dmgSkInfo += dmgVarInfo;
			}

			if (currSkill.damage.critical) {
				let canCritInfo = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData("Can Critical") : "Can Critical");
				canCritInfo = addXShift(canCritInfo, 25);
				canCritInfo = addBreak(canCritInfo, 'end');
				dmgSkInfo += canCritInfo;
			}

			dmgSkInfo = addBreak(dmgSkInfo, 'end');
		}

		if (!hasNoEffects(currSkill.effects)){
			let processedEffects = buildEffectList(currSkill.effects);
			effSkInfo = this.generateEffectStr(processedEffects, currSkill.Obfuscated);
		}


		totalText = totalText.concat(name, desc, miscSkInfo, invSkInfo, dmgSkInfo, effSkInfo, "", "");
		text = fmt.format(name, desc, miscSkInfo, invSkInfo, dmgSkInfo, effSkInfo, "", "");

		textState = { index: 0 };
		textState.originalText = text;
		textState.text = this.convertEscapeCharacters(text);
		let convertedTextHeight = this.calcTextHeight(textState, true);
		this._allTextHeight = (convertedTextHeight > 600 ? convertedTextHeight / 2 : convertedTextHeight);

		if (bEnableWordwrap) {
			var txtLen = (this._allTextHeight == 0 ? 300 : this._allTextHeight);
			var multi2 =  6;
			let multi3 = (txtLen >= 600 ? 4 : 10);
			var multi = Math.ceil((txtLen * multi2) / (Graphics.width - (this._width + multi3)));

			this._allTextHeight += this._allTextHeight * 0.25;
			let numOfBreaks = text.match(/<br>/g).length;
			this._allTextHeight += numOfBreaks * 15;
		} else {
			this._allTextHeight = 2;
		}


		this.createContents();
		this.drawTextEx(text, 0, 0);
	}

}

Window_CraftInfo.prototype.finalSpellInfo = function(){
	let fmt = undefined;
	let bEnableWordwrap = true;
	let text = undefined;
	let finalText = undefined;
	let textState = undefined;
	let totalText = "";

	fmt = JSON.parse(bpTxFmt || '');
	if (fmt && this._curBaseSpell > 0) {
		let name = "";
		let desc = "";
		let skillData = $dataSkills.find(sk => sk && sk.id == this._curBaseSpell);
		let currSkill = JSON.parse(JSON.stringify(skillData));
		let miscSkInfo = "";
		let invSkInfo = "";
		let dmgSkInfo = "";
		let effSkInfo = "";
		let effStates = undefined;
		let effBuffs = undefined;
		let effRmvBuffs = undefined;
		let effRmvDebuffs = undefined;
		let effGrowth = undefined;
		let effSpecEff = undefined;
		let effComEvts = undefined;
		let effHPRecov = undefined;
		let effMPRecov = undefined;
		let effTPRecov = undefined;

		bEnableWordwrap = fmt.match(/<(?:WordWrap)>/i);

		name = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(currSkill.name) : currSkill.name);
		let halfWndW = this._width / 2;
		this.contents.fontSize = 26;
		let nameLen = this.contents.measureTextWidth(name);
		let namePos = Math.floor(halfWndW - (nameLen/1.5));
		let header = "";

		namePos = Math.floor((name.length < 10 ? namePos - (10 + (name.length/2)) : namePos + (name.length/2)));
		name = addXShift(name, namePos);
		name = changeFontSize(name, 26);
		name = addBreak(name, 'end');
		name = addBreak(name, 'end');

		if (currSkill.description.length > 0) {
			desc = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(currSkill.description) : currSkill.description);
			desc = changeFontSize(desc, 24);
			desc = addBreak(desc, 'end');
			desc = addBreak(desc, 'end');
		}

		//Misc Skl Info Section
		let mgSchoolInfo = "Magic School: ";
		let mgSchool = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData($dataSystem.elements[currSkill.damage.elementId]) : $dataSystem.elements[currSkill.damage.elementId]);
		mgSchoolInfo += mgSchool;
		mgSchoolInfo = addXShift(mgSchoolInfo, 5);
		mgSchoolInfo = addBreak(mgSchoolInfo, 'end');

		miscSkInfo += mgSchoolInfo;

		if (currSkill.mpCost > 0) {
			let mpCostInfo = "MP Cost: ";
			let mpCost = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(String(currSkill.mpCost)) : String(currSkill.mpCost));
			mpCostInfo += mpCost;
			mpCostInfo = addXShift(mpCostInfo, 5);
			mpCostInfo = addBreak(mpCostInfo, 'break');
			miscSkInfo += mpCostInfo;

		}

		if (currSkill.tpCost > 0) {
			let tpCostInfo = "TP Cost: ";
			let tpCost = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(String(currSkill.tpCost)) : String(currSkill.tpCost));
			tpCostInfo += tpCost;
			tpCostInfo = addXShift(tpCostInfo, 5);
			tpCostInfo = addBreak(tpCostInfo, 'end');
			miscSkInfo += tpCostInfo;
		}

		if (currSkill.tpGain > 0) {
			let tpGainInfo = "TP Gain: ";
			let tpGain = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(String(currSkill.tpGain)) : String(currSkill.tpGain));
			tpGainInfo += tpGain + " TP on use";
			tpGainInfo = addXShift(tpGainInfo, 5);
			tpGainInfo = addBreak(tpGainInfo, 'break');
			miscSkInfo += tpGainInfo;
		}

		if (currSkill.scope > 0) {
			let scopeInfo = "Scope: ";
			let scope = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(scopeLst[currSkill.scope]) : scopeLst[currSkill.scope]);
			scopeInfo += scope;
			scopeInfo = addXShift(scopeInfo, 5);
			scopeInfo = addBreak(scopeInfo, 'end');
			miscSkInfo += scopeInfo;
		}

		let usableInfo = "Usable: ";
		let usable = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(occLst[currSkill.occasion]) : occLst[currSkill.occasion]);
		usableInfo += usable;
		usableInfo = addXShift(usableInfo, 5);
		usableInfo = addBreak(usableInfo, 'end');
		usableInfo = addBreak(usableInfo, 'end');
		miscSkInfo += usableInfo;

		//Invocation Section Info
		invSkInfo = "Invocation Details:";
		invSkInfo = addXShift(invSkInfo, 5);
		invSkInfo = addBreak(invSkInfo, 'end');

		if (currSkill.delay > 0) {
			let delayInfo = "Delay: ";
			let delay = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(String(currSkill.speed)) : String(currSkill.speed));
			delayInfo += delay;
			delayInfo = addXShift(delayInfo, 25);
			delayInfo = addBreak(delayInfo, 'end');
			invSkInfo += delayInfo;
		}

		if (currSkill.success > 0) {
			let useChanceInfo = "Use Chance: ";
			let useChance = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(String(currSkill.success)) : String(currSkill.success));
			useChanceInfo += useChance;
			useChanceInfo = addXShift(useChanceInfo, 25);
			useChanceInfo = addBreak(useChanceInfo, 'end');
			invSkInfo += useChanceInfo;
		}

		if (currSkill.repeats > 1) {
			let repeatInfo = "Repeats ";
			let repeat = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(String(currSkill.repeats)) : String(currSkill.repeats));
			repeatInfo += repeat + " Times";
			repeatInfo = addXShift(repeatInfo, 25);
			repeatInfo = addBreak(repeatInfo, 'end');
			invSkInfo += repeatInfo;
		}

		let evasionInfo = "Evasion Type: ";
		let evasion = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(hitTypLst[currSkill.hitType]) : hitTypLst[currSkill.hitType]);
		evasionInfo += evasion;
		evasionInfo = addXShift(evasionInfo, 25);
		evasionInfo = addBreak(evasionInfo, 'end');
		evasionInfo = addBreak(evasionInfo, 'end');
		invSkInfo += evasionInfo;


		//Damage Section Info
		if (currSkill.damage.type != 0){
			dmgSkInfo = "Damage Information:";
			dmgSkInfo = addXShift(dmgSkInfo, 5);
			dmgSkInfo = addBreak(dmgSkInfo, 'end');

			let dmgTypeInfo = "Damage Type: ";
			let dmgType = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(dmgTypLst[currSkill.damage.type]) : dmgTypLst[currSkill.damage.type]);
			dmgTypeInfo += dmgType;
			dmgTypeInfo = addXShift(dmgTypeInfo, 25);
			dmgTypeInfo = addBreak(dmgTypeInfo, 'end');
			dmgSkInfo += dmgTypeInfo;

			if (currSkill.damage.elementId > 0) {
				let dmgEleInfo = "Damage Element: ";
				let dmgEle = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData($dataSystem.elements[currSkill.damage.elementId]) : $dataSystem.elements[currSkill.damage.elementId]);
				dmgEleInfo += dmgEle;
				dmgEleInfo = addXShift(dmgEleInfo, 25);
				dmgEleInfo = addBreak(dmgEleInfo, 'end');
				dmgSkInfo += dmgEleInfo;
			}

			if (currSkill.damage.variance > 0) {
				let dmgVarInfo = "Damage Variance: ";
				let dmgVar = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData(String(currSkill.damage.variance)) : String(currSkill.damage.variance));
				dmgVarInfo += dmgVar + '%';
				dmgVarInfo = addXShift(dmgVarInfo, 25);
				dmgVarInfo = addBreak(dmgVarInfo, 'end');
				dmgSkInfo += dmgVarInfo;
			}

			if (currSkill.damage.critical) {
				let canCritInfo = (craftingDisplayMode == 1 && currSkill.Obfuscated ? obfuscateData("Can Critical") : "Can Critical");
				canCritInfo = addXShift(canCritInfo, 25);
				canCritInfo = addBreak(canCritInfo, 'end');
				dmgSkInfo += canCritInfo;
			}

			dmgSkInfo = addBreak(dmgSkInfo, 'end');
		}

		totalText = totalText.concat(name, desc, miscSkInfo, invSkInfo, dmgSkInfo, effSkInfo, "", "");
		text = fmt.format(name, desc, miscSkInfo, invSkInfo, dmgSkInfo, effSkInfo, "", "");

		textState = { index: 0 };
		textState.originalText = text;
		textState.text = this.convertEscapeCharacters(text);
		let convertedTextHeight = this.calcTextHeight(textState, true);
		this._allTextHeight = (convertedTextHeight > 600 ? convertedTextHeight / 2 : convertedTextHeight);

		if (bEnableWordwrap) {
			var txtLen = (this._allTextHeight == 0 ? 300 : this._allTextHeight);
			var multi2 =  6;
			let multi3 = (txtLen >= 600 ? 4 : 10);
			var multi = Math.ceil((txtLen * multi2) / (Graphics.width - (this._width + multi3)));

			this._allTextHeight += this._allTextHeight * 0.25;
			let numOfBreaks = text.match(/<br>/g).length;
			this._allTextHeight += numOfBreaks * 15;
		} else {
			this._allTextHeight = 2;
		}

		this.createContents();
		this.drawTextEx(text, 0, 0);
	}
}

Window_CraftInfo.prototype.generateEffectStr = function(effects, obfuscated){
	let effectStr = "Effects:";
	if (craftingDisplayMode == 1){
		effectStr = obfuscateData(effectStr);
	}

	effectStr = addXShift(effectStr, 5);
	effectStr = addBreak(effectStr, 'end');

	effStates = effects.states;
	effBuffs = effects.buffs;
	effRmvBuffs = effects.rmvbuffs;
	effRmvDebuffs = effects.rmvdebuffs;
	effGrowth = effects.growth;
	effSpecEff = effects.speceffs;
	effComEvts = effects.comevts;
	effHPRecov = effects.hpRecov;
	effMPRecov = effects.mpRecov;
	effTPRecov = effects.tpRecov;
	effLrnSkills = effects.skills;

	if (effStates.length > 0) {
		let effectStateStr = this.buildDataList("States:", effStates, 25, 35, 0, obfuscated);
		effectStr += effectStateStr;
	}

	if (effBuffs.length > 0) {
		let effectBuffStr = this.buildDataList("Buffs:", effBuffs, 25, 35, 0, obfuscated);
		effectStr += effectBuffStr;
	}

	if (effRmvBuffs.length > 0) {
		let effectRmvBuffStr = this.buildDataList("Remove Buffs:", effRmvBuffs, 25, 35, 0, obfuscated);
		effectStr += effectRmvBuffStr;
	}

	if (effRmvDebuffs.length > 0) {
		let effectRmvDebuffStr = this.buildDataList("Remove Debuffs:", effRmvDebuffs, 25, 35, 0, obfuscated);
		effectStr += effectRmvDebuffStr;
	}

	if (effSpecEff.length > 0){
		let effectSpecialStr = this.buildDataList("Special Effects:", effSpecEff, 25, 35, 0, obfuscated);
		effectStr += effectSpecialStr;
	}

	if (effGrowth.length > 0){
		let effectGrowthStr = this.buildDataList("Growth Effects:", effGrowth, 25, 35, 0, obfuscated);
		effectStr += effectGrowthStr;
	}

	if (effComEvts.length > 0 && bDebugModeEnabled){
		let effectCommonEvsStr = this.buildDataList("Common Events:", effComEvts, 25, 35, 0, obfuscated);
		effectStr += effectCommonEvsStr;
	}

	if (effHPRecov.length > 0 || effMPRecov.length > 0 || effTPRecov.length > 0) {
		let effectRecovStr = "Recovery:";
		if (craftingDisplayMode == 1 && obfuscated){
			effectRecovStr = obfuscateData(effectRecovStr);
		}

		effectRecovStr = addXShift(effectRecovStr, 25);
		effectRecovStr = addBreak(effectRecovStr, 'end');

		if (effHPRecov.length > 0){
			let effectHPRecovStr = this.buildDataList("HP:", effHPRecov, 35, 45, 0, obfuscated);
			effectRecovStr += effectHPRecovStr;
		}

		if (effMPRecov.length > 0){
			let effectMPRecovStr = this.buildDataList("MP:", effMPRecov, 35, 45, 0, obfuscated);
			effectRecovStr += effectMPRecovStr;
		}

		if (effTPRecov.length > 0){
			let effectTPRecovStr = this.buildDataList("TP:", effTPRecov, 35, 45, 0, obfuscated);
			effectRecovStr += effectTPRecovStr;
		}

		effectStr += effectRecovStr;
	}

	if (effLrnSkills.length > 0) {
		let effectSkillStr = this.buildDataList("Skills:", effLrnSkills, 25, 35, 0, obfuscated);
		effectStr += effectSkillStr;
	}

	return effectStr;
}

Window_CraftInfo.prototype.buildDataList = function(dataTitle, data, titleXShift, dataXShift, dataYShift, obfuscated){
	let builtStr = "";

	if (dataTitle.length > 0){
		if (craftingDisplayMode == 1 && obfuscated){
			dataTitle = obfuscateData(dataTitle);
		}

		dataTitle = addXShift(dataTitle, titleXShift);
		dataTitle = addBreak(dataTitle, 'end');
	}

	let dataStr = "";
	for (let i1 = 0; i1 < data.length; i1++){
		let newData = "";
		if (craftingDisplayMode == 1 && obfuscated){
			newData += obfuscateData(data[i1]);
		} else {
			newData += data[i1];
		}

		newData = addXShift(newData, dataXShift);
		/*if (dataYShift > 0){
			newData = addYShift(newData, dataYShift);
		}*/

		newData = addBreak(newData, 'end');

		dataStr += newData;
	}

	if (dataTitle.length > 0) {
		dataStr = addBreak(dataStr, 'end');
	}

	builtStr = (dataTitle.length > 0 ? dataTitle : "");
	builtStr += dataStr;
	return builtStr;
}

Window_CraftInfo.prototype.refresh = function() {
	if (this._countdown > 0) { return; }
	this.contents.clear();
	this._lastOriginY = -200;
	this.origin.y = 0;
	this._allTextHeight = 0;

	if (this._windowMode == 0) {
		this.paletteInfo();
	} else if (this._windowMode == 1) {
		this.componentInfo();
	} else if (this._windowMode == 2){
		this.catalystInfo();
	} else if (this._windowMode == 3){
		this.baseSpellInfo();
	} else if (this._windowMode == 4){
		this.finalSpellInfo();
	}
};

Window_CraftInfo.prototype.generateCatEffectList = function(catData){
	let craftEffects = catData.CraftingEffects;
	let effectString = "Effects:";
	effectString = addXShift(effectString, 5);
	effectString = addBreak(effectString, 'end');

	if (craftEffects.length > 0){
		for (let i1 = 0; i1 < craftEffects.length; i1++){
			let curEffStr = "";
			let effect = craftEffects[i1];

			switch(effect.Effect){
				case "MATK":
					curEffStr = "Attacker Magic Attack: " + String(Math.floor(effect.Value1*100)) + "%";
					break;
				case "MDEF":
					curEffStr = "Defender Magic Defense: " + String(Math.floor(effect.Value1*100)) + "%";
					break;
				case "STATE":
					let dataId = effect.ID;
					let val1 = effect.Value1;
					let val2 = effect.Value2;
					let curState = $dataStates[dataId];

					curEffStr = "\\i[" + curState.iconIndex + "] " + curState.name + "(+" + String(Math.floor(val1*100))  + "%)";
					break;
				default:
					break;
			}

			curEffStr = addXShift(curEffStr, 25);
			curEffStr = addBreak(curEffStr, 'end');
			effectString += curEffStr;
		}
	}

	effectString = addBreak(effectString, 'end');

	return effectString;
}

Window_CraftInfo.prototype.contentsHeight = function() {
  var standard = this.height - this.standardPadding() * 2;
  return Math.max(standard, this._allTextHeight);
};

Window_CraftInfo.prototype.updateCountdown = function() {
  if (this._countdown > 0) {
    this._countdown -= 1;
    if (this._countdown <= 0) this.refresh();
  }
};

Window_CraftInfo.prototype.scrollSpeed = function() {
  if (this._scrollSpeed === undefined) {
    this._scrollSpeed = 5;
  }
  return this._scrollSpeed;
};

Window_CraftInfo.prototype.scrollOriginDown = function(speed) {
  var value = this.contentsHeight() - this.height +
    this.standardPadding() * 2;
  this.origin.y = Math.min(value, this.origin.y + speed);
};

Window_CraftInfo.prototype.scrollOriginUp = function(speed) {
  this.origin.y = Math.max(0, this.origin.y - speed);
};

Window_CraftInfo.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  this.updateCountdown();
  if (this.isOpenAndActive()) this.updateKeyScrolling();
};

Window_CraftInfo.prototype.updateKeyScrolling = function() {
  if (Input.isPressed('up')) {
    this.scrollOriginUp(this.scrollSpeed());
  } else if (Input.isPressed('down')) {
    this.scrollOriginDown(this.scrollSpeed());
  } else if (Input.isPressed('pageup')) {
    this.scrollOriginUp(this.scrollSpeed() * 4);
  } else if (Input.isPressed('pagedown')) {
    this.scrollOriginDown(this.scrollSpeed() * 4);
  }
};

Window_CraftInfo.prototype.updateArrows = function() {
  if (this._lastOriginY === this.origin.y) return;
  this.showArrows();
};

Window_CraftInfo.prototype.showArrows = function() {
  this._lastOriginY = this.origin.y;
  this.upArrowVisible = this.origin.y !== 0;
  this.downArrowVisible = this.origin.y !== this.contentsHeight() -
    this.height + this.standardPadding() * 2;
};

Window_CraftInfo.prototype.hideArrows = function() {
  this.upArrowVisible = false;
  this.downArrowVisible = false;
};

Window_CraftInfo.prototype.isInsideFrame = function() {
  var x = this.canvasToLocalX(TouchInput._mouseOverX);
  var y = this.canvasToLocalY(TouchInput._mouseOverY);
  return x >= 0 && y >= 0 && x < this._width && y < this._height;
};

Window_CraftInfo.prototype.processWheel = function() {
  if (!this.isInsideFrame()) { return; }
  var threshold = 20;
  if (TouchInput.wheelY >= threshold) {
    this.scrollOriginDown(this.scrollSpeed() * 4);
  }

  if (TouchInput.wheelY <= -threshold) {
    this.scrollOriginUp(this.scrollSpeed() * 4);
  }
};


/* Window_CraftCommand Functions */
Window_CraftCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_CraftCommand.prototype.consutructor = Window_CraftCommand;
Window_CraftCommand.prototype.initialize = function(x, y, w, h){
	this._width = w;
	this._height = h;
	this._x = x;
	this._y = y;
	this._list = [];

	Window_HorzCommand.prototype.initialize.call(this, x, y);
	this.makeCommandList();
}

Window_CraftCommand.prototype.windowWidth = function() {
    return this._width;
};

Window_CraftCommand.prototype.standardFontSize = function() {
    return 28;
};

Window_CraftCommand.prototype.maxCols = function() {
    return 2;
};

Window_CraftCommand.prototype.updateHelp = function(){
	//this._helpWindow.clear();
};

Window_CraftCommand.prototype.makeCommandList = function(){
	this._list = [];

	this.addCommand('Craft','craft');
	this.addCommand('Cancel','notCraft');
}

Window_CraftCommand.prototype.select = function(index){
	this._index = index;
    this._stayCount = 0;
    this.ensureCursorVisible();
    this.updateCursor();
    this.callUpdateHelp();
}

Window_CraftCommand.prototype.processOk = function(){
	if (this._index > -1){
		let selSym = this.findIdxSymbol(this._index);

		if (selSym && selSym != 'notCraft') {
			if (selSym == 'craft') { Window_Selectable.prototype.processOk.apply(this); }
			else { Window_Selectable.prototype.processCancel.apply(this); }
		} else {
			Window_Selectable.prototype.processCancel.apply(this);
		}
	}
}

Window_CraftCommand.prototype.findIdxSymbol = function(idx){ return (idx !== -1  && idx < this._list.length ? this._list[idx].symbol : 'cancel'); }
Window_CraftCommand.prototype.getHeight = function() { return this._height; }


/* Scene_MSSkillName Functions */
Scene_MCSkillName.prototype = Object.create(Scene_Name.prototype);
Scene_MCSkillName.prototype.constructor = Scene_MCSkillName;

Scene_MCSkillName.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
		this._skill = $newSkillInstance;
		this._maxLength = 0;
};

Scene_MCSkillName.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this._maxLength = 15;
    this.createEditWindow();
    this.createInputWindow();
};

Scene_MCSkillName.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._editWindow.refresh();
};

Scene_MCSkillName.prototype.createEditWindow = function() {
    this._editWindow = new Window_MCNameEdit(this._skill, this._maxLength);
    this.addWindow(this._editWindow);
};

Scene_MCSkillName.prototype.createInputWindow = function() {
    this._inputWindow = new Window_NameInput(this._editWindow);
    this._inputWindow.setHandler('ok', this.onInputOk.bind(this));
    this.addWindow(this._inputWindow);
};

Scene_MCSkillName.prototype.onInputOk = function() {
    this._skill.name = this._editWindow.name();
	this._skill.IsRecipe = false;
	$newSkillInstance = this._skill;
	$dataSkills[$newSkillInstance.id] = $newSkillInstance;
    this.popScene();
};


/* Window_MCNameEdit Functions */
Window_MCNameEdit.prototype = Object.create(Window_NameEdit.prototype);
Window_MCNameEdit.prototype.constructor = Window_MCNameEdit;

Window_MCNameEdit.prototype.initialize = function(skill, maxLength) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = (Graphics.boxWidth - width) / 2;
    var y = (Graphics.boxHeight - (height + this.fittingHeight(9) + 8)) / 2;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._skill = skill;
    this._name = skill.name.slice(0, this._maxLength);
    this._index = this._name.length;
    this._maxLength = maxLength;
    this._defaultName = this._name;
    this.deactivate();
    this.refresh();
    //ImageManager.reserveFace(actor.faceName());
};

Window_MCNameEdit.prototype.faceWidth = function() {
    return 32;
};

Window_MCNameEdit.prototype.refresh = function() {
    this.contents.clear();
    this.drawIcon(this._skill.iconIndex, 0, 0);
    for (var i = 0; i < this._maxLength; i++) {
        this.drawUnderline(i);
    }
    for (var j = 0; j < this._name.length; j++) {
        this.drawChar(j);
    }
    var rect = this.itemRect(this._index);
    this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
};


function buildEffectList(effects){
	var tempObj = {
		"hpRecov" : [],
		"mpRecov" : [],
		"tpRecov": [],
		"states" : [],
		"parms" : [],
		"buffs" : [],
		"rmvbuffs" : [],
		"rmvdebuffs": [],
		"growth" : [],
		"skills" : [],
		"speceffs" : [],
		"comevts" : []
	};

	var hpRecov = [];
	var mpRecov = [];
	var tpRecov = [];
	var states = [];
	var parms = [];
	var buffs = [];
	var rmvbuffs = [];
	var rmvdebuffs = [];
	var growth = [];
	var skls = [];
	var speceffs = [];
	var comevts = [];

	if (effects.length > 0) {effects = orderEffects(effects); }

	for (var i1 = 0; i1 < effects.length; i1++){
		if (effects[i1].code == 11){ //Recov HP
			hpRecov.push(effects[i1]);
		} else if (effects[i1].code == 12){ //Recov MP
			mpRecov.push(effects[i1]);
		} else if (effects[i1].code == 13){ //Recov TP
			tpRecov.push(effects[i1]);
		} else if (effects[i1].code == 21){ //Add State
			states.push(effects[i1]);
		} else if (effects[i1].code == 22){ //Remove State
			states.push(effects[i1]);
		}else if (effects[i1].code == 31){ //Add Parm Buff
			buffs.push(effects[i1]);
		} else if (effects[i1].code == 32){ //Add Parm Debuff
			buffs.push(effects[i1]);
		}else if (effects[i1].code == 33){ //Remove Parm Buff
			rmvbuffs.push(effects[i1]);
		} else if (effects[i1].code == 34){ //Remove Parm Debuff
			rmvdebuffs.push(effects[i1]);
		} else if (effects[i1].code == 41){ //Spec Eff
			speceffs.push(effects[i1]);
		} else if (effects[i1].code == 42){ //Stat Growth
			growth.push(effects[i1]);
		} else if (effects[i1].code == 43){ //Learn Skill
			skls.push(effects[i1]);
		} else if (effects[i1].code == 44){ //Common Event
			comevts.push(effects[i1]);
		}
	}

	if (hpRecov.length > 0 ) { tempObj = processHpRecov(hpRecov, tempObj); }
	if (mpRecov.length > 0 ) { tempObj = processMpRecov(mpRecov, tempObj); }
	if (tpRecov.length > 0 ) { tempObj = processTpRecov(tpRecov, tempObj); }
	if (states.length > 0 ) { tempObj = processStates(states, tempObj); }
	if (buffs.length > 0 ) { tempObj = processBuffs(buffs, tempObj); }
	if (rmvbuffs.length > 0 ) { tempObj = processRmvBuffs(rmvbuffs, tempObj); }
	if (rmvdebuffs.length > 0 ) { tempObj = processRmvDebuffs(rmvdebuffs, tempObj); }
	if (speceffs.length > 0 ) { tempObj = processEffSpecEffs(speceffs, tempObj); }
	if (growth.length > 0 ) { tempObj = processGrowth(growth, tempObj); }
	if (skls.length > 0 ) { tempObj = processLrnSkils(skls, tempObj); }
	if (comevts.length > 0 ) { tempObj = processComEvts(comevts, tempObj); }

	return tempObj;
}

function processHpRecov(hpRecov, tempObj){
	for (var i1 = 0; i1 < hpRecov.length; i1++){
		var rPerc = hpRecov[i1].value1;
		var rInt = hpRecov[i1].value2;
		var recovStr = "";

		if (rPerc != 0.0){
			if(Math.sign(rPerc) == 1){
				recovStr = "\\c[11]+\\c[0] " + (rPerc * 100) + "% of Max HP";
			} else if (Math.sign(rPerc) == -1){
				recovStr = "\\c[18]-\\c[0] " + (rPerc * 100) + "% of Max HP";
			}
		}

		if (rInt != 0.0){
			if (recovStr.length > 0){
				recovStr += " and ";
			}

			if(Math.sign(rInt) == 1){
				recovStr += "\\c[11]+\\c[0] " + rInt + " HP";
			} else if (Math.sign(rInt) == -1){
				recovStr += "\\c[18]-\\c[0] " + rInt + " HP";
			}
		}

		tempObj.hpRecov.push(recovStr);
	}

	return tempObj;
}

function processMpRecov(mpRecov, tempObj){
	for (var i1 = 0; i1 < mpRecov.length; i1++){
		var rPerc = mpRecov[i1].value1;
		var rInt = mpRecov[i1].value2;
		var recovStr = "";

		if (rPerc != 0.0){
			if(Math.sign(rPerc) == 1){
				recovStr = "\\c[11]+\\c[0] " + (rPerc * 100) + "% of Max MP";
			} else if (Math.sign(rPerc) == -1){
				recovStr = "\\c[18]-\\c[0] " + (rPerc * 100) + "% of Max MP";
			}
		}

		if (rInt != 0.0){
			if (recovStr.length > 0){
				recovStr += " and ";
			}

			if(Math.sign(rInt) == 1){
				recovStr += "\\c[11]+\\c[0] " + rInt + " MP";
			} else if (Math.sign(rInt) == -1){
				recovStr += "\\c[18]-\\c[0] " + rInt + " MP";
			}
		}

		tempObj.mpRecov.push(recovStr);
	}

	return tempObj;
}

function processTpRecov(tpRecov, tempObj){
	for (var i1 = 0; i1 < tpRecov.length; i1++){
		var rPerc = tpRecov[i1].value1;
		var rInt = tpRecov[i1].value2;
		var recovStr = "";

		if (rPerc != 0.0){
			if(Math.sign(rPerc) == 1){
				recovStr = "\\c[11]+\\c[0] " + (rPerc * 100) + "% of Max TP";
			} else if (Math.sign(rPerc) == -1){
				recovStr = "\\c[18]-\\c[0] " + (rPerc * 100) + "% of Max TP";
			}
		}

		if (rInt != 0.0){
			if (recovStr.length > 0){
				recovStr += " and ";
			}

			if(Math.sign(rInt) == 1){
				recovStr += "\\c[11]+\\c[0] " + rInt + " TP";
			} else if (Math.sign(rInt) == -1){
				recovStr += "\\c[18]-\\c[0] " + rInt + " TP";
			}
		}

		tempObj.tpRecov.push(recovStr);
	}

	return tempObj;
}

function processStates(effstates, tempObj){
	for (var i1 = 0; i1 < effstates.length; i1++){
		if (effstates[i1].dataId > 0) {
			var stId = effstates[i1].dataId;
			var st = $dataStates[stId];
			var stVal = effstates[i1].value1;
			var stText = "";

			if (effstates[i1].code == 21){
				stText = "\\c[11]+\\c[0] \\i[" + st.iconIndex + "] " + st.name + " (" + (stVal * 100) + "%)";
			} else if (effstates[i1].code == 22){
				stText = "\\c[18]-\\c[0] \\i[" + st.iconIndex + "] " + st.name + " (" + (stVal * 100) + "%)";
			}

			tempObj.states.push(stText);
		}
	}

	return tempObj;
}

function processBuffs(buffs, tempObj){
	for (var i1 = 0; i1 < buffs.length; i1++){
		var parmId = buffs[i1].dataId;
		var parmName = staticTraits["21"][parmId];
		var buffVal = buffs[i1].value1;
		var buffText = "";

		if (buffs[i1].code == 31){
			buffText = "\\c[11]+\\c[0] " + parmName + " (" + buffVal + " turns)";
		} else if (buffs[i1].code == 32){
			buffText = "\\c[18]-\\c[0] " + parmName + " (" + buffVal + " turns)";
		}

		tempObj.buffs.push(buffText);
	}

	return tempObj;
}

function processRmvBuffs(rmvbuffs, tempObj){
	for (var i1 = 0; i1 < rmvbuffs.length; i1++){
		var parmId = rmvbuffs[i1].dataId;
		var parmName = staticTraits["21"][parmId];
		var rmvbuffText = "";

		rmvbuffText = "\\c[18]-\\c[0] " + parmName;

		tempObj.rmvbuffs.push(rmvbuffText);
	}

	return tempObj;
}

function processRmvDebuffs(rmvdebuffs, tempObj){
	for (var i1 = 0; i1 < rmvdebuffs.length; i1++){
		var parmId = rmvdebuffs[i1].dataId;
		var parmName = staticTraits["21"][parmId];
		var rmvdebuffText = "";

		rmvdebuffText = "\\c[11]+\\c[0] " + parmName;

		tempObj.rmvdebuffs.push(rmvdebuffText);
	}

	return tempObj;
}

function processEffSpecEffs(speceffs, tempObj){
	for (var i1 = 0; i1 < speceffs.length; i1++){
		var specEffId = speceffs[i1].dataId;
		var specEffName = specEffLst[specEffId];
		var specEffText = "";

		specEffText = "\\c[11]+\\c[0] " + specEffName;

		tempObj.speceffs.push(specEffText);
	}

	return tempObj;
}

function processGrowth(growth, tempObj){
	for (var i1 = 0; i1 < growth.length; i1++){
		var parmId = growth[i1].dataId;
		var parmName = staticTraits["21"][parmId];
		var parmIncVal = growth[i1].value1;
		var growthText = "";

		growthText = parmName + " \\c[11]+" + parmIncVal + "\\c[0]";

		tempObj.growth.push(growthText);
	}

	return tempObj;
}

function processLrnSkils(skls, tempObj){
	for (var i1 = 0; i1 < skls.length; i1++){
		var skId = skls[i1].dataId;
		var sk = $dataSkills[skId];
		var skText = "";

		skText = "\\c[11]+\\c[0] " + sk.name;

		tempObj.skills.push(skText);
	}

	return tempObj;
}

function processComEvts(comevts, tempObj){
	for (var i1 = 0; i1 < comevts.length; i1++){
		var ceId = comevts[i1].dataId;
		var ce = $dataCommonEvents[ceId];
		var comevtText = "";

		comevtText = "Calls CE: " + ce.name;

		tempObj.comevts.push(comevtText);
	}

	return tempObj;
}

function orderEffects(effects){
	for (var i1 = 0; i1 < effects.length; i1++){
		for (var i2 = 0; i2 < effects.length; i2++){
			var e1 = effects[i1];
			var e2 = effects[i2];
			var storage;

			if (e1.value > e2.value){
				storage = e1;
				effects[i1] = e2;
				effects[i2] = storage;
			}
		}
	}

	return effects;
}

function hasNoEffects(entryEffects){
	let isEmpty = true;

	if (entryEffects == undefined || entryEffects == null){
		return true;
	}

	for (var k of Object.keys(entryEffects)){
		if (Object.values(entryEffects[k]).length > 0){
			isEmpty = false;
		}
	}

	return isEmpty;
}

function processFormula(newSkillInst, componentSkills, catalystItems){
	let baseFormula = newSkillInst.damage.formula;
	let componentFormulas = [];
	let catalystEffects = [];
	let finalBaseDmg = 0;
	let formulaBaseString = "";
	let formulaMATString = "";
	let formulaMDFString = "";
	let finalFormula = "";

	for (let cmp of componentSkills){
		componentFormulas.push(cmp.damage.formula);
	}

	for (let cat of catalystItems){
		catalystEffects = catalystEffects.concat(cat.CraftingEffects);
	}

	for (let form of componentFormulas){
		let baseMatch = form.match(/(\d+)[^ ]/);
		let formBaseDmg = (baseMatch.length > 0 ? baseMatch[0] : 0);
		finalBaseDmg += Math.ceil(parseInt(formBaseDmg) * mgDmgRate);
	}

	let baseSkillDmg = 0;
	let matVal = "0";
	let mdfVal = "0";
	let formArr = baseFormula.split(" ");
	let finalFormString = "";

	for (let i1 = 0; i1 < catalystEffects.length; i1++){
		let eff = catalystEffects[i1];
		switch(eff.Effect){
			case "Base":
				finalBaseDmg += parseInt(eff.Value1);
				break;
			case "MATK":
				matVal = String(eff.Value1);
				break;
			case "MDEF":
				mdfVal = String(eff.Value1);
				break;
			default:
				break;
		}
	}

	let bMathPresent = false;
	for (let i1 = 0; i1 < formArr.length; i1++){
		let currFormPart = formArr[i1];
		currFormPart = currFormPart.toLowerCase();
		if (currFormPart.includes("basedmgmod")){
			currFormPart = currFormPart.replace("basedmgmod", String(finalBaseDmg))
		} else if (currFormPart.includes("mateffect")){
			currFormPart = currFormPart.replace("mateffect", String(matVal));
		} else if (currFormPart.includes("mdfeffect")){
			currFormPart = currFormPart.replace("mdfeffect", String(mdfVal));
		}

		finalFormString += currFormPart + " ";
	}

	return finalFormString;
}

function processNewEffects(currSkill, catalystItems){
	let stateEffects = [];
	let finalEffects = [];
	let existingEffects = currSkill.effects;

	for (let i1 = 0; i1 < catalystItems.length; i1++){
		let currItm = catalystItems[i1];
		let currEffects = currItm.CraftingEffects;
		for (let i2 = 0; i2 < currEffects.length; i2++){
			let currEffect = currEffects[i2];
			if (currEffect.Effect == "STATE"){
				stateEffects.push(currEffects[i2])
			}
		}
	}

	for (let i1 = 0; i1 < stateEffects.length; i1++){
		let curEffect = stateEffects[i1];
		let code = 21;
		let dataId = curEffect.ID;
		let value1 = curEffect.Value1;
		let value2 = curEffect.Value2;

		let existingEffect = existingEffects.find(eff => eff.code == code && eff.dataId == dataId);
		if (existingEffect){
			let eff = existingEffect;
			let val1 = math.floor(value1 + eff.value1);
			let sklEffIdx = 0;

			finalEffects.push({"code":eff.code, "dataId":eff.dataId, "value1":val1, "value2":eff.value2});

			let sklEffectIndex = currSkill.effects.findIndex(eff => eff.code == code && eff.dataId == dataId);
			currSkill.effects.splice(sklEffectIndex, 1);
		} else {
			existingEffect = finalEffects.find(eff => eff.code == code && eff.dataId == dataId);
			if (existingEffect){
				existingEffect.value1 = math.floor(existingEffect.value1 + value1);
			} else{
				finalEffects.push({"code":code, "dataId":dataId, "value1":value1, "value2":value2});
			}
		}
	}

	return finalEffects;
}

function getComponentData(cmpIds){
	let cmpData = [];

	for (let i1 = 0; i1 < cmpIds.length; i1++){
		if (cmpIds[i1] != 0){
			cmpData.push($dataSkills[cmpIds[i1]]);
		}
	}

	return cmpData;
}

function getCatalystData(catIds){
	let catData = [];

	for (let i1 = 0; i1 < catIds.length; i1++){
		if (catIds[i1] != 0){
			catData.push($dataItems[catIds[i1]]);
		}
	}

	return catData;
}

/* Utility Functions */
function obfuscateData(text){
	let obfuscatedData = '';
	for (let i1 = 0; i1 < text.length; i1++){
		if (i1 < maxObfusChars){
			obfuscatedData += obfuscationChar;
		} else {
			break;
		}
	}

	return obfuscatedData;
}

function addBreak(text, pos){
	if (pos == "start"){
		text = "<br>" + text;
	} else if (pos == "end"){
		text += "<br>";
	} else {
		text = "<br>" + text + "<br>";
	}

	return text;
}

function addXShift(text, shiftAmount){
	return "\\px[" + String(shiftAmount) +"]" + text;
}

function addYShift(text, shiftAmount){
	return "\\py[" + String(shiftAmount) +"]" + text;
}

function changeFontSize(text, fontSize){
	return "\\fs[" + String(fontSize) + "]" + text;
}

function resetFontSize(text){
	return "\\fr " + text;
}
