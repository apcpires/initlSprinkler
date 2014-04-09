Ext.define('App.libs.Report', {

	config: {		

	},
	constructor : function(options) {		
		Ext.apply(this, options || {});
		this.main();
	},
	main: function(){

		var q = Ext.ComponentQuery;

        var lab = q.query('#tf_lab')[0].getValue();
        var dt = q.query('#df_datetest')[0].getValue();
        if (dt != null){
            var dateTest = dt.getDate()+'/'+(dt.getMonth()+1)+'/'+dt.getFullYear();
        } else {
            var dateTest = ' ';
        }
        var descSprinkler = q.query('#tf_sprinkler')[0].getValue();
        var testPressure = q.query('#nf_testpressure')[0].getValue();
        var nozzle1 = q.query('#nf_mainnozzle')[0].getValue();
        var nozzle2 = q.query('#nf_secnozzle')[0].getValue();
        var ncol = q.query('#nf_ncol')[0].getValue();
        var distcol = q.query('#nf_distcol')[0].getValue();
        var riser = q.query('#nf_riser')[0].getValue();
        var R85 = q.query('#nf_R85')[0].getValue();
        var R90 = q.query('#nf_R90')[0].getValue();
		var R95 = q.query('#nf_R95')[0].getValue();
		var R03 = q.query('#nf_R03')[0].getValue();
		var measuredFlow = q.query('#nf_measuredflow')[0].getValue();
		var reconstitutedFlow = q.query('#nf_reconstitutedflow')[0].getValue();
		var deviationFlow = q.query('#nf_deviationflow')[0].getValue();

		var store = Ext.getStore('GridResults');


        var htmlMarkup = [
            '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html>',
            '<head>',
            '<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />',
            '<link rel="stylesheet" href="css/report.css">',
            '<title>' + 'INITL - Report of Sprinkler Test' + '</title>',
            '</head>',
            '<body>',
            '<table id="header-teste" border="0">',
                '<tr>',
                    '<td rowspan="2"><input type="image" name="logo_initl" id="logo_initl" src="imgs/initl_100.png" /></td>',
                    '<td><strong>INTERNATIONAL NETWORK OF IRRIGATION TESTING LABORATORIES</strong></td>',
                '</tr>',
                '<tr>',
                    '<td>Report - Sprinkler Test</td>',
                '</tr>',
            '</table>',
            '<hr />',
            '<div class="titulo1">1 - Description of the test</div>',
            '<table id="hor-minimalist-b" width="600px">',
                '<tr>',
                    '<td style="text-align: left"><b>Laboratory:</b></td>',
                    '<td style="text-align: left">'+lab+'</td>',
                '</tr>',
                '<tr>',
                    '<td style="text-align: left"><b>Date of the test:</b></td>',
                    '<td style="text-align: left">'+dateTest+'</td>',
                '</tr>',
                '<tr>',
                    '<td style="text-align: left"><b>Sprinkler description:</b></td>',
                    '<td style="text-align: left">'+descSprinkler+'</td>',
                '</tr>',
                '<tr>',
                    '<td style="text-align: left"><b>Nozzles:</b></td>',
                    '<td style="text-align: left">'+nozzle1+' x '+nozzle2+' mm</td>',
                '</tr>',
                '<tr>',
                    '<td style="text-align: left"><b>Testing pressure:</b></td>',
                    '<td style="text-align: left">'+testPressure+' kPa</td>',
                '</tr>',                
                '<tr>',
                    '<td style="text-align: left"><b>Number of collectors:</b></td>',
                    '<td style="text-align: left">'+ncol+'</td>',
                '</tr>',
                '<tr>',
                    '<td style="text-align: left"><b>Distance between collectors:</b></td>',
                    '<td style="text-align: left">'+distcol+' m</td>',
                '</tr>',
                '<tr>',
                    '<td style="text-align: left"><b>Sprinkler height:</b></td>',
                    '<td style="text-align: left">'+riser+' m</td>',
                '</tr>',
            '</table>',
            '<br>',
            '<hr />',
            
            '<div class="titulo1">3 - Length of the jet</div>',
            '<br>',
            '<tpl>',
                '<table width="800px" id="hor-minimalist-b">',
                    '<thead>',
                        '<tr>',
                            '<th scope="col">Criterion</th>',
                            '<th scope="col">Lenght of the jet (m)</th>',
                        '</tr>',
                    '</thead>',
                    '<tbody>',
                        '<tr>',
                            '<td>Lenght of jet - 85% applied water volume</td>',
                            '<td>'+Ext.Number.toFixed(R85,2)+'</td>',
                        '</tr>',
                        '<tr>',
                            '<td>Lenght of jet - 90% applied water volume</td>',
                            '<td>'+Ext.Number.toFixed(R90,2)+'</td>',
                        '</tr>',
                        '<tr>',
                            '<td>Lenght of jet - 95% applied water volume</td>',
                            '<td>'+Ext.Number.toFixed(R95,2)+'</td>',
                        '</tr>',
                        '<tr>',
                            '<td>Lenght of jet considering 0.3 mm/h as the minimum rainfall intensity</td>',
                            '<td>'+Ext.Number.toFixed(R03,2)+'</td>',
                        '</tr>',
                    '</tbody>',
                '</table>',
            '</tpl>',
            '<br>',
            '<hr />',
            '<div class="titulo1">4 - Reconstituted flow rate</div>',
            '<br>',
            '<table width="800px" id="hor-minimalist-b">',
                '<thead>',
                    '<tr>',
                        '<th scope="col">Measured flow rate</th>',
                        '<th scope="col">Reconstituted flow rate</th>',
                        '<th scope="col">Deviation from measured flow rate</th>',
                    '</tr>',
                '</thead>',
                '<tbody>',
                    '<tr>',
                        '<td>'+Ext.Number.toFixed(measuredFlow,3)+' m³/h</td>',
                        '<td>'+Ext.Number.toFixed(reconstitutedFlow,3)+' m³/h</td>',
                        '<td>'+Ext.Number.toFixed(deviationFlow,3)+' %</td>',
                    '</tr>',
                '</tbody>',
            '</table>',
            '<br>',
            '</body>',
            '</html>'
        ];
        var html = Ext.create('Ext.XTemplate', htmlMarkup).apply(store);

        //open up a new printing window, write to it, print it and close
        var win = window.open('', 'printgrid');

        //document must be open and closed
        win.document.open();
        win.document.write(html);
        win.document.close();




	}
});