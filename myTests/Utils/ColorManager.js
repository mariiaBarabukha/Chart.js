import colorLib from '../../node_modules/@kurkle/color/dist/color.esm.js';
import {color} from '../../src/helpers/helpers.color.js';
class ColorManager{
    main_colors = undefined;
    allColors = [[],[]];
    constructor(colors){
        this.main_colors = colors;  
        this.generateColorsFor();     
    }

    generateColorsFor(){
        this.allColors[0] = this.main_colors;
        this.main_colors.forEach(main_color => {
            
            for(var i = 0; i < 10; i++){
                if(this.allColors[1][i] === undefined){
                    this.allColors[1][i] = [];
                }
                main_color = colorLib(main_color).opaquer(-0.95);
                this.allColors[1][i].push(main_color);
            }
        });        
    }

    getNextColor(_color){
        //console.log(color(colorLib(_color).opaquer(-0.95)))
        var res = colorLib(_color).saturate(20).opaquer(-0.2)._rgb
        return "rgba("+res.r+","+res.g+","+res.b+','+res.a+')';
    }
}

export default ColorManager;