Ext.define('App.view.sprinkler.Instructions', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.instructions',

    title: 'Presentation',
    bodyPadding: 5,
    frame: true,
    html: '<img src="imgs/initl80x60.gif" hspace="15" '
        +'alt="HTML Tutorial" align="right"><br><b>This web application is being developed by International Network of '
        +'Irrigation Testing Laboratories (INITL) for data processing of sprinklers tests related to radial water distribution.</b>'
        +'<br><br>This open source web application has been developed using ExtJs 4 and has no commercial purposes.' 
        +'<br><br>* This application was tested just in <b>Google Chrome</b>. It will not work in Internet Explorer. Other browsers were not tested.' 
    ,

    initComponent: function() {       
        this.callParent(arguments);
    }

});




