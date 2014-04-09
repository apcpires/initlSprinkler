Ext.define('App.view.sprinkler.GridResults', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridresults',
    
    title: '3 - Spreadsheet of results',
    disabled: true,
    //id: 'gridresultsid',

    initComponent: function() {

        this.store = 'GridResults';

        this.columns = [
            {
                dataIndex: 'collector',
                text: 'Collector',
                width: 100
            },{
                xtype: 'numbercolumn',
                dataIndex: 'radius',
                text: 'Radius (m)',
                format: '0.00',
                width: 100
            },{
                xtype: 'numbercolumn',
                dataIndex: 'rainfall',
                text: 'i (mm/h)',
                format: '0.00',
                width: 100
            },{
                xtype: 'numbercolumn',
                dataIndex: 'vApplied',
                text: 'Vapplied (L)',
                format: '0.00',
                width: 100
            },{
                xtype: 'numbercolumn',
                dataIndex: 'vTheoretical',
                text: 'Vtheoretical (L)',
                format: '0.00',
                width: 100
            },{
                xtype: 'numbercolumn',
                dataIndex: 'vCumul',
                text: 'Vcumulated (L)',
                format: '0.00',
                width: 100
            },{
                xtype: 'numbercolumn',
                dataIndex: 'txVcumVtot',
                text: 'Vcumulated/Vtotal',
                format: '0.000',
                flex: 1
            }
        ];

        this.bbar = ['-',
            {
                xtype: 'button',
                text: 'Export Spreadsheet',
                //id: 'bt_exportresults',
                action: 'export',
                iconCls: 'excel',
                scale: 'large',
                iconAlign: 'left'       
            },'-'
        ];

        this.callParent(arguments);
    }
});
