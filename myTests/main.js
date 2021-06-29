
import Chart from '../src/index.js';
import {dataLayer1} from './myData.js';
// import Model from "./Model.js";
import {dataLayer2} from './myData.js';
import DataStorage from "./Data/DataStorage.js"
import ColorManager from "./Utils/ColorManager.js";
import Model from './Model.js';
import LabelsController from './LabelsController.js';
var ctx = document.getElementById('myChart');
//const data = dataLayer1;


// function readTextFile(file, callback) {
//   var rawFile = new XMLHttpRequest();
//   rawFile.overrideMimeType("application/json");
//   rawFile.open("GET", file, true);
//   rawFile.onreadystatechange = function() {
//       if (rawFile.readyState === 4 && rawFile.status == "200") {
//           callback(rawFile.responseText);
//       }
//   }
//   rawFile.send(null);
// }

var input =
fetch('./dataForTest2.json')
  .then(response => response.json())
  .then((data) => {
    
    Model.colorManager = new ColorManager(["rgba(255,0,0,0.4)", "rgba(0,0,255,0.4)", "rgba(0,255,0,0.4)"]);
    var req = {
      rows: [
        {
          name:"Countries",
          filter:["United States", "France", "Australia"]
        }
      ],
      columns:[
        [
          {
            name:"Category",
            value:"Accessories",
            filter:[{
              name:"Color",
              values:[["Total"], ["green", "red","white"]]
            }]
          },
          {
            name:"Category",
            value:"Clothing",
            filter:[{
              name:"Color",
              values:[["Total"], ["green", "red","white"]]
            }]
          },

          {
            name:"Category",
            value:"Components",
            filter:[{
              name:"Color",
              values:[["Total"], ["green", "red","white"]]
            }]
          }
        ],
        [
          {
            name:"Category",
            value:"Accessories",
            filter:[{
              name:"Color",
              values:[["Total"], ["green", "red","white"]]
            }]
          },
          {
            name:"Category",
            value:"Clothing",
            filter:[{
              name:"Color",
              values:[["Total"], ["green", "red","white"]]
            }]
          },

          {
            name:"Category",
            value:"Components",
            filter:[{
              name:"Color",
              values:[["Total"], ["green", "red","white"]]
            }]
          }
        ],
        [
          {
            name:"Category",
            value:"Accessories",
            filter:[{
              name:"Color",
              values:[["Total"], ["green", "red","white"]]
            }]
          },
          {
            name:"Category",
            value:"Clothing",
            filter:[{
              name:"Color",
              values:[["Total"], ["green", "red","white"]]
            }]
          },
          {
            name:"Category",
            value:"Components",
            filter:[{
              name:"Color",
              values:[["Total"], ["green", "red","white"]]
            }]
          }
        ]
      ],
      measures:[
        {
          name:"Price"
        }
      ]
      
    }
    Model.dataStorage = new DataStorage(data);

    var d = new DataStorage(data);
    var myData = d.getVisibleDataSets();
     
    console.log(myData);
      
    
    const config = {
        type: 'bar',
        data: myData,
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Bar Chart'
            }            
          },
          
        },
    };
    
    
    var chart = new Chart(ctx, config);
    document.getElementById("myChart").onclick = function(evt){    
      
      LabelsController.changeVisibility(chart, evt);     
    }
      
    // document.getElementById("open").onclick = function open(){
    //   console.log("a");
    //   chart.data.labels.splice(0,0,"extra");
    //   const data = chart.data.datasets;
    //   data.forEach(d => {
    //     d.data.splice(0,0,0);
    //   });
    //   data[0].data[0] = 5000;
    //   // const dsColor = ["rgba(0,255,255,0.4)"];
    //   // const newDataset = {
    //   //   label: 'New data',
    //   //   backgroundColor: dsColor,
    //   //   borderColor: dsColor,
    //   //   borderWidth: 1,
    //   //   data: [5000],
    //   // };
    //   // chart.data.datasets.push(newDataset);
    //   chart.update();    
    // }
  }
 
);






 // Model.getInstance().dataStorage = new ColorManager(["rgba(255,0,0,0.4)", "rgba(0,0,255,0.4)"]);
  

//console.log(dataJSON);



// document.getElementById("addDataSet").onclick = function addDataSet(){
//     const data = chart.data;
//       const dsColor = ["rgba(0,255,0,0.4)"];
//       const newDataset = {
//         label: 'Dataset 3',
//         backgroundColor: dsColor,
//         borderColor: dsColor,
//         borderWidth: 1,
//         data: [5,3,5,9,7],
//       };
//       chart.data.datasets.push(newDataset);
//       chart.update();    
// }

// document.getElementById("removeDataSet").onclick = function removeDataSet(){
//     //const index = chart.data.datasets.indexOf(0);
//     //console.log(chart.data.datasets.indexOf(0));
//     chart.data.datasets.splice(0, 1);
//     console.log(chart.data.datasets);
//     chart.update();
// }



//console.log(dataJSON);


