Ext.define('App.view.sprinkler.OverlapPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.overlappanel',

    title: '5 - Overlap Simulations',
    disabled: true,
    frame: true,
    layout: 'border',
    //id: 'overlappanelid',

    initComponent: function() {
        this.items = [{
            xtype: 'panel',
            itemId: 'paneloverlapinput',
            region: 'west',
            layout: 'border', 
            width: 400,
            items :[{
                xtype: 'form',
                region: 'north',
                title: 'Input parameters required by overlap simulations',
                itemId: 'formoverlapinput',
                //id: 'formoverlapid', 
                collapsible: false,          
                frame: true,
                bodyPadding: 10,
                width: 400,
                height: 100, 
                defaults: { // defaults are applied to items, not the container
                    xtype: 'numberfield',
                    allowBlank: false,
                    minValue: 1,
                    maxValue: 100,
                    step: 1,
                    allowDecimals: false,
                    labelWidth: 200,
                    width: 280                
                }, 
                items: [{
                    fieldLabel: 'Overlap distance (m)',
                    itemId: 'nf_overlapdist',
                    name: 'overlapdist',                
                }],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'right',
                    items: [{
                        text: 'Simulate',
                        action: 'simulateoverlap',
                        iconCls: 'results',
                        scale: 'large',
                        iconAlign: 'top'   
                    }]
                }]                
            },{
                xtype: 'grid',
                region: 'center',
                title: 'Overlap simulations - Rectangular arrangement',
                itemId: 'rectangulargrid',
                resizable: true,
                collapsible: false,
                height: 300,
                width: 400,
                store: 'RectangularOverlap',
                columns: [
                {   
                    xtype: 'numbercolumn',
                    readOnly: true,
                    dataIndex: 's1',
                    text: 'S sprinklers (m)',
                    width: 100,
                    format: '0.0'
                },{
                    xtype: 'numbercolumn',
                    readOnly: true,
                    dataIndex: 's2',
                    text: 'S laterals (m)',                
                    width: 100,
                    format: '0.0'
                },{
                    xtype: 'numbercolumn',
                    readOnly: true,
                    dataIndex: 'cuc',
                    text: 'CUC (%)',
                    format: '0.0',
                    flex: 1
                },{
                    xtype:'actioncolumn',
                    text: 'Remove?',
                    width:80,
                    align: 'center',
                    readOnly: false,
                    items: [{
                        icon: 'imgs/deleteB16x16.gif',
                        tooltip: 'Delete',
                        handler: function(grid, rowIndex, colIndex) {
                            var store = grid.getStore();
                            var rec = store.getAt(rowIndex);
                            store.remove(rec);                          
                        }
                    }]
                }],
                tbar: ['-',
                {
                    xtype: 'button',
                    text: 'Add value',
                    action: 'showoverlapwin',
                    iconCls: 'addvalue',
                    scale: 'small',
                    iconAlign: 'left'       
                },'-']
            },{
                xtype: 'grid',
                region: 'south',
                resizable: true,
                collapsible: true,
                title: 'Overlap simulations - Triangular arrangement (Under test)',
                itemId: 'triangulargrid',
                height: 300,
                width: 400,
                store: 'TriangularOverlap',
                columns: [
                {   
                    xtype: 'numbercolumn',
                    readOnly: true,
                    dataIndex: 's1',
                    text: 'S sprinklers (m)',
                    width: 100,
                    format: '0.0'
                },{
                    xtype: 'numbercolumn',
                    readOnly: true,
                    dataIndex: 's2',
                    text: 'S laterals (m)',                
                    width: 100,
                    format: '0.0'
                },{
                    xtype: 'numbercolumn',
                    readOnly: true,
                    dataIndex: 'cuc',
                    text: 'CUC (%)',
                    format: '0.0',
                    flex: 1
                },{
                    xtype:'actioncolumn',
                    text: 'Remove?',
                    width:80,
                    align: 'center',
                    readOnly: false,
                    items: [{
                        icon: 'imgs/deleteB16x16.gif',
                        tooltip: 'Delete',
                        handler: function(grid, rowIndex, colIndex) {
                            var store = grid.getStore();
                            var rec = store.getAt(rowIndex);
                            store.remove(rec);                          
                        }
                    }]
                }],
                tbar: ['-',
                {
                    xtype: 'button',
                    text: 'Add value',
                    action: 'showoverlapwin',
                    iconCls: 'addvalue',
                    scale: 'small',
                    iconAlign: 'left'       
                },'-']
            }]
        },{
            xtype: 'panel',
            region: 'center',
            bodyPadding: '10 10 10 10',
            id: 'surfaceplotid',
            frame: false,
            html: 'Click on one of the simulated values in the left table to draw a 3D surface.<br><div id="surfacePlotDiv" style="float: left; width: 500px; height: 500px;">',
        }];
        

        
        this.callParent(arguments);
    }
});