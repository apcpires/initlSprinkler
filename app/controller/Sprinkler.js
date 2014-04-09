Ext.define('App.controller.Sprinkler', {
    extend: 'Ext.app.Controller',

    models: [
        'InputData',
        'GridResults',
        'Overlap'
    ],
    stores: [
        'InputData',
        'GridResults',
        'RectangularOverlap',
        'TriangularOverlap'
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

    appLanguage: 'En', //Propertie used for language handling

    refs: [{ 
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
            'forminput button[action=showuploadwin]': {
                click: this.showUploadWin
            },
            'forminput button[action=loadsampledata]': {
                click: this.loadSampleData
            },
            'forminput button[action=loadgridinput]': {
                click: this.loadGridInput
            },
            'forminput button[action=showhelpwin]': {
                click: this.showHelp
            },
            'panelinputdata button[action=processinputdata]': {
                click: this.processInputData
            },            
            'loadfilewin filefield[name=filename]': {
                change: this.saveUserFile
            },
            'gridresults button[action=export]': {
                click: this.showWinExportGrid
            },
            'exporttocsvwin button[action=submit]': {
                click: this.exportGridResults
            },
            'exporttocsvwin button[action=cancel]': {
                click: this.closeWinExportGrid
            },
            'overlappanel button[action=showoverlapwin]': {
                click: this.showWinAddOverlap
            },
            'addoverlapwin button[action=add]': {
                click: this.addOverlap
            },
            'addoverlapwin button[action=cancel]': {
                click: this.closeWinAddOverlap
            },
            'overlappanel button[action=simulateoverlap]': {
                click: this.loadOverlapGrid
            },
            'overlappanel panel grid': {
                selectionchange: this.loadPlotSurface               
            }, 
            'reportpanel button[action=savereport]': {
                click: this.printReport               
            },            
            '#maintabpanelid': {
                tabchange: this.onTabChange
            },
            '#viewport_id': {
                afterrender: this.onAfterRenderViewport
            }
        });
    },
    onAfterRenderViewport: function(){
        var el = Ext.getBody();
        el.unmask();
    },

    onTabChange: function(tabPanel, newCard, oldCard, eOpts){
        if (newCard.xtype == 'overlappanel'){
            this.getOverlapPanel().down('grid').getSelectionModel().select(0); 
            this.getReportPanel().enable();   
        }
        if (newCard.xtype == 'reportpanel'){
            this.showReport();
        }
    },    
      
    showHelp: function(){
        var help = Ext.create(App.view.sprinkler.Help);
        help.show();
    },

    //Reconfigura store do GridInputData utilizar SampleData
    loadSampleData: function(){
        var q = Ext.ComponentQuery;
        q.query('#tf_lab')[0].setValue('Laboratório de Ensaios de Material de Irrigação - LEMI/INCT-EI');
        q.query('#tf_labaddress')[0].setValue('Av. Pádua Dias, 11 - LEB/ESALQ/USP - Piracicaba/SP/Brasil');
        q.query('#tf_labphone')[0].setValue('+55 19 3447 8574');
        q.query('#tf_labemail')[0].setValue('lemi@usp.br');
        q.query('#tf_labcontact')[0].setValue('Antonio Pires de Camargo')
        q.query('#df_datetest')[0].setValue('02/05/2013');
        q.query('#tf_sprinkler')[0].setValue('NaanDanJain - Model 234 - Sample A');
        q.query('#nf_testpressure')[0].setValue(300);
        q.query('#nf_discharge')[0].setValue(2.106);
        q.query('#nf_mainnozzle')[0].setValue(5.0);
        q.query('#nf_secnozzle')[0].setValue(3.2);
        q.query('#nf_ncol')[0].setValue(35);
        q.query('#nf_distcol')[0].setValue(0.5);
        q.query('#nf_riser')[0].setValue(0.5);
        q.query('#tf_testid')[0].setValue('FORE.02.04.001.01');

        this.getPanelInputData().enable();

        //Reconfigura store do grid
        var sample = [
            [1,0.5,7.30],
            [2,1.0,4.87],
            [3,1.5,3.51],
            [4,2.0,2.69],
            [5,2.5,2.46],
            [6,3.0,2.49],
            [7,3.5,2.67],
            [8,4.0,2.97],
            [9,4.5,3.27],
            [10,5.0,3.47],
            [11,5.5,3.67],
            [12,6.0,3.84],
            [13,6.5,3.96],
            [14,7.0,3.84],
            [15,7.5,3.88],
            [16,8.0,3.81],
            [17,8.5,3.85],
            [18,9.0,3.83],
            [19,9.5,3.40],
            [20,10.0,2.79],
            [21,10.5,2.60],
            [22,11.0,2.61],
            [23,11.5,2.59],
            [24,12.0,2.61],
            [25,12.5,2.33],
            [26,13.0,2.39],
            [27,13.5,2.24],
            [28,14.0,2.04],
            [29,14.5,2.09],
            [30,15.0,1.58],
            [31,15.5,1.17],
            [32,16.0,0.80],
            [33,16.5,0.32],
            [34,17.0,0.09],
            [35,17.5,0.00]
        ];
       
        //Insere sample data na store
        var store = this.getInputDataStore();
        store.removeAll();
        store.insert(0,sample);
        
        //desativar os outros botões pra evitar erro
        this.getFormInput().down('button[action=loadgridinput]').disable();
        this.getFormInput().down('button[action=showuploadwin]').disable();
        this.getFormInput().down('button[action=loadsampledata]').disable();
    },

    showUploadWin: function(){
        if (this.getFormInput().getForm().isValid()) {
            var win = this.getLoadFileWin(); 
            if (!win){
                var win = Ext.create('App.view.sprinkler.LoadFileWin');
            }
            win.show();
        }                  
    },   

    loadGridInputFromFile: function(arr){
        if (this.getFormInput().getForm().isValid()) {
            var nCollectors = arr.length;
            var q = Ext.ComponentQuery;
            q.query('#nf_ncol')[0].setValue(nCollectors);
            var distCollectors = q.query('#nf_distcol')[0].getValue();
            
            var arrGridInput = new Array(new Array());
            for (var i = 0; i<nCollectors; i++){
                var collector = i+1;
                var radius = (i+1)*distCollectors;
                var rainfall = arr[i];
                var result = [collector, radius, rainfall];
                arrGridInput.push(result);
            }
            //Por algum motivo meu primeiro elemento da matriz é nulo... entao vou removê-lo
            arrGridInput.shift();
            
            //Insere dados na store
            var store = this.getInputDataStore();
            store.removeAll();
            store.insert(0,arrGridInput);
            this.getPanelInputData().enable();
        }   
    }, 
    
    saveUserFile: function(filefield, filepath, opt){       
        var control = this;
        if (filepath){           
            if (filefield.isFileUpload()){
                var inputField = filefield.extractFileInput();
                var file = Ext.create('App.libs.LoadTxtFile',{
                    tagInput: inputField
                });
                file.reader.onloadend = function(e) {
                    var arr = file.getArrayTxt();
                    control.loadGridInputFromFile(arr);
                }
            }
            this.getLoadFileWin().hide();
           
            Ext.getCmp('maintabpanelid').setActiveTab(2);
            //desativar os outros botões pra evitar erro
            this.getFormInput().down('button[action=loadgridinput]').disable();
            this.getFormInput().down('button[action=loadsampledata]').disable();       
        }
    }, 
    
    //Reconfigura store do GridInputData para pegar dados digitados pelo usuário
    loadGridInput: function(){
        if (this.getFormInput().getForm().isValid()) {
            var q = Ext.ComponentQuery;
            var nCollectors = q.query('#nf_ncol')[0].getValue();
            var distCollectors = q.query('#nf_distcol')[0].getValue();

            var arrEmptyGrid = new Array(new Array());
            for (var i = 0; i<nCollectors; i++){
                var collector = i+1;
                var radius = (i+1)*distCollectors;
                var rainfall = 0;
                var result = [collector, radius, rainfall];
                arrEmptyGrid.push(result);
            }
            //Por algum motivo meu primeiro elemento da matriz é nulo... entao vou removê-lo
            arrEmptyGrid.shift();
            //Insere dados na store
            var store = this.getInputDataStore();
            store.removeAll();
            store.insert(0,arrEmptyGrid);
            this.getPanelInputData().enable();
            Ext.getCmp('maintabpanelid').setActiveTab(2);
        }
    }, 

    processInputData: function(){

        this.getGridResults().enable();
        this.getChartResults().enable();
        this.getOverlapPanel().enable();

        var distcol = Ext.ComponentQuery.query('#nf_distcol')[0].getValue();
        var store = this.getInputDataStore();
        var records = store.getRange(0,store.getCount());
        var arr = new Array();
        for (var i = 0; i < records.length; i++) {
            arr.push(records[i].data);
        }        
        var results = Ext.create('App.libs.GridResultsEquations', {
            arrayRainfall: arr,
            distCollectors: distcol  
        });
        var arrResults = results.calcArrResults();
        
        //Insere dados na store        
        var store = this.getGridResultsStore();
        store.removeAll();
        store.insert(0,arrResults);
        var arrJetLengths = results.calcArrJetLengths(arrResults);
        
        var q = Ext.ComponentQuery;

        var measuredQ = q.query('#nf_discharge')[0].getValue();
        var vApplied = arrResults[arrResults.length-1][5];
        if (measuredQ != null){
            var difQ = 100*((Math.abs((vApplied/1000) - measuredQ))/measuredQ);
            q.query('#nf_measuredflow')[0].setValue(Ext.util.Format.number(measuredQ,'0.000'));    
            q.query('#nf_reconstitutedflow')[0].setValue(Ext.util.Format.number(vApplied/1000,'0.000'));  
            q.query('#nf_deviationflow')[0].setValue(Ext.util.Format.number(difQ,'0.000')); 
        } 
        
        q.query('#nf_R85')[0].setValue(Ext.util.Format.number(arrJetLengths[0],'0.00'));
        q.query('#nf_R90')[0].setValue(Ext.util.Format.number(arrJetLengths[1],'0.00'));
        q.query('#nf_R95')[0].setValue(Ext.util.Format.number(arrJetLengths[2],'0.00'));
        q.query('#nf_R03')[0].setValue(Ext.util.Format.number(arrJetLengths[3],'0.00'));

        //Insere sugestão de valor para simulações de sobreposição
        q.query('#nf_overlapdist')[0].setValue(6); // 6 m
        
        Ext.getCmp('maintabpanelid').setActiveTab(4);
        this.loadOverlapGrid(); 

    },

    showWinExportGrid: function(){
        var win = this.getExportToCsvWin();
        if (!win){
            var win = Ext.create('App.view.sprinkler.ExportToCsvWin');
        }
        win.show();
    },

    closeWinExportGrid: function(){
        this.getExportToCsvWin().close();  
    },

    exportGridResults: function(){ 
        
        if (this.getExportToCsvWin().down('form').getForm().isValid()) {
            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
            
            var decimalSeparator = this.getExportToCsvWin().down('form').getComponent('cb_decseparator').getValue();
            var filename = this.getExportToCsvWin().down('form').getComponent('tf_csvfilename').getValue();
            filename = filename+'.csv';
            
            //Copia a store para um array
            var store = this.getGridResultsStore();
            var records = store.getRange(0,store.getCount());
            var arr = new Array();
            for (var i = 0; i < records.length; i++) {
                arr.push(records[i].raw); //Copiando dados do store para reorganizá-los'
            }
            
            //Reorganizando itens dentro de nova matriz
            var arrExport = new Array();
            var rows = arr[0].length;             
            var cols = arr.length; 
            var header = ['Collector','Radius (m)', 'Rainfall intensity (mm/h)', 'Applied volume (L)', 'Theoretical volume(L)', 
                        'Cumulated volume (L)', 'Vcum/Vtotal'];
            header.push('\n');
            header = header.join(";");
            arrExport.push(header);                          
            for (var c = 0; c < cols; c++){           
                var rec = new Array(); 
                for (var r = 0; r < rows-1; r++) { //A ultima coluna da store contém dados que nao precisam ser exportados 
                    var value = (arr[c][r]).toString();
                    if (decimalSeparator == ','){                        
                        var value = value.replace(".",",");
                    }
                    rec.push(value);
                }
                rec.push('\n');         //Insere o linefeed no final de cada linha
                rec = rec.join(";");    //formato csv
                arrExport.push(rec);    
            }
            var blob = new BlobBuilder();
            blob.append(arrExport);
            var fileSaver = window.saveAs(blob.getBlob(), filename); 

            this.getExportToCsvWin().close();
        }
    },

    createObjOverlap: function(){
        var store = this.getInputDataStore();
        var records = store.getRange(0,store.getCount());
        var arr = new Array();
        for (var i = 0; i < records.length; i++) {
            var r = records[i].data.radius;
            var rainfall = records[i].data.rainfall;
            arr.push({'r':r, 'i':rainfall});
        }
        var q = Ext.ComponentQuery;
        var distcol = q.query('#nf_distcol')[0].getValue();
        var overlapDist = q.query('#nf_overlapdist')[0].getValue();
        var objOverlap = Ext.create('App.libs.OverlapEquations',{
            'profileRainfall': arr,
            'distCollectors': distcol,
            'overlapDistance': overlapDist
        });
        return objOverlap;
    },

    loadOverlapGrid: function (){
        if (this.getOverlapPanel().down('panel > form').getForm().isValid()) {
            var objOverlap = this.createObjOverlap();
            var cucData = objOverlap.calcUniformity('rectangular');
            if (cucData != 0) { //Teste para evitar erros no caso de parâmetro informados serem incorretos
                var store = this.getRectangularOverlapStore();
                store.removeAll();
                store.insert(0,cucData);
                this.getOverlapPanel().down('panel > #rectangulargrid').enable();
            }

            var cucData = objOverlap.calcUniformity('triangular');
            if (cucData != 0) { //Teste para evitar erros no caso de parâmetro informados serem incorretos
                var store = this.getTriangularOverlapStore();
                store.removeAll();
                store.insert(0,cucData);
                this.getOverlapPanel().down('panel > #triangulargrid').enable();
            }
        } 
            
    },

    showWinAddOverlap: function(){
        var win = this.getAddOverlapWin(); 
        if (!win){
            var win = Ext.create('App.view.sprinkler.AddOverlapWin');
        }
        win.show();
    },

    addOverlap: function(){
        if (this.getAddOverlapWin().down('form').getForm().isValid()) {
            var objOverlap = this.createObjOverlap();
            var q = Ext.ComponentQuery;
            var distSprinklers = q.query('#nf_distsprinklers')[0].getValue();
            var distLaterals = q.query('#nf_distlaterals')[0].getValue();
            
            var arrangement = this.getAddOverlapWin().down('form > #cb_arrangement').getValue();
            console.log(arrangement);
            var cuc = parseFloat(objOverlap.calcCuc(distSprinklers,distLaterals,arrangement));
            var record = [{"s1":distSprinklers, "s2": distLaterals, "cuc": cuc}];
            //Insere cucData na store se for válido
            if (cuc != 0) { //Teste para evitar erros no caso de parâmetro informados serem incorretos
                var store;
                if (arrangement == 'rectangular')
                    store = this.getRectangularOverlapStore();
                if (arrangement == 'triangular')
                    store = this.getTriangularOverlapStore();

                store.insert(0,record);
                this.closeWinAddOverlap();
            }
        }
    },

    closeWinAddOverlap: function(){
        this.getAddOverlapWin().close();  
    },

    showReport: function(){
        var language = this.appLanguage;
        if (language=='PtBr'){
            Ext.create('App.libs.ReportPtBr',{
                print: 'false'
            });
        }
        if (language == 'En'){
            Ext.create('App.libs.ReportEn',{
                print: 'false'
            });
        }
    },
    printReport: function(){
        var language = this.appLanguage;
        console.log('lang='+language);
        if (language=='PtBr'){
            Ext.create('App.libs.ReportPtBr',{
                print: 'true'
            });
        }
        if (language == 'En'){
            Ext.create('App.libs.ReportEn',{
                print: 'true'
            });
        }
    },

    loadPlotSurface: function(model, records){
        if (records != ''){
            var rec = records[0].data;
            var sSprinklers = rec.s1;
            var sLaterals = rec.s2;
            //Gerar a matriz de somatórios para criação da superficie
            var objOverlap = this.createObjOverlap();
            
            var storeId = records[0].store.storeId;
            var arrangement = null;
            if (storeId == 'RectangularOverlap')
                arrangement = 'rectangular'
            if (storeId == 'TriangularOverlap')
                arrangement = 'triangular'
            if (arrangement != null){
                var arrSum = objOverlap.createGridSum(sSprinklers,sLaterals,arrangement);
                var plot = Ext.create('App.libs.SetupSurfacePlot',{
                    "arrValuesZ": arrSum
                });
            }
        }
    }
});
