Ext.define('App.libs.Interpolation', {
	//propriedades
	success: true,
	msg: '',
	arrObj: '',
	config: {		
		method: '',
		data: '',   //array do tipo [x,y]
		input: '',
	},
	constructor : function(options) {		
		Ext.apply(this, options || {});
		
		var result = null;
		if (this.inputValueBelongsToDataSet()){
			this.arrObj = this.convDataToArrObj();
			if (this.method === 0) //linear 
				result = this.linear();
			if (this.method === 1) //Quadratico
				result = this.quadratic();
			if (this.method == 2) //Lagrange
				result = this.lagrange();
			if (this.method == 3) //Gregory-Newton
				result = this.gregoryNewton();

			return ({'interpolatedValue': result, 'success': this.success, 'msg': this.msg});	
		}
		else {
			return ({'interpolatedValue': null, 'success': this.success, 'msg': this.msg});			
		}
	},

	inputValueBelongsToDataSet: function(){
		x = this.input;
		var arr = this.data;
		var n = arr.length;
		var xMin = arr[0][0];
		var xMax = arr[n-1][0];
		if ((x < xMin) || (x > xMax)){
			this.success = false;
			this.msg = 'O valor de X a ser interpolado não pertence ao intervalo de dados informado.'
			return false;
		}
		else
			return true;
	},

	convDataToArrObj : function(){
		var n = this.data.length;
		var arr = this.data;
		var newArr = new Array();
		for (var i=0; i<n; i++){
			newArr.push({'x':arr[i][0],'y':arr[i][1]});
		}
		return newArr;
	},
	
	linear: function(){
		var x1, x2, y1, y2, x, y, pos;

		x = this.input;
		var arr = this.arrObj;
		Ext.Array.each(arr, function(item, index, array){
			if (item.x > x){
				pos = index;
				return false;
			}
		});
		x1 = arr[pos-1].x;
		y1 = arr[pos-1].y;
		x2 = arr[pos].x;
		y2 = arr[pos].y;
		
		y = (((x-x1) * (y2-y1))/(x2-x1)) + y1;
		return y;
	},

	lagrange: function(){
		var arr = this.arrObj;
		var n =  arr.length; 
		var x = this.input;
		var y = 0;
		for (var i=0; i<n; i++){
			var l = 1;
			for (var j=0; j<n; j++){
				if (j != i){
					var xj = arr[j].x;
					var xi = arr[i].x; 
					l *= (x-xj)/(xi-xj);
				}
			}
			var yi = arr[i].y;  
			y += yi * l;
		} 	
		return y;
	},

	gregoryNewton: function(){
		var arr = this.arrObj;
		var n =  arr.length; 
		var x = this.input;
		var h = arr[1].x - arr[0].x;		
		for (var i=2; i<n; i++){
			var hTemp = arr[i].x - arr[i-1].x;		
			if (hTemp != h){
				this.success = false;
				this.msg = 'O método de Gregory-Newton exige que os valores de X sejam equidistantes.'
				return false;	
			}
		}
		var table = new Array(); //Tabela de diferenças
		var rec = new Array();
		for (var i=0; i<n; i++){
			rec.push(arr[i].y);
		} 
		table.push(rec);
		for (var k=n, j=0; k>1; k--,j++){
			var rec = new Array();
			for (var i=1; i<k; i++){			
				var dif = table[j][i] - table[j][(i-1)];
				rec.push(dif);				
			}
			table.push(rec);
		}
		var ux = (x - arr[0].x)/h;
		var somatorio = 0;
		for (var i=1; i<n; i++){
			var produtorio = 1;
			for (var j=0; j<i; j++){
				produtorio *= (ux - j);
			}
			somatorio += (table[i][0]/this.fatorial(i))*produtorio;
		}
		var y = arr[0].y + somatorio;
		return y;
	},

	quadratic: function(){ //Utiliza o polinomio de lagrange com grau 2
		var arr = this.arrObj;
		if (arr.length == 3){
			return this.lagrange();
		} 
		else{
			this.success = false;
			this.msg = 'O conjunto de dados deve ter 3 pares de pontos.'
			return false;	
		}
	},

	fatorial: function(v){
		var r = 1;
		for (var i=v; i>0; i--)
			r *= i;
		return r;
	}
});
1