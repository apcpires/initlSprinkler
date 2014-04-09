Ext.define('App.libs.LoadTxtFile', {
	reader: "",
	arrayTxt: "",	
	config: {		
		tagInput: ""
	},	

	constructor : function(options) {
		this.reader = new FileReader();
		
		Ext.apply(this, options || {});

		this.readText(this.tagInput);
	},

	isThereHTML5 : function() {	
		
		if (window.File && window.FileReader && window.FileList && window.Blob) {
		 	return true;
		} else {
			alert('This web application requires HTML5, which is not supported in this browser. Update your browser and try again. Google Chrome is the recommended browser for this web application.');
		    return false;
		}
	},

	isTextFile: function(filename){
		var extension = filename.split('.').pop();
		return (extension == 'txt') ? true : false; 	
	},

	setArrayTxt: function(value){
		this.arrayTxt = value;
	},

	getArrayTxt: function(){
        return this.arrayTxt;
	},

	readText: function(input){ //referência da tag html input
		var thisClass = this;
		var reg = new Array();
		if (this.isThereHTML5()){				
			var f = input.files[0];  //Pega o primeiro arquivo do FileList object				
			if (f) {
				if (this.isTextFile(f.name)){ // Testa se o arquivo é um txt
      				this.reader.onload = function(e) { //"e" é um objeto ProgressEvent							
						var contents = e.target.result; //Armazena o conteudo do arquivo
						contents = contents.split('\n');						
						for (var i=0; i<contents.length; i++){
							reg.push(parseFloat(contents[i]));								
						}
						thisClass.setArrayTxt(reg);						
					}
      				this.reader.readAsText(f);
    			} else { 
			    	alert("Failed to load file");
			    }
			}
		}
	}
});
