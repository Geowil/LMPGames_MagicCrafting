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
* @default "Math.floor((((baseCost / 4) + ((skLvl / 2.45) * (numComp + numCat))) * (((baseCost / 4) + (skLvl / 2.8))^^baseFactor)) / (60 * (baseFactor + (numComp + numCat))))"
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
* @param Cost Item Id
* @desc This setting is used to define the item used when crafting new skills.
* @default 0
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

var LMPGamesCore = LMPGamesCore || {};
if (Object.keys(LMPGamesCore).length == 0){
	//throw error
	console.log("LMPGames_Core plugin not present OR is not above this plugin.  Plugin will work incorrectly until this issue is resolved!");
}

function Window_MagicCraftPalette() { this.initialize.apply(this, arguments); };
function Window_MagicCraftComponentSelection() { this.initialize.apply(this, arguments); };
function Window_MagicCraftCatalystSelection() { this.initialize.apply(this, arguments); };
function Window_MagicCraftBlueprintList() { this.initialize.apply(this, arguments); };
function Window_MagicCraftInfo() { this.initialize.apply(this, arguments); };
function Window_MagicCraftCommand() { this.initialize.apply(this, arguments); };
function Window_MagicCraftCost() { this.initialize.apply(this, arguments); };
function Scene_MagicCrafting() { this.initialize.apply(this, arguments); };
function Window_MagicCraftNameEdit() { this.initialize.apply(this, arguments); };
function Scene_MagicCraftSkillName() { this.initialize.apply(this, arguments); };

LMPGamesCore.pluginParams.magicCrafting = PluginManager.parameters('LMPGames_MagicCrafting');
LMPGamesCore.pluginData.magicCrafting = {
	skillData: [],
	itemData: [],
	classData: []
};

var paletteTxFmt = LMPGamesCore.pluginParams.magicCrafting['Palette Formatting'];
var cmpTxFmt = LMPGamesCore.pluginParams.magicCrafting['Component Formatting'];
var catTxFmt = LMPGamesCore.pluginParams.magicCrafting['Catalyst Formatting'];
var bpTxFmt = LMPGamesCore.pluginParams.magicCrafting['Blueprint Formatting'];
var startId = parseInt(LMPGamesCore.pluginParams.magicCrafting['Starting Skill ID']);
var mgDmgRate = parseInt(LMPGamesCore.pluginParams.magicCrafting['Craft Magic Damage Rate'])/100;
var canUseCatColor = LMPGamesCore.pluginParams.magicCrafting['Can Use Catalyst Color'];
var cantUseCatColor = LMPGamesCore.pluginParams.magicCrafting['Cannot Use Catalyst Color'];
var craftingDisplayMode = parseInt(LMPGamesCore.pluginParams.magicCrafting['Display mode']);
var bEnableItemSystem = (LMPGamesCore.pluginParams.magicCrafting['Enable Item Cost System'] === 'true');
var bPreventRename = (LMPGamesCore.pluginParams.magicCrafting['Restrict Spell Renaming'] === 'true');
var maxObfusChars = parseInt(LMPGamesCore.pluginParams.magicCrafting['Max Number of Obfuscation Characters']);
var obfuscationChar = LMPGamesCore.pluginParams.magicCrafting['Obfuscation Character'];
var maxRefineLevel = parseInt(LMPGamesCore.pluginParams.magicCrafting['Max Refine Level']);
var bEnableCurrencyCostSystem = (LMPGamesCore.pluginParams.magicCrafting['Enable Currency Cost System'] === 'true');
var bEnableItemCostSystem = (LMPGamesCore.pluginParams.magicCrafting['Enable Item Cost System'] == 'true');
var currencyCostFormula = LMPGamesCore.pluginParams.magicCrafting['Gold Cost Formula'];
var currencyBaseCost = parseInt(LMPGamesCore.pluginParams.magicCrafting['Gold Base Cost']);
var currencyBaseFactor = parseFloat(LMPGamesCore.pluginParams.magicCrafting['Gold Base Factor']);
var itemCostFormula = LMPGamesCore.pluginParams.magicCrafting['Item Cost Formula'];
var itemBaseCost = parseInt(LMPGamesCore.pluginParams.magicCrafting['Item Base Cost']);
var itemBaseFactor = parseFloat(LMPGamesCore.pluginParams.magicCrafting['Item Base Factor']);
var costItemId = parseInt(LMPGamesCore.pluginParams.magicCrafting['Cost Item Id']);
var $newSkillInstance = {};

/* Database Manager Alias Functions */
var lmpGamesMagicCrafting_DataManager_IsDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function(){
	if (!lmpGamesMagicCrafting_DataManager_IsDatabaseLoaded.call(this)) { return false;}
	this.loadMagicCraftingNoteTags();
	return true;
};

DataManager.loadMagicCraftingNoteTags = function(){
	let magicCraftData = LMPGamesCore.pluginData.magicCrafting;
	magicCraftData.classData = this.processMagicCraftingNoteTags($dataClasses, "class");
	magicCraftData.skillData = this.processMagicCraftingNoteTags($dataSkills, "skill");
	magicCraftData.itemData = this.processMagicCraftingNoteTags($dataItems, "item");
};

