Ext.define('App.view.sprinkler.AddOverlapWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.addoverlapwin',

    title: 'Simulate another arrangement of sprinklers',
    height: 200,
    width: 500,
    layout: 'fit',
    bodyPadding: 10,
   
    initComponent: function() {        
        
        this.items = [{  
            xtype: 'form',
            bodyPadding: 10,
            frame: true,
            defaults: {
                xtype: 'numberfield', 
                labelWidth: 200,
                msgTarget: 'side',
                allowBlank: false,
                width: 300,
                step: 0.5,    
                minValue : 1,            
                maxValue: 200,
                decimalPrecision: 1
            },
            items: [{         
                itemId: 'nf_distsprinklers',
                fieldLabel: 'Distance between sprinklers (m)'
            },{         
                itemId: 'nf_distlaterals',
                fieldLabel: 'Distance between laterals (m)'
            },{         
                xtype: 'combo',
                itemId: 'cb_arrangement',
                fieldLabel: 'Arrangement',
                store: Ext.create('Ext.data.ArrayStore', {
                    fields: ['name'],
                    data : [                
                        ['rectangular'],
                        ['triangular']
                    ]
                }),
                queryMode: 'local',
                displayField: 'name',
                valueField: 'name',
                value: 'rectangular',
                editable:false         
            }]            
        }];
        this.bbar = ['-',
            {
                xtype: 'button',
                text: 'Add to overlap simulations',
                action: 'add',
                iconCls: 'addvalue',          
                iconAlign: 'left'                      
            },'-',{
                xtype: 'button',
                text: 'Cancel',
                action: 'cancel',
                iconCls: 'cancel',          
                iconAlign: 'left'

            },'-'
        ];

        this.callParent(arguments);
    }

});