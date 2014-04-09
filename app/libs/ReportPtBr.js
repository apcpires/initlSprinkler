Ext.define('App.libs.ReportPtBr', {

	config: {		
    print: 'false'
	},
	constructor : function(options) {		
		Ext.apply(this, options || {});
    this.showReport();
	}, 

  htmlUniformity: function(arrangement){
    var store = null;
    if (arrangement == 'rectangular'){
      store = Ext.getStore('RectangularOverlap');
      arrangement = 'retangular';
    }
    if (arrangement == 'triangular'){
      store = Ext.getStore('TriangularOverlap');
    }
    var htmlMarkup = [
      '<tpl>',
        '<table id="box-table-a">',
            '<thead>',
                '<tr>',
                  '<th colspan="3" align="left" scope="col"><span class="legend">Simulações de uniformidade considerando disposição '+arrangement+' de aspersores</span></th>',
                '</tr>',
                '<tr>',
                    '<th scope="col" align="center">Distância entre aspersores (m)</th>',
                    '<th scope="col" align="center">Distância entre laterais (m)</th>',
                    '<th scope="col" align="center">CUC (%)</th>',
                '</tr>',
            '</thead>',
            '<tbody>',
                '<tpl for=".">',
                    '<tr>',
                        '<td align="center">{data.s1}</td>',
                        '<td align="center">{data.s2}</td>',
                        '<td align="center">{data.cuc:number("0.0")}</td>',
                    '</tr>',
                '</tpl>',
            '</tbody>',
        '</table>',
      '</tpl>',
      '<br />',   
      '</div>',
      '</body>',
      '</html>'
    ];
    var html = Ext.create('Ext.XTemplate', htmlMarkup).apply(store);
    return html;
  },

 	showReport: function(){
    var q = Ext.ComponentQuery;

    var lab = q.query('#tf_lab')[0].getValue();
    var address = q.query('#tf_labaddress')[0].getValue();
    var phone = q.query('#tf_labphone')[0].getValue();
    var contact = q.query('#tf_labcontact')[0].getValue();
    var email = q.query('#tf_labemail')[0].getValue();
    var dt = q.query('#df_datetest')[0].getValue();
    if (dt != null){
        var dateTest = dt.getDate()+'/'+(dt.getMonth()+1)+'/'+dt.getFullYear();
    } else {
        var dateTest = ' ';
    }
    var model = q.query('#tf_sprinkler')[0].getValue();
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
    var testId = q.query('#tf_testid')[0].getValue();
    if (testId != ''){
      testId = 'ID do teste: '+testId;
    }
    
    var svgHtml = Ext.getCmp('chartrainfall_id').save({
         type: 'image/svg+xml'
    });
    var index = svgHtml.indexOf('<svg ');
    var chartRainfall = svgHtml.slice(index);

    var svgHtml = Ext.getCmp('chartvolume_id').save({
         type: 'image/svg+xml'
    });
    var index = svgHtml.indexOf('<svg ');
    var chartVolume = svgHtml.slice(index);

		var store = Ext.getStore('InputData');
    if (this.print=='true'){
      var cssPath = '<link rel="stylesheet" href="../css/tables.css">';  
      var logoPath = '<img src="../imgs/initl_100.png" width="100" height="74" alt="initllogo" />';
    }
    if (this.print=='false'){
      var cssPath = '<link rel="stylesheet" href="css/tables.css">';
      var logoPath = '<img src="imgs/initl_100.png" width="100" height="74" alt="initllogo" />';
    } 
   
        var htmlMarkup = [ 
            '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
            '<html xmlns="http://www.w3.org/1999/xhtml">',
            '<head>',               
              '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'+cssPath+'<title>INITL - Relatório de ensaio de aspersor - Distribuição radial</title>',
            '</head>',           
            '<body>',
            '<div id="container">',
            '<table id="hor-minimalist-b">',
              '<tr>',
                '<th width="100" scope="col">'+logoPath+'</th>',
                '<th align="left" scope="col"><header class="header">International Network of <br />Irrigation Testing Laboratories</header></th>',
              '</tr>',
            '</table>',
            '<table id="hor-minimalist-b">',
              '<tr>',
                '<th align="left" scope="col"><span class="classh1">Relatório de ensaio de aspersor - Distribuição radial</span></th>',                                  
                '<th align="right" scope="col"><span class="test">'+testId+'</span></th>',                                  
              '</tr>',
            '</table>',
            '<br>',
            '<table id="box-table-a">',
              '<tr>',
                '<th colspan="2" align="left" scope="col"><span class="legend">Descrição do laboratório</span></th>',
                '</tr>',
              '<tr>',
                '<td width="31%">Nome:</td>',
                '<td width="69%">'+lab+'</td>',
                '</tr>',
              '<tr>',
                '<td>Endereço: </td>',
                '<td>'+address+'</td>',
              '</tr>',
              '<tr>',
                '<td>Contato:</td>',
                '<td>'+contact+'</td>',
              '</tr>',
              '<tr>',
                '<td>Telefone:</td>',
                '<td>'+phone+'</td>',
              '</tr>',
              '<tr>',
                '<td>Email: </td>',
                '<td>'+email+'</td>',
              '</tr>',
            '</table>',
            '<br />',
            '<table id="box-table-a">',
              '<tr>',
                '<th colspan="2" align="left" scope="col"><span class="legend">Descrição do aspersor e do ensaio</span></th>',
                '</tr>',
              '<tr>',
                '<td width="31%">Descrição do aspersor:</td>',
                '<td width="69%">'+model+'</td>',
                '</tr>',
              '<tr>',
                '<td>Diâmetro dos bocais:</td>',
                '<td>'+nozzle1+' x '+nozzle2+' mm</td>',
                '</tr>',
              '<tr>',
                '<td>Pressão de ensaio:</td>',
                '<td>'+testPressure+' kPa</td>',
                '</tr>',
              '<tr>',
                '<td>Distância entre coletores:</td>',
                '<td>'+distcol+' m</td>',
                '</tr>',
              '<tr>',
                '<td>Altura do tubo de subida do aspersor:</td>',
                '<td>'+riser+' m</td>',
              '</tr>',
              '<tr>',
                '<td>Data do ensaio:</td>',
                '<td>'+dateTest+'</td>',
              '</tr>',
            '</table>',
            '<br />',
            '<table id="box-table-a">',
              '<tr>',
                '<th colspan="2" align="left" scope="col"><span class="legend">Intensidade de precipitação (mm/h)</span></th>',
              '</tr>',
              '<tr>',
                '<td colspan="2" align="left" scope="col">Valores:</td>',
              '</tr>',
              '<tr>',
                '<td colspan="2" align="left" scope="col">',
                  '<tpl for=".">',
                    '{data.rainfall:number("0.00")}, ',                    
                  '</tpl>',
                '</td>',
              '</tr>',              
            '</table>',
            '<table width="900" border="0">',
              '<tr>',
                '<td colspan="2" align="center" scope="col">'+chartRainfall+'</td>',
              '</tr>',
              '<tr>',
                '<td colspan="2" align="center" scope="col">'+chartVolume+'</td>',
              '</tr>',              
            '</table>',
            '<br />',
            '<table id="box-table-a">',
              '<tr>',
                '<th colspan="2" align="left" scope="col"><span class="legend">Vazão</span></th>',
              '</tr>',
              '<tr>',
                '<td width="31%">Vazão medida:</td>',
                '<td width="69%">'+measuredFlow+' m<sup>3</sup>/h</td>',
              '</tr>',
              '<tr>',
                '<td>Vazão reconstituída:</td>',
                '<td>'+reconstitutedFlow+' m<sup>3</sup>/h</td>',
              '</tr>',
              '<tr>',
                '<td>Desvio da vazão medida:</td>',
                '<td>'+deviationFlow+'%</td>',
              '</tr>',
            '</table>',
            '<br />',
            '<table id="box-table-a">',
              '<tr>',
                '<th colspan="2" align="left" scope="col"><span class="legend">Raio de alcance efetivo</span></th>',
              '</tr>',
              '<tr>',
                '<td width="50%">Volume aplicado = 85% do volume total:</td>',
                '<td width="50%">'+R85+' m</td>',
              '</tr>',
              '<tr>',
                '<td>Volume aplicado = 90% do volume total:</td>',
                '<td>'+R90+' m</td>',
              '</tr>',
              '<tr>',
                '<td>Volume aplicado = 95% do volume total:</td>',
                '<td>'+R95+' m</td>',
              '</tr>',
              '<tr>',
                '<td>Intensidade de precipitação = 0.3 mm/h:</td>',
                '<td>'+R03+' m</td>',
              '</tr>',
            '</table>',
            '<br />'                 
        ];
        var part1 = Ext.create('Ext.XTemplate', htmlMarkup).apply(store);
        var part2 = this.htmlUniformity('rectangular');
        var temp = part1.concat(part2);
        var part3 = this.htmlUniformity('triangular');
        var html = temp.concat(part3);
        
        if (this.print=='false'){
          Ext.getCmp('reportpanel_id').update(html);
        }
        if (this.print=='true'){
          console.log('vai imprimir do ptbr...');
          var form = Ext.create('Ext.form.Panel', {
            width: 350,
            hidden: true,

            // The form will submit an AJAX request to this URL when submitted
            url: 'php/report.php',
  	   
            standardSubmit: true,
            // Fields will be arranged vertically, stretched to full width
            items: [{
                xtype: 'hidden',          
                name: 'svg',
                value: html
            }]
          });
          form.submit({
            target: '_self',
            url: 'php/report.php'
          });
        }       
	}
});