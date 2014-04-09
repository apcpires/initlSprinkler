Ext.define('App.view.sprinkler.ChartResults', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.chartresults',

    title: '4 - Charts and other results',
    disabled: true,
    frame: false,
    //height: 500,
    //id: 'chartresultsid',
    overflowY: 'auto',

    initComponent: function() {
    
        this.items = [{
            xtype: 'panel',
            itemId:'panelrainfall',
            collapsible: true,
            title: 'Rainfall intensity along radius',
            height: 290,
            items:[{
                xtype:'chart',
                id: 'chartrainfall_id',
                resizable: true,
                height: 260,
                width: 600,
                insetPadding: 20,
                animate: true,
                store: 'GridResults',
                legend: {
                    position: 'right'
                },
                axes: [
                    {
                        type: 'Numeric',
                        position: 'bottom',
                        title: 'Radius (m)',
                        fields: ['radius'],
                        minimum: 0
                    },
                    {
                        type: 'Numeric',
                        fields: ['rainfall','rainfallAvg'], //fields: ['intensidade','iMedio'],*****
                        position: 'left',
                        title: 'i (mm/h)',
                        minimum: 0
                    }
                ],
                series: [
                    {
                        type: 'line',
                        title: 'i (mm/h)',
                        xField: 'radius',
                        yField: 'rainfall',
                        smooth: 3,
                        highlight: {
                            size: 7,
                            radius: 7
                        }
                    },{
                        type: 'line',
                        title: 'im (mm/h)',
                        xField: 'radius',
                        yField: 'rainfallAvg',
                        smooth: 3,
                        highlight: {
                            size: 7,
                            radius: 7
                        },
                        style: {
                            'stroke-width': 3,
                            'stroke-dasharray': 10
                        },
                        showMarkers:false
                    }
                ]
            }]
        },{ 
            xtype: 'panel',
            title: 'Jet length (m)',
            itemId: 'paneljet',
            collapsible: true,
            frame: true,
            height: 150,
            bodyPadding: 10,
            defaults: {
                xtype: 'numberfield',
                labelWidth: 280,
                width: 350,
                readOnly: true
            },
            items: [{
                fieldLabel: 'Corresponding to 85% of applied water volume',
                itemId: 'nf_R85'
            },{
                fieldLabel: 'Corresponding to 90% of applied water volume',
                itemId: 'nf_R90' 
            },{
                fieldLabel: 'Corresponding to 95% of applied water volume',
                itemId: 'nf_R95'
            },{
                fieldLabel: 'Corresponding to rainfall intensity of 0.3 mm/h',
                itemId: 'nf_R03'
            }]
        },{
            xtype: 'panel',
            itemId: 'panelvolume',
            collapsible: true,
            height: 290,
            title: 'Volume of water applied along radius',
            items:[{
                xtype:'chart',
                resizable: true,
                id: 'chartvolume_id',
                height: 260,
                width: 600,
                animate: true,
                insetPadding: 20,
                store: 'GridResults',
                legend: {
                    position: 'right'
                },
                axes: [
                    {
                        type: 'Numeric',
                        position: 'bottom',
                        title: 'Radius (m)',
                        fields: ['radius'],
                        minimum: 0
                    },
                    {
                        type: 'Numeric',
                        fields: ['vApplied','vTheoretical'],
                        position: 'left',
                        title: 'Volume (L)',
                        minimum: 0
                    }
                ],
                series: [
                    {
                        type: 'line',
                        title: 'Applied (L) ',
                        xField: 'radius',
                        yField: 'vApplied',
                        smooth: 3,
                        highlight: {
                            size: 7,
                            radius: 7
                        }
                    },{
                        type: 'line',
                        title: 'Theoretical (L) ',
                        xField: 'radius',
                        yField: 'vTheoretical',
                        smooth: 3,
                        highlight: {
                            size: 7,
                            radius: 7
                        },
                        style: {
                            'stroke-width': 3,
                            'stroke-dasharray': 10
                        },
                        showMarkers:false
                    }
                ]
            }]
        },{
            xtype: 'panel',
            title: 'Reconstituted flow rate',            
            id: 'recflowrateid',
            height: 150,
            bodyPadding: 10,
            frame: true,
            collapsible: true,
            defaults: {
                xtype: 'numberfield',
                labelWidth: 230,
                width: 300,
                readOnly: true
            },
            items: [{
                fieldLabel: 'Measured flow rate (m3/h)',
                itemId: 'nf_measuredflow'
            },{
                fieldLabel: 'Reconstituted flow rate (m3/h)',
                itemId: 'nf_reconstitutedflow' 
            },{
                fieldLabel: 'Deviation from measured flow rate (%)',
                itemId: 'nf_deviationflow'
            }]
        }];
        
        this.callParent(arguments);
    }

});


