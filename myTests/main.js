
import Chart from '../src/index.js';
import {dataLayer1} from './myData.js';
// import Model from "./Model.js";
import {dataLayer2} from './myData.js';
import DataStorage from "./Data/DataStorage.js"
import ColorManager from "./Utils/ColorManager.js";
import Model from './Model.js';
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
fetch('./dataForTest.json')
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
    Model.dataStorage = new DataStorage(data, req);
    console.log(Model.dataStorage);

    var d = new DataStorage(data, req);
    // JSON.parse(text)
      // Model.getInstance().dataStorage = d;
      //console.log(d.getAllDataSets());
      var myData = {labels: d.labels, datasets: d.getVisibleDataSets()};
     
      
    
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
  }
    // {return data}
    );
console.log(input);





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


