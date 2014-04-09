Ext.define('App.view.sprinkler.ExportToCsvWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.exporttocsvwin',

    title: 'Export to CSV file',
    height: 200,
    width: 400,
    layout: 'fit',
    bodyPadding: 10,
    //id: 'exporttocsvwinid',
   
    initComponent: function() {        
        var separatorOptions =  Ext.create('Ext.data.Store', {
            fields: ['value'],
            data : [
                {"value":"."},
                {"value":","}
            ]
        });

        this.items = [{  
            xtype: 'form',
            //id: 'formexportcsvid',
            bodyPadding: 10,
            frame: true,
            items: [{         
                xtype: 'textfield',
                itemId: 'tf_csvfilename',
                fieldLabel: 'Filename',
                labelWidth: 100,
                msgTarget: 'side',
                allowBlank: false,
                width: 300,
                vtype: 'alphanum',
                maxLength: 20
            },{
                xtype: 'combo',
                itemId: 'cb_decseparator',
                labelWidth: 200,
                fieldLabel: 'Choose decimal separator',
                store: separatorOptions,
                queryMode: 'local',
                displayField: 'value',
                valueField: 'value',
                width: 300,
                autoSelect: true,
                editable: false,
                allowBlank: false
            }]            
        }];
        this.bbar = ['-',
            {
                xtype: 'button',
                text: 'Export',
                //id: 'bt_exportconfirm',
                action: 'submit',
                iconCls: 'excelmini',          
                iconAlign: 'left'                      
            },'-',{
                xtype: 'button',
                text: 'Cancel',
                //id: 'bt_exportcancel',
                action: 'cancel',
                iconCls: 'cancel',          
                iconAlign: 'left'

            },'-'
        ];

        this.callParent(arguments);
    }

});