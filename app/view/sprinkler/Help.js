Ext.define('App.view.sprinkler.Help', {
    extend: 'Ext.window.Window',
    alias: 'widget.helpwin',

    title: 'Help',
    width: 600,
    height: 300,
    bodyPadding: 10,
    frame: true,
    html: 'If you just want to see the functionalities of this web application, push the button "Sample data" in the tab "1-Definitions". Thereafter press the button "Process data" in the tab "2-Data input". Click on the other tabs to see the results.'
            +'<br><br><u>Otherwise:</u><br>a)Specify the information required at "1-Definitions".' 
            +'<br>b)Load data of rainfall intensity from a textfile (Press "Load data") or type manually the values on "2-Data input" (But first, Press "Insert data manually").'
            +'<br>c)After load data, press "Process data" to generate all the results of the test.'
            +'<br><br>The textfile must have just values of rainfall intensity. Each line of the file must have just one value of rainfall. The decimal separator must be "."<br>Example: <a href="data/samplefile.txt" target="_blank">Samplefile.txt</a>'                
            
});




