export let constValue = "Just a string x"

// export const today = createTodaysDateAsDataDate();


export const errorMessages ={
    invalidFormat : `Please check date format. Format should be `,
    invalidMonth: `Invalid Month.  Please enter a value between 1 and 12`,
    invalidDate: `Invalid date. Please enter a value between 1 and 31`,
    pastMaxDate: `Past the maximum allowed date`,
    beforeMinDate : `The Date is too early`
}

export const dataDateFormat = "yyyy-mm-dd"
export const isNum = /^[0-9]*$/
export const isDelineator = /[\s,/-]+/

export const checkIfIsDataDate = (dateString)=>{
    if(dateString===null ||dateString==="today") return;
    let error = false
    
    for(var i =0;i<dateString.length;i++){
      if(i!=4 && i!=7 && isNaN(dateString[i])) error = true
    }

   if(dateString[4]!='-' || dateString[7]!='-') error = true

   if(error) console.error(`MESSAGE FROM REACT ADA DATEPICKER: Please check your minDate or maxDate format. ${dateString} is not a valid format. Format must be in data date form yyyy-mm-dd`)
}


//data date and min/max date formats are the same 
export const splitByDelineator = (date) =>{
   const delineated =  date.split(isDelineator)

   return delineated
};
export const createTodaysDateAsDataDate = ()=>{ 
    let today = new Date();
    return convertJSDayToDataDate(today)
}

export const splitDataDateAndCreateNewDate = (dataDate, dataDateFormat) =>{
    var parts = splitByDelineator(dataDate);
    var formatParts =  splitByDelineator(dataDateFormat);
    
    if ((parts.length === 3) &&
      Number.isInteger(parseInt(parts[0])) &&
      Number.isInteger(parseInt(parts[1])) &&
      Number.isInteger(parseInt(parts[2])) ) 
      {
        var month = parseInt(parts[formatParts.indexOf('mm')]) - 1;
        var day = parseInt(parts[formatParts.indexOf('dd')]);
        var year = parseInt(parts[formatParts.indexOf('yyyy')]);
        
      
        return new Date(year, month, day)
  }
  else {
     
      return null;
  }
}



export const createDateFieldMapObj = (formattedDate, dateFormat) =>{
    //max and min date ar not in data date format
    
    let dateValues= splitByDelineator(formattedDate);
    let formatFields = splitByDelineator(dateFormat);

    
    let obj = {}

    if(dateValues.length ===3){
        for(var i=0; i<dateValues.length; i++){
            
            if( dateValues[i].length === formatFields[i].length && !obj[formatFields[i]]){
               
                obj[formatFields[i]] = dateValues[i]
            }
            if(Object.keys(obj).length===3){ 
                
                return obj
            }
        }
    }
};

export const convertFormatedDateToDataDate = (formattedDate, dateFormat)=>{
    
     let dateFieldMap = createDateFieldMapObj(formattedDate, dateFormat)


     return dateFieldMap? `${dateFieldMap.yyyy}-${dateFieldMap.mm}-${dateFieldMap.dd}`: null;
};
export const convertJSDayToDataDate = (day) =>{
    let dataDate;
    let yyyy = day.getFullYear();

    let mm = day.getMonth() +1
    if (mm<=9) {
        mm = '0' + mm;
    }

    let dd = day.getDate();
    if (dd<=9) {
        dd = '0' + dd;
    }

    dataDate= `${yyyy}-${mm}-${dd}`
    return dataDate;

}
export const today = createTodaysDateAsDataDate();


export const checkForProperDateFormat = (inputDate,dateFormat)=>{
    
    for(let slot in inputDate){
        
        if( isNum.test(inputDate[slot]) && isDelineator.test(dateFormat[slot]) ) {
            return false;
        }
        if( isDelineator.test(inputDate[slot]) && !isDelineator.test(dateFormat[slot]) ) {
            return false;   
        } 
        if(!isDelineator.test(inputDate[slot]) && isDelineator.test(dateFormat)[slot] ) {
            return false
        }
        
    }

    return true 
};

//compartes the input date with the date format, both as data-dates(yyyy-mm-dd)
export const isGreaterThanMaxDate = (inputDate, maxDate, dateFormat) =>{
    
    dateFormat = dateFormat.toLowerCase();
    const dataDateFromInput = convertFormatedDateToDataDate(inputDate, dateFormat)

  


    const maxDateArray = maxDate.split('-')
    const nodeDateArray = dataDateFromInput.split('-')


    for(let i = 0; i<3; i++){
       if (parseInt(nodeDateArray[i])>parseInt(maxDateArray[i])) return true;
       if (parseInt(nodeDateArray[i])<parseInt(maxDateArray[i])) return false;
      }
      return false;

};

export const isLessThanMinDate = (inputDate, minDate, dateFormat)=>{
   
    dateFormat = dateFormat.toLowerCase();
    const dataDateFromInput = convertFormatedDateToDataDate(inputDate, dateFormat)


    const minDateArray = minDate.split('-')
    const nodeDateArray = dataDateFromInput.split('-')

    for(let i = 0; i<3; i++){
       if (parseInt(nodeDateArray[i])>parseInt(minDateArray[i])) return false;
       if (parseInt(nodeDateArray[i])<parseInt(minDateArray[i])) return true;
      }
      return false
}

export const disableHighlightingInInputBox = (el)=>{
    if (el.attachEvent) {
        el.attachEvent('onselectstart', function (e) {
            e.returnValue = false;
            return false;
        });
        el.attachEvent('onpaste', function (e) {
            e.returnValue = false;
            return false;
        });
    } else {
        el.addEventListener('paste', function (e) {
            e.preventDefault();
        });
        el.addEventListener('select', function (e) {
            var start = this.selectionStart,
                end = this.selectionEnd;
            if (this.selectionDirection === 'forward') {
                this.setSelectionRange(end, end);
            } else {
                this.setSelectionRange(start, start);
            }
        });
    }
};
export const getDaysInMonth =(month,year) =>{
    return new Date(year,month,0).getDate()
}