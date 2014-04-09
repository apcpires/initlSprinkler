Ext.define('App.view.sprinkler.LoadFileWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.loadfilewin',

    title: 'Data Upload',
    height: 250,
    width: 500,
    layout: 'fit',
    //id: 'loadfilewinid',
   
    initComponent: function() {        
        this.items = [{  
            xtype: 'panel',
            bodyPadding: 10,
            frame: true,
            items: [{         
                xtype: 'filefield',
                //id: 'filefieldid',
                name: 'filename',
                fieldLabel: 'Textfile (.txt)',
                labelWidth: 100,
                msgTarget: 'side',
                allowBlank: false,
                width: 400,
                buttonText: 'Select file...'   
            }],
            html: '<br><p><img src="imgs/txtfile.gif" alt="TxtFile" align="left" hspace="15"></p><b>Instructions</b>:<br>The textfile must have just values of rainfall intensity.'
                 +'<br>Each line of the file must have just one value of rainfall.'
                 +'<br>The decimal separator must be "."'                 
                 +'<br>Example: <a href="data/samplefile.txt" target="_blank">Samplefile.txt</a>'
        }];

        this.callParent(arguments);
    }

});