import DataSetsMaker from "./DataSetsMaker.js"


class DataStorage{
    //#queries = undefined;
    #datasets = undefined;
    #amount_main_groups = undefined;
    #visibleLayers = [];
    labels = undefined;
    constructor(data, req){
       if(data && req){
        this.setData(data, req);
       }
    }


    setData(data, req){
        var q = new DataSetsMaker(data);
        var res = q.makeDataSets(req);
        this.#datasets = res.datasets;
        this.labels = res.labels;
        this.#amount_main_groups = q.amount_of_params;
        for(var i = 0; i < this.#amount_main_groups; i++){
            this.#visibleLayers.push(0);
        }
    }


    getAllDataSets(){
        return this.#datasets;
    }

    getVisibleDataSets(visible){
        this.#visibleLayers = visible || this.#visibleLayers;
        var res = [...this.#datasets[0]];
        for(var i = this.#visibleLayers.length-1; i >= 0; i--){
            if(this.#visibleLayers[i] === 0){
                continue;
            }
            var temp = this.#datasets[this.#visibleLayers[i]];
            var amount = temp.length/this.#amount_main_groups;
            var i_start = i * amount;

            for(var j = i_start+amount-1; j >= i_start; j--){
                res.splice(i+1,0,this.#datasets[this.#visibleLayers[i]][j]);
            }
        }
        return res;
    }
}

export default DataStorage;