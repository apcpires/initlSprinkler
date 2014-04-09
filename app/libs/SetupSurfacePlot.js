Ext.define('App.libs.SetupSurfacePlot', {
    surfacePlot: '',
    config: {                     
        arrValuesZ: [],
        distOfCollectors: 0.5,
        div: ''
    },  

    constructor : function(options) {       
        Ext.apply(this, options || {});
        this.setup();
    },

    arrTranspose: function(arr){

        // Calculate the width and height of the Array
        var a = arr,
        w = a.length ? a.length: 0;
        h = a[0].length ? a[0].length: 0;

        // In case it is a zero matrix, no transpose routine needed.
        if(h === 0 || w === 0) { 
            return []; 
        }

        /**
        * @var {Number} i Counter
        * @var {Number} j Counter
        * @var {Array} t Transposed data is stored in this array.
        */
        var i, j, t = [];

        // Loop through every item in the outer array (height)
        for(i=0; i<h; i++) {
            t[i] = [];
            for(j=0; j<w; j++) {
                t[i][j] = a[j][i];
            }
        }
        return t;    
    },

    configLabelScale: function(numOfValues){
        var dCollectors = this.distOfCollectors;
        var total = 10; //total de valores que posso apresentar sem problemas
        
        var n = (numOfValues*dCollectors); // A escala deve ser apresentada em metros
        var arrLabel = new Array();
        if (n >= total){
            if (n == total)
                interval = 1;   
            
            if (n > total)
                interval = (n/total);   
                           
            for (var i=0; i<=total; i++)
                arrLabel.push(Ext.util.Format.number((i*interval),'0.0'));
            
            return arrLabel;        
        }
        if (n < total){            
            for (var i=0; i<=n; i++){
                arrLabel.push(i);
            }  
            return arrLabel;
        }
        
    },

    setup: function(){
        var arrBase = this.arrValuesZ;
        //var arrBase = this.arrTranspose(arr);
        /*var numRows = arrBase[0].length;
        var numCols = arrBase.length;*/
        var numRows = arrBase.length;
        var numCols = arrBase[0].length;

        var tooltipStrings = new Array();
        var values = new Array();
        var data = {nRows: numRows, nCols: numCols, formattedValues: values};
        
        var d = 360 / numRows;
        var idx = 0;
        
        for (var i = 0; i < numRows; i++) {
            values[i] = new Array();
            
            for (var j = 0; j < numCols; j++) {
                var value = arrBase[i][j];
                values[i][j] = value;
                tooltipStrings[idx] = "x:" + i + ", y:" + j + " = " + value;
                idx++;
            }
        }
        

        var div = 'surfacePlotDiv';
        //Limpa conteúdo da div antes de desenhar ou redesenhar...
        document.getElementById(div).innerHTML = '';
        
        this.surfacePlot = new SurfacePlot(document.getElementById(div));
        
        // Don't fill polygons in IE. It's too slow.
        var fillPly = true;
        
        // Define a colour gradient.
        
        var colour1 = {red:0, green:0, blue:255};
        var colour2 = {red:0, green:255, blue:255};
        var colour3 = {red:0, green:255, blue:0};
        var colour4 = {red:255, green:255, blue:0};
        var colour5 = {red:255, green:0, blue:0};
        var colours = [colour5, colour4, colour3, colour2, colour1];
        
        // Axis labels.
        //var xAxisHeader = "Distance between emitters (m)";
        //var yAxisHeader = "Distance between laterals (m)";
        var xAxisHeader = 'x';
        var yAxisHeader = 'y';
        var zAxisHeader = "Rainfall (mm/h)";
        
        var renderDataPoints = false;
        var background = '#ffffff';
        var axisForeColour = '#000000';
        var hideFloorPolygons = false;
        var chartOrigin = {x: 250, y:250};
        
        // Options for the basic canvas pliot.
        var basicPlotOptions = {fillPolygons: fillPly, tooltips: tooltipStrings, renderPoints: renderDataPoints }
        
        // Options for the webGL plot.
        /*var yLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var xLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];*/
        var xLabels = this.configLabelScale(numCols);
        var yLabels = this.configLabelScale(numRows);
        var zLabels =[];
        //var zLabels = [0, 1, 2, 3, 4, 5, 6]; // These labels ar eused when autoCalcZScale is false;
        
        var glOptions = {xLabels: xLabels, yLabels: yLabels, zLabels: zLabels, chkControlId: "allowWebGL" ,autoCalcZScale: true};
        
        // Options common to both types of plot.
        var options = {xPos: 50, yPos: 50, width: 500, height: 500, colourGradient: colours, 
            xTitle: xAxisHeader, yTitle: yAxisHeader, zTitle: zAxisHeader, 
            backColour: background, axisTextColour: axisForeColour, hideFlatMinPolygons: hideFloorPolygons, origin: chartOrigin};
        
        this.surfacePlot.draw(data, options, basicPlotOptions, glOptions);
        
        // Link the two charts for rotation.
        //var plot1 = surfacePlot.getChart();
    },

    redraw: function (){
        //console.log('redraw...');
        //this.surfacePlot.redraw();
    }
});