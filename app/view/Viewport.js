Ext.define('App.view.Viewport', {
    extend: 'Ext.container.Viewport',    
    requires: [        
        'App.libs.Interpolation',
        'App.libs.LoadTxtFile',
        'App.libs.GridResultsEquations',
        'App.libs.OverlapEquations',
        'App.libs.SetupSurfacePlot',
        'App.libs.ReportEn',
        'App.libs.ReportPtBr'
    ],
    layout: 'fit',
    overflowY: 'scroll', //Barra de rolagem vertical ativa
    layout: 'border',
    id: 'viewport_id',    
    
    initComponent: function() {
        var me = this;
    
        Ext.tip.QuickTipManager.init();
        var el = Ext.getBody();
        el.mask("Please wait...");

        Ext.applyIf(me, {
            items: [{
                xtype: 'container',
                id: 'header',
                region: 'north',
                height: 50,
                layout: 'column',
                items: [{
                    xtype: 'container',
                    columnWidth: 0.99,
                    html: '<h1>Web application for processing data of sprinkler radial water distribution</h1>',
                },{     
                    xtype: 'button',
                    action: 'en',
                    scale: 'large',
                    iconCls: 'en',
                    iconAlign: 'left',
                    region: 'center'
                },{
                    xtype: 'button',
                    action: 'pt-br',
                    iconCls: 'ptBr',
                    scale: 'large',
                    iconAlign: 'left',   
                    region: 'center'
                }]
            },{                
                xtype: 'tabpanel',
                id: 'maintabpanelid',
                region: 'center', 
                frame: true,
                items: [{                    
                        xtype: 'instructions'
                    },{
                        xtype: 'forminput'
                    },{
                        xtype: 'panelinputdata'
                    },{
                        xtype: 'gridresults'
                    },{
                        xtype: 'chartresults'
                    },{
                        xtype: 'overlappanel'
                    },{
                        xtype: 'reportpanel'
                    }
                ]
            }]  
        });

        me.callParent(arguments);
    }       
});  