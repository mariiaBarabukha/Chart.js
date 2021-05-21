// import Model from "../Model.js"
import Model from "../Model.js";
import colorLib from '../../node_modules/@kurkle/color/dist/color.esm.js';
import ColorManager from "../Utils/ColorManager.js"
class DataSetsMaker{
    rows_names = []; //countries
    columns_names = []; //categories and colors
    amount_of_params = 0;
    // measures_names = []; //price and quantity
    _data = undefined;


    constructor(data){
        this._data = data.data;
        // data.names.rows[0].forEach(n => {
        //     this.rows_names.push(n.name);
        // });
        data.names.columns.forEach(n => {
            this.columns_names.push(n.name);
        });

        // data.names.measures.forEach(n => {
        //     this.measures_names.push(n.name);
        // });
        
        
    }

    makeDataSets(req){     

      return this._ask(req);
    }

    

    _ask(request){
        var sets = [[]];        
        var _rows = request.rows;
        // this.rows_names = _ro
        var _cols = request.columns;
        var labels = [];
        for(var i = 0; i < _rows[0].filter.length; i++){            
            var label = _rows[0].filter[i];
            labels.push(label);
            for(var j = 0; j < _cols[i].length; j++){
                var _name = _cols[i][j].name;
                var _value = _cols[i][j].value;
                if(sets[j] === undefined)
                    sets.push([]);
                var _filt_vals = _cols[i][j].filter[0].values
                var _filt_name = _cols[i][j].filter[0].name
                for(var k = 0; k < _filt_vals.length; k++){
                    var _filt_value = _filt_vals[k];
                    for(var m = 0; m <  _filt_value.length; m++){
                      //console.log(sets[j]);
                      
                      sets[j].push({
                          layer:k,
                          name:_name,
                          value:_value,
                          filt_name:_filt_name,
                          filt_value:_filt_value[m]
                      });
                    }
                    
                }
            }
        }
        
        return this._respond(sets,labels,request.measures[0].name, _rows[0].filter.length);
    };

    _respond(sets, labels, measures, _amount){
        this.amount_of_params = sets.length;
        //var colors = new ColorManager(["rgba(255,0,0,0.4)", "rgba(0,0,255,0.4)"], );
        var datasets = [];       
       // var sets_len = sets.length;
        var c = 0;
        sets.forEach(set => {
            
            var color = Model.colorManager.main_colors[c++];
            var group_len = set.length/_amount;
            for(var i = 0; i < group_len;i++){
              var data = [];
              var label = set[i].value+'_'+set[i].filt_value;
                for(var j = 0; j < this._data.columns.length; j++){
                    // var v1 = this._data.columns[j][set[i].name];
                    // var v2 = set[i].filt_value;
                    // var v3 = this._data.columns[j][set[i].filt_name];
                    for(var a = 0; a < _amount; a++){
                      if(set[i+ a*group_len].value === this._data.columns[j][set[i+ a*group_len].name] && 
                        set[i+ a*group_len].filt_value === this._data.columns[j][set[i+ a*group_len].filt_name]){
                            var ind = (j*_amount) + a;
                            var val = this._data.measures[measures][ind] || 0;
                            data.push(val);
                          }
                      }
                    
                    // if(set[i+group_len].value === this._data.columns[j][set[i+group_len].name] && 
                    //   set[i+group_len].filt_value === this._data.columns[j][set[i+group_len].filt_name]){
                    //       var ind = (j*sets_len) + 1;
                    //       var val = this._data.measures[measures][ind] || 0;
                    //       data.push(val);
                    // }
                }
              if(datasets[set[i].layer] === undefined){
                datasets.push([]);
              }
              if(set[i].layer > 0){
                color = Model.colorManager.getNextColor(color);
              }
              datasets[set[i].layer].push({
                  label:label,
                  data:data,
                  backgroundColor: [color],
                 
  
              });
            }
           
            // color_index++;
        });
        console.log(datasets);
        return {labels: labels, datasets:datasets};
    }  
    
    
}

export default DataSetsMaker;