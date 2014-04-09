Ext.define('App.libs.GridResultsEquations', {
	//propriedades
	
	config: {		
		arrayRainfall: "",
		distCollectors: 1
	},	

	constructor : function(options) {		
		Ext.apply(this, options || {});
	},

	calcRainfallAvg: function (){
		var total = 0;
		var v = this.arrayRainfall;
		for (var i=0; i < v.length; i++){
			total +=v[i].rainfall;
		}
		return (total/v.length);
	},

	calcVolApplied: function(){
		var vTotal = 0;
		for (var i=0; i < this.arrayRainfall.length; i++){
			var radius = this.arrayRainfall[i].radius;
			var rainfall = this.arrayRainfall[i].rainfall;
			var vApplied = 2 * Math.PI * radius * this.distCollectors * rainfall;
			vTotal += vApplied;
		}
		return vTotal;
	},

	calcArrResults: function(){
		var vCumul = 0;
		var rainfallAvg = this.calcRainfallAvg();
		var vTotal =this.calcVolApplied();
		var arr = new Array();
		for (var i=0; i < this.arrayRainfall.length; i++){
			var radius = this.arrayRainfall[i].radius;
			var rainfall = this.arrayRainfall[i].rainfall;
			var vApplied = 2 * Math.PI * radius * this.distCollectors * rainfall;
			vCumul += vApplied;
			var vTheoretical = 2 * Math.PI * radius * this.distCollectors * rainfallAvg;
			var txVcumVtot = vCumul / vTotal;
			var record = [(i+1),radius,rainfall,vApplied,vTheoretical,vCumul,txVcumVtot,rainfallAvg];
			arr.push(record);
		}  
		return arr;
	},

	/*
	Função para interpolação linear de valores e determinação do raio de alcance do aspersor
	Parâmetros:
		arrResults: array gerada pelo método calcArrResults
		level: poder ser a fração de Vcum/Vtotal (0.85, 0.90, 0.95) ou o valor 0.3 mm/h usando-so o método padrão
		isDefaultMethod:    true = passar o valor 0.3 como argumento do parâmetro level (critério padrão);
							false = critério IRSTEA. Passar fraçao de Vcum/Vtotal
	*/
	calcJetLength: function(arrResults, level, isDefaultMethod){
		var jetLength = 0;
		var r1 = 0;
		var r2 = 0;
		var tx1 = 0;
		var tx2 = 0;
		for (var i=0; i < arrResults.length; i++){
			if (isDefaultMethod)
				var refValue = arrResults[i][2];
			else
				var refValue = arrResults[i][6]; // posição 6 do model GridResults
			
			var radius = arrResults[i][1]; // posição 1 do model GridResults
		
			if (refValue == level){
				jetLength = radius;
				break;
			}

			if (isDefaultMethod){
				if (refValue > level){
					r1 = radius;
					tx1 = refValue;
				}
				if ((refValue < level)){
					r2 = radius;
					tx2 = refValue;
					jetLength = radius - (((tx2-level)*this.distCollectors)/(tx2-tx1));
					break;
				}		
			}
			else { 
				if (refValue < level){
					r1 = radius;
					tx1 = refValue;
				}
				if ((refValue > level)){
					r2 = radius;
					tx2 = refValue;
					jetLength = radius - (((tx2-level)*this.distCollectors)/(tx2-tx1));
					break;
				}	
			}		
		}
		
		return jetLength;		
	},

	calcArrJetLengths: function(arrResults){
		
		var jetLen85 = this.calcJetLength(arrResults,0.85,false);
		var jetLen90 = this.calcJetLength(arrResults,0.90,false);
		var jetLen95 = this.calcJetLength(arrResults,0.95,false);
		var jetLen03 = this.calcJetLength(arrResults,0.30,true);
		var arrJetLen = [jetLen85, jetLen90, jetLen95, jetLen03];
		return arrJetLen;
	}


});
