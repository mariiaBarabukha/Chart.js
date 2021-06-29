import Model from "./Model.js";

export class LabelsController{

    static #labels = undefined;
    static #visible = undefined;
    static #sets = undefined;
    
    // constructor(labels, visible){
    //     this.#labels = labels;
    //     this.#visible = visible;
    // }

    
    static setSets(sets){
        this.#sets = sets;
    }

    static changeVisibility(chart, evt){
        
        var clickedElement = chart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
        if(clickedElement.length === 0 || clickedElement[0].constructor.name !== "Label"){
            return;
        }
        console.log(clickedElement);
        var visible = Model.dataStorage.getVisibleLayersScheme();
       // this.#visible = [...visible];
        // chart.data.datasets[0].data.forEach(set => {
        //   visible.push(0);
        // });
        var temp = Model.dataStorage.getFirstRowLayer();
        var labels = temp.labels;
        var globalIndex = labels.indexOf(clickedElement[0].text.trim());
        // if(clickedElement.length > 0){
        //   var opened = () =>{
        //       var res = 0;
        //       visible[1].forEach(elem => {
        //           res += (elem * (this.#sets.length-1));
        //       });
        //       return res;
        //   } 
        visible[1][globalIndex] = 1;
        var res = Model.dataStorage.getVisibleDataSets(visible[1], "rows");
        chart.data.datasets = res.datasets;
        chart.data.labels = res.labels;
        chart.update();
          
        
    }
}

export default LabelsController;