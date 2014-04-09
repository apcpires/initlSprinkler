Ext.define('App.view.sprinkler.PanelInputData', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.panelinputdata',
    disabled: true,
    title: '2 - Data input',
    layout: 'border',
    frame: true,
    autoScroll: false,
    
    initComponent: function() {
	    this.items = [{
	        xtype: 'grid',
	        title: 'Data input - Radial distribution test',
		    region: 'west',
		    width: 300,
		    frame: false,
		    //id: 'gridinputdataid',
		    store: 'InputData',
		    columns: [{
                xtype: 'gridcolumn',
                dataIndex: 'collector',
                text: 'Collector',
                width: 80,
                readOnly: true
            },{
                xtype: 'numbercolumn',
                dataIndex: 'radius',
                text: 'Radius (m)',
                format: '0.00',
                width: 80,
                readOnly: true
            },{
                xtype: 'numbercolumn',
                dataIndex: 'rainfall',
                text: 'i (mm/h)',
                format: '0.00',
                flex: 1,
                editor: {
                    xtype: 'numberfield',
                    minValue: 0
                }
            }],
            plugins: Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })         
	    },{
	    	xtype: 'panel',
	    	frame: true,
		    region: 'center',
		    layout: 'column',
		    items: [{
                xtype: 'panel',
                title: 'Chart of rainfall intensity along collectors',
                width: 450,
                height: 340,
                resizable: true,
                items: [{
                    xtype:'chart',
                    //id: 'chartinputid',
                    resizable: true,
                    height: 300,
                    width: 400,
                    animate: true,
                    insetPadding: 20,
                    store: 'InputData',
                    axes: [{
                        type: 'Numeric',
                        position: 'bottom',
                        title: 'Collector',
                        minimum: 0,
                        fields: ['collector']
                    },{
                        type: 'Numeric',
                        fields: ['rainfall'],
                        position: 'left',
                        title: 'i (mm/h)',
                        minimum: 0
                    }],
                    series: [{
                        type: 'line',
                        xField: 'collector',
                        yField: 'rainfall',
                        smooth: 3
                    }]
                }]
            }]
	    }];

		this.bbar = ['-',{
	        xtype: 'button',
	        text: 'Process data',
	        action: 'processinputdata',
            iconCls: 'process',
	        scale: 'large',
	        iconAlign: 'left'       
	    },'-'];

	    this.callParent(arguments);
	}

 
});