DataManager.processMagicCraftingNoteTags = function(dataObj, typ){
	let returnObject = [];
	for(let obj of dataObj){
		if (obj){
			returnObject[obj.id] = {};
			if (obj.note != undefined && obj.note != ""){
				let noteData = obj.note.split(/[\r\n]+/);

				if (noteData){
					let bStartMCraftingTag = false;
					let bEndMCraftingTag = false;

					if (typ == "class"){
						returnObject[obj.id]["CanLearnMagic"] = false;
						returnObject[obj.id]["MaxCatalysts"] = 0;
						returnObject[obj.id]["MaxComponents"] = 0;
					} else if (typ == "skill"){
						returnObject[obj.id]["ClassIds"] = [];
						returnObject[obj.id]["CurrencyBaseCost"] = 0;
						returnObject[obj.id]["CurrencyBaseFactor"] = 0.0
						returnObject[obj.id]["ItemBaseCost"] = 0;
						returnObject[obj.id]["ItemBaseFactor"] = 0.0;
						returnObject[obj.id]["ComponentElements"] = [];
						returnObject[obj.id]["ValidClasses"] = [];
						returnObject[obj.id]["CanCraft"] = false;
						returnObject[obj.id]["CraftingShowName"] = false;
						returnObject[obj.id]["IsRecipe"] = false;
						returnObject[obj.id]["Obfuscated"] = (craftingDisplayMode == 1 ? true : false);
						returnObject[obj.id]["baseSkillId"] = 0;
						returnObject[obj.id]["TimesCrafted"] = 0;
						returnObject[obj.id]["GoldBaseCost"] = 0;
						returnObject[obj.id]["ItemBaseCost"] = 0;
						returnObject[obj.id]["CostItem"] = 0;
					} else if (typ == "item"){
						returnObject[obj.id]["IsCatalyst"] = false;
						returnObject[obj.id]["CraftingEffects"] = [];
						returnObject[obj.id]["CurrencyBaseCost"] = 0;
						returnObject[obj.id]["CurrencyBaseFactor"] = 0.0;
						returnObject[obj.id]["ItemBaseCost"] = 0;
						returnObject[obj.id]["ItemBaseFactor"] = 0.0;
					}

					for (let noteLine of noteData){
						switch (noteLine){
							case '<LMP_MagicCrafting>':
								bStartMCraftingTag = true;
								break;
							case '</LMP_MagicCrafting>':
								bEndMCraftingTag = true;
								break;
							default:
								if (bStartMCraftingTag){
									let noteLines = noteLine.split(":");
									if (noteLines[0] == 'MaxCatalysts') { //Classes
										returnObject[obj.id].MaxCatalysts = parseInt(noteLines[1]);
									} else if (noteLines[0] == "MaxComponents") {
										returnObject[obj.id].MaxComponents = parseInt(noteLines[1]);
									} else if (noteLines[0] == "CanLearnMagic") {
										returnObject[obj.id].CanLearnMagic = true;
									} else if (noteLines[0] == "MCCatalyst") { //Items
										returnObject[obj.id].IsCatalyst = true;
									} else if (noteLines[0] == "Effects") {
										let effectData = noteLines[1].split(";");
										for (let i1 = 0; i1 < effectData.length; i1++){
											let effect = effectData[i1].split(",");
											if (effect[0] == "STATE"){
												returnObject[obj.id].CraftingEffects.push({"Effect":effect[0], "ID":parseInt(effect[1]), "Value1":parseFloat((parseInt(effect[2])/100).toFixed(2)), "Value2":0});
											} else {
												returnObject[obj.id].CraftingEffects.push({"Effect":effect[0], "Value1":parseFloat((parseInt(effect[1])/100).toFixed(2)), "Value2":0});
											}
										}
									} else if (noteLines[0] == 'ComponentElements'){ //Skills
										let listData = noteLines[1].split(",");

										for (let i1 = 0; i1< listData.length; i1++){
											returnObject[obj.id].ComponentElements.push(parseInt(listData[i1]));
										}
									} else if (noteLines[0] == 'ValidClasses'){
										let listData = noteLines[1].split(",");

										for (let i1 = 0; i1< listData.length; i1++){
											returnObject[obj.id].ValidClasses.push(parseInt(listData[i1]));
										}
									} else if (noteLines[0] == "CanCraft"){
										returnObject[obj.id].CanCraft = true;
									} else if (noteLines[0] == "IsRecipe"){
										returnObject[obj.id].IsRecipe = true;
									} else if (noteLines[0] == "ClassIds"){
										let classIdData = noteLines[1];
										let parsedClassIdData = classIdData.split(",");

										for (let id of parsedClassIdData){
											returnObject[obj.id].ClassIds.push(parseInt(id));
										}
									} else  if (noteLines[0] == "CurrencyBaseCost"){ //Common
										returnObject[obj.id].GoldBaseCost = parseInt(noteLines[1]);
									} else if (noteLines[0] == "ItemBaseCost"){
										returnObject[obj.id].ItemBaseCost = parseInt(noteLines[1]);
									} else  if (noteLines[0] == "CurrencyBaseFactor"){
										returnObject[obj.id].GoldBaseCost = parseFloat(noteLines[1]);
									} else if (noteLines[0] == "ItemBaseFactor"){
										returnObject[obj.id].ItemBaseCost = parseFloat(noteLines[1]);
									} else if (noteLines[0] == "CostItem"){
										returnObject[obj.id].CostItem = parseInt(noteLines[1]);
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
		} else {
			returnObject[0] = {};
		}
	}

	return returnObject;
}


/* Game_Interpreter Functions */
var lmpGamesMagicCrafting_GameInterpreter_PluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
	if (command == "LMPGames.MagicCrafting") {
		let argString = "";
		for (let i1 = 0; i1 < args.length; i1++){
			argString += " " + args[i1];
		}

		command += argString;
		if (command.match(/LMPGames.MagicCrafting[ ]Open/)) {
			matches = (/LMPGames.MagicCrafting[ ]Open/.exec(command) || []);

			if (matches.length > 0) {
				SceneManager.push(Scene_MagicCrafting);
			}
		} else if (command.match(/LMPGames.MagicCrafting[ ](\d+)[ ]Craftable/)) {
			matches = (/LMPGames.MagicCrafting[ ](\d+)[ ]Craftable/.exec(command) || []);

			if (matches.length > 1) {
				this.setSkillCraftable(matches[1]);
			}
		} else if (command.match(/LMPGames.MagicCrafting[ ](\d+)[ ]Uncraftable/)) {
			matches = (/LMPGames.MagicCrafting[ ](\d+)[ ]Uncraftable/.exec(command) || []);

			if (matches.length > 1) {
				this.setSkillUncraftable(matches[1]);
			}
		}
	} else {
		lmpGamesMagicCrafting_GameInterpreter_PluginCommand.call(this, command, args);
	}
}

Game_Interpreter.prototype.setSkillCraftable = function(skillId){
	let skillPluginData = LMPGamesCore.pluginData.magicCrafting.skillData.find(sk => sk && sk.id == skillId)
	if (skillPluginData) {
		skillPluginData.CanCraft = true;
	}
}

Game_Interpreter.prototype.setSkillUncraftable = function(skillId){
	let skillPluginData = LMPGamesCore.pluginData.magicCrafting.skillData.find(sk => sk && sk.id == skillId)
	if (skillPluginData) {
		skillPluginData.CanCraft = false;
	}
}

/* Scene_MagicCrafting Functions */
Scene_MagicCrafting.prototype = Object.create(Scene_MenuBase.prototype);
Scene_MagicCrafting.prototype.constructor = Scene_MagicCrafting;

Scene_MagicCrafting.prototype.initialize = function(){
	Scene_MenuBase.prototype.initialize.call(this);
	LMPGamesCore.functions.enableWindowScrolling(true);
	this._magicCraftPaletteWnd = undefined;
	this._magicCraftCmpSelectionWnd = undefined;
	this._magicCraftCatSelectionWid = undefined;
	this._magicCraftBlueprintListWnd = undefined;
	this._magicCraftInfoWnd = undefined;
	this._magicCraftingCmdWnd = undefined;
	this._magicCraftGoldWnd = undefined;
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
	this._goldCost = 0;
	this._itemCost = {};
}

Scene_MagicCrafting.prototype.create = function(){
	Scene_MenuBase.prototype.create.call(this);
	this.createWindows();
	this._magicCraftPaletteWnd.setCraftListWindow(this._magicCraftBlueprintListWnd);
	this._magicCraftPaletteWnd.show();
	this._magicCraftPaletteWnd.activate();
	this._magicCraftPaletteWnd.select(0);
	this._magicCraftInfoWnd.show();
	this._magicCraftBlueprintListWnd.refresh();
	this._magicCraftBlueprintListWnd.show();
}

Scene_MagicCrafting.prototype.createWindows = function(){
	this.createHelpWindow();
	this.createInfoWindow();
	this.createCostWindow();
	this.createPaletteWindow();
	this.createCmpSelectionWindow();
	this.createCatSelectionWindow();
	this.createBlueprintListWindow();
	this.createCommandWindow();
}

Scene_MagicCrafting.prototype.createInfoWindow = function(){
	let x = 310;
	let y = this._helpWindow.height + 10;
	let width = Graphics.width - x;
	let height = 280;

	this._magicCraftInfoWnd = new Window_MagicCraftInfo(x, y, width, height);
	this._magicCraftInfoWnd.hide();
	this.addWindow(this._magicCraftInfoWnd);
}

Scene_MagicCrafting.prototype.createPaletteWindow = function(){
	let x = 0;
	let y = this._helpWindow.height + 10;
	let w = 300;
	let h = 210;

	this._magicCraftPaletteWnd = new Window_MagicCraftPalette(x, y, w, h, this._helpWindow);
	this._magicCraftPaletteWnd.setHandler('ok', this.paletteOkProcessing.bind(this));
	this._magicCraftPaletteWnd.setHandler('cancel', this.paletteCancelProcessing.bind(this));
	this._magicCraftPaletteWnd.hide();
	this.addWindow(this._magicCraftPaletteWnd);
}

Scene_MagicCrafting.prototype.paletteOkProcessing = function(){
	this._infoWndMode = this._magicCraftPaletteWnd.getSelectedMode();
	this._magicCurrentComponentSpell = this._magicCraftPaletteWnd.getCurrentComponent();
	this._magicCurrentCatalystItem = this._magicCraftPaletteWnd.getCurrentCatalyst();
	this._magicCraftInfoWnd.setMode(this._infoWndMode);
	this._magicCraftInfoWnd.refresh();
	this._magicCraftPaletteWnd.deselect();
	this._magicCraftPaletteWnd.deactivate();

	if (this._infoWndMode == 1){ //Component
		this._magicCraftPaletteWnd.hide();
		this._magicCraftCmpSelectionWnd.show();
		this._magicCraftCmpSelectionWnd.activate();
		this._magicCraftCmpSelectionWnd.select(0);
	} else if (this._infoWndMode == 2) { //Catalyst
		this._magicCcraftPaletteWnd.hide();
		this._magicCraftCatSelectionWnd.setSelectedCatalysts(this._selectedCatalysts);
		this._magicCraftCatSelectionWnd.show();
		this._magicCraftCatSelectionWnd.activate();
		this._magicCraftCatSelectionWnd.select(0);
	} else { //BlueprintList
		this._magicCraftBlueprintListWnd.activate();
		this._magicCraftBlueprintListWnd.select(0);
	}
}

Scene_MagicCrafting.prototype.paletteCancelProcessing = function() {
	LMPGamesCore.functions.enableWindowScrolling(false);
	SceneManager.pop();
}

Scene_MagicCrafting.prototype.createCmpSelectionWindow = function(){
	let x = 0;
	let y = this._helpWindow.height + 10;
	let width = 300;
	let height = 280;

	this._magicCraftCmpSelectionWnd = new Window_MagicCraftComponentSelection(x, y, width, height, this._magicCraftInfoWnd, this._helpWindow);
	this._magicCraftCmpSelectionWnd.setHandler('ok', this.selectedComponent.bind(this));
	this._magicCraftCmpSelectionWnd.setHandler('cancel', this.componentCancelProcessing.bind(this));
	this._magicCraftCmpSelectionWnd.hide();
	this.addWindow(this._magicCraftCmpSelectionWnd);
}

Scene_MagicCrafting.prototype.selectedComponent = function(){
	let selectedCmp = this._magicCraftCmpSelectionWnd.getSelectedComponent();
	this._selectedComponents[this._currentComponentSpell] = selectedCmp;

	this._magicCraftBlueprintListWnd.updateSelectedComponents(this._selectedComponents);
	this._magicCraftPaletteWnd.updateSelectedComponents(this._selectedComponents);
	this._magicCraftInfoWnd.setMode(0);
	this._magicCraftInfoWnd.updateSelectedComponents(this._selectedComponents);
	this._magicCraftCostWnd.updateComponents(this._selectedComponents);

	this._magicCraftCmpSelectionWnd.hide();
	this._magicCraftCmpSelectionWnd.deselect();
	this._magicCraftCmpSelectionWnd.deactivate();
	this._magicCraftPaletteWnd.show();
	this._magicCraftPaletteWnd.activate();
	this._magicCraftPaletteWnd.select(0);
	this._magicCraftPaletteWnd.resetSelect('reset');
}

Scene_MagicCrafting.prototype.componentCancelProcessing = function(){
	this._magicCraftInfoWnd.setMode(0);

	this._magicCraftCmpSelectionWnd.hide();
	this._magicCraftCmpSelectionWnd.deselect();
	this._magicCraftCmpSelectionWnd.deactivate();
	this._magicCraftPaletteWnd.show();
	this._magicCraftPaletteWnd.activate();
	this._magicCraftPaletteWnd.select(0);
	this._magicCraftPaletteWnd.resetSelect('reset');
}

Scene_MagicCrafting.prototype.createCatSelectionWindow = function(){
	let x = 0;
	let y = this._helpWindow.height + 10;
	let width = 300;
	let height = 280;

	this._magicCraftCatSelectionWnd = new Window_MagicCraftCatalystSelection(x, y, width, height, this._magicCraftInfoWnd, this._helpWindow);
	this._magicCraftCatSelectionWnd.setHandler('ok', this.selectedCatalyst.bind(this));
	this._magicCraftCatSelectionWnd.setHandler('cancel', this.catalystCancelProcessing.bind(this));
	this._magicCraftCatSelectionWnd.hide();
	this.addWindow(this._magicCraftCatSelectionWnd);
}

Scene_MagicCrafting.prototype.selectedCatalyst = function(){
	let selectedCat = this._magicCraftCatSelectionWnd.getSelectedCatalyst();
	this._selectedCatalysts[this._currentCatalystItem] = selectedCat;

	this._magicCraftInfoWnd.setMode(0);
	this._magicCraftPaletteWnd.updateSelectedCatalysts(this._selectedCatalysts);
	this._magicCraftInfoWnd.updateSelectedCatalysts(this._selectedCatalysts);
	this._magicCraftCostWnd.updateCatalysts(this._selectedCatalysts);

	this._magicCraftCatSelectionWnd.hide();
	this._magicCraftCatSelectionWnd.deselect();
	this._magicCraftCatSelectionWnd.deactivate();
	this._magicCraftPaletteWnd.show();
	this._magicCraftPaletteWnd.activate();
	this._magicCraftPaletteWnd.select(0);
	this._magicCraftPaletteWnd.resetSelect('reset');
}

Scene_MagicCrafting.prototype.catalystCancelProcessing = function(){
	this._magicCraftInfoWnd.setMode(0);
	this._magicCraftCatSelectionWnd.hide();
	this._magicCraftCatSelectionWnd.deselect();
	this._magicCraftCatSelectionWnd.deactivate();

	this._magicCraftPaletteWnd.show();
	this._magicCraftPaletteWnd.activate();
	this._magicCraftPaletteWnd.select(0);
	this._magicCraftPaletteWnd.resetSelect('reset');
}

Scene_MagicCrafting.prototype.createBlueprintListWindow = function(){
	let x = 0;
	let y = this._magicCraftPaletteWnd.getHeight() + 20 + this._helpWindow.height;
	let w = 300;
	let h = 180;

	this._magicCraftBlueprintListWnd = new Window_MagicCraftBlueprintList(x, y, w, h, this._magicCraftInfoWnd, this._selectedComponents, this._magicCraftCostWnd);
	this._magicCraftBlueprintListWnd.setHandler('ok', this.spellBlueprintSelected.bind(this));
	this._magicCraftBlueprintListWnd.setHandler('cancel', this.blueprintCancelProcessing.bind(this));
	this._magicCraftBlueprintListWnd.hide();
	this.addWindow(this._magicCraftBlueprintListWnd);
}

Scene_MagicCrafting.prototype.spellBlueprintSelected = function(){
	this._selectedBaseId = this._magicCraftBlueprintListWnd.getSelectedBaseId();
	if (bEnableCurrencyCostSystem) {
		this._goldCost = this._magicCraftCostWnd.getGoldCost();
	}

	if (bEnableItemCostSystem) {
		this._itemCost = this._magicCraftCostWnd.getItemCost();
	}

	if (craftingDisplayMode != 1) {
		this._magicCraftInfoWnd.setMode(4);
		this._magicCraftInfoWnd.setSelectedBaseSpell(this._selectedBaseId);
	} else {
		this._magicCraftInfoWnd.setSelectedBaseSpell(0);
	}

	//this._craftBlueprintListWnd.deselect();
	this._magicCraftBlueprintListWnd.deactivate();
	this._magicCraftBlueprintListWnd.hide();
	this._magicCraftCostWnd.setSelectedSpellId(this._selectedBaseId);
	if (bEnableCurrencyCostSystem || bEnableItemCostSystem) {
		this._magicCraftCostWnd.setCosts(this._goldCost, this._itemCost);
	}
	
	this._magicCraftCostWnd.show();
	this._magicCraftCmdWnd.show();
	this._magicCraftCmdWnd.activate();
	this._magicCraftCmdWnd.select(0);
}

Scene_MagicCrafting.prototype.blueprintCancelProcessing = function() {
	this._magicCraftInfoWnd.setMode(0);
	this._magicCraftBlueprintListWnd.deactivate();
	this._magicCraftBlueprintListWnd.deselect();
	this._magicCraftPaletteWnd.activate();
	this._magicCraftPaletteWnd.select(0);
}

Scene_MagicCrafting.prototype.createCostWindow = function(){
	let x = 0;
	let y = this._magicCraftPaletteWnd.getHeight() + 20 + this._helpWindow.height;
	let width = 300;
	let height = 180;

	this._magicCraftCostWnd = new Window_MagicCraftCost(x, y, width, height);
	this._magicCraftCostWnd.show();
	this.addWindow(this._magicCraftCostWnd);
}

Scene_MagicCrafting.prototype.createCommandWindow = function(){
	let x = this._magicCraftPaletteWnd.getWidth() + 10;
	let y = this._magicCraftInfoWnd.getHeight() + this._magicCraftCostWnd.getHeight() + this._helpWindow.getHeight() + 30;
	let width = this._magicCraftInfoWnd.getWidth();
	let height = 60;

	this._magicCraftCmdWnd = new Window_MagicCraftCommand(x, y, width, height);
	this._magicCraftCmdWnd.setHandler('ok', this.cmdOkProcessing.bind(this));
	this._magicCraftCmdWnd.setHandler('cancel', this.cmdCancelProcessing.bind(this));
	this._magicCraftCmdWnd.hide();
	this._magicCraftCmdWnd.deactivate();
	this.addWindow(this._magicCraftCmdWnd);
}

Scene_MagicCrafting.prototype.cmdOkProcessing = function(){
	this._magicCraftInfoWnd.setSelectedBaseSpell(this._selectedBaseId);
	this._magicCraftCmdWnd.deselect();
	this._magicCraftCmdWnd.deactivate();
	this._magicCraftInfoWnd.deactivate();
	this.unlockSpell();
}

Scene_MagicCrafting.prototype.unlockSpell = function(){
	let baseSkillData;
	let baseSkillPluginData;
	let existingSkillData;
	let existingSkillPluginData;
	let catalystItems = [];
	let catalystItemIds = Object.values(this._selectedCatalysts);

	if (this._selectedBaseId > 0) {
		if (bPreventRename){
			existingSkillPluginData = LMPGamesCore.pluginData.magicCrafting.skillData
				.find(skl => skl && skl.BaseSkillId == this._selectedBaseId);
			
			if (existingSkillPluginData) {
				existingSkillData = $dataSkills.find(skl => skl && skl.id == existingSkillPluginData.Id);
			} else {
				baseSkillData = $dataSkills[this._selectedBaseId];
				baseSkillPluginData = LMPGamesCore.pluginData.magicCrafting.skillData
					.find(skl => skl && skl.Id == this._selectedBaseId);
			}
		} else {
			baseSkillData = $dataSkills[this._selectedBaseId];
			baseSkillPluginData = LMPGamesCore.pluginData.magicCrafting.skillData
				.find(skl => skl && skl.Id == this._selectedBaseId);
		}

		if (baseSkillData && baseSkillPluginData){
			let newSkillData;
			let newSkillPluginData;
			let currentSkillData = JSON.parse(JSON.stringify(baseSkillData));
			let currentSkillPluginData = JSON.parse(JSON.stringify(baseSkillPluginData));

			newSkillData = this.createNewSkillData(currentSkillData);
			if (newSkillData) {
				newSkillPluginData = this.createNewSkillPluginData(currentSkillPluginData);
				if (newSkillPluginData) {
					this.processCraftingSkillData(newSkillData);
					this.processCraftingSkillPluginData(newSkillPluginData);

					if (bPreventRename) {
						this.updateSkillName(newSkillData, newSkillPluginData);
						let recipeSkillPluginData = LMPGamesCore.pluginData.magicCrafting.skillData
							.find(skl => skl.Id == this._selectedBaseId);

						if (recipeSkillPluginData) {
							this.updateRecipeSkill(recipeSkillPluginData);
						}
					}

					$dataSkills[newSkillData.id] = newSkillData;
					LMPGamesCore.pluginData.magicCrafting.skillData[newSkillPluginData.Id] = newSkillPluginData;

					if (bEnableMagicSchoolsSupport) {
						this.processMagicSchoolsUpdates(newSkillData, newSkillPluginData);
					}

					if (catalystItemIds.length > 0){
						catalystItems = $dataItems.filter(itm => itm && catalystItemIds.includes(itm.id));
						for (let itm of catalystItems){
							$gameParty.loseItem(itm, 1, false);
						}
					}
					resetSceneProperties

					if (!bPreventRename){
						$newSkillInstance = newSkillInst;
						SceneManager.push(Scene_MagicCraftSkillName);
					}
				}
			}
		} else if (existingSkillData && existingSkillPluginData) {
			this.processCraftingSkillData(existingSkillData);
			this.processCraftingSkillPluginData(existingSkillPluginData);
			this.updateSkillName(existingSkillData, existingSkillPluginData);
			let recipeSkillPluginData = LMPGamesCore.pluginData.magicCrafting.skillData
				.find(skl => skl.Id == this._selectedBaseId);

			if (recipeSkillPluginData) {
				this.updateRecipeSkill(recipeSkillPluginData);
			}

			if (bEnableMagicSchoolsSupport) {
				this.processMagicSchoolsUpdates(newSkillData, newSkillPluginData);
			}

			if (catalystItemIds.length > 0){
				catalystItems = $dataItems.filter(itm => itm && catalystItemIds.includes(itm.id));
				for (let itm of catalystItems){
					$gameParty.loseItem(itm, 1, false);
				}
			}
			
			this.resetSceneProperties();
		}
	}

	this._magicCraftCmdWnd.hide();
	this._magicCraftCmdWnd.deactivate();
	this._magicCraftPaletteWnd.activate();
	this._magicCraftPaletteWnd.select(0);
	this._magicCraftCostWnd.hide();
}

Scene_MagicCrafting.prototype.createNewSkillData = function(currentSkillData){
	let currentId = LMPGamesCore.pluginData.magicCrafting.skillData.at(-1);
	let newSkillData;
	if (currentId != undefined) {	
		newSkillData = JSON.parse(JSON.stringify(currentSkillData));
		newSkillData.id = currentId + 1;
	}

	return newSkillData;
}

Scene_MagicCrafting.prototype.createNewSkillPluginData = function(currentSkillPluginData){
	let currentId = LMPGamesCore.pluginData.magicCrafting.skillData.at(-1);
	let newSkillPluginData;
	if (currentId != undefined) {	
		newSkillPluginData = JSON.parse(JSON.stringify(currentSkillPluginData));
		newSkillPluginData.id = currentId + 1;
	}

	return newSkillPluginData;
}

Scene_MagicCrafting.prototype.processCraftingSkillData = function(skillData){
	componentIds = Object.values(this._selectedComponents);
	catalystIds = Object.values(this._selectedCatalysts);
	componentSkillsData = getComponentData(componentIds);
	componentSkillsPluginData = getComponentPluginData(componentIds)
	catalystItemsPluginData = getCatalystData(catalystIds);

	skillData.damage.formula = processFormula(skillData, componentSkillsData, componentSkillsPluginData, catalystItemsPluginData);
	skillData.effects = skillData.effects.concat(processNewEffects(skillData, catalystItemsPluginData));
}

Scene_MagicCrafting.prototype.processCraftingSkillPluginData = function(skillPluginData){
	let existingSkillPluginData = LMPGamesCore.pluginData.magicCrafting.skillData
		.find(skl => skl && skl.Id == skillPluginData.Id);
	if (!existingSkillPluginData) {
		LMPGamesCore.pluginData.magicCrafting.skillData[skillPluginData.Id] = skillPluginData;
	}

	LMPGamesCore.pluginData.magicCrafting.skillData[skillPluginData.Id].CraftingShowName = false;
	LMPGamesCore.pluginData.magicCrafting.skillData[skillPluginData.Id].BaseSkillId = this._selectedBaseId;	
	LMPGamesCore.pluginData.magicCrafting.skillData[skillPluginData.Id].IsRecipe = false;	
	LMPGamesCore.pluginData.magicCrafting.skillData[skillPluginData.Id].Obfuscated = false;
	LMPGamesCore.pluginData.magicCrafting.skillData[skillPluginData.Id].CanLearn = (bEnableMagicSchoolsSupport ? true : false);
	LMPGamesCore.pluginData.magicCrafting.skillData[skillPluginData.Id].CanCraft = false;
}

Scene_MagicCrafting.prototype.updateSkillName = function(skillData, skillPluginData){
	if (skillPluginData.TimesCrafted > 0){
		let skillName = skillData.name;
		skillData.name = skillName + ' +' + String(skillPluginData.TimesCrafted);
		skillPluginData.TimesCrafted = 0;
	}
}

Scene_MagicCrafting.prototype.updateRecipeSkill = function(baseSkillPluginData){
	baseSkillPluginData.TimesCrafted++;
}

Scene_MagicCrafting.prototype.processMagicSchoolsUpdates = function(newSkillData, newSkillPluginData){
	this.createMagicSchoolsSkillPluginData(newSkillPluginData);
	this.addSkillToSchool(newSkillData);
}

Scene_MagicCrafting.prototype.createMagicSchoolsSkillPluginData = function(newSkillPluginData){
	let magicSchoolsSkillPluginData = LMPGamesCore.pluginData.magicSchoolsData
		.skillData.find(skl => skl && skl.Id == newSkillPluginData.BaseSkillId);
	if (magicSchoolsSkillPluginData) {
		let newSchoolSkillPluginData = JSON.parse(JSON.stringify(magicSchoolsSkillPluginData));
		newSchoolSkillPluginData.Id = newSkillPluginData.Id;
		newSchoolSkillPluginData.CanLearn = true;
		LMPGamesCore.pluginData.magicSchoolsData.skillData[newSkillPluginData.Id] = newSchoolSkillPluginData;
	}
}

Scene_MagicCrafting.prototype.addSkillToSchool = function(newSkillData){
	let magicSchoolData = LMPGamesCore.pluginData.magicSchoolsData;
	let schools = Object.values(magicSchoolData.schools);
	let bSkillAdded = false;
	for (let i1 = 0; i1 < schools.length; i1++){
		let currSchool = schools[i1];
		let trees = Object.values(currSchool.Trees);

		for (let i2 = 0; i2 < trees.length; i2++){
			let currTree = trees[i2];
			let treeConfig = currTree.TreeConfig;
			if (treeConfig.includes(String(this._selectedBaseId))){
				if (!treeConfig.includes(newSkillData.id)){
					treeConfig.push(String(newSkillData.id));
					let priGradeConfig = Object.values(currTree.PrimaryGradeConfig);
					let secGradeConfig = Object.values(currTree.SecondaryGradeConfig);

					for (let i3 = 0; i3 < priGradeConfig.length; i3++){
						let currPriConfig = priGradeConfig[i3];
						let currSecConfig = secGradeConfig[i3];

						if (currPriConfig.Config.includes(String(this._selectedBaseId))){
							currPriConfig.Config.push(String(newSkillData.id));
							bSkillAdded = true;
						}

						if (currSecConfig.Config.includes(String(this._selectedBaseId))){
							currSecConfig.Config.push(String(newSkillData.id));
							bSkillAdded = true;
						}
					}
				}
			}

			if (bSkillAdded){
				break;
			}
		}
	}
}

Scene_MagicCrafting.prototype.resetSceneProperties = function(){
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
	this._magicCraftBlueprintListWnd.updateSelectedComponents(this._selectedComponents);
	this._magicCraftInfoWnd.updateSelectedComponents(this._selectedComponents);
	this._magicCraftInfoWnd.updateSelectedCatalysts(this._selectedCatalysts);
	this._selectedBaseId = 0;
}

Scene_MagicCrafting.prototype.cmdCancelProcessing = function(){
	this._magicCraftCmdWnd.deactivate();
	this._magicCraftCmdWnd.deselect();
	this._magicCraftCostWnd.hide();s
	this._magicCraftBlueprintListWnd.show();
	this._magicCraftBlueprintListWnd.activate();
	this._magicCraftBlueprintListWnd.select(0);

}

/* Window_MagicCraftPalette Functions */
Window_MagicCraftPalette.prototype = Object.create(Window_Selectable.prototype);
Window_MagicCraftPalette.prototype.constructor = Window_MagicCraftPalette;

Window_MagicCraftPalette.prototype.initialize = function(x, y, w, h, helpWnd){
	this._width = w;
	this._height = h;
	this._x = x;
	this._y = y;

	Window_Selectable.prototype.initialize.call(this, x, y, w, h);
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
	this._blueprintListWnd = null;
	this._helpWindow = helpWnd;

	this._actClsId = this._craftingActor._classId;
	this.getClassConfig();
	this._numOfComponents = 0;
	this._numOfCatalysts = 0;
	this._currentCmp = "";
	this._currentCat = "";
	this.refresh();
}

Window_MagicCraftPalette.prototype.getClassConfig = function(){
	let classPluginData = LMPGamesCore.pluginData.magicCrafting.classData.find(cls => cls && cls.Id == this._actClsId);
	if (classPluginData) {
		this._numOfComponents = classPluginData.MaxComponents;
		this._numOfCatalysts = classPluginData.MaxCatalysts;
	}
}

Window_MagicCraftPalette.prototype.updateSelectedComponents = function(selCmp) {
	this._selectedComponents = [];
	for (let key of Object.keys(selCmp)){
		let compSkillId = selCmp[key];
		this._selectedComponents.push(compSkillId);
	}

	this.refresh();
}

Window_MagicCraftPalette.prototype.updateSelectedCatalysts = function(selCat) {
	this._selectedCatalysts = [];
	for (let key of Object.keys(selCat)){
		let catItemId = selCat[key];
		this._selectedCatalysts.push(catItemId);
	}
}

Window_MagicCraftPalette.prototype.getHeight = function() { return this._height; }
Window_MagicCraftPalette.prototype.getWidth = function() { return this._width; }
Window_MagicCraftPalette.prototype.getSelectedMode = function() { return this._selectedMode; }
Window_MagicCraftPalette.prototype.maxItems = function() { return (this._comList ? this._comList[this._pageIndex].length : 1); }
Window_MagicCraftPalette.prototype.setCraftListWindow = function(subWnd) {
	this._blueprintListWnd = subWnd;
	this.refresh();
}

Window_MagicCraftPalette.prototype.itemHeight = function() {
	let clientHeight = this._height - this.padding * 2;
	return Math.floor(clientHeight / this.numVisibleRows());
}

Window_MagicCraftPalette.prototype.itemWidth = function() {
	return Math.floor((this._width - this.padding * 2 +
		this.spacing()) / this.maxCols() - this.spacing());
}

Window_MagicCraftPalette.prototype.getCurrentComponent = function() { return this._currentCmp; }
Window_MagicCraftPalette.prototype.getCurrentCatalyst = function() { return this._currentCat; }
Window_MagicCraftPalette.prototype.itemRect = function(index){
	let rect = new Rectangle();
	let maxCols = this.maxCols();
	rect.width = this.itemWidth();
	rect.height = this.itemHeight();
	rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
	rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
	return rect;
}

Window_MagicCraftPalette.prototype.numVisibleRows = function() { return 4; }
Window_MagicCraftPalette.prototype.setCurrentCompId = function(cmpId) { this._selectedComponents[this._currentCmp] = cmpId; }
Window_MagicCraftPalette.prototype.setCurrentCatId = function(catId) { this._selectedCatalysts[this._currentCat] = catId; }
Window_MagicCraftPalette.prototype.resetPallete = function(){
	this._selectedComponents = [];
	this._selectedCatalysts =[];
	this._currentCat = "";
	this._currentCmp = "";
	this._selectedMode = 0;
	this.refresh();
}

Window_MagicCraftPalette.prototype.drawItem = function(index){
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

Window_MagicCraftPalette.prototype.buildComList = function(){
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

Window_MagicCraftPalette.prototype.processCursorMove = function() {
	if (this.isCursorMovable()) {
		LMPGamesCore.functions.processCursorMove(this);
	}
};

Window_MagicCraftPalette.prototype.updateHelp = function(){
	this._helpWindow.clear();
	this._helpWindow.setText(this._helpTxtList[this._index]);
};

Window_MagicCraftPalette.prototype.select = function(index){
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

Window_MagicCraftPalette.prototype.processOk = function(){
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

Window_MagicCraftPalette.prototype.refresh = function(){
	let selCats = this._selectedCatalysts.filter(sc => sc != 0);
	let selCmps = this._selectedComponents.filter(sc => sc != 0)
	let craftableSkillList = [];
	if (this._blueprintListWnd != null) {
		this._blueprintListWnd.updateSelectedComponents(selCmps);
		craftableSkillList = this._blueprintListWnd.getCraftList();
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


/* Window_MagicCraftComponentSelection Functions */
Window_MagicCraftComponentSelection.prototype = Object.create(Window_Selectable.prototype);
Window_MagicCraftComponentSelection.prototype.constructor = Window_MagicCraftComponentSelection;

Window_MagicCraftComponentSelection.prototype.initialize = function(x, y, w, h, infoWnd){
	this._width = w;
	this._height = h;
	this._x = x;
	this._y = y;
	Window_Selectable.prototype.initialize.call(this, x, y, w, h);

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
	this.refresh();
}

//Getters
Window_MagicCraftComponentSelection.prototype.getWidth = function() { return this._width; }
Window_MagicCraftComponentSelection.prototype.getHeight = function() { return this._height; }
Window_MagicCraftComponentSelection.prototype.getX = function() { return this._x; }
Window_MagicCraftComponentSelection.prototype.getY = function() { return this._y; }
Window_MagicCraftComponentSelection.prototype.getSelectedComponent = function() { return this._selectedCmpId; }
Window_MagicCraftComponentSelection.prototype.maxItems = function() { return (this._comList ? this._comList[this._pageIndex].length : 1); }
Window_MagicCraftComponentSelection.prototype.numVisibleRows = function() { return 4; }
Window_MagicCraftComponentSelection.prototype.itemHeight = function() {
	let clientHeight = this._height - this.padding * 2;
	return Math.floor(clientHeight / this.numVisibleRows());
}

Window_MagicCraftComponentSelection.prototype.itemWidth = function() {
	return Math.floor((this._width - this.padding * 2 +
		this.spacing()) / this.maxCols() - this.spacing());
}

//Setters


//Doers
Window_MagicCraftComponentSelection.prototype.buildComList = function(){
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

/*Window_MagicCraftComponentSelection.prototype.getTreeSkills = function(currSchool, rtnSkills){
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
}*/

Window_MagicCraftComponentSelection.prototype.processCursorMove = function() {
	if (this.isCursorMovable()) {
		LMPGamesCore.functions.processCorsorMove(this);
	}
};

Window_MagicCraftComponentSelection.prototype.drawItem = function(index){
	let rect = this.itemRectForText(index);
	let x = rect.width/2;
	let y = rect.y + (rect.height/2) - this.lineHeight() * 0.5;
	let w = rect.width - this.textPadding();

	this.drawText(this._comList[this._pageIndex][index], rect.x, y, w , 'center');
}

Window_MagicCraftComponentSelection.prototype.select = function(index){
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

Window_MagicCraftComponentSelection.prototype.processOk = function(){
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

Window_MagicCraftComponentSelection.prototype.refresh = function(){
	if (this.contents){
		this.contents.clear();
		this.buildComList();
		this.drawAllItems();
	}
}


/* Window_MagicCraftCatalystSelection Functions */
Window_MagicCraftCatalystSelection.prototype = Object.create(Window_Selectable.prototype);
Window_MagicCraftCatalystSelection.prototype.constructor = Window_MagicCraftCatalystSelection;

Window_MagicCraftCatalystSelection.prototype.initialize = function(x, y, w, h, infoWnd, helpWnd){
	this._width = w;
	this._height = h;
	this._x = x;
	this._y = y;
	Window_Selectable.prototype.initialize.call(this, x, y, w, h);
	
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
	this.refresh();
}

//Getters
Window_MagicCraftCatalystSelection.prototype.getWidth = function() { return this._width; }
Window_MagicCraftCatalystSelection.prototype.getHeight = function() { return this._height; }
Window_MagicCraftCatalystSelection.prototype.getX = function() { return this._x; }
Window_MagicCraftCatalystSelection.prototype.getY = function() { return this._y; }
Window_MagicCraftCatalystSelection.prototype.maxItems = function() { return (this._comList ? this._comList[this._pageIndex].length : 1); }
Window_MagicCraftCatalystSelection.prototype.numVisibleRows = function() { return 4; }
Window_MagicCraftCatalystSelection.prototype.itemHeight = function() {
	let clientHeight = this._height - this.padding * 2;
	return Math.floor(clientHeight / this.numVisibleRows());
}

Window_MagicCraftCatalystSelection.prototype.itemWidth = function() {
	return Math.floor((this._width - this.padding * 2 +
		this.spacing()) / this.maxCols() - this.spacing());
}

//Setters
Window_MagicCraftCatalystSelection.prototype.getSelectedCatalyst = function() { return this._selectedCatId; }
Window_MagicCraftCatalystSelection.prototype.setSelectedCatalysts = function(selCats) {
	this._selectedCatalysts = selCats;
	this.refresh();
}

//Doers
Window_MagicCraftCatalystSelection.prototype.buildComList = function(){
	this._comList = [];
	this._catIdList = [];
	this._intComList = [];
	this._intCatIdList = [];
	this._totalItems = 0;
	let numOfSelectedCatalyts = {};
	let selectedCatIds = Object.values(this._selectedCatalysts);

	for (let itmId of selectedCatIds){
		if (numOfSelectedCatalyts.hasOwnProperty(itmId)){
			numOfSelectedCatalyts[itmId] += 1;
		} else{
			numOfSelectedCatalyts[itmId] = 1;
		}
	}

	let partyInvItems = $gameParty._items;
	let invItemData = $dataItems.filter(itm => itm && partyInvItems.hasOwnProperty(itm.id));
	let craftingItmData = [];
	for (let itm of invItemData){
		let pluginDataItem = LMPGamesCore.pluginData.magicCrafting.itemData
			.find(pdi => pdi && pdi.id == itm.id && pdi.IsCatalyst);

		if (pluginDataItem) {
			if (numOfSelectedCatalyts.hasOwnProperty(itm.id)) {
				if (numOfSelectedCatalyts[itm.id] < $gameParty.numItems(itm)) {
					craftingItmData.push(itm);
				}
			} else {
				craftingItmData.push(itm);
			}
		}
	}

	for (let itm of craftingItmData){
		let comName = "";
		comName += itm.name;

		/*if (invCraftingItems.hasOwnProperty(itm.id)){
			comName += " x" + String(invCraftingItems[itm.id]);
		}*/ //Shows num left of an item in inv.  Should this be kept?  Maybe an optional feature?

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

Window_MagicCraftCatalystSelection.prototype.processCursorMove = function() {
	if (this.isCursorMovable()) {
		LMPGamesCore.functions.processCursorMove(this);
	}
};

Window_MagicCraftCatalystSelection.prototype.drawItem = function(index){
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

Window_MagicCraftCatalystSelection.prototype.select = function(index){
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

Window_MagicCraftCatalystSelection.prototype.processOk = function(){
	if (this._index > -1 && this._index < this._comList[this._pageIndex].length){
		if (this._comList[this._pageIndex][this._index] !== "Cancel"){
			this._selectedCatId = this._catIdList[this._pageIndex][this._index];
			Window_Selectable.prototype.processOk.apply(this);
		} else {
			Window_Selectable.prototype.processCancel.apply(this);
		}
	} else {
		Window_Selectable.prototype.processCancel.apply(this);
	}
}

Window_MagicCraftCatalystSelection.prototype.refresh = function(){
	if (this.contents){
		this.contents.clear();
		this.buildComList();
		this.drawAllItems();
	}
}

Window_MagicCraftCatalystSelection.prototype.drawTextEx = function(text, x, y) {
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


/* Window_MagicCraftBlueprintList Functions*/ 
Window_MagicCraftBlueprintList.prototype = Object.create(Window_Selectable.prototype);
Window_MagicCraftBlueprintList.prototype.constructor = Window_MagicCraftBlueprintList;

Window_MagicCraftBlueprintList.prototype.initialize = function(x, y, w, h, infoWnd, selectedComponents, costWnd){
	this._width = w;
	this._height = h;
	this._x = x;
	this._y = y;
	Window_Selectable.prototype.initialize.call(this, x, y, w, h);

	this._comList = [];
	this._intComList = [];
	this._pageIndex = 0;
	this._totalIndex = 1;
	this._totalItems = 0;
	this._baseSkillIdList = [];
	this._intBaseSkillIdList = [];
	this._infoWnd = infoWnd;
	this._costWnd = costWnd;
	this._selectedComponents = selectedComponents;
	this._selectedBaseId = 0;
	this._bCanCraft = false;
	this.buildComList();
}

//Getters
Window_MagicCraftBlueprintList.prototype.getWidth = function() { return this._width; }
Window_MagicCraftBlueprintList.prototype.getHeight = function() { return this._height; }
Window_MagicCraftBlueprintList.prototype.getX = function() { return this._x; }
Window_MagicCraftBlueprintList.prototype.getY = function() { return this._y; }
Window_MagicCraftBlueprintList.prototype.getSelectedBaseId = function() { return this._selectedBaseId; }
Window_MagicCraftBlueprintList.prototype.maxItems = function() { return (this._comList ? this._comList[this._pageIndex].length : 1); }
Window_MagicCraftBlueprintList.prototype.numVisibleRows = function() { return 4; }
Window_MagicCraftBlueprintList.prototype.itemHeight = function() {
	let clientHeight = this._height - this.padding * 2;
	return Math.floor(clientHeight / this.numVisibleRows());
}

Window_MagicCraftBlueprintList.prototype.itemWidth = function() {
	return Math.floor((this._width - this.padding * 2 +
				this.spacing()) / this.maxCols() - this.spacing());
}

//Setters
Window_MagicCraftBlueprintList.prototype.updateSelectedComponents = function (selCmps){
	this._selectedComponents = selCmps;
	this._pageIndex = 0;
	this._totalItems = 0;
	this._totalIndex = 1;
	this.refresh();
}

//Doers
Window_MagicCraftBlueprintList.prototype.drawItem = function(index){
	let rect = this.itemRectForText(index);
	let x = rect.width/2;
	let y = rect.y + (rect.height/2) - this.lineHeight() * 0.5;
	let w = rect.width - this.textPadding();
	let bCanCraft = false;
	let itemCost = 0;
	let goldCost = 0;
	let currentGold = $gameParty.gold();
	let currentPrtyItems = 0;

	if (index != -1 && this._comList[this._pageIndex][index] != 'Cancel') {
		let currentSkillId = this._baseskillIdList[this._pageIndex][index];
		this._costWnd.setSelectedBaseSpellId(currentSkillId);
		if (bEnableCurrencyCostSystem) {
			goldCost = this._costWnd.getGoldCost();
		}

		if (bEnableItemCostSystem) {
			let costItemId = this._costWnd.getCostItemId();
			let itemData = $dataItems.find(itm => itm && itm.id == costItemId);
			if (itemData) {
				currentPrtyItems = $gameParty.numItems(itemData);
				itemCost = this._costWnd.getItemCost();
			} else {
				//error handling
			}
		}

		if ((!bEnableCurrencyCostSystem || (bEnableCurrencyCostSystem && goldCost <= currentGold)) &&
			(!bEnableItemCostSystem || (bEnableItemCostSystem && itemCost <= currentPrtyItems)))
		{
			bCanCraft = true;
		}
	}

	this.changePaintOpacity(bCanCraft);
	this.drawText(this._comList[this._pageIndex][index], rect.x, y, w , 'center');
}

Window_MagicCraftBlueprintList.prototype.buildComList = function(){
	this._comList = [];
	this._intComList = [];
	this._totalItems = 0;
	this._baseSkillIdList = [];
	this._intBaseSkillIdList = [];
	let pluginDataSkills = LMPGamesCore.pluginData.magicCrafting.skillData
		.filter(skl => skl && skl.CanCraft && skl.IsRecipe && (bPreventRename &&
			(maxRefineLevel == 0 || (maxRefineLevel > skl.TimesCrafted)) ? true : false));  //Shold this get overriden in NT?

	let pluginDataSkillIds = [];
	for (let skill of pluginDataSkills) {
		pluginDataSkillIds.push(skill.id);
	}

	let craftableSpells = $dataSkills.filter(skl => skl && pluginDataSkillIds.includes(skl.id));
	let displaySpells = [];
	let selectedCmpIds = Object.values(this._selectedComponents);
	let selectedElements = selectedCmpIds.filter(sk => sk)
		.reduce((obj, sk) => {
			let selectedSpellData = $dataSkills.find(skl => skl && skl.id == sk);
			if (selectedSpellData) {
				obj.push(selectedSpellData.damage.elementId);
			}
			return obj;
		}, []);

	for (let spell of craftableSpells) {
		let spellPluginData = pluginDataSkills[spell.id];
		if (spellPluginData && spellPluginData.ComponentElements &&
			spellPluginData.ComponentElements.length > 0) {
			if (this.meetsComponentRequirements(spellPluginData.ComponentElements, selectedElements)) {
				displaySpells.push(spell);
			}
		}
	}

	if (craftingDisplayMode == 1) {
		LMPGamesCore.functions.setObfuscationChar(obfuscationChar);
		LMPGamesCore.functions.setMaxObfuscationChars(maxObfusChars);
	}

	for (let spell of displaySpells) {
		let spellPluginData = pluginData.skillData[spell.id];
		let name = spell.name;
		if (!spellPluginData.CraftingShowName) {
			let newSkillName = "";
			if (craftingDisplayMode == 1) {
				newSkillName = LMPGames.functions.obfuscateText(name);
			} else {
				newSkillName = name;
			}

			name = newSkillName;
		}

		if (this._intComList.length < this.numVisibleRows()) {
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

	for (let i1 = 0; i1 < 1; i1++) {
		if (this._intComList.length < this.numVisibleRows()) {
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

	if (this._intComList.length > 0) {
		this._comList.push(this._intComList);
		this._baseSkillIdList.push(this._intBaseSkillIdList);

		this._intComList = [];
		this._intBaseSkillIdList = [];
	}
}

Window_MagicCraftBlueprintList.prototype.meetsComponentRequirements = function(requiredElements, selectedElements){
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

Window_MagicCraftBlueprintList.prototype.processCursorMove = function() {
	if (this.isCursorMovable()) {
		LMPGamesCore.functions.processCursorMove(this);
	}
};

Window_MagicCraftBlueprintList.prototype.select = function(index){
	this._index = index;
	let itemCost = 0;
	let goldCost = 0;
	let currentGold = $gameParty.gold();
	let currentPrtyItems = 0;

	if (this._comList.length > 0 && this._comList[this._pageIndex].length > 0) {
		if (index > -1 && index != this._comList[this._pageIndex].length && this._comList[this._pageIndex][index] != "Cancel") {
			this._selectedBaseId = this._baseSkillIdList[this._pageIndex][index];
			if (this._infoWnd !== undefined) {
				this._infoWnd.setSelectedBaseSpell(this._selectedBaseId);
			}

			if (this._costWnd !== undefined) {
				this._costWnd.setSelectedBaseSpellId(this._selectedBaseId);
				if (bEnableCurrencyCostSystem){
					goldCost = this._costWnd.getGoldCost();
				}

				if (bEnableItemCostSystem){
					let costItemId = this._costWnd.getCostItemId();
					let itemData = $dataItems.find(itm => itm && itm.id == costItemId);
					if (itemData){
						itemCost = this._costWnd.getItemCost();
						currentPrtyItems = $gameParty.numItems(itemData);
					}
				}

				if ((!bEnableCurrencyCostSystem || (bEnableCurrencyCostSystem && goldCost <= currentGold)) &&
					(!bEnableItemCostSystem || (bEnableItemCostSystem && itemCost <= currentPrtyItems)))
				{
					this._bCanCraft = true;
				} else {
					this._bCanCraft = false;
				}
			}
		} else {
			if (this._infoWnd !== undefined) {
				this._infoWnd.setSelectedBaseSpell(-1);
			}
		}

		this._stayCount = 0;
		this.ensureCursorVisible();
		this.updateCursor();
		this.callUpdateHelp();
	}
}

Window_MagicCraftBlueprintList.prototype.processOk = function(){
	if (this._index > -1 && this._index < this._comList[this._pageIndex].length){
		if (this._comList[this._pageIndex][this._index] !== "Cancel"){
			this._selectedBaseId = this._baseSkillIdList[this._pageIndex][this._index];
			this._infoWnd.setSelectedBaseSpell(this._selectedBaseId);
			if ((bEnableCurrencyCostSystem || bEnableItemCostSystem) && this._bCanCraft){
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

Window_MagicCraftBlueprintList.prototype.refresh = function(){
	if (this.contents){
		this.contents.clear();
		this.buildComList();
		this.drawAllItems();
	}
}

Window_MagicCraftBlueprintList.prototype.getCraftList = function() {
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


/* Window_MagicCraftInfo */
Window_MagicCraftInfo.prototype = Object.create(Window_Selectable.prototype);
Window_MagicCraftInfo.prototype.constructor = Window_MagicCraftInfo;

Window_MagicCraftInfo.prototype.initialize = function(x, y, w, h){
	this._width = w;
	this._height = h;
	this._x = x;
	this._y = y;
	Window_Selectable.prototype.initialize.call(this, x, y, w, h);

	this._windowMode = 0;
	this._selectedComponents = {};
	this._selectedCatalysts = {};
	this._curComponent = 0;
	this._curCatalyst = 0;
	this._curBaseSpellId = 0;
	this._countdown = 0;
	this._arrowBlinkTimer = 0;
	this._lineHeight = this.lineHeight();
}

//Getters
Window_MagicCraftInfo.prototype.getHeight = function() { return this._height; }
Window_MagicCraftInfo.prototype.getWidth = function() { return this._width; }

//Setters
Window_MagicCraftInfo.prototype.setMode = function(newMode) {
	this._windowMode = newMode;
	this.refresh();
}

Window_MagicCraftInfo.prototype.updateSelectedComponents = function(selCmps) {
	this._selectedComponents = selCmps;
	this.refresh();
}

Window_MagicCraftInfo.prototype.updateSelectedCatalysts = function(selCats) {
	this._selectedCatalysts = selCats;
	this.refresh();
}

Window_MagicCraftInfo.prototype.setSelectedComponent = function(selCmp) {
	this._curComponent = selCmp;
	this.refresh();
}

Window_MagicCraftInfo.prototype.setSelectedCatalyst = function(selCat) {
	this._curCatalyst = selCat;
	this.refresh();
}

Window_MagicCraftInfo.prototype.setSelectedBaseSpell = function(selBase){
	this._curBaseSpellId = selBase;
	this.refresh();
}

//Doers
Window_MagicCraftInfo.prototype.paletteInfo = function(){
	let fmt = undefined;
	let bEnableWordwrap = true;
	let text = undefined;
	let finalText = undefined;
	let textState = undefined;
	let totalText = "";
	let cmpString = "";
	let catString = "";

	fmt = JSON.parse(paletteTxFmt || '');
	if (fmt) {
		bEnableWordwrap = fmt.match(/<(?:WordWrap)>/i);
		if (Object.keys(this._selectedComponents).length > 0) {
			let componentIds = Object.values(this._selectedComponents);

			for (let componentId of componentIds) {
				if (componentId > 0) {
					let componentSkillData = $dataSkills.filter(skl => skl && skl.id == componentId);
					let componentSkillPluginData = LMPGamesCore.pluginData.magicCrafting.skillData
						.find(skl => skl && skl.Id == componentId);
					
					if (componentSkillData && componentSkillPluginData) {
						let halfWndW = this._width / 2;
						this.contents.fontSize = 26;

						let cmpTitle = "Component " + String(i1+1);
						let titleLen = this.contents.measureTextWidth(cmpTitle);
						let titlePos = Math.floor(halfWndW - (titleLen/1.5));

						titlePos = Math.floor((cmpTitle.length < 10 ? titlePos - (10 + (cmpTitle.length/2)) : titlePos + (cmpTitle.length/2)));
						cmpTitle = addXShift(cmpTitle, titlePos);
						cmpTitle = changeFontSize(cmpTitle, 26);
						cmpTitle = addBreak(cmpTitle, 'end');

						let cmpName = componentSkillData.name;
						let nameLen = this.contents.measureTextWidth(cmpName);
						let namePos = Math.floor(halfWndW - (nameLen/1.5));

						namePos = Math.floor((cmpName.length < 10 ? namePos - (10 + (cmpName.length/2)) : namePos + (cmpName.length/2)));
						cmpName = addXShift(cmpName, namePos);
						cmpName = changeFontSize(cmpName, 26);
						cmpName = addBreak(cmpName, 'end');
						cmpName = addBreak(cmpName, 'end');

						let elementIcon = staticIconLst["11"][componentSkillData.damage.elementId];
						let element = $dataSystem.elements[componentSkillData.damage.elementId] || "Non-Elemental";
						let damage = 0;

						let baseDamage = componentSkillPluginData.BaseDamage;
						damage = Math.ceil((parseInt(baseDamage) * mgDmgRate));

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

		if (Object.keys(this._selectedCatalysts).length > 0) {
			bEnableWordwrap = fmt.match(/<(?:WordWrap)>/i);
			let catalystIds = Object.values(this._selectedCatalysts);
			for (let catalystId of catalystIds) {
				if (catalystId > 0) {
					let catalystItemData = $dataItems.find(itm => itm && itm.id == catalystId);
					let catalystItemPluginData = LMPGamesCore.pluginData.magicCrafting.itemData
						.find(itm => itm && itm.Id == catalystId);

					if (catalystItemData && catalystItemPluginData) {
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
			this._allTextHeight = LMPGamesCore.functions.getCalculatedTextHeight(true, this._allTextHeight, this._width, text, false);
			this.createContents();
			this.drawTextEx(text, 0, 0);
		}
	}
}

Window_MagicCraftInfo.prototype.componentInfo = function(){
	let fmt = undefined;
	let bEnableWordwrap = true;
	let text = undefined;
	let textState = undefined;
	let totalText = "";
	let name = "";
	let elementStr = "";
	let dmgStr = "";

	fmt = JSON.parse(cmpTxFmt || '');
	if (fmt && this._curComponent > 0) {
		bEnableWordwrap = fmt.match(/<(?:WordWrap)>/i);
		let componentSpellData = $dataSkills.find(sk => sk && sk.id == this._curComponent);
		let componentSpellPluginData = LMPGamesCore.pluginData.magicCrafting.skillData
			.find(skl => skl && skl.Id == this._curComponent);
		
		if (componentSpellData && componentSpellPluginData) {
			let element = $dataSystem.elements[componentSpellData.damage.elementId] || "Non-Elemental";
			let damage = 0;
			name = componentSpellData.name + "<br>";

			let baseDmg = componentSpellPluginData.BaseDamage;
			damage = Math.ceil((parseInt(baseDmg) * mgDmgRate));

			elementStr = "Element: " + element + "<br>";
			dmgStr = "Damage Added: " + damage + "<br><br><br>";
		}

		totalText = totalText.concat(name, elementStr, dmgStr);
		text = fmt.format(name, elementStr, dmgStr);
		textState = { index: 0 };
		textState.originalText = text;
		textState.text = this.convertEscapeCharacters(text);
		let convertedTextHeight = this.calcTextHeight(textState, true);
		this._allTextHeight = (convertedTextHeight > 600 ? convertedTextHeight / 2 : convertedTextHeight);
		this._allTextHeight = LMPGamesCore.functions.getCalculatedTextHeight(true, this._allTextHeight, this._width, text, false);
		this.createContents();
		this.drawTextEx(text, 0, 0);
	}
}

Window_MagicCraftInfo.prototype.catalystInfo = function(){
	let fmt = "";
	let bEnableWordwrap = true;
	let text = "";
	let textState = "";
	let totalText = "";
	let name = "";
	let effectString = "";

	fmt = JSON.parse(catTxFmt || '');
	if (fmt && this._curCatalyst > 0){
		bEnableWordwrap = fmt.match(/<(?:WordWrap)>/i);
		let catalystItemData = $dataItems.find(itm=> itm && itm.id == this._curCatalyst);
		let catalystItemPluginData = LMPGamesCore.pluginData.magicCrafting.itemData
			.find(itm => itm && itm.Id == this._curCatalyst); 

		if (catalystItemData && catalystItemPluginData) {
			name = curCat.name + "<br>";
			effectString = "<br>" + this.generateCatEffectList(curCat);
			if (effectString.length <= 13) { effectString = ""; }
		}

		totalText = totalText.concat(name, effectString, '');
		text = fmt.format(name, effectString, '');

		textState = { index: 0 };
		textState.originalText = text;
		textState.text = this.convertEscapeCharacters(text);
		let convertedTextHeight = this.calcTextHeight(textState, true);
		this._allTextHeight = (convertedTextHeight > 600 ? convertedTextHeight / 2 : convertedTextHeight);
		this._allTextHeight = LMPGamesCore.functions.getCalculatedTextHeight(true, this._allTextHeight, this._width, text, false);
		this.createContents();
		this.drawTextEx(text, 0, 0);
	}
}

Window_MagicCraftInfo.prototype.baseSpellInfo = function(){
	let fmt = undefined;
	let bEnableWordwrap = true;
	let text = undefined;
	let textState = undefined;
	let totalText = "";

	fmt = JSON.parse(bpTxFmt || '');
	if (fmt && this._curBaseSpellId > 0) {
		let currSkill = $dataSkills.find(sk => sk && sk.id == this._curBaseSpellId);
		let miscSkInfo = "";
		let invSkInfo = "";
		let dmgSkInfo = "";
		let effSkInfo = "";
		let name = "";
		let desc = "";

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
			let processedEffects = LMPGamesCore.functions.buildEffectList(currSkill.effects);
			effSkInfo = LMPGamesCore.functions.generateEffectStr(processedEffects, currSkill.Obfuscated);
		}

		totalText = totalText.concat(name, desc, miscSkInfo, invSkInfo, dmgSkInfo, effSkInfo, "", "");
		text = fmt.format(name, desc, miscSkInfo, invSkInfo, dmgSkInfo, effSkInfo, "", "");
		textState = { index: 0 };
		textState.originalText = text;
		textState.text = this.convertEscapeCharacters(text);
		let convertedTextHeight = this.calcTextHeight(textState, true);
		this._allTextHeight = (convertedTextHeight > 600 ? convertedTextHeight / 2 : convertedTextHeight);
		this._allTextHeight = LMPGamesCore.functions.getCalculatedTextHeight(true, this._allTextHeight, this._width, text, false);
		this.createContents();
		this.drawTextEx(text, 0, 0);
	}

}

Window_MagicCraftInfo.prototype.finalSpellInfo = function(){
	let fmt = undefined;
	let bEnableWordwrap = true;
	let text = undefined;
	let textState = undefined;
	let totalText = "";

	fmt = JSON.parse(bpTxFmt || '');
	if (fmt && this._curBaseSpellId > 0) {
		let name = "";
		let desc = "";
		let skillData = $dataSkills.find(sk => sk && sk.id == this._curBaseSpellId);
		let currSkill = JSON.parse(JSON.stringify(skillData));
		let miscSkInfo = "";
		let invSkInfo = "";
		let dmgSkInfo = "";
		let effSkInfo = "";

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
		this._allTextHeight = LMPGamesCore.functions.getCalculatedTextHeight(true, this._allTextHeight, this._width, text, false);
		this.createContents();
		this.drawTextEx(text, 0, 0);
	}
}

Window_MagicCraftInfo.prototype.generateEffectStr = function(effects, obfuscated){
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

Window_MagicCraftInfo.prototype.buildDataList = function(dataTitle, data, titleXShift, dataXShift, dataYShift, obfuscated){
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

Window_MagicCraftInfo.prototype.refresh = function() {
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

Window_MagicCraftInfo.prototype.generateCatEffectList = function(catData){
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

Window_MagicCraftInfo.prototype.contentsHeight = function() {
var standard = this.height - this.standardPadding() * 2;
return Math.max(standard, this._allTextHeight);
};

Window_MagicCraftInfo.prototype.updateCountdown = function() {
if (this._countdown > 0) {
	this._countdown -= 1;
	if (this._countdown <= 0) this.refresh();
}
};

Window_MagicCraftInfo.prototype.scrollSpeed = function() {
if (this._scrollSpeed === undefined) {
	this._scrollSpeed = 5;
}
return this._scrollSpeed;
};

Window_MagicCraftInfo.prototype.scrollOriginDown = function(speed) {
var value = this.contentsHeight() - this.height +
	this.standardPadding() * 2;
this.origin.y = Math.min(value, this.origin.y + speed);
};

Window_MagicCraftInfo.prototype.scrollOriginUp = function(speed) {
this.origin.y = Math.max(0, this.origin.y - speed);
};

Window_MagicCraftInfo.prototype.update = function() {
Window_Selectable.prototype.update.call(this);
this.updateCountdown();
if (this.isOpenAndActive()) this.updateKeyScrolling();
};

Window_MagicCraftInfo.prototype.updateKeyScrolling = function() {
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

Window_MagicCraftInfo.prototype.updateArrows = function() {
if (this._lastOriginY === this.origin.y) return;
this.showArrows();
};

Window_MagicCraftInfo.prototype.showArrows = function() {
this._lastOriginY = this.origin.y;
this.upArrowVisible = this.origin.y !== 0;
this.downArrowVisible = this.origin.y !== this.contentsHeight() -
	this.height + this.standardPadding() * 2;
};

Window_MagicCraftInfo.prototype.hideArrows = function() {
this.upArrowVisible = false;
this.downArrowVisible = false;
};

Window_MagicCraftInfo.prototype.isInsideFrame = function() {
var x = this.canvasToLocalX(TouchInput._mouseOverX);
var y = this.canvasToLocalY(TouchInput._mouseOverY);
return x >= 0 && y >= 0 && x < this._width && y < this._height;
};

Window_MagicCraftInfo.prototype.processWheel = function() {
if (!this.isInsideFrame()) { return; }
var threshold = 20;
if (TouchInput.wheelY >= threshold) {
	this.scrollOriginDown(this.scrollSpeed() * 4);
}

if (TouchInput.wheelY <= -threshold) {
	this.scrollOriginUp(this.scrollSpeed() * 4);
}
};


/* Window_MagicCraftCost Functions */
Window_MagicCraftCost.prototype = Object.create(Window_Selectable.prototype);
Window_MagicCraftCost.prototype.constructor = Window_MagicCraftCost;
Window_MagicCraftCost.prototype.initialize = function(x, y, width, height){
	this._width = width;
	this._height = height;
	this._xPos = x;
	this._yPos = y;
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);

	this._selectedComponents = {};
	this._selectedCatalysts = {};
	this._allTextHeight = 0;
	this._goldCost = 0;
	this._itemCost = 0;
	this._costItemId = 0;
}

//Getters
Window_MagicCraftCost.prototype.getWidth = function() { return this._width; }
Window_MagicCraftCost.prototype.getHeight = function() { return this._height; }
Window_MagicCraftCost.prototype.getGoldCost = function() { return this._goldCost; }
Window_MagicCraftCost.prototype.getItemCost = function() { return this._itemCost; }
Window_MagicCraftCost.prototype.getCostItemId = function() { return this._costItemId; }

//Setters
Window_MagicCraftCost.prototype.updateComponents = function(selectedComponents){
	this._selectedComponents = selectedComponents;
	this.refresh();
}

Window_MagicCraftCost.prototype.updateCatalysts = function(selectedCatalysts){
	this._selectedCatalysts = selectedCatalysts;
	this.refresh();
}

Window_MagicCraftCost.prototype.setSelectedSpellId = function(skId){
	this._selectedBaseSpellId = skId;
	this.refresh();
}

//Doers
Window_MagicCraftCost.prototype.refresh = function(){
	this.contents.clear();
	this.drawCostInfo();
}

Window_MagicCraftCost.prototype.drawCostInfo = function(){
	let skLvl = 1;
	let numComp = 1;
	let numCat =  1;
	let baseCost = 1;
	let baseFactor = 1.0;
	let finalBaseCost = 0;
	let finalBaseFactor = 0.0;
	for (let key of Object.keys(this._selectedComponents)) {
		if (this._selectedComponents[key] != 0) {
			numComp++;
		}

		let skillPluginData = LMPGamesCore.pluginData.magicCrafting.skillData
			.find(sk => sk && sk.id == this._selectedComponents[key]);

		if (skillPluginData) {
			if (skillPluginData.hasOwnProperty('CurrencyBaseCost')) {
				finalBaseCost += parseInt(skillPluginData.CurrencyBaseCost);
			}

			if (skillPluginData.hasOwnProperty('CurrencyBaseFactor')) {
				finalBaseFactor += parseFloat(skillPlugData.CurrencyBaseFactor);
			}
		}
	}

	for (let key of Object.keys(this._selectedCatalysts)) {
		if (this._selectedCatalysts[key] != 0) {
			numCat++;
		}

		let itemPluginData = LMPGamesCore.pluginData.magicCrafting.itemData
			.find(sk => sk && sk.id == this._selectedCatalysts[key]);

		if (itemPluginData) {
			if (itemPluginData.hasOwnProperty('CurrencyBaseCost')) {
				finalBaseCost += parseInt(itemPluginData.CurrencyBaseCost);
			}

			if (itemPluginData.hasOwnProperty('CurrencyBaseFactor')) {
				finalBaseFactor += parseFloat(itemPluginData.CurrencyBaseFactor);
			}
		}
	}

	if (this._selectedBaseSpellId != undefined || this._selectedBaseSpellId != 0) {
		let selectedBaseSkill = $dataSkills.find(sk => sk && sk.id == this._selectedBaseSpellId);
		if (selectedBaseSkill) {
			skLvl = selectedBaseSkill.level;
		}

		let selectedBaseSkillPluginData = LMPGamesCore.pluginData.magicCrafting.skillData
			.find(sk => sk && sk.id == this._selectedBaseSpellId);
		if (selectedBaseSkillPluginData) {
			if (selectedBaseSkillPluginData.hasOwnProperty('CurrencyBaseCost')) {
				finalBaseCost += parseInt(selectedBaseSkillPluginData.CurrencyBaseCost);
			}

			if (selectedBaseSkillPluginData.hasOwnProperty('CurrencyBaseFactor')) {
				finalBaseFactor += parseFloat(selectedBaseSkillPluginData.CurrencyBaseFactor);
			}
		}
	}

	if (bEnableGoldCost) {
		this._goldCost = eval(currencyCostFormula);
	}

	if (bEnableItemCost) {
		this._itemCost = eval(itemCostFormula);
	}

	let fmt = JSON.parse(paletteTxFmt) || undefined;
	if (fmt){
		let ttl = "Cost Requirements";
		let costString = "";
		let bEnableWordwrap = fmt.match(/<(?:WordWrap)>/i);;
		let text = undefined;
		let finalText = undefined;
		let textState = undefined;
		let totalText = "";

		let halfWndW = this._width / 2;
		this.contents.fontSize = 26;
		let ttlLen = this.contents.measureTextWidth(ttl);
		let ttlPos = Math.floor(halfWndW - (ttlLen/1.5));
		let header = "";

		ttlPos = Math.floor((ttl.length < 10 ? ttlPos - (10 + (ttl.length/2)) : ttlPos + (ttl.length/2)));
		ttl = LMPGamesCore.functions.addXShift(ttl, ttlPos);
		ttl = LMPGamesCore.functions.changeFontSize(ttl, 26);
		ttl = LMPGamesCore.functions.addBreak(ttl, 'end');
		ttl = LMPGamesCore.functions.addBreak(ttl, 'end');

		let currencyCostString = "";
		if (bEnableCurrencyCostSystem){
			currencyCostString = TextManager.currencyUnit + ": " + String(goldCost);
			currencyCostString = LMPGamesCore.functions.addXShift(currencyCostString, 5);
			costString = currencyCostString;
		}

		let itemCostPos = 5;
		let itemCostString = "";
		if (bEnableItemCostSystem){
			let finalCostItemId = 0;
			if (this._selectedBaseSpellId > 0) {
				let pluginSkillData = LMPGamesCore.pluginData.magicCrafting.skillData.find(skl => skl && skl.id == this._selectedBasespellId);
				if (pluginSkillData && pluginSkillData.hasOwnProperty("CostItemId")) {
					finalCostItemId = pluginSkillData.CostItemId;
				}
			} else {
				finalCostItemId = costItemId;
			}

			this._costItemId = finalCostItemId;
			let selectedCostItemData = $dataItems.find(itm => itm && itm.id == finalCostItemId);
			if (selectedCostItemData) {
				itemCostString = "\\i[" + selectedCostItemData.iconIndex + "] " + selectedCostItemData.name + " x" + String(itemCost);
				
				if (bEnableCurrencyCostSystem) {
					this.contents.fontSize = 24;
					let textWidth = this.contents.measureTextWidth(itemCostString) + 12;
					let wndWidth = this._width;
					itemCostPos = (wndWidth - textWidth);
				}

				itemCostString = LMPGamesCore.functions.addXShift(itemCostString, itemCostPos);
				costString += itemCostString;
			}
		}

		totalText = totalText.concat(ttl, costString, "", "", "", "");
		text = fmt.format(ttl, costText, "", "", "", "");

		if (totalText.length > 0){
			textState = { index: 0 };
			textState.originalText = text;
			textState.text = this.convertEscapeCharacters(text);
			let convertedTextHeight = this.calcTextHeight(textState, true);
			this._allTextHeight = LMPGamesCore.functions.getCalculatedTextHeight(bEnableWordwrap, this._allTextHeight, this._width, text, false);
			this.createContents();
			this.drawTextEx(text, 0, 0);
		}
	}
}


/* Window_MagicCraftCommand Functions */
Window_MagicCraftCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_MagicCraftCommand.prototype.consutructor = Window_MagicCraftCommand;
Window_MagicCraftCommand.prototype.initialize = function(x, y, w, h){
	this._width = w;
	this._height = h;
	this._x = x;
	this._y = y;
	this._list = [];

	Window_HorzCommand.prototype.initialize.call(this, x, y);
	this.makeCommandList();
}

Window_MagicCraftCommand.prototype.windowWidth = function() {
	return this._width;
};

Window_MagicCraftCommand.prototype.standardFontSize = function() {
	return 28;
};

Window_MagicCraftCommand.prototype.maxCols = function() {
	return 2;
};

Window_MagicCraftCommand.prototype.updateHelp = function(){
	//this._helpWindow.clear();
};

Window_MagicCraftCommand.prototype.makeCommandList = function(){
	this._list = [];

	this.addCommand('Craft','craft');
	this.addCommand('Cancel','notCraft');
}

Window_MagicCraftCommand.prototype.select = function(index){
	this._index = index;
	this._stayCount = 0;
	this.ensureCursorVisible();
	this.updateCursor();
	this.callUpdateHelp();
}

Window_MagicCraftCommand.prototype.processOk = function(){
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

Window_MagicCraftCommand.prototype.findIdxSymbol = function(idx){ return (idx !== -1  && idx < this._list.length ? this._list[idx].symbol : 'cancel'); }
Window_MagicCraftCommand.prototype.getHeight = function() { return this._height; }


/* Scene_MagicCraftSkillName Functions */
Scene_MagicCraftSkillName.prototype = Object.create(Scene_Name.prototype);
Scene_MagicCraftSkillName.prototype.constructor = Scene_MagicCraftSkillName;

Scene_MagicCraftSkillName.prototype.initialize = function() {
	Scene_MenuBase.prototype.initialize.call(this);
		this._skill = $newSkillInstance;
		this._maxLength = 0;
};

Scene_MagicCraftSkillName.prototype.create = function() {
	Scene_MenuBase.prototype.create.call(this);
	this._maxLength = 15;
	this.createEditWindow();
	this.createInputWindow();
};

Scene_MagicCraftSkillName.prototype.start = function() {
	Scene_MenuBase.prototype.start.call(this);
	this._editWindow.refresh();
};

Scene_MagicCraftSkillName.prototype.createEditWindow = function() {
	this._editWindow = new Window_MagicCraftNameEdit(this._skill, this._maxLength);
	this.addWindow(this._editWindow);
};

Scene_MagicCraftSkillName.prototype.createInputWindow = function() {
	this._inputWindow = new Window_NameInput(this._editWindow);
	this._inputWindow.setHandler('ok', this.onInputOk.bind(this));
	this.addWindow(this._inputWindow);
};

Scene_MagicCraftSkillName.prototype.onInputOk = function() {
	this._skill.name = this._editWindow.name();
	this._skill.IsRecipe = false;
	$newSkillInstance = this._skill;
	$dataSkills[$newSkillInstance.id] = $newSkillInstance;
	this.popScene();
};


/* Window_MagicCraftNameEdit Functions */
Window_MagicCraftNameEdit.prototype = Object.create(Window_NameEdit.prototype);
Window_MagicCraftNameEdit.prototype.constructor = Window_MagicCraftNameEdit;

Window_MagicCraftNameEdit.prototype.initialize = function(skill, maxLength) {
	this._width = this.windowWidth();
	this._height = this.windowHeight();
	this._x = (Graphics.boxWidth - width) / 2;
	this._y = (Graphics.boxHeight - (height + this.fittingHeight(9) + 8)) / 2;
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

Window_MagicCraftNameEdit.prototype.faceWidth = function() {
	return 32;
};

Window_MagicCraftNameEdit.prototype.refresh = function() {
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


/* Utility Functions */
function processFormula(newSkillData, componentSkillsData, componentSkillsPluginData, catalystItemsPluginData){
	let baseFormula = newSkillData.damage.formula;
	let componentFormulas = [];
	let componentSpellBaseDmgList = [];
	let catalystEffects = [];
	let finalBaseDmg = 0;
	for (let cmp of componentSkillsData) {
		componentFormulas.push(cmp.damage.formula);
		let componentPluginData = componentSkillsPluginData.find(skl => skl && skl.Id == cmp.id);
		if (componentPluginData) {
			componentSpellBaseDmgList.push(componentPluginData.BaseDamage);
		} else {
			componentSpellBaseDmgList.push("0");
		}
	}

	for (let cat of catalystItemsPluginData) {
		catalystEffects = catalystEffects.concat(cat.CraftingEffects);
	}

	for (let i1 = 0; i1 < componentFormulas.length; i1++) {
		let formBaseDmg = componentSpellBaseDmgList[i1];
		finalBaseDmg += Math.ceil(parseInt(formBaseDmg) * mgDmgRate);
	}

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
				matVal += String(eff.Value1);
				break;
			case "MDEF":
				mdfVal += String(eff.Value1);
				break;
			default:
				break;
		}
	}

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

function processNewEffects(newSkillData, catalystItemsPluginData){
	let currEffects = [];
	for (let catalyst of catalystItemsPluginData){
		currEffects = currEffects.concat(catalyst.CraftingEffects);
	}

	let stateEffects = [];
	for (let effect of currEffects){
		if (effect.Effect == "STATE"){
			stateEffects.push(effect)
		}
	}
	
	let existingEffects = newSkillData.effects;
	let finalEffects = [];
	for (let stateEffect of stateEffects){
		let code = 21;
		let dataId = stateEffect.ID;
		let value1 = stateEffect.Value1;
		let value2 = stateEffect.Value2;

		let existingEffect = existingEffects.find(eff => eff.code == code && eff.dataId == dataId);
		if (existingEffect){
			let val1 = math.floor(value1 + existingEffect.value1);
			finalEffects.push({"code":eff.code, "dataId":eff.dataId, "value1":val1, "value2":eff.value2});

			let sklEffectIndex = newSkillData.effects.findIndex(eff => eff.code == code && eff.dataId == dataId);
			newSkillData.effects.splice(sklEffectIndex, 1);
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

function getComponentData(componentIds){
	return $dataSkills.filter(skl => skl && componentIds.includes(skl.id));
}

function getComponentPluginData(componentIds){
	return LMPGamesCore.pluginData.magicCrafting.skillData
		.filter(skl => skl && componentIds.includes(skl.Id))
}

function getCatalystPluginData(catalystIds){
	return LMPGamesCore.pluginData.magicCrafting.itemData
		.filter(itm => itm && catalystIds.includes(itm.Id));
}
