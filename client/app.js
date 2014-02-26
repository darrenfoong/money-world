/*
	This file is generated and updated by Sencha Cmd. You can edit this file as
	needed for your application, but these edits will have to be merged by
	Sencha Cmd when it performs code generation tasks such as generating new
	models, controllers or views and when running "sencha app upgrade".

	Ideally changes to this file would be limited and most work would be done
	in other places (such as Controllers). If Sencha Cmd cannot merge your
	changes and its generated code, it will produce a "merge conflict" that you
	will need to resolve manually.
*/

Ext.application({
	name: 'moneyworld',

	requires: [
		'Ext.MessageBox',
		'moneyworld.utils.Functions'
	],

	models: [
		'Setting',
		'Country',
		'DataSet',
		'DataPoint'
	],

	/*
	[http://docs.sencha.com/touch/2.3.1/#!/guide/mvc_dependencies-section-where-each-dependency-belongs]
	SummaryView views are declared in Overview
	DetailedView views are declared in Main
	Unfortunately, controllers cannot be loaded dynamically and have to be all declared here
	*/

	views: [
		'Init',
		'Main',
	],

	controllers: [
		'Init',
		'Main',
		'Overview',
		'DetailedView',
		'DetailedViewInflation',
		'DetailedViewUnemp',
		'DetailedViewGini',
		'DetailedViewMortality',
		'DetailedViewInflation',
		'DetailedViewLifeExpectancy',
		'MapView',
		'InfoView',
		'Settings',
		'SummaryView',
		'SummaryViewInflation',
		'SummaryViewUnemp',
		'SummaryViewGini',
		'SummaryViewGdp',
		'SummaryViewMortality',
		'SummaryViewInflation',
		'SummaryViewLifeExpectancy',
	],

	stores: [
		'Settings',
		'Countries',
		'DataSets',
		'BarLabel'
	],

	icon: {
		'57': 'resources/icons/Icon.png',
		'72': 'resources/icons/Icon~ipad.png',
		'114': 'resources/icons/Icon@2x.png',
		'144': 'resources/icons/Icon~ipad@2x.png'
	},

	isIconPrecomposed: true,

	startupImage: {
		'320x460': 'resources/startup/320x460.jpg',
		'640x920': 'resources/startup/640x920.png',
		'768x1004': 'resources/startup/768x1004.png',
		'748x1024': 'resources/startup/748x1024.png',
		'1536x2008': 'resources/startup/1536x2008.png',
		'1496x2048': 'resources/startup/1496x2048.png'
	},

	launch: function() {
		Ext.fly('appLoadingIndicator').destroy();
		Ext.Viewport.add(Ext.create('moneyworld.view.Init'));
	},

	onUpdated: function() {
		Ext.Msg.confirm(
			"Application Update",
			"This application has just successfully been updated to the latest version. Reload now?",
			function(buttonId) {
				if (buttonId === 'yes') {
					window.location.reload();
				}
			}
		);
	}
});
