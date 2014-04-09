Ext.define('App.controller.Language', {
    extend: 'Ext.app.Controller',

    models: [
        
    ],
    stores: [
        
    ],
    views: [
        'sprinkler.Instructions',
        'sprinkler.FormInput',
        'sprinkler.PanelInputData',
        'sprinkler.LoadFileWin',
        'sprinkler.Help',
        'sprinkler.GridResults',
        'sprinkler.ChartResults',
        'sprinkler.OverlapPanel',
        'sprinkler.ExportToCsvWin',
        'sprinkler.AddOverlapWin',
        'sprinkler.ReportPanel'        
    ],

    refs: [{ 
        ref: 'instructions', 
        selector: 'instructions'
    },{
        ref: 'formInput', 
        selector: 'forminput'
    },{
        ref: 'panelInputData', 
        selector: 'panelinputdata'
    },{
        ref: 'loadFileWin', 
        selector: 'loadfilewin'
    },{
        ref: 'gridResults', 
        selector: 'gridresults'
    },{
        ref: 'chartResults', 
        selector: 'chartresults'
    },{
        ref: 'overlapPanel', 
        selector: 'overlappanel'
    },{
        ref: 'exportToCsvWin', 
        selector: 'exporttocsvwin'
    },{
        ref: 'addOverlapWin', 
        selector: 'addoverlapwin'
    },{
        ref: 'reportPanel', 
        selector: 'reportpanel'
    }],
    init: function() {
        this.control({

            '#viewport_id button[action=en]': {
                click: this.setEnglish
            },
            '#viewport_id button[action=pt-br]': {
                click: this.setPortuguese
            }
        });
    },
    setEnglish: function(){
        this.getController('App.controller.Sprinkler').appLanguage = 'En';

        var viewport = Ext.getCmp('viewport_id');
        viewport.down('container').down('container').update('<h1>Web application for processing data of sprinkler radial water distribution</h1>')
        //************************************************************
        //Main TabPanel               
        //************************************************************
        var tabItems = Ext.getCmp('maintabpanelid').getTabBar().items;
        tabItems.items[0].setText('Presentation');      
        tabItems.items[1].setText('1 - Definition');
        tabItems.items[2].setText('2 - Data input');
        tabItems.items[3].setText('3 - Spreadsheet of results');
        tabItems.items[4].setText('4 - Charts and other results');
        tabItems.items[5].setText('5 - Overlap simulations');       
        tabItems.items[6].setText('6 - Report');
        
        //************************************************************
        //Instructions
        //************************************************************
        var html = '<img src="imgs/initl80x60.gif" hspace="15" '
        +'alt="HTML Tutorial" align="right"><br><b>This web application is being developed by International Network of '
        +'Irrigation Testing Laboratories (INITL) for data processing of sprinklers tests related to radial water distribution.</b>'
        +'<br><br>This open source web application has been developed using ExtJs 4 and has no commercial purposes.' 
        +'<br><br>* This application was tested just in <b>Google Chrome</b>. It will not work in Internet Explorer. Other browsers were not tested.' 
        this.getInstructions().update(html);
        
        //************************************************************
        //FormInput
        //************************************************************
        var f = this.getFormInput();
        //fieldset Laboratory description
        var fs = f.getComponent('fs_labdescription');
        fs.setTitle('Laboratory description');
        fs.getComponent('tf_lab').setFieldLabel('Laboratory');
        fs.getComponent('tf_labaddress').setFieldLabel('Address');
        fs.getComponent('tf_labphone').setFieldLabel('Phone number');
        fs.getComponent('tf_labcontact').setFieldLabel('Contact');           
        
        //fieldset sprinkler description
        fs = f.getComponent('fs_sprinkdescription');
        fs.setTitle('Sprinkler description');
        fs.getComponent('tf_sprinkler').setFieldLabel('Sprinkler description');
        fs.getComponent('nf_mainnozzle').setFieldLabel('Diameter of nozzle 1 (mm)');
        fs.getComponent('nf_secnozzle').setFieldLabel('Diameter of nozzle 2 (mm)');
        
        //fieldset test description
        fs = f.getComponent('fs_testdescription');
        fs.setTitle('Test description');
        fs.getComponent('nf_ncol').setFieldLabel('Number of collectors');
        fs.getComponent('nf_distcol').setFieldLabel('Distance between collectors (m)');
        fs.getComponent('df_datetest').setFieldLabel('Date of the test');
        fs.getComponent('nf_testpressure').setFieldLabel('Testing pressure (kPa)');    
        fs.getComponent('nf_riser').setFieldLabel('Sprinkler height (m)');    
        fs.getComponent('nf_discharge').setFieldLabel('Measured discharge (m3/h)');    
        fs.getComponent('tf_testid').setFieldLabel('Test ID (opcional)');    
        
        f.getDockedItems('toolbar>button[action=showuploadwin]')[0].setText('Load data');
        f.getDockedItems('toolbar>button[action=loadsampledata]')[0].setText('Sample data');
        f.getDockedItems('toolbar>button[action=loadgridinput]')[0].setText('Insert data manually');
        f.getDockedItems('toolbar>button[action=showhelpwin]')[0].setText('Help');
        
        //************************************************************
        //PanelInputData
        //************************************************************
        var p = this.getPanelInputData();
        
        //grid
        var grid = p.down('grid');
        grid.setTitle('Data input - Radial distribution test');
        grid.columns[0].setText('Collector');
        grid.columns[1].setText('Radius (m)');        

        p.down('panel > panel').setTitle('Chart of rainfall intensity along collectors'); 

        //X label
        var chart = p.down('panel > panel > chart');
        chart.axes.items[0].title = ('Collector');

        //Button process data
        p.getDockedItems('toolbar>button[action=processinputdata]')[0].setText('Process data');

        //************************************************************
        //Spreadsheet
        //************************************************************
        var grid = this.getGridResults();
        grid.columns[0].setText('Collector');
        grid.columns[1].setText('Radius (m)');
        grid.columns[3].setText('Vapplied (L)');                
        grid.columns[4].setText('Vtheoretical (L)');                
        grid.columns[5].setText('Vcumulated (L)');                
        grid.columns[6].setText('Vcumulated/Vtotal');                

        grid.getDockedItems('toolbar>button[action=export]')[0].setText('Export Spreadsheet');

        //************************************************************
        //Charts and other results
        //************************************************************
        var p = this.getChartResults();

        var p1 = p.getComponent('panelrainfall');
        p1.setTitle('Rainfall intensity along radius');
        p1.down('chart').axes.items[0].title = ('Radius (m)');

        var p2 = p.getComponent('paneljet');
        p2.setTitle('Jet length');
        p2.getComponent('nf_R85').setFieldLabel('Corresponding to 85% of applied water volume (m)');
        p2.getComponent('nf_R90').setFieldLabel('Corresponding to 90% of applied water volume (m)');
        p2.getComponent('nf_R95').setFieldLabel('Corresponding to 95% of applied water volume (m)');
        p2.getComponent('nf_R03').setFieldLabel('Corresponding to rainfall intensity of 0,3 mm/h (m)');

        var p3 = p.getComponent('panelvolume');
        p3.setTitle('Volume of water applied along radius');
        p3.down('chart').axes.items[0].title = ('Radius (m)');
        p3.down('chart').series.items[0].title = ('Applied (L)');
        p3.down('chart').series.items[1].title = ('Theoretical (L)');

        var p4 = p.getComponent('recflowrateid');
        p4.setTitle('Reconstitute flow rate');
        p4.getComponent('nf_measuredflow').setFieldLabel('Measured flow rate (m3/h)');
        p4.getComponent('nf_reconstitutedflow').setFieldLabel('Reconstituted flow rate (m3/h)');
        p4.getComponent('nf_deviationflow').setFieldLabel('Deviation from measured flow rate (%)');

        //************************************************************
        //Overlap
        //************************************************************
        var p5 = this.getOverlapPanel();
        
        var p5_1 = p5.getComponent('paneloverlapinput').getComponent('formoverlapinput');
        p5_1.setTitle('Input parameters required by overlap simulations');
        p5_1.getComponent('nf_overlapdist').setFieldLabel('Overlap distance (m)');
        p5_1.getDockedItems('toolbar>button[action=simulateoverlap]')[0].setText('Simulate');

        var p5_2 = p5.getComponent('paneloverlapinput').getComponent('rectangulargrid');
        p5_2.setTitle('Overlap simulations - Rectangular arrangement');
        p5_2.columns[0].setText('S sprinklers (m)');
        p5_2.columns[1].setText('S laterals (m)');
        p5_2.columns[2].setText('CUC (%)');
        p5_2.columns[3].setText('Remove?');
        p5_2.getDockedItems('toolbar>button[action=showoverlapwin]')[0].setText('Add value');

        var p5_3 = p5.getComponent('paneloverlapinput').getComponent('triangulargrid');
        p5_3.setTitle('Overlap simulations - Triangular arrangement (*Under test)');
        p5_3.columns[0].setText('S sprinklers (m)');
        p5_3.columns[1].setText('S laterals (m)');
        p5_3.columns[2].setText('CUC (%)');
        p5_3.columns[3].setText('Remove?');
        p5_3.getDockedItems('toolbar>button[action=showoverlapwin]')[0].setText('Add value');

        var p5_4 = p5.getComponent('surfaceplotid');
        p5_4.update('Click on one of the simulated values in the left table to draw a 3D surface..<br><div id="surfacePlotDiv" style="float: left; width: 500px; height: 500px;">');

        //************************************************************
        //AddOverlapWin
        //************************************************************
        
        //Class override required... a window object does not exist in the beginning of the application
        Ext.override(App.view.sprinkler.AddOverlapWin,{
            initComponent: function () {
                this.callParent();

                this.setTitle('Simulate another arrangement of sprinklers');
                this.down('form').getComponent('nf_distsprinklers').setFieldLabel('Distance between sprinklers (m)');
                this.down('form').getComponent('nf_distlaterals').setFieldLabel('Distance between laterals (m)');
                this.down('form').getComponent('cb_arrangement').setFieldLabel('Arrangement');

                this.getDockedItems('toolbar>button[action=add]')[0].setText('Simulate');
                this.getDockedItems('toolbar>button[action=cancel]')[0].setText('Cancel');
            }
        });

        //************************************************************
        //ExportToCsvWin
        //************************************************************
        Ext.override(App.view.sprinkler.ExportToCsvWin,{
            initComponent: function () {
                this.callParent();

                this.setTitle('Export to CSV file');
                this.down('form').getComponent('tf_csvfilename').setFieldLabel('Filename');
                this.down('form').getComponent('cb_decseparator').setFieldLabel('Decimal separator');

                this.getDockedItems('toolbar>button[action=submit]')[0].setText('Export');
                this.getDockedItems('toolbar>button[action=cancel]')[0].setText('Cancel');
            }
        });

        //************************************************************
        //LoadFileWin
        //************************************************************
        Ext.override(App.view.sprinkler.LoadFileWin,{
            initComponent: function () {
                this.callParent();

                this.setTitle('Data upload');
                this.down('panel > filefield').setFieldLabel('Textfile (.txt)');
                this.down('panel > filefield').buttonText= 'Select file...';
                
                var html = '<br><p><img src="imgs/txtfile.gif" alt="TxtFile" align="left" hspace="15"></p><b>Instructions</b>:<br>The textfile must have just values of rainfall intensity.'
                 +'<br>Each line of the file must have just one value of rainfall.'
                 +'<br>The decimal separator must be "."'                 
                 +'<br>Example: <a href="data/samplefile.txt" target="_blank">Samplefile.txt</a>';
                this.down('panel').update(html);
            }
        });

        //************************************************************
        //HelpWin
        //************************************************************
        Ext.override(App.view.sprinkler.Help,{
            initComponent: function () {
                this.callParent();

                this.setTitle('Help');
                                
                var html = 'If you just want to see the functionalities of this web application, push the button "Sample data" in the tab "1-Definitions". Thereafter press the button "Process data" in the tab "2-Data input". Click on the other tabs to see the results.'
            +'<br><br><u>Otherwise:</u><br>a)Specify the information required at "1-Definitions".' 
            +'<br>b)Load data of rainfall intensity from a textfile (Press "Load data") or type manually the values on "2-Data input" (But first, Press "Insert data manually").'
            +'<br>c)After load data, press "Process data" to generate all the results of the test.'
            +'<br><br>The textfile must have just values of rainfall intensity. Each line of the file must have just one value of rainfall. The decimal separator must be "."<br>Example: <a href="data/samplefile.txt" target="_blank">Samplefile.txt</a>';                
            
           
                this.update(html);
            }
        });
        this.setEnglishExtJs();    
    },
    setPortuguese: function(){
        this.getController('App.controller.Sprinkler').appLanguage = 'PtBr';

        var viewport = Ext.getCmp('viewport_id');
        viewport.down('container').down('container').update('<h1>Aplicação WEB para o processamento de dados do ensaio de distribuição radial de aspersores</h1>')
        //************************************************************
        //Main TabPanel               
        //************************************************************
        var tabItems = Ext.getCmp('maintabpanelid').getTabBar().items;
        tabItems.items[0].setText('Apresentação');      
        tabItems.items[1].setText('1 - Definições');
        tabItems.items[2].setText('2 - Dados');
        tabItems.items[3].setText('3 - Planilha de resultados');
        tabItems.items[4].setText('4 - Gráficos e outros resultados');
        tabItems.items[5].setText('5 - Simulações de sobreposição');       
        tabItems.items[6].setText('6 - Relatório');
        
        //************************************************************
        //Instructions
        //************************************************************
        var html = '<img src="imgs/initl80x60.gif" hspace="15" '
            +'alt="HTML Tutorial" align="right"><br><b>Este aplicativo WEB está sendo devenvolvido pela International Network of '
            +'Irrigation Testing Laboratories (INITL) para o processamento de dados resultantes do ensaio de distribuição radial de aspersores.</b>'
            +'<br><br>Este aplicativo open-source utiliza o frawemork ExtJs 4 e não tem propósitos comerciais.' 
            +'<br><br>*Utilizando-se o <b>Google Chrome</b> todas as funcionalidades implementadas no aplicativo são executadas correntamente. O aplicativo não opera no Internet Explorer. Outros navegadores não foram testados.' 
        this.getInstructions().update(html);
        
        //************************************************************
        //FormInput
        //************************************************************
        var f = this.getFormInput();
        //fieldset Laboratory description
        var fs = f.getComponent('fs_labdescription');
        fs.setTitle('Descrição do laboratório');
        fs.getComponent('tf_lab').setFieldLabel('Laboratório');
        fs.getComponent('tf_labaddress').setFieldLabel('Endereço');
        fs.getComponent('tf_labphone').setFieldLabel('Telefone');
        fs.getComponent('tf_labcontact').setFieldLabel('Contato');           
        
        //fieldset sprinkler description
        fs = f.getComponent('fs_sprinkdescription');
        fs.setTitle('Descrição do aspersor');
        fs.getComponent('tf_sprinkler').setFieldLabel('Aspersor');
        fs.getComponent('nf_mainnozzle').setFieldLabel('Diâmetro do bocal 1 (mm)');
        fs.getComponent('nf_secnozzle').setFieldLabel('Diâmetro do bocal 2 (mm)');
        
        //fieldset test description
        fs = f.getComponent('fs_testdescription');
        fs.setTitle('Descrição do ensaio');
        fs.getComponent('nf_ncol').setFieldLabel('Número de coletores');
        fs.getComponent('nf_distcol').setFieldLabel('Espaçamento dos coletores (m)');
        fs.getComponent('df_datetest').setFieldLabel('Data do ensaio');
        fs.getComponent('nf_testpressure').setFieldLabel('Pressão de ensaio (kPa)');    
        fs.getComponent('nf_riser').setFieldLabel('Altura do aspersor (m)');    
        fs.getComponent('nf_discharge').setFieldLabel('Vazão medida (m3/h)');    
        fs.getComponent('tf_testid').setFieldLabel('ID do ensaio (opcional)');    
        
        f.getDockedItems('toolbar>button[action=showuploadwin]')[0].setText('Carregar dados de ensaio');
        f.getDockedItems('toolbar>button[action=loadsampledata]')[0].setText('Carregar exemplo');
        f.getDockedItems('toolbar>button[action=loadgridinput]')[0].setText('Inserir dados manualmente');
        f.getDockedItems('toolbar>button[action=showhelpwin]')[0].setText('Ajuda');
        
        //************************************************************
        //PanelInputData
        //************************************************************
        var p = this.getPanelInputData();
        
        //grid
        var grid = p.down('grid');
        grid.setTitle('Dados - Ensaio de distribuição radial');
        grid.columns[0].setText('Coletor');
        grid.columns[1].setText('Raio (m)');        

        p.down('panel > panel').setTitle('Perfil de distribuição ao longo dos coletores'); 

        //X label
        var chart = p.down('panel > panel > chart');
        chart.axes.items[0].title = ('Coletor');

        //Button process data
        p.getDockedItems('toolbar>button[action=processinputdata]')[0].setText('Processar dados');

        //************************************************************
        //Spreadsheet
        //************************************************************
        var grid = this.getGridResults();
        grid.setTitle('3 - Planilha de resultados');
        grid.columns[0].setText('Coletor');
        grid.columns[1].setText('Raio (m)');
        grid.columns[3].setText('Vaplicado (L)');                
        grid.columns[4].setText('Vteórico (L)');                
        grid.columns[5].setText('Vacumulado (L)');                
        grid.columns[6].setText('Vacumulado/Vtotal');                

        grid.getDockedItems('toolbar>button[action=export]')[0].setText('Exportar resultados');

        //************************************************************
        //Charts and other results
        //************************************************************
        var p = this.getChartResults();

        var p1 = p.getComponent('panelrainfall');
        p1.setTitle('Perfil de distribuição ao longo do raio');
        p1.down('chart').axes.items[0].title = ('Raio (m)');

        var p2 = p.getComponent('paneljet');
        p2.setTitle('Raio de alcance efetivo');
        p2.getComponent('nf_R85').setFieldLabel('Correspondente a 85% do volume aplicado (m)');
        p2.getComponent('nf_R90').setFieldLabel('Correspondente a 90% do volume aplicado (m)');
        p2.getComponent('nf_R95').setFieldLabel('Correspondente a 95% do volume aplicado (m)');
        p2.getComponent('nf_R03').setFieldLabel('Correspondente a intensidade de 0,3 mm/h (m)');

        var p3 = p.getComponent('panelvolume');
        p3.setTitle('Volume de água aplicado ao longo do raio');
        p3.down('chart').axes.items[0].title = ('Raio (m)');
        p3.down('chart').series.items[0].title = ('Aplicado (L)');
        p3.down('chart').series.items[1].title = ('Teórico (L)');

        var p4 = p.getComponent('recflowrateid');
        p4.setTitle('Vazão reconstituída');
        p4.getComponent('nf_measuredflow').setFieldLabel('Vazão medida (m3/h)');
        p4.getComponent('nf_reconstitutedflow').setFieldLabel('Vazão reconstituída (m3/h)');
        p4.getComponent('nf_deviationflow').setFieldLabel('Desvio da vazão medida (%)');

        //************************************************************
        //Overlap
        //************************************************************
        var p5 = this.getOverlapPanel();
        
        var p5_1 = p5.getComponent('paneloverlapinput').getComponent('formoverlapinput');
        p5_1.setTitle('Dados requeridos para as simulações');
        p5_1.getComponent('nf_overlapdist').setFieldLabel('Incrementos no espaçamento (m)');
        p5_1.getDockedItems('toolbar>button[action=simulateoverlap]')[0].setText('Simular');

        var p5_2 = p5.getComponent('paneloverlapinput').getComponent('rectangulargrid');
        p5_2.setTitle('Simulações de sobreposição - Disposição retangular');
        p5_2.columns[0].setText('S aspersores (m)');
        p5_2.columns[1].setText('S laterais (m)');
        p5_2.columns[2].setText('CUC (%)');
        p5_2.columns[3].setText('Excluir?');
        p5_2.getDockedItems('toolbar>button[action=showoverlapwin]')[0].setText('Adicionar valor');

        var p5_3 = p5.getComponent('paneloverlapinput').getComponent('triangulargrid');
        p5_3.setTitle('Simulações de sobreposição - Disposição triangular (*Em testes)');
        p5_3.columns[0].setText('S aspersores (m)');
        p5_3.columns[1].setText('S laterais (m)');
        p5_3.columns[2].setText('CUC (%)');
        p5_3.columns[3].setText('Excluir?');
        p5_3.getDockedItems('toolbar>button[action=showoverlapwin]')[0].setText('Adicionar valor');

        var p5_4 = p5.getComponent('surfaceplotid');
        p5_4.update('Click em um dos valores simulados das tabelas a esquerda para carregar uma imagem da simulação.<br><div id="surfacePlotDiv" style="float: left; width: 500px; height: 500px;">');

        //************************************************************
        //ReportPanel
        //************************************************************
        var p6 = this.getReportPanel();
        p6.getDockedItems('toolbar>button[action=savereport]')[0].setText('Salvar relatório');

        //************************************************************
        //AddOverlapWin
        //************************************************************
        
        //Class override required... a window object does not exist in the beginning of the application
        Ext.override(App.view.sprinkler.AddOverlapWin,{
            initComponent: function () {
                this.callParent();

                this.setTitle('Adicionar simulação');
                this.down('form').getComponent('nf_distsprinklers').setFieldLabel('Distância entre aspersores (m)');
                this.down('form').getComponent('nf_distlaterals').setFieldLabel('Distância entre laterais (m)');
                this.down('form').getComponent('cb_arrangement').setFieldLabel('Disposição');

                this.getDockedItems('toolbar>button[action=add]')[0].setText('Simular');
                this.getDockedItems('toolbar>button[action=cancel]')[0].setText('Cancelar');
            }
        });

        //************************************************************
        //ExportToCsvWin
        //************************************************************
        Ext.override(App.view.sprinkler.ExportToCsvWin,{
            initComponent: function () {
                this.callParent();

                this.setTitle('Exportar para arquivo CSV');
                this.down('form').getComponent('tf_csvfilename').setFieldLabel('Nome do arquivo');
                this.down('form').getComponent('cb_decseparator').setFieldLabel('Separador decimal');

                this.getDockedItems('toolbar>button[action=submit]')[0].setText('Exportar');
                this.getDockedItems('toolbar>button[action=cancel]')[0].setText('Cancelar');
            }
        });

        //************************************************************
        //LoadFileWin
        //************************************************************
        Ext.override(App.view.sprinkler.LoadFileWin,{
            initComponent: function () {
                this.callParent();

                this.setTitle('Carregar arquivo');
                this.down('panel > filefield').setFieldLabel('Arquivo (.txt)');
                this.down('panel > filefield').buttonText= 'Selecione um arquivo...';
                
                var html = '<br><p><img src="imgs/txtfile.gif" alt="TxtFile" align="left" hspace="15"></p><b>Instruções</b>:<br>1) O arquivo de texto deve conter apenas valores de intensidade de precipitação.'
                 +'<br>2) Cada linha do arquivo deve conter apenas um valor de intensidade de precipitação.'
                 +'<br>3) O caractere separador decimal deve ser "."'                 
                 +'<br>Exemplo: <a href="data/samplefile.txt" target="_blank">Samplefile.txt</a>'
                this.down('panel').update(html);
            }
        });

        //************************************************************
        //HelpWin
        //************************************************************
        Ext.override(App.view.sprinkler.Help,{
            initComponent: function () {
                this.callParent();

                this.setTitle('Ajuda');
                                
                var html = 'Para apenas visualizar as funcionalidades desta aplicação WEB, pressione o botão "Carregar exemplo" localizado na aba "1-Definições". Logo após, carregue a aba "2-Dados" e pressione o botão "Processar dados". Acesse as outras abas para ver os resultados.'
            +'<br><br><u>Para processar dados provientes de uma ensaio de distribuição radial:</u><br>a)Preencha os campos requeridos na aba "1-Definições".' 
            +'<br>b)Carregue os dados de intensidade de precipitação a partir de um arquivo de texto (Pressione o botão "Carregar dados de ensaio") ou digite os valores na aba "2-Dados" (Neste caso, primeiramente pressione o botão "Inserir dados manualmente").'
            +'<br>c)Após carregar os dados, pressione o botão "Processar dados" localizado na aba "2-Dados", a fim de que se efetue o processamento dos dados de ensaio.'
           
                this.update(html);
            }
        });
    this.setPortugueseExtJs();

    },

    //Default ext-lang-pt_BR.js supplied by extjs
    setPortugueseExtJs: function(){
        var cm = Ext.ClassManager,
            exists = Ext.Function.bind(cm.get, cm);

        if (Ext.Updater) {
            Ext.Updater.defaults.indicatorText = '<div class="loading-indicator">Carregando...</div>';
        }

        if (Ext.Date) {
            Ext.Date.monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

            Ext.Date.getShortMonthName = function(month) {
                return Ext.Date.monthNames[month].substring(0, 3);
            };

            Ext.Date.monthNumbers = {
                Jan: 0,
                Fev: 1,
                Mar: 2,
                Abr: 3,
                Mai: 4,
                Jun: 5,
                Jul: 6,
                Ago: 7,
                Set: 8,
                Out: 9,
                Nov: 10,
                Dez: 11
            };

            Ext.Date.getMonthNumber = function(name) {
                return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
            };

            Ext.Date.dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
        }

        if (Ext.MessageBox) {
            Ext.MessageBox.buttonText = {
                ok: "OK",
                cancel: "Cancelar",
                yes: "Sim",
                no: "Não"
            };
        }

        if (exists('Ext.util.Format')) {
            Ext.apply(Ext.util.Format, {
                thousandSeparator: ',',
                decimalSeparator: '.',
                currencySign: 'R$',
                // Brazilian Real
                dateFormat: 'd/m/Y'
            });
            Ext.util.Format.brMoney = Ext.util.Format.currency;
        }

        if (exists('Ext.form.field.VTypes')) {
            Ext.apply(Ext.form.field.VTypes, {
                emailText: 'Este campo deve ser um endereç;o de e-mail válido, no formato "usuario@dominio.com.br"',
                urlText: 'Este campo deve ser uma URL no formato "http:/' + '/www.dominio.com.br"',
                alphaText: 'Este campo deve conter apenas letras e _',
                alphanumText: 'Este campo deve conter apenas letras, números e _'
            });
        }
    
        Ext.define("Ext.locale.pt_BR.view.View", {
            override: "Ext.view.View",
            emptyText: ""
        });

        Ext.define("Ext.locale.pt_BR.grid.plugin.DragDrop", {
            override: "Ext.grid.plugin.DragDrop",
            dragText: "{0} linha(s) selecionada(s)"
        });

        Ext.define("Ext.locale.pt_BR.TabPanelItem", {
            override: "Ext.TabPanelItem",
            closeText: "Fechar"
        });

        Ext.define("Ext.locale.pt_BR.form.field.Base", {
            override: "Ext.form.field.Base",
            invalidText: "O valor para este campo é inválido"
        });

        // changing the msg text below will affect the LoadMask
        Ext.define("Ext.locale.pt_BR.view.AbstractView", {
            override: "Ext.view.AbstractView",
            msg: "Carregando..."
        });

        Ext.define("Ext.locale.pt_BR.picker.Date", {
            override: "Ext.picker.Date",
            todayText: "Hoje",
            minText: "Esta data é anterior a menor data",
            maxText: "Esta data é posterior a maior data",
            disabledDaysText: "",
            disabledDatesText: "",
            monthNames: Ext.Date.monthNames,
            dayNames: Ext.Date.dayNames,
            nextText: 'Próximo Mês (Control+Direita)',
            prevText: 'Mês Anterior (Control+Esquerda)',
            monthYearText: 'Escolha um Mês (Control+Cima/Baixo para mover entre os anos)',
            todayTip: "{0} (Espaç;o)",
            format: "d/m/Y",
            startDay: 0
        });

        Ext.define("Ext.locale.pt_BR.picker.Month", {
            override: "Ext.picker.Month",
            okText: "&#160;OK&#160;",
            cancelText: "Cancelar"
        });

        Ext.define("Ext.locale.pt_BR.toolbar.Paging", {
            override: "Ext.PagingToolbar",
            beforePageText: "Página",
            afterPageText: "de {0}",
            firstText: "Primeira Página",
            prevText: "Página Anterior",
            nextText: "Próxima Página",
            lastText: "Última Página",
            refreshText: "Atualizar",
            displayMsg: "<b>{0} à {1} de {2} registro(s)</b>",
            emptyMsg: 'Sem registros para exibir'
        });

        Ext.define("Ext.locale.pt_BR.form.field.Text", {
            override: "Ext.form.field.Text",
            minLengthText: "O tamanho mínimo para este campo é {0}",
            maxLengthText: "O tamanho máximo para este campo é {0}",
            blankText: "Este campo é obrigatório.",
            regexText: "",
            emptyText: null
        });

        Ext.define("Ext.locale.pt_BR.form.field.Number", {
            override: "Ext.form.field.Number",
            minText: "O valor mínimo para este campo é {0}",
            maxText: "O valor máximo para este campo é {0}",
            nanText: "{0} não é um número válido"
        });

        Ext.define("Ext.locale.pt_BR.form.field.Date", {
            override: "Ext.form.field.Date",
            disabledDaysText: "Desabilitado",
            disabledDatesText: "Desabilitado",
            minText: "A data deste campo deve ser posterior a {0}",
            maxText: "A data deste campo deve ser anterior a {0}",
            invalidText: "{0} não é uma data válida - deve ser informado no formato {1}",
            format: "d/m/Y"
        });

        Ext.define("Ext.locale.pt_BR.form.field.ComboBox", {
            override: "Ext.form.field.ComboBox",
            valueNotFoundText: undefined
        }, function() {
            Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
                loadingText: "Carregando..."
            });
        });

        Ext.define("Ext.locale.pt_BR.form.field.HtmlEditor", {
            override: "Ext.form.field.HtmlEditor",
            createLinkText: 'Por favor, entre com a URL do link:'
        }, function() {
            Ext.apply(Ext.form.field.HtmlEditor.prototype, {
                buttonTips: {
                    bold: {
                        title: 'Negrito (Ctrl+B)',
                        text: 'Deixa o texto selecionado em negrito.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    italic: {
                        title: 'Itálico (Ctrl+I)',
                        text: 'Deixa o texto selecionado em itálico.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    underline: {
                        title: 'Sublinhado (Ctrl+U)',
                        text: 'Sublinha o texto selecionado.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    increasefontsize: {
                        title: 'Aumentar Texto',
                        text: 'Aumenta o tamanho da fonte.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    decreasefontsize: {
                        title: 'Diminuir Texto',
                        text: 'Diminui o tamanho da fonte.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    backcolor: {
                        title: 'Cor de Fundo',
                        text: 'Muda a cor do fundo do texto selecionado.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    forecolor: {
                        title: 'Cor da Fonte',
                        text: 'Muda a cor do texto selecionado.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    justifyleft: {
                        title: 'Alinhar à Esquerda',
                        text: 'Alinha o texto à esquerda.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    justifycenter: {
                        title: 'Centralizar Texto',
                        text: 'Centraliza o texto no editor.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    justifyright: {
                        title: 'Alinhar à Direita',
                        text: 'Alinha o texto à direita.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    insertunorderedlist: {
                        title: 'Lista com Marcadores',
                        text: 'Inicia uma lista com marcadores.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    insertorderedlist: {
                        title: 'Lista Numerada',
                        text: 'Inicia uma lista numerada.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    createlink: {
                        title: 'Link',
                        text: 'Transforma o texto selecionado em um link.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    sourceedit: {
                        title: 'Editar Fonte',
                        text: 'Troca para o modo de edição de código fonte.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    }
                }
            });
        });

        Ext.define("Ext.locale.pt_BR.grid.header.Container", {
            override: "Ext.grid.header.Container",
            sortAscText: "Ordem Ascendente",
            sortDescText: "Ordem Descendente",
            lockText: "Bloquear Coluna",
            unlockText: "Desbloquear Coluna",
            columnsText: "Colunas"
        });

        Ext.define("Ext.locale.pt_BR.grid.PropertyColumnModel", {
            override: "Ext.grid.PropertyColumnModel",
            nameText: "Nome",
            valueText: "Valor",
            dateFormat: "d/m/Y"
        });

        // This is needed until we can refactor all of the locales into individual files
        Ext.define("Ext.locale.pt_BR.Component", {  
            override: "Ext.Component"
        });

    },

    setEnglishExtJs: function(){

        var cm = Ext.ClassManager,
            exists = Ext.Function.bind(cm.get, cm);

        if (Ext.Updater) {
            Ext.Updater.defaults.indicatorText = '<div class="loading-indicator">Loading...</div>';
        }

        if (exists('Ext.data.Types')) {
            Ext.data.Types.stripRe = /[\$,%]/g;
        }

        if (Ext.Date) {
            Ext.Date.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            Ext.Date.getShortMonthName = function(month) {
                return Ext.Date.monthNames[month].substring(0, 3);
            };

            Ext.Date.monthNumbers = {
                Jan: 0,
                Feb: 1,
                Mar: 2,
                Apr: 3,
                May: 4,
                Jun: 5,
                Jul: 6,
                Aug: 7,
                Sep: 8,
                Oct: 9,
                Nov: 10,
                Dec: 11
            };

            Ext.Date.getMonthNumber = function(name) {
                return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
            };

            Ext.Date.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            Ext.Date.getShortDayName = function(day) {
                return Ext.Date.dayNames[day].substring(0, 3);
            };

            Ext.Date.parseCodes.S.s = "(?:st|nd|rd|th)";
        }

        if (Ext.MessageBox) {
            Ext.MessageBox.buttonText = {
                ok: "OK",
                cancel: "Cancel",
                yes: "Yes",
                no: "No"
            };
        }

        if (exists('Ext.util.Format')) {
            Ext.apply(Ext.util.Format, {
                thousandSeparator: ',',
                decimalSeparator: '.',
                currencySign: '$',
                dateFormat: 'm/d/Y'
            });
        }

        if (exists('Ext.form.field.VTypes')) {
            Ext.apply(Ext.form.field.VTypes, {
                emailText: 'This field should be an e-mail address in the format "user@example.com"',
                urlText: 'This field should be a URL in the format "http:/' + '/www.example.com"',
                alphaText: 'This field should only contain letters and _',
                alphanumText: 'This field should only contain letters, numbers and _'
            });
        }

        Ext.define("Ext.locale.en.view.View", {
            override: "Ext.view.View",
            emptyText: ""
        });

        Ext.define("Ext.locale.en.grid.plugin.DragDrop", {
            override: "Ext.grid.plugin.DragDrop",
            dragText: "{0} selected row{1}"
        });

        // changing the msg text below will affect the LoadMask
        Ext.define("Ext.locale.en.view.AbstractView", {
            override: "Ext.view.AbstractView",
            msg: "Loading..."
        });

        Ext.define("Ext.locale.en.picker.Date", {
            override: "Ext.picker.Date",
            todayText: "Today",
            minText: "This date is before the minimum date",
            maxText: "This date is after the maximum date",
            disabledDaysText: "",
            disabledDatesText: "",
            monthNames: Ext.Date.monthNames,
            dayNames: Ext.Date.dayNames,
            nextText: 'Next Month (Control+Right)',
            prevText: 'Previous Month (Control+Left)',
            monthYearText: 'Choose a month (Control+Up/Down to move years)',
            todayTip: "{0} (Spacebar)",
            format: "m/d/y",
            startDay: 0
        });

        Ext.define("Ext.locale.en.picker.Month", {
            override: "Ext.picker.Month",
            okText: "&#160;OK&#160;",
            cancelText: "Cancel"
        });

        Ext.define("Ext.locale.en.toolbar.Paging", {
            override: "Ext.PagingToolbar",
            beforePageText: "Page",
            afterPageText: "of {0}",
            firstText: "First Page",
            prevText: "Previous Page",
            nextText: "Next Page",
            lastText: "Last Page",
            refreshText: "Refresh",
            displayMsg: "Displaying {0} - {1} of {2}",
            emptyMsg: 'No data to display'
        });

        Ext.define("Ext.locale.en.form.Basic", {
            override: "Ext.form.Basic",
            waitTitle: "Please Wait..."
        });

        Ext.define("Ext.locale.en.form.field.Base", {
            override: "Ext.form.field.Base",
            invalidText: "The value in this field is invalid"
        });

        Ext.define("Ext.locale.en.form.field.Text", {
            override: "Ext.form.field.Text",
            minLengthText: "The minimum length for this field is {0}",
            maxLengthText: "The maximum length for this field is {0}",
            blankText: "This field is required",
            regexText: "",
            emptyText: null
        });

        Ext.define("Ext.locale.en.form.field.Number", {
            override: "Ext.form.field.Number",
            decimalSeparator: ".",
            decimalPrecision: 2,
            minText: "The minimum value for this field is {0}",
            maxText: "The maximum value for this field is {0}",
            nanText: "{0} is not a valid number"
        });

        Ext.define("Ext.locale.en.form.field.Date", {
            override: "Ext.form.field.Date",
            disabledDaysText: "Disabled",
            disabledDatesText: "Disabled",
            minText: "The date in this field must be after {0}",
            maxText: "The date in this field must be before {0}",
            invalidText: "{0} is not a valid date - it must be in the format {1}",
            format: "m/d/y",
            altFormats: "m/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d"
        });

        Ext.define("Ext.locale.en.form.field.ComboBox", {
            override: "Ext.form.field.ComboBox",
            valueNotFoundText: undefined
        }, function() {
            Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
                loadingText: "Loading..."
            });
        });

        Ext.define("Ext.locale.en.form.field.HtmlEditor", {
            override: "Ext.form.field.HtmlEditor",
            createLinkText: 'Please enter the URL for the link:'
        }, function() {
            Ext.apply(Ext.form.field.HtmlEditor.prototype, {
                buttonTips: {
                    bold: {
                        title: 'Bold (Ctrl+B)',
                        text: 'Make the selected text bold.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    italic: {
                        title: 'Italic (Ctrl+I)',
                        text: 'Make the selected text italic.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    underline: {
                        title: 'Underline (Ctrl+U)',
                        text: 'Underline the selected text.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    increasefontsize: {
                        title: 'Grow Text',
                        text: 'Increase the font size.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    decreasefontsize: {
                        title: 'Shrink Text',
                        text: 'Decrease the font size.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    backcolor: {
                        title: 'Text Highlight Color',
                        text: 'Change the background color of the selected text.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    forecolor: {
                        title: 'Font Color',
                        text: 'Change the color of the selected text.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    justifyleft: {
                        title: 'Align Text Left',
                        text: 'Align text to the left.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    justifycenter: {
                        title: 'Center Text',
                        text: 'Center text in the editor.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    justifyright: {
                        title: 'Align Text Right',
                        text: 'Align text to the right.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    insertunorderedlist: {
                        title: 'Bullet List',
                        text: 'Start a bulleted list.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    insertorderedlist: {
                        title: 'Numbered List',
                        text: 'Start a numbered list.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    createlink: {
                        title: 'Hyperlink',
                        text: 'Make the selected text a hyperlink.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    sourceedit: {
                        title: 'Source Edit',
                        text: 'Switch to source editing mode.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    }
                }
            });
        });

        Ext.define("Ext.locale.en.grid.header.Container", {
            override: "Ext.grid.header.Container",
            sortAscText: "Sort Ascending",
            sortDescText: "Sort Descending",
            columnsText: "Columns"
        });

        Ext.define("Ext.locale.en.grid.GroupingFeature", {
            override: "Ext.grid.GroupingFeature",
            emptyGroupText: '(None)',
            groupByText: 'Group By This Field',
            showGroupsText: 'Show in Groups'
        });

        Ext.define("Ext.locale.en.grid.PropertyColumnModel", {
            override: "Ext.grid.PropertyColumnModel",
            nameText: "Name",
            valueText: "Value",
            dateFormat: "m/j/Y",
            trueText: "true",
            falseText: "false"
        });

        Ext.define("Ext.locale.en.grid.BooleanColumn", {
            override: "Ext.grid.BooleanColumn",
            trueText: "true",
            falseText: "false",
            undefinedText: '&#160;'
        });

        Ext.define("Ext.locale.en.grid.NumberColumn", {
            override: "Ext.grid.NumberColumn",
            format: '0,000.00'
        });

        Ext.define("Ext.locale.en.grid.DateColumn", {
            override: "Ext.grid.DateColumn",
            format: 'm/d/Y'
        });

        Ext.define("Ext.locale.en.form.field.Time", {
            override: "Ext.form.field.Time",
            minText: "The time in this field must be equal to or after {0}",
            maxText: "The time in this field must be equal to or before {0}",
            invalidText: "{0} is not a valid time",
            format: "g:i A",
            altFormats: "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H"
        });

        Ext.define("Ext.locale.en.form.CheckboxGroup", {
            override: "Ext.form.CheckboxGroup",
            blankText: "You must select at least one item in this group"
        });

        Ext.define("Ext.locale.en.form.RadioGroup", {
            override: "Ext.form.RadioGroup",
            blankText: "You must select one item in this group"
        });

        // This is needed until we can refactor all of the locales into individual files
        Ext.define("Ext.locale.en.Component", { 
            override: "Ext.Component"
        });

        Ext.define("Ext.locale.en.view.interpolation.Calc", {
            override: "App.view.Interpolation.Calc",
            title: 'english title!'
        });
    }
});