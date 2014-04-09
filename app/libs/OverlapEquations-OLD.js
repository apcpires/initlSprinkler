Ext.define('App.libs.OverlapEquations', {
	//propriedades
	baseGrid: '',
	fullRadius: '',
	adjustedRadius: '',
	config: {		
		profileRainfall: '',
		distCollectors: '',
		overlapDistance: ''
	},	

	constructor : function(options) {		
		Ext.apply(this, options || {});
		this.fullRadius = this.profileRainfall.length * this.distCollectors; 
		this.adjustRainfallProfile();
		this.convProfileToBaseGrid();
	},

	//Cria lista de pares de valores contendo [raio, intensidade] --- OK!
	adjustRainfallProfile: function(){
		/*PRIVATE METHODS -- Begin*/

		//Calcula o raio de alcance do aspersor com base na proposta de PRADO (2008)
		//o Raio de alcance é obtido pelo prolongamento de uma reta que passa pelo
		//penultimo e ultimo pontos nos quais a intensidade de aplicação foi diferente 
		//de zero. Onde esta reta corta o eixo X, tem-se o raio de alcance do aspersor. 
		var calcJetLength = function(arrObj, len){
			var Rn_1 = arrObj[len-2].r; //Raio até o ultimo coletor com i!=0
			var Rn_2 = arrObj[len-3].r; //Raio até o penultimo coletor com i!=0
			var in_1 = arrObj[len-2].i; //i no ultimo coletor com i!=0
			var in_2 = arrObj[len-3].i; //i no penultimo coletor com i!=0
			var R = ((in_2 * Rn_1) - (in_1 * Rn_2))/(in_2 - in_1);  //raio de alcance para i=0 resultante da reta
			return R;  
		}	
		/*PRIVATE METHODS -- End*/
		
		var self = this;

		//Supõe que a intensidade no coletor 0 é igual a do coletor 1
		self.profileRainfall.unshift( {'r': 0, 'i': self.profileRainfall[0].i} ); 
    	
    	var len = self.profileRainfall.length;
    	var lastR = calcJetLength(self.profileRainfall, len);
    	self.adjustedRadius = lastR;
    	Ext.Array.replace(self.profileRainfall, (len-1), 1, ([{'r': lastR, 'i':0}]) );
	},
	//Converte o perfil de distribuição em um grid
	convProfileToBaseGrid: function(){
		//Calcula a distância X do aspersor até o ponto considerado - Teorema de Pitágoras
    	//X é o valor a ser interpolado
	    var calcX = function(row, col){        
	        return (self.distCollectors * (Math.sqrt( Math.pow(row,2) + Math.pow(col,2) )) );
	    }
	    
	    //Interpola cada valor de X utilizando o Interpolador de lagrange implementado na libs.Interpolation
	    var interpolateValue = function(value){
	    	var pos = Math.floor(value/self.distCollectors);
	    	var posMax = (self.profileRainfall.length)-1;
	    	var arr = new Array(); 
	    	var resObj;
	    	if (pos < 1){
	    		return self.profileRainfall[0].i;
	    	}	
	    	if ((pos >= 1) && (pos < posMax)){
	    		var x0 = self.profileRainfall[pos-1].r;
	    		var y0 = self.profileRainfall[pos-1].i
	    		arr.push([x0,y0]);
	    		var x1 = self.profileRainfall[pos].r;
	    		var y1 = self.profileRainfall[pos].i;
	    		arr.push([x1,y1]);
	    		var x2 = self.profileRainfall[pos+1].r;
	    		var y2 = self.profileRainfall[pos+1].i;
	    		arr.push([x2,y2]);
	    		resObj = Ext.create('App.libs.Interpolation',{
		    		input: value,
		    		data: arr,
		    		method: 1 //Quadratic
		    	});
		    	//console.log('v='+value+'..['+x0+';'+y0+']'+'...'+'['+x1+';'+y1+']'+'...'+'['+x2+';'+y2+']');
		    	return (resObj.interpolatedValue != null) ? resObj.interpolatedValue : 0;
	    	}
	    	if (pos >= posMax){
	    		return 0;
	    	}	    	
	    }	
	    
	    //INICIO
	    var self = this;
	    self.baseGrid = new Array();

		var len = self.profileRainfall.length;
		var maxRainfall = self.profileRainfall[0].i;
    	for (var col = 0; col < len; col++){   //column
	        var record = new Array();
	        for (var row = 0; row < len; row++){       //row    
	            var xValue = calcX(row,col);
	            var interpolated = interpolateValue(xValue);
	            if ((interpolated >= 0) && (interpolated <= maxRainfall))
	            	record.push(interpolated);	
	            if (interpolated < 0)
	            	record.push(0);
	            if (interpolated > maxRainfall)
	            	record.push(maxRainfall);	
	        }
	        self.baseGrid.push(record);
	    }
	},

	//Cria matriz zerada
	newZeroFilledArray: function(nCols, nRows){
		var zeroGrid = new Array();
		for (var c = 0; c < nCols; c++){ 	//column	 
	        var record = new Array();
	    	for (var r = 0; r < nRows; r++){ 		//row               
	            record.push(0);	            
	        }
	        zeroGrid.push(record);
	    }
	    return zeroGrid;
	},
	//Cria grid na posição A
	createArrRefA: function(sSprinkler,sLateral){
		var self=this;
		var grid = self.baseGrid;
		var Sc = self.distCollectors;
		if ((sSprinkler % Sc) != 0){
			Ext.Msg.show({
			     title:'Failure!',
			     msg: 'Distance between emitters is not a valid value.',
			     buttons: Ext.Msg.OK,
			     icon: Ext.Msg.ERROR
			});
			return 0;
		}
		if ((sLateral % Sc) != 0){
			Ext.Msg.show({
			     title:'Failure!',
			     msg: 'Distance between laterals is not a valid value.',
			     buttons: Ext.Msg.OK,
			     icon: Ext.Msg.ERROR
			});
			return 0;
		}
		
		var desiredCols = 1 + Math.floor(sSprinkler/Sc); //desejado
    	var desiredRows = 1 + Math.floor(sLateral/Sc);   //desejado   
    	var len = grid.length;  //número de coletores no baseGrid
    	var minLen = 1+Math.floor((self.adjustedRadius/Math.sqrt(2))/Sc); //número minimo de coletores para o qual a rotina é válida = Raio/Raiz(2)
    	if ((desiredCols >= len) && (desiredRows >= len)){
    		//rotina simples
    		var newGrid = self.newZeroFilledArray(desiredCols, desiredRows);
    		var nColsCopy = (desiredCols >= len) ? len : desiredCols; //Numero de colunas a copiar para a nova matriz	
    		var nRowsCopy = (desiredRows >= len) ? len : desiredRows; //Numero de linhas a copiar para a nova matriz
    		for (var c = 0; c < nColsCopy; c++){
    			for (var l = 0; l < nRowsCopy; l++){
	                newGrid[c][l] = grid[c][l]; //Copia a matriz original para a nova matriz
	            }
	        }
	        return newGrid;
    	}
    	if ((desiredCols < minLen) || (desiredRows < minLen)){
    		Ext.Msg.show({
			     title:'Failure!',
			     msg: 'Distance between laterals or sprinklers is too small.',
			     buttons: Ext.Msg.OK,
			     icon: Ext.Msg.ERROR
			});
			return 0;
    	}
    	else {
    		//rotina especial
    		var nCol = (desiredCols >= len) ? desiredCols : len; 
    		var nRow = (desiredRows >= len) ? desiredRows : len; 
    		var specialGrid = self.newZeroFilledArray(nRow,nCol);
    		for (var c = 0; c < len; c++){
    			for (var l = 0; l < len; l++){
	                specialGrid[c][l] = grid[c][l]; 
	            }
	        }
    		var nColsOverlap = 1 + (self.fullRadius - sLateral)/self.distCollectors; 
    		var nRowsOverlap = 1 + (self.fullRadius - sSprinkler)/self.distCollectors;
    		var colRef = len - nColsOverlap;
    		
    		//Parte 1 - Sobreposição de colunas - Aspersor localizado a esquerda do aspersor A
    		for (var c = 0; c < len; c++){
    			for (var l = 0; l < len; l++){
	                if (c < nColsOverlap){
	                	specialGrid[c][l] += grid[colRef][l]; 	
	                }		                
	            }
	            colRef++;
	        }
	        //Parte 2 - Sobreposição das linhas - Aspersor localizado acima do aspersor A
	        for (var c = 0; c < len; c++){
	        	var rowRef = len - nRowsOverlap;
    			for (var l = 0; l < len; l++){
	                if (l < nRowsOverlap){
	                	specialGrid[c][l] += grid[c][rowRef]; 
	                	rowRef++;
	                }		                
	            }
	        }
	        //Parte 3 - Cortar as bordas do grid conforme os espaçamentos desejados
	        var finalGrid = self.newZeroFilledArray(desiredRows,desiredCols); //É invertido mesmo... ok
	        for (var c = 0; c < desiredRows; c++){	    //Indices OK
    			for (var l = 0; l < desiredCols; l++){  //Indices OK
	                finalGrid[c][l] = specialGrid[c][l]; 		                
	            }
	        }		
	        return finalGrid;
    	}
	},
	//Cria grid na posição B
	createArrRefB: function(arrayA){
		var grid = Ext.Array.clone(arrayA);
    	grid.reverse();	
    	return grid;
	},
	//Cria grid na posição C
	createArrRefC: function(arrayA,cols,rows){
		var grid = this.newZeroFilledArray(cols,rows);
		for (var c = 0; c < cols; c++){               
	        var j = rows-1;
	    	for (var l = 0; l < rows; l++){    
	            grid[c][l] = arrayA[c][j];
	            j--;
	        }	        
    	}
    	return grid;
	},		
	//Cria grid na posição D
	createArrRefD: function(arrayB,cols,rows){
		var grid = this.newZeroFilledArray(cols,rows);
		for (var c = 0; c < cols; c++){               
	        var j = rows-1;
	    	for (var l = 0; l < rows; l++){    
	            grid[c][l] = arrayB[c][j];
	            j--;
	        }	        
    	}
    	return grid;
	},
	//Cria grid sobrepondo as 4 posições anteriores
	createArrOfSum: function(arrA,arrB,arrC,arrD,cols,rows){
    	var grid = new Array();
    	for (var c = 0; c < cols; c++){ 	//column	            
	        var record = new Array();
	    	for (var l = 0; l < rows; l++){ 		//row    
	            var sum = arrA[c][l]+arrB[c][l]+arrC[c][l]+arrD[c][l];
	            record.push(sum);	            
	        }
	        grid.push(record);
	    }
	    return grid;
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
	calcArrOfDeviation: function(arrSum, cols, rows, avg){
		var grid = new Array();
		for (var c = 0; c < cols; c++){ 	//column
	        var record = new Array();
	    	for (var l = 0; l < rows; l++){ 		//row    	            
	            var deviation = Math.abs(arrSum[c][l]-avg)
	            record.push(deviation);	            
	        }
	        grid.push(record);
	    }	
	    return grid;
	},
	calcCuc: function(sSprinkler, sLateral){
		var arrRefA = this.createArrRefA(sSprinkler,sLateral);
		var nRows = arrRefA[0].length;
    	var nCols = arrRefA.length;
		var arrRefB = this.createArrRefB(arrRefA,nCols,nRows);
		var arrRefC = this.createArrRefC(arrRefA,nCols,nRows);
		var arrRefD = this.createArrRefD(arrRefB,nCols,nRows);
		var arrOfSum = this.createArrOfSum(arrRefA,arrRefB,arrRefC,arrRefD,nCols,nRows);
		var average = this.calcAvgOfGrid(arrOfSum);
		var arrOfDeviation = this.calcArrOfDeviation(arrOfSum, nCols, nRows, average);
		var averageArrDeviation = this.calcAvgOfGrid(arrOfDeviation);
		
		var cuc = 100 * (1-(averageArrDeviation/average));
		return cuc;
	},
	/*//Calcula o CUC para um dado espaçamento entre laterais e aspersores - Arranjo retangular
	calcCuc: function(sSprinkler, sLateral){
		//Cria matriz zerada
		var newZeroFilledArray = function(nCols, nRows){
			var zeroGrid = new Array();
			for (var c = 0; c < nCols; c++){ 	//column	 
		        var record = new Array();
		    	for (var r = 0; r < nRows; r++){ 		//row               
		            record.push(0);	            
		        }
		        zeroGrid.push(record);
		    }
		    return zeroGrid;
		}
		//Cria grid na posição A
		var createArrRefA = function(){
			
			var grid = self.baseGrid;
			var Sc = self.distCollectors;
			if ((sSprinkler % Sc) != 0){
				Ext.Msg.show({
				     title:'Failure!',
				     msg: 'Distance between emitters is not a valid value.',
				     buttons: Ext.Msg.OK,
				     icon: Ext.Msg.ERROR
				});
				return 0;
			}
			if ((sLateral % Sc) != 0){
				Ext.Msg.show({
				     title:'Failure!',
				     msg: 'Distance between laterals is not a valid value.',
				     buttons: Ext.Msg.OK,
				     icon: Ext.Msg.ERROR
				});
				return 0;
			}
			
			var desiredCols = 1 + Math.floor(sSprinkler/Sc); //desejado
	    	var desiredRows = 1 + Math.floor(sLateral/Sc);   //desejado   
	    	var len = grid.length;  //número de coletores no baseGrid
	    	var minLen = 1+Math.floor((self.adjustedRadius/Math.sqrt(2))/Sc); //número minimo de coletores para o qual a rotina é válida = Raio/Raiz(2)
	    	if ((desiredCols >= len) && (desiredRows >= len)){
	    		//rotina simples
	    		var newGrid = newZeroFilledArray(desiredCols, desiredRows);
	    		var nColsCopy = (desiredCols >= len) ? len : desiredCols; //Numero de colunas a copiar para a nova matriz	
	    		var nRowsCopy = (desiredRows >= len) ? len : desiredRows; //Numero de linhas a copiar para a nova matriz
	    		for (var c = 0; c < nColsCopy; c++){
	    			for (var l = 0; l < nRowsCopy; l++){
		                newGrid[c][l] = grid[c][l]; //Copia a matriz original para a nova matriz
		            }
		        }
		        return newGrid;
	    	}
	    	if ((desiredCols < minLen) || (desiredRows < minLen)){
	    		Ext.Msg.show({
				     title:'Failure!',
				     msg: 'Distance between laterals or sprinklers is too small.',
				     buttons: Ext.Msg.OK,
				     icon: Ext.Msg.ERROR
				});
				return 0;
	    	}
	    	else {
	    		//rotina especial
	    		var nCol = (desiredCols >= len) ? desiredCols : len; 
	    		var nRow = (desiredRows >= len) ? desiredRows : len; 
	    		var specialGrid = newZeroFilledArray(nRow,nCol);
	    		for (var c = 0; c < len; c++){
	    			for (var l = 0; l < len; l++){
		                specialGrid[c][l] = grid[c][l]; 
		            }
		        }
	    		var nColsOverlap = 1 + (self.fullRadius - sLateral)/self.distCollectors; 
	    		var nRowsOverlap = 1 + (self.fullRadius - sSprinkler)/self.distCollectors;
	    		var colRef = len - nColsOverlap;
	    		
	    		//Parte 1 - Sobreposição de colunas - Aspersor localizado a esquerda do aspersor A
	    		for (var c = 0; c < len; c++){
	    			for (var l = 0; l < len; l++){
		                if (c < nColsOverlap){
		                	specialGrid[c][l] += grid[colRef][l]; 	
		                }		                
		            }
		            colRef++;
		        }
		        //Parte 2 - Sobreposição das linhas - Aspersor localizado acima do aspersor A
		        for (var c = 0; c < len; c++){
		        	var rowRef = len - nRowsOverlap;
	    			for (var l = 0; l < len; l++){
		                if (l < nRowsOverlap){
		                	specialGrid[c][l] += grid[c][rowRef]; 
		                	rowRef++;
		                }		                
		            }
		        }
		        //Parte 3 - Cortar as bordas do grid conforme os espaçamentos desejados
		        var finalGrid = newZeroFilledArray(desiredRows,desiredCols); //É invertido mesmo... ok
		        for (var c = 0; c < desiredRows; c++){	    //Indices OK
	    			for (var l = 0; l < desiredCols; l++){  //Indices OK
		                finalGrid[c][l] = specialGrid[c][l]; 		                
		            }
		        }		
		        return finalGrid;
	    	}
		}
		//Cria grid na posição B
		var createArrRefB = function(arrayA){
			var grid = Ext.Array.clone(arrayA);
	    	grid.reverse();	
	    	return grid;
		}
		//Cria grid na posição C
		var createArrRefC = function(arrayA,cols,rows){
			var grid = newZeroFilledArray(cols,rows);
			for (var c = 0; c < cols; c++){               
		        var j = rows-1;
		    	for (var l = 0; l < rows; l++){    
		            grid[c][l] = arrayA[c][j];
		            j--;
		        }	        
	    	}
	    	return grid;
		}
		//Cria grid na posição D
		var createArrRefD = function(arrayB,cols,rows){
			var grid = newZeroFilledArray(cols,rows);
			for (var c = 0; c < cols; c++){               
		        var j = rows-1;
		    	for (var l = 0; l < rows; l++){    
		            grid[c][l] = arrayB[c][j];
		            j--;
		        }	        
	    	}
	    	return grid;
		}
		//Cria grid sobrepondo as 4 posições anteriores
		var createArrOfSum = function(arrA,arrB,arrC,arrD,cols,rows){
	    	var grid = new Array();
	    	for (var c = 0; c < cols; c++){ 	//column	            
		        var record = new Array();
		    	for (var l = 0; l < rows; l++){ 		//row    
		            var sum = arrA[c][l]+arrB[c][l]+arrC[c][l]+arrD[c][l];
		            record.push(sum);	            
		        }
		        grid.push(record);
		    }
		    return grid;
		}
		//Calcula a média de um grid
		var calcAvgOfGrid = function(grid){
			var sumOfAvgs = 0;
			var n = 0;
			Ext.Array.each(grid,function(item, index){
				sumOfAvgs += Ext.Array.mean(item);
				n++;
			})
			return sumOfAvgs/n;
		}
		var calcArrOfDeviation = function(arrSum, cols, rows, avg){
			var grid = new Array();
			for (var c = 0; c < cols; c++){ 	//column
		        var record = new Array();
		    	for (var l = 0; l < rows; l++){ 		//row    	            
		            var deviation = Math.abs(arrSum[c][l]-avg)
		            record.push(deviation);	            
		        }
		        grid.push(record);
		    }	
		    return grid;
		}
		var self = this;
		var arrRefA = createArrRefA();
		var nRows = arrRefA[0].length;
    	var nCols = arrRefA.length;
		var arrRefB = createArrRefB(arrRefA,nCols,nRows);
		var arrRefC = createArrRefC(arrRefA,nCols,nRows);
		var arrRefD = createArrRefD(arrRefB,nCols,nRows);
		var arrOfSum = createArrOfSum(arrRefA,arrRefB,arrRefC,arrRefD,nCols,nRows);
		var average = calcAvgOfGrid(arrOfSum);
		var arrOfDeviation = calcArrOfDeviation(arrOfSum, nCols, nRows, average);
		var averageArrDeviation = calcAvgOfGrid(arrOfDeviation);
		
		var cuc = 100 * (1-(averageArrDeviation/average));
		return cuc;
	},*/
	
	calcUniformity: function(){
		var increment = this.overlapDistance;

    	var minDistSprinkler = Math.floor(this.fullRadius / Math.sqrt(2)) ;
    	var minDistLateral = minDistSprinkler;

    	var s1 = minDistSprinkler;
    	var s2 = minDistLateral;    	
		var arrResult = new Array();    	
    	var end = false;
    	while (!end){
	    	var i = 0;
	    	do {	    			    		
	    		var cuc = this.calcCuc(s1,s2);
	    		if (cuc > 50){
	    			var record = [s1,s2,cuc];
	    			arrResult.push(record);
	    		}  		
	    		s2 += increment;
	    		if ((i==0) && (cuc<50))
	    			end = true;	
	    		i++;    			    		
	    	} while (cuc > 50);     	
	    	s1 += increment;
	    	s2 = s1;
    	}
    	return arrResult;
	},

	createArrChart: function(sSprinkler,sLateral){
		var arrRefA = this.createArrRefA(sSprinkler,sLateral);
		var nRows = arrRefA[0].length;
    	var nCols = arrRefA.length;
		var arrRefB = this.createArrRefB(arrRefA,nCols,nRows);
		var arrRefC = this.createArrRefC(arrRefA,nCols,nRows);
		var arrRefD = this.createArrRefD(arrRefB,nCols,nRows);
		var arrOfSum = this.createArrOfSum(arrRefA,arrRefB,arrRefC,arrRefD,nCols,nRows);
		return arrOfSum;
	}
});
