import DataSetsMaker from "./DataSetsMaker.js"


class DataStorage{
    //#queries = undefined;
    #datasets = undefined;
    #amount_main_groups = undefined;
    #visibleLayers = [];
    labels = undefined;
    q = undefined;
    constructor(data){
        this.q = new DataSetsMaker(data);
       if(data){
        this.setData(data);
       }
    }


    setData(data, req){
        
        var res = this.q.makeDataSets();
        this.#datasets = res.sets;
        this.labels = res.labels;
        var temp = [];
        this.#amount_main_groups = this.q.amount_of_params;
        for(var i = 0; i < res.sets[0].length; i++){
            temp.push(0);
        }
        this.#visibleLayers.push(temp);

        temp = [];
        for(var i = 0; i < this.q.rows_filters[0].length; i++){
            temp.push(0);
        }
        this.#visibleLayers.push(temp);
    }


    getAllDataSets(){
        return this.#datasets;
    }

    getVisibleDataSets(visible, mode){
        if(mode === "columns"){
            this.#visibleLayers[0] = [...visible];
            visible = null;
        }
        if(mode === "rows"){
            this.#visibleLayers[1] = [...visible];
            visible = null;
        }
        return this.q.getVisibleDataSets(this.#datasets, this.labels, visible || this.#visibleLayers);        
    }

    getFirstLayerDataSets(){
        var temp = [...this.#visibleLayers];
        for (var i = 0; i < temp[0].length; i++){
            temp[0][i] = 0;
        }
        return this.q.getVisibleDataSets(this.#datasets, this.labels, temp);     
    }

    getFirstRowLayer(){
       var temp = [];
       this.#visibleLayers[1].forEach(element => {
           temp.push(0);
       });
        return this.q.getVisibleDataSets(this.#datasets, this.labels, [this.#visibleLayers[0], temp]);
    }

    getVisibleLayersScheme(){
        return this.#visibleLayers;
    }
}

export default DataStorage;