import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee , faCalendar, faAngleDoubleLeft, faAngleLeft, faAngleDoubleRight,faAngleRight} from '@fortawesome/free-solid-svg-icons'
import { format } from 'util';
import Grid from './Grid'
import {errorMessages, splitByDelineator,convertFormatedDateToDataDate, isGreaterThanMaxDate, createDateFieldMapObj, dataDateFormat, isLessThanMinDate, constValue, createTodaysDateAsDataDate, checkForProperDateFormat, isDelineator} from './Utilities.js'


class CalControls extends Component{
  constructor(props){
    super(props);
    this.state ={
      stateDate: "",
      error: null
    }
    this.autoFormatDateBox = this.autoFormatDateBox.bind(this);
    this.dateFormat = this.props.dateFormat.toLowerCase() || "mm/dd/yyyy"
  }
  componentWillMount(){
    console.log('cal controls mounted');
    console.log("Today'sdate ->> ", createTodaysDateAsDataDate());
    console.log('calControls Props -->>>', this.props);
  }
  componentDidMount(){
    console.log('COMPonent mounted');
    // this must be adapted to take in custom boxes
    let inputBox = document.getElementById("id-textbox-1");
    console.log('INPUT BOX', inputBox);

    inputBox.addEventListener('DOMinputBoxValueChange', ()=> {
      this.setState({stateDate: inputBox.value});
      this.handleInputErrors(this.dateFormat,inputBox.value);
        })
  }
  constructString(dateFormat, nextStateDate){
    console.log('handleINput construct string called');
    let formatFields =  splitByDelineator(dateFormat)       
    let inputValues =   splitByDelineator(nextStateDate)                 

    let monthIndex = formatFields.indexOf('mm');
    let yearIndex = formatFields.indexOf('yyyy');
    let dayIndex = formatFields.indexOf('dd')

    let month = parseInt(inputValues[formatFields.indexOf('mm')])
    let year = parseInt(inputValues[formatFields.indexOf('yyyy')]) 
    let day = parseInt(inputValues[formatFields.indexOf('dd')])
    let dateObj = {};
    dateObj[monthIndex]=month;
    dateObj[yearIndex]= year;
    dateObj[dayIndex] = day;

    console.log('*************************************');
    console.log('dateFormat');
    let delineators =[];

    for(let char of dateFormat){
      if ( isDelineator.test(char)) delineators.push(char);
    }
    console.log('handleINput Delineators', delineators );
    console.log('**********************************');

    console.log('handleInput Errors dateFormat',dateFormat );
    
    console.log('handleInput Errors dd', day );
    console.log('handleInput Errors mm', month );
    console.log('handleInput Errors yyyy', year);

    console.log('*****handleInput dateObj', dateObj);

    console.log('handleINput formatFields', formatFields);
    
    console.log('handleInput yyyy length',formatFields[formatFields.indexOf('yyyy')].length);
    console.log('handleInput mm length',formatFields.indexOf('mm').length);
    console.log('handleInput dd length',formatFields.indexOf('dd').length);
    // let constructedDateString =`${dateObj[0]}-${dateObj[1]}-${dateObj[2]}`
    let constructedDateString= ''
    constructedDateString =  constructedDateString + dateObj[0]
    if(dateObj[0].toString().length===formatFields[0].length) constructedDateString = constructedDateString +delineators[0];

    if(dateObj[1]) constructedDateString = constructedDateString + dateObj[1]
    if(dateObj[1].toString().length===formatFields[1].length) constructedDateString = constructedDateString +delineators[1];
    
    if(dateObj[2])constructedDateString = constructedDateString + dateObj[2]
    // if(dateObj[2].toString().length===formatFields[2].length) constructedDateString = constructedDateString +delineators[2];




    console.log('handleInput dateObj[0]--->', typeof (dateObj[0]+''));
    // console.log('handleInput dateobject[0]----', dateObj[0].length, 'formatFields[0].length---', formatFields[0].length  );
    console.log('handleInputString---->>>>', constructedDateString);
    
    console.log('');
    console.log('--------------------handleINput--------------------------');
  }
  handleInputErrors(dateFormat, nextStateDate){
    console.log('CalCONTROL HANDLE INPUT ERRORS CALLED');
    let formatFields =  splitByDelineator(dateFormat)       
    let inputValues =   splitByDelineator(nextStateDate)                 

    this.constructString(dateFormat, nextStateDate)

    let month = parseInt(inputValues[formatFields.indexOf('mm')])
    let year = parseInt(inputValues[formatFields.indexOf('yyyy')]) 
    let day = parseInt(inputValues[formatFields.indexOf('dd')])
    // let positionValueObj{
    //   formatFields.indexOf('mm'): month,
    // }
    
    // console.log('handleInput Errors dd', day );
    // console.log('handleInput Errors mm', month );
    // console.log('handleInput Errors yyyy', year);

    // console.log('handleINput formatFields', formatFields);
    
    // console.log('handleInput yyyy length',formatFields[formatFields.indexOf('yyyy')].length);
    // console.log('handleInput mm length',formatFields.indexOf('mm').length);
    // console.log('handleInput dd length',formatFields.indexOf('dd').length);
    // console.log('handleInputString---->>>>', ``);
    // let constructedDateString =
    // console.log('--------------------handleINput--------------------------');
    
    let pastMaxDate;
    let beforeMinDate;
    let isproperDateFormat;
    
    if(nextStateDate.length === this.dateFormat.length){
      console.log('^^^^^^^^^^^^CALLING properDate^^^^^^^^^^^^');
      isproperDateFormat = checkForProperDateFormat(nextStateDate,this.dateFormat)
      console.log('properDate-', isproperDateFormat);
      if(!isproperDateFormat) {
        this.setState({error: `Please check date format. Format should be ${this.dateFormat}`});
        return;
      }
    }
   

    if(this.props.maxDate && nextStateDate.length === this.dateFormat.length){
      console.log('^^^^^^^^^^^^CALLING IS GREATER THAN MAX DATE ^^^^^^^^^^^^');
      pastMaxDate = isGreaterThanMaxDate(nextStateDate,this.props.maxDate, this.dateFormat);

    }
    if(this.props.minDate && nextStateDate.length === this.dateFormat.length){
      console.log('^^^^^^^^^^^^CALLING IS LESS THAN MIN DATE ^^^^^^^^^^^^');
      beforeMinDate = isLessThanMinDate(nextStateDate,this.props.minDate, this.dateFormat);
    }
    console.log('Day', day)
    if(month>12 || month ===0 ) this.setState({ error: errorMessages.invalidMonth});
    else if (day>31|| day === 0) this.setState({error: errorMessages.invalidDate});
    else if (pastMaxDate) this.setState({error: "THe Date is too lare"});
    else if(beforeMinDate) this.setState({error: "TheDate is too early"});
    else this.setState({error: null});
  };

  autoFormatDateBox(e){
    console.log('CAL Control onChange AutoFormatDate Box Called');
    let stateDate = this.state.stateDate;
    let targetVal = e.target.value;
    let dateFormat = this.dateFormat;
    let nextStateDate = e.target.value;
    e.preventDefault();


    console.log('stateDate', stateDate);
    console.log('targetVal', targetVal);
    const re = /^[0-9]*$/
    if(!re.test(targetVal[targetVal.length-1]) && stateDate.length<targetVal.length) return;

    const isDelin = (dateFormatChar)=>isDelineator.test(dateFormatChar)
    

    for(let i = 0; i<targetVal.length; i++){
      // console.log('targetVal[i]', targetVal[i]);
      // console.log('dateFormat[i]', dateFormat[i]);
      // console.log('dateFormat[i+1]',dateFormat[i+1] );
      // console.log('--------------------------------------');
      if(stateDate.length<targetVal.length && isDelin(dateFormat[i+1]) && ( !targetVal[i+1] || !isDelin(targetVal[i+1] ) ) ){
        nextStateDate= targetVal.substring(0, i+1 ) + dateFormat[i+1];
        targetVal[i+1]? nextStateDate = nextStateDate+ targetVal[i+1]: null;
        isDelin( dateFormat[i+2] )? nextStateDate = nextStateDate + dateFormat[i+2]: null
        console.log('Next state date', nextStateDate);
       
      }
    }
    console.log('OUT OF LOOP NEXT STATE DATE', nextStateDate);
    this.setState({stateDate: nextStateDate})
    this.handleInputErrors(dateFormat, nextStateDate)



    //tests to see if number 
  //   const re = /^[0-9]*$/
  //   // console.log('rE Test', re.test(e.target.value));

  //   //wont allow a non-numeric addition, but wil allow for backspacing
  //   // if(!re.test(targetVal[targetVal.length-1]) && stateDate.length<targetVal.length) return;
  //   console.log('GOT PAST REGEX');

  //   nextStateDate = e.target.value
  //   let nextDateFormatChar = dateFormat[targetVal.length]
  //   let thisDateFormatChar = dateFormat[targetVal.length-1]
  //   let oneBehindDateFormatChar = dateFormat[targetVal.length-2]

  // console.log('thisDateFormatChar',thisDateFormatChar);
  // console.log('');
  //  if(stateDate.length<targetVal.length 
  //     && nextDateFormatChar!= 'y' 
  //     && nextDateFormatChar !='m' 
  //     &&nextDateFormatChar != 'd' 
  //     && nextDateFormatChar!= undefined) nextStateDate = nextStateDate + nextDateFormatChar
  //  if( thisDateFormatChar!='y'&& thisDateFormatChar!='m' && thisDateFormatChar!='d' && targetVal[targetVal.length-1]!==thisDateFormatChar ) nextStateDate = stateDate + thisDateFormatChar + targetVal[targetVal.length-1]
  //  console.log('---------------');
  //  this.setState({stateDate: nextStateDate})
  //  this.handleInputErrors(dateFormat, nextStateDate)
  }

      // stopKeyDown(e){
      //   console.log('e.keyCode', e.keyCode);
      //   if(e.keyCode===37 || e.keyCode===39){
      //     console.log('preventing default');
      //      e.preventDefault()
      //     }
      // }

  render(){
    console.log('CAL CONTROL RE-RENDER');
    const dateFormat = this.dateFormat;
    console.log('dateformat', dateFormat);
    console.log('date format length', dateFormat.length);
    console.log('state date length', this.state.stateDate.length);
    const autoFormatInput = this.props.autoFormatInput || true
    const {themeColor, minDate, maxDate, inputBoxLabel, inputBoxClassNames, inputBoxOnChange, buttonInlineStyle, buttonClassNames, inputBoxLabelContent, dateButtonClasses,tableClasses} = this.props;

    // console.log('MIN NAD MAX DATES', minDate, maxDate);
    let customInputBox;
    let extendedCustomInputBox;
    let DOMinputBox = document.getElementById("id-textbox-1")

    // if(DOMinputBox){
    // console.log('CAL CONTROL DOMinputBoxValue in render', DOMinputBox.value);
    // console.log('CAL CONTROL STATEDATE VALUE', this.state.stateDate);
    // console.log('cal control COMPARE',DOMinputBox.value ==this.state.stateDate);
    //     if(DOMinputBox.value && DOMinputBox.value !==this.state.stateDate){
    //       this.setState({stateDate: DOMinputBox.value})
    //     }
    // }

    // if(this.props.customInputBox && autoFormatInput!==false){
    //    extendedCustomInputBox =  React.cloneElement(this.props.customInputBox,{
    //     onChange: this.autoFormatDateBox,
    //     // value: this.state.stateDate,
    //     maxLength: dateFormat.length,
    //     placeholder: dateFormat
    //   })
    //   customInputBox = extendedCustomInputBox
    // }
    // else customInputBox = this.props.customInputBox

  
    
    return(
       // this is the inputBox
       <div id="myDatepicker" className="datepicker">
        
       <div className="date">
       {inputBoxLabel!== false ? 
         <label htmlFor="id-textbox-1">{inputBoxLabel|| "Date"}</label>
         :
         null
     }
       <span>
      { customInputBox ? 
       customInputBox
       :
       <input type="text"
             placeholder={dateFormat}
             id="id-textbox-1"
             aria-autocomplete="none"
             className ={inputBoxClassNames}
            //  onKeyDown={this.stopKeyDown}
            onChange={this.autoFormatDateBox}
            value={this.state.stateDate}
            maxLength={dateFormat.length}
               />
     }
       <button className={`icon ${buttonClassNames? buttonClassNames: "buttonDefault"}`} aria-label="Choose Date" attribute="testing . ." style={{"color" : themeColor}, buttonInlineStyle} >
         <FontAwesomeIcon icon={faCalendar} className="fa-2x" />
       </button>
       </span>
       <div id="inputBoxError" style={{'color': 'red'}}>
        {this.state.error? <p>{this.state.error}</p>: null}
       </div>
    
     </div>  
       

 {/* Calendar grid starts here */}
     <Grid tableClasses={tableClasses} dateButtonClasses={dateButtonClasses}/>
</div>
    );
  }
}
export default CalControls;

