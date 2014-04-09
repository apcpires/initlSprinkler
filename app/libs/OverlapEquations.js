Ext.define('App.libs.OverlapEquations', {
	config: {		
		profileRainfall: '',
		distCollectors: '',
		overlapDistance: ''
	},	

	constructor : function(options) {		
		Ext.apply(this, options || {});
		if (!this.isValid){			
			return 'Distance between sprinklers or laterals is not valid.';
		}		
	},
	isValid: function(Ss, Sl){
		var Sc = this.distCollectors;
		if ((Ss % Sc == 0) && (Sl % Sc ==0))
			return true;
		else 
			return false;
	},
	/*
	Função para calcular a distância do aspersor (i,j) até o coletor (m,n)
	Posição do aspersor -> i,j (linha, coluna)
	Posição do coletor  -> m,n (linha, coluna)
	Sc: distância entre coletores
	Ss: distância entre aspersores
	Sl: distância entre laterais
	Lembrete sobre a posição dos aspersores principais em relação a área considerada	
	(0,0). . .(0,1)
	.			.
	.			.
	.			.
	(1,0). . .(1,1)
	Os índices de posição localizados acima ou a esquerda tem sinal negativo
	*/
	calcDistanceRectang: function(i, j, m, n, Ss, Sl){
		var B=0; //segmento vertical
		var C=0; //segmento horizontal
		var Sc = this.distCollectors;
		
		if (i==0){
			B = (Sc/2)+Sc*(m-1);
		} 
		if (i!=0) {			
			B = Math.abs(i)*Sl-(i/Math.abs(i))*((Sc/2)+Sc*(m-1));						
		}

		if (j==0){
			C = (Sc/2)+Sc*(n-1);	
		} 
		if (j!=0) {
			C = Math.abs(j)*Ss-(j/Math.abs(j))*((Sc/2)+Sc*(n-1));
		}
		
		var A = Math.sqrt(Math.pow(B,2)+Math.pow(C,2)); //Teorema de Pitágoras
		return A;
	},

	//o: número total de coletores nas linhas = numero total de colunas
	calcDistanceTriang: function(i, j, m, n, Ss, Sl, o){
		var B=0; //segmento vertical
		var C=0; //segmento horizontal
		var Sc = this.distCollectors;
		
		if (i==0){
			B = (Sc/2)+Sc*(m-1);
		} 
		if (i!=0) {			
			B = Math.abs(i)*Sl-(i/Math.abs(i))*((Sc/2)+Sc*(m-1));						
		}

		if (i % 2 == 0){ //se é linha "par" calcula C pelo modo 1 
			if (j==0){
				C = (Sc/2)+Sc*(n-1);	
			} 
			if (j!=0) {
				C = Math.abs(j)*Ss-(j/Math.abs(j))*((Sc/2)+Sc*(n-1));
			}
		}
		if (i % 2 != 0){ //se é linha "impar" calcula C pelo modo 2 
			if (j==0){
				C = Math.abs(Sc*((n-1)-(o/2)+0.5));	
			} 
			if (j!=0) {
				C = Math.abs(j)*Ss-(j/Math.abs(j))*Sc*((n-1)-(o/2)+0.5);
			}
		}	
		var A = Math.sqrt(Math.pow(B,2)+Math.pow(C,2)); //Teorema de Pitágoras
		return A;
	},
	//Cria matriz zerada
	newZeroFilledArray: function(nRows, nCols){
		var zeroGrid = new Array();
		for (var r = 0; r < nRows; r++){
	        var record = new Array();
	    	for (var c = 0; c < nCols; c++){
	            record.push(0);	            
	        }
	        zeroGrid.push(record);
	    }
	    return zeroGrid;
	},
	interpolateValue: function(value){
    	var pos = Math.floor(value/this.distCollectors);
    	var posMax = (this.profileRainfall.length)-1;
    	var arr = new Array(); 
    	var resObj;
    	if (pos < 1){
    		return this.profileRainfall[0].i;
    	}	
    	if ((pos >= 1) && (pos < posMax)){
    		var x0 = this.profileRainfall[pos-1].r;
    		var y0 = this.profileRainfall[pos-1].i
    		arr.push([x0,y0]);
    		var x1 = this.profileRainfall[pos].r;
    		var y1 = this.profileRainfall[pos].i;
    		arr.push([x1,y1]);
    		var x2 = this.profileRainfall[pos+1].r;
    		var y2 = this.profileRainfall[pos+1].i;
    		arr.push([x2,y2]);
    		resObj = Ext.create('App.libs.Interpolation',{
	    		input: value,
	    		data: arr,
	    		method: 1 //Quadratic
	    	});
	    	return (resObj.interpolatedValue != null) ? resObj.interpolatedValue : 0;
    	}
    	if (pos >= posMax){
    		return 0;
    	}	    	
    },	

	createGridSum: function(Ss, Sl, arrangement){
		var Sc = this.distCollectors;
		var nOfRows = Sl/Sc;
		var nOfCols = Ss/Sc;
		var grid = this.newZeroFilledArray(nOfRows,nOfCols); //
		if (arrangement == 'rectangular'){
			for (var j=-1; j<=2; j++){ 					//Colunas de aspersores considerados na sobreposição
				for (var i=-1; i<=2; i++){ 				//Linhas de aspersores considerados na sobreposição
					for (var n=1; n<=nOfCols; n++){ 	//Colunas de coletores
						for (var m=1; m<=nOfRows; m++){ //Linhas de coletores			
							var d = this.calcDistanceRectang(i,j,m,n,Ss,Sl);
							grid[m-1][n-1] += this.interpolateValue(d);
						}
					}
				}
			}		
			return grid;
		}
		if (arrangement == 'triangular'){
			for (var j=-2; j<=3; j++){ 					//Colunas de aspersores considerados na sobreposição
				for (var i=-2; i<=3; i++){ 				//Linhas de aspersores considerados na sobreposição
					for (var n=1; n<=nOfCols; n++){ 	//Colunas de coletores
						for (var m=1; m<=nOfRows; m++){ //Linhas de coletores			
							var d = this.calcDistanceTriang(i,j,m,n,Ss,Sl,nOfCols);
							grid[m-1][n-1] += this.interpolateValue(d);
						}
					}
				}
			}		
			return grid;
		}
	},
	
	calcAvgOfGrid: function(grid){
		var sumOfAvgs = 0;
		var n = 0;
		Ext.Array.each(grid,function(item, index){
			sumOfAvgs += Ext.Array.mean(item);
			n++;
		})
		return sumOfAvgs/n;
	},
	createGridDeviation: function(arrSum, nOfCols, nOfRows, avg){
		var grid = new Array();
		for (var c = 0; c < nOfCols; c++){ 	//column
	        var record = new Array();
	    	for (var r = 0; r < nOfRows; r++){ 		//row    	            
	            var deviation = Math.abs(arrSum[r][c]-avg)
	            record.push(deviation);	            
	        }
	        grid.push(record);
	    }	
	    return grid;
	},
	calcCuc: function(sSprinkler, sLateral, arrangement){
		var Sc = this.distCollectors;
		var nOfRows = sLateral/Sc;
		var nOfCols = sSprinkler/Sc;

		var gridSum = this.createGridSum(sSprinkler,sLateral, arrangement);
		var average = this.calcAvgOfGrid(gridSum);
		var gridDeviation = this.createGridDeviation(gridSum, nOfCols, nOfRows, average);
		var averageDeviation = this.calcAvgOfGrid(gridDeviation);
		
		var cuc = 100 * (1-(averageDeviation/average));
		return cuc;
	},
	calcUniformity: function(arrangement){
		var cucMin = 70; //Valor´mínimo a ser retornado

		var increment = this.overlapDistance;
		var fullRadius = this.profileRainfall.length * this.distCollectors;
    	var minDistSprinkler = Math.floor(fullRadius / Math.sqrt(2)) ;
    	var minDistLateral = minDistSprinkler;

    	var s1 = minDistSprinkler;
    	var s2 = minDistLateral;    	
		var arrResult = new Array();    	
    	var end = false;
    	while (!end){
	    	var i = 0;
	    	do {	    			    		
	    		var cuc = this.calcCuc(s1,s2,arrangement);
	    		if (cuc > cucMin){
	    			var record = [s1,s2,cuc];
	    			arrResult.push(record);
	    		}  		
	    		s2 += increment;
	    		if ((i==0) && (cuc<cucMin))
	    			end = true;	
	    		i++;    			    		
	    	} while (cuc > cucMin);     	
	    	s1 += increment;
	    	s2 = s1;
    	}
    	return arrResult;
	},
});