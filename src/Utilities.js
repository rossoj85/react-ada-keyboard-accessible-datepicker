export const errorMessages ={
    invalidMonth: `Invalid Month.  Please enter a value between 1 and 12`,
    invalidDate: `Invalid date. Please enter a value between 1 and 31`
}

export const dataDateFormat = "yyyy-mm-dd"
//data date and min/max date formats are the same 
export const splitByDelineator = (date) =>{
   const delineated =  date.split(/[\s,/-]+/)

   return delineated
};

export const createDateFieldMapObj = (formattedDate, dateFormat) =>{
    //max and min date ar not in data date format
    // console.log('****createDateFieldMapObj Called');
    // console.log('formattewd date', formattedDate);
    let dateValues= splitByDelineator(formattedDate);
    let formatFields = splitByDelineator(dateFormat);

    // console.log('dateVallues', dateValues);
    // console.log('formatFields', formatFields);
    let obj = {}

    if(dateValues.length ===3){
        for(var i=0; i<dateValues.length; i++){
            // console.log('index of that date values field inside format fields',formatFields.indexOf(dateValues[i]) );
            if( dateValues[i].length === formatFields[i].length && !obj[formatFields[i]]){
                console.log('~~~~~~~~~~~~~~~~~~~~ field OBJECT SET ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                obj[formatFields[i]] = dateValues[i]
            }
            if(Object.keys(obj).length===3){ 
                console.log('DATE FIELD OBJ RETURNED');
                return obj
            }
        }
        console.log('Incomplete fieldMap', obj);
    }
};

export const convertFormatedDateToDataDate = (formattedDate, dateFormat)=>{
    console.log('convert FormatedDateToDataDate called');
     let dateFieldMap = createDateFieldMapObj(formattedDate, dateFormat)

     console.log('convert - dateFIeldMap', dateFieldMap);

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
    console.log('moveFocus data date inside convert');
    return dataDate;

}

//compartes the input date with the date format, both as data-dates(yyyy-mm-dd)
export const isGreaterThanMaxDate = (inputDate, maxDate, dateFormat) =>{
    console.log('called isGreaterTHan .. . ');
    console.log('inputDate', inputDate);
    console.log('maxDate', maxDate);
    console.log('dateFormat', dateFormat);
    dateFormat = dateFormat.toLowerCase();
    const dataDateFromInput = convertFormatedDateToDataDate(inputDate, dateFormat)

    console.log('greater dataDateFromInput', dataDateFromInput);


    const maxDateArray = maxDate.split('-')
    const nodeDateArray = dataDateFromInput.split('-')

    for(let i = 0; i<3; i++){
        // console.log(`${nodeDateArray[i]}>${maxDateArray[i]}`);
       if (parseInt(nodeDateArray[i])>parseInt(maxDateArray[i])) return true;
       if (parseInt(nodeDateArray[i])<parseInt(maxDateArray[i])) return false;
      }
      return false;

};

export const isLessThanMinDate = (inputDate, minDate, dateFormat)=>{
    console.log('called isLess THan .. . ');
    console.log('inputDate', inputDate);
    console.log('minDate', minDate);
    console.log('dateFormat', dateFormat);
    dateFormat = dateFormat.toLowerCase();
    const dataDateFromInput = convertFormatedDateToDataDate(inputDate, dateFormat)

    console.log('less dataDateFromInput', dataDateFromInput);

    const minDateArray = minDate.split('-')
    const nodeDateArray = dataDateFromInput.split('-')

    for(let i = 0; i<3; i++){
        // console.log(`${nodeDateArray[i]}<${minDateArray[i]}`);
       if (parseInt(nodeDateArray[i])>parseInt(minDateArray[i])) return false;
       if (parseInt(nodeDateArray[i])<parseInt(minDateArray[i])) return true;
      }
      return false
}

