Ext.define('App.view.sprinkler.ReportPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.reportpanel',

    title: '6 - Report',
    id: 'reportpanel_id',
    frame: false,
    bodyPadding: 5,
    autoScroll: true,
    disabled: true,
        

    initComponent: function() {
        var html = this.html;
        this.tbar = ['-',{
            xtype: 'button',
            text: 'Save report',
            action: 'savereport',
            iconCls: 'pdf',          
            scale: 'large',
            iconAlign: 'left'
                        
        }];

        this.callParent(arguments);
    }

});
