export class Label{
    
    width = undefined;
    heiht = undefined;
    right = undefined;
    left = undefined;
    top = undefined;
    bottom = undefined;
    text = undefined;
    layer = undefined;
    index = undefined;

    constructor(left, right, top, bottom, layer, index, text){
        this.bottom = bottom;
        this.left = left;
        this.right = right;
        this.top = top;
        this.heiht = bottom - top;
        this.width = right - left;
        this.layer = layer;
        this.index = index;
        this.text = text;
    }
}

export class LabelsManager{

}