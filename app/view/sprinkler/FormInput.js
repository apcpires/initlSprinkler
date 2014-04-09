Ext.define('App.view.sprinkler.FormInput', {
    extend: 'Ext.form.Panel',
    alias: 'widget.forminput',

    title: '1 - Definitions',
    frame: true,
    bodyPadding: 5,
    autoScroll: true,         

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'fieldset',
                itemId: 'fs_labdescription',
                title: 'Laboratory description',
                width: 700,
                layout: {
                    type: 'table',
                    columns: 2
                },
                defaults: {
                    xtype: 'textfield',
                    padding: '3 0 0 20'
                },
                items: [{
                    fieldLabel: 'Laboratory',
                    itemId: 'tf_lab',
                    colspan: 2,
                    width: 580
                },{
                    fieldLabel: 'Address',
                    itemId: 'tf_labaddress',
                    colspan: 2,
                    width: 580
                
                },{
                    fieldLabel: 'Phone number',
                    itemId: 'tf_labphone'
                },{
                    fieldLabel: 'Email',
                    itemId: 'tf_labemail',
                    labelWidth: 30,
                    width: 305,
                    vtype: 'email'
                },{
                    fieldLabel: 'Contact',
                    itemId: 'tf_labcontact',
                    colspan: 2,
                    width: 580
                }]
            },{
                xtype: 'fieldset',
                title: 'Sprinkler description',
                itemId: 'fs_sprinkdescription',
                width: 700,
                layout: {
                    type: 'table',
                    columns: 2
                },
                defaults: {
                    padding: '3 0 0 20',
                    labelWidth: 150
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Sprinkler description',
                    itemId: 'tf_sprinkler', 
                    colspan: 2,
                    width: 580
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Diameter of nozzle 1 (mm)',
                    itemId: 'nf_mainnozzle',
                    decimalPrecision: 2,
                    minValue: 0,
                    width: 280
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Diameter of nozzle 2 (mm)',
                    itemId: 'nf_secnozzle',
                    decimalPrecision: 2,
                    minValue: 0,
                    width: 280
                }]
            },{
                xtype: 'fieldset',
                title: 'Test description',
                itemId: 'fs_testdescription',
                width: 700,
                layout: {
                    type: 'table',
                    columns: 2
                },
                defaults: {
                    xtype: 'numberfield',
                    padding: '3 0 0 20',
                    labelWidth: 200,
                    width: 280
                },
                items: [{
                    fieldLabel: 'Number of collectors',
                    itemId: 'nf_ncol',
                    afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
                    allowBlank: false,
                    minValue: 1,
                    allowDecimals: false,
                    labelWidth: 140
                },{
                    fieldLabel: 'Distance between collectors (m)',
                    itemId: 'nf_distcol',
                    decimalPrecision: 2,
                    afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
                    allowBlank: false,
                    minValue: 0.1
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Date of the test',
                    itemId: 'df_datetest',
                    format: 'd/m/Y',
                    labelWidth: 140
                },{
                    fieldLabel: 'Testing pressure (kPa)',
                    itemId: 'nf_testpressure',
                    minValue: 0
                },{                  
                    
                    fieldLabel: 'Sprinkler height (m)',
                    itemId: 'nf_riser',
                    decimalPrecision: 2,
                    minValue: 0,
                    labelWidth: 140
                },{
                    fieldLabel: 'Measured discharge (m³/h)',
                    itemId: 'nf_discharge',
                    decimalPrecision: 3,
                    minValue: 0
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Test ID (optional)',
                    itemId: 'tf_testid',
                    allowBlank: true,
                    labelWidth: 140,
                    maxLength: 20
                }]
            }],
            bbar: ['-',{
                xtype: 'button',
                text: 'Load data',
                action: 'showuploadwin',
                iconCls: 'loadfile',          
                scale: 'large',
                iconAlign: 'left'             
            },'-',{
                xtype: 'button',
                text: 'Sample data',
                action: 'loadsampledata',
                iconCls: 'sampledata',
                scale: 'large',
                iconAlign: 'left'             
            },'-',{       
                xtype: 'button',
                text: 'Insert data manually',
                action: 'loadgridinput',
                iconCls: 'typedata',            
                scale: 'large',
                iconAlign: 'left'                              
            },'-',{
                xtype: 'button',
                text: 'Help',            
                action: 'showhelpwin',
                iconCls: 'help',
                scale: 'large',
                iconAlign: 'left'             
            },'-']    
        });

        me.callParent(arguments);
    }
});
