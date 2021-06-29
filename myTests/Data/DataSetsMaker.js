// import Model from "../Model.js"
import LabelsController from "../LabelsController.js";
import Model from "../Model.js";

class DataSetsMaker{
    rows_names = []; //names
    rows_filters = []; // name of countries and quartals
    columns_names = []; //names
    column_filters = [];
    amount_of_params = 0;
    // measures_names = []; //price and quantity
    _data = undefined;
    #visible = undefined;


    constructor(data){
        this._data = data.data;
        data.names.rows.forEach(n => {
            this.rows_names.push(n.name);     
            this.rows_filters.push(n.filter);       
        });
       

        data.names.columns.forEach(n => {
          this.columns_names.push(n.name);    
               
      });
        // data.names.measures.forEach(n => {
        //     this.measures_names.push(n.name);
        // });
        
        
    }

    makeDataSets(){   
      return this._groupAndGetData();
    }

    

    _groupAndGetData(){
        var sets = [];        
        var _rows = this._data.rows;
        // this.rows_names = _ro
        var _cols = this._data.columns;
        var labels = [];
      
        for(var i = 0; i < this.rows_filters[1].length; i++){
          sets.push([]);
        }
        for(var i = 0; i < _rows.length; i++){   //row number
            var row_name = _rows[i][this.rows_names[0]];   
            var row_value = _rows[i][this.rows_names[1]];        
            var label = row_name +(row_value === "Total" ? "" : " " + row_value);
            labels.push(label);
            var cols = [];
            sets[i%this.rows_filters[1].length].push({
              row_name, row_value, cols
            }); 
            
        }


        for(var j = 0; j < _cols.length; j++){ //column number
          var col_name = _cols[j][this.columns_names[0]];
          var col_value = _cols[j][this.columns_names[1]];
          sets.forEach(set => { //quart coord
            set.forEach(subset =>{ //country coord
              
              subset.cols.push({col_name, col_value});
            })
          });

          
        }
        sets.forEach(set => {
          var temp;
          set.forEach(subset =>{
            
            temp = this._regroup(subset.cols);
            subset.cols = temp;
          })
          
        });
        for(var a = 0; a < sets.length; a++){ //quartal
          for(var b = 0; b < sets[a].length; b++){//country
            var set = sets[a];
            for(var c = 0; c < set[b].cols.length; c++){//color
              var col = set[b].cols[c];
              for(var d = 0; d < col.length; d++){//category
                var temp = col[d];
                var index = (d * (col.length + 1) + c) *  sets[a].length * sets.length + sets.length * b + a;
                temp.measure = this._data.measures.Price[index];
              }
            }
          }
        }
        console.log(sets);
        LabelsController.setSets(sets);
        return {sets,labels};
    };

    _regroup(arr){
      
      var groups = {};
      return arr.reduce(function (result, item) {
        var key = item.col_value;
        var group = groups[key];
        if (!group)
            result.push(group = groups[key] = []);
        group.push(item);
        return result;
    }, []);
    }

    getVisibleDataSets(sets, labels, visible){
        
        //var colors = new ColorManager(["rgba(255,0,0,0.4)", "rgba(0,0,255,0.4)"], );
        var datasets = [];  
        var curr_labels = [];
        //visible[1][1] = 1; 
        // visible[0][1] = 1; 
        var rows_indexes = [];
        var cols_indexes = [];

        visible[1].forEach(index => {
          if(index === 0){
            rows_indexes.push([0]);
          }else{
            var temp = [...this.rows_filters[1]].slice(1);
            var temp2 = [];
            temp.forEach(e => {
              temp2.push(this.rows_filters[1].indexOf(e));
            });
            rows_indexes.push(temp2);
          }
        });

        visible[0].forEach(index => {
          if(index === 0){
            cols_indexes.push([0]);
          }else{
            var temp = [];

            for(var i = 0; i <= sets[0][0].cols[0].length; i++){
              temp.push(i);
            }
            cols_indexes.push(temp);
          }
        });

        var datasets = [];
        for(var i = 0; i < cols_indexes.length; i++){//category
          var data = [];
          var color = Model.colorManager.main_colors[i];
          for(var j = 0; j < rows_indexes.length; j++){//country

            
            rows_indexes[j].forEach(row_index => {//quartal
              if(i === 0)
              curr_labels.push(labels[j*this.rows_filters[1].length+row_index]);
             cols_indexes[i].forEach(col_index => {//color
               var temp = sets[row_index][j].cols[col_index][i];
               if(temp === null){
                 temp = 0;
               }
               data.push(temp);
             });
            });
          }
          
          if(cols_indexes !== [0]){
            data = this._regroup(data);

          }

          var len = sets[0][0].cols[0].length+1;
          var ind = i*len+parseInt(cols_indexes[i]);
         
          data.forEach(d => {
            var label = d[0].col_name + 
            (d[0].col_value === "Total" ? "" : " "+d[0].col_value);
            let result = d.map(a => a.measure);
            datasets.push({
              label: label,
              data: result,
              backgroundColor: [color]
            });
          });
          
        }

       
        return {labels: curr_labels, datasets: datasets};
    }  
    
    
}

export default DataSetsMaker;