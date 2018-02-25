function crossReferenceLangs(arrNative, arrFluent, arrLearning){
      var arrExceptions = ["Welsh", "Gaelic"];
      
      var arrOutput = arrNative;
      for (var i = 0; i < arrNative.length; i++){
            if (!isValueInArr(arrLearning, arrNative[i]))
                 arrOutput[i] = arrOutput[i] + createEmptyStr(20 - arrOutput[i].length) + "N";
            else if (!isValueInArr(arrFluent, arrNative[i]))
                     arrOutput[i] = arrOutput[i] + createEmptyStr(20 - arrOutput[i].length) + "N/L";
      } 
      for (var i = 0; i < arrLearning.length; i++){
            if (isValueInArr(arrExceptions, arrLearning[i])){
                  if (arrLearning[i] == "Welsh" || arrLearning[i] == "Gaelic")
                         arrOutput.push(arrLearning[i] + createEmptyStr(20 - arrLearning[i].length) + "<Celtic>");         
            }     
            else if (!isValueInArr(arrOutput, arrLearning[i]))
               arrOutput.push(arrLearning[i] + createEmptyStr(20 - arrLearning[i].length) + "L");
      }
      for (var i = 0; i < arrOutput.length; i++){
          if (arrOutput[i] == "Esperanto")
                arrOutput[i] = arrOutput[i] + createEmptyStr(20 - arrOutput[i].length) + "F/L";
          else if (isValueInArr(arrFluent, arrOutput[i])){
                arrOutput[i] = arrOutput[i] + createEmptyStr(20 - arrOutput[i].length) + "[All]";
          }
      }              

      arrOutput = arrOutput.sort(function(a,b){
            if (a > b) return 1;
            if (a < b) return -1;
            if (a == b) return 0;  
      });
      return arrOutput;
}
