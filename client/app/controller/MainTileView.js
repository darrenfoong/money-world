Ext.define('moneyworld.controller.MainTileView', {
	extend: 'Ext.app.Controller',
	
	config: {
		refs: {
			mainView: 'main',
			mainTileView: 'maintileview',
		},
		control: {
			'mainTileView': {
				itemtap: 'onMainTileItemTap'
			}
		}
	},

	onMainTileItemTap: function(view, index, target, record, event) {
		var detailedView = Ext.create('moneyworld.view.DetailedView', {
					title: record.get('dataset'),
					});
		this.getMainView().push(detailedView);
	},

	//called when the Application is launched, remove if not needed
	launch: function(app) {
	}
});
