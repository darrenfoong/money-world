Ext.define('moneyworld.view.ComparisonView', {
	extend: 'Ext.tab.Panel',
	xtype: 'comparisonview',
	requires: [
	],
	config: {
		tabBarPosition: 'top',

		items: [
			{
				title: 'Visualisation',

				styleHtmlContent: true,
				scrollable: true,

				html: [
					"Visualisation here"
				].join("")
			},
			{
				title: 'Comments',

				styleHtmlContent: true,
				scrollable: true,

				html: [
					"Comments here"
				].join("")
			}
		]
	}
});
