import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee , faCalendar, faAngleDoubleLeft, faAngleLeft, faAngleDoubleRight,faAngleRight} from '@fortawesome/free-solid-svg-icons'
import { format } from 'util';
import Grid from './GridHTML'
import {errorMessages, splitByDelineator,convertFormatedDateToDataDate, 
  isGreaterThanMaxDate, createDateFieldMapObj, dataDateFormat,
  isLessThanMinDate, constValue, createTodaysDateAsDataDate, 
  checkForProperDateFormat, isDelineator, disableHighlightingInInputBox, getDaysInMonth} from './Utilities.js'
// import { threadId } from 'worker_threads';


class CalControls extends Component{
  constructor(props){
    super(props);
    this.state ={
      stateDate: "",
      error: null
    }
    this.autoFormatDateBox = this.autoFormatDateBox.bind(this);

    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus  =this.handleFocus.bind(this);
    this.timeOutId = null;
    this.dateFormat = this.props.dateFormat? this.props.dateFormat.toLowerCase() :"mm/dd/yyyy";
    this.handleChange = this.handleChange.bind(this);
    this.customInputBox;
    
  }

 moveCursorToEnd() {
   const el = document.getElementById("id-textbox-1") || document.getElementById(this.props.customInputBox.props.id)

    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

  componentDidMount(){
    // this must be adapted to take in custom boxes
    let inputBox = document.getElementById("id-textbox-1") || document.getElementById(this.props.customInputBox.props.id)


    //custom event handler that allows ties together DOM manipulation and React
    inputBox.addEventListener('DOMinputBoxValueChange', ()=> {
      this.setState({stateDate: inputBox.value});
      this.handleInputErrors(this.dateFormat,inputBox.value);
        })
    
    // disable the select feature ont he inputBox to make for easier autoFormatting
    
    if(this.props.autoFormatting!== false) disableHighlightingInInputBox(inputBox);

    console.log('****PROPS', this.props);
  
  }

  handleInputErrors(dateFormat, nextStateDate){
    let formatFields =  splitByDelineator(dateFormat)
    let inputValues =   splitByDelineator(nextStateDate)                 


    let month = parseInt(inputValues[formatFields.indexOf('mm')])
    let year = parseInt(inputValues[formatFields.indexOf('yyyy')]) 
    let day = parseInt(inputValues[formatFields.indexOf('dd')])
    let monthString = inputValues[formatFields.indexOf('mm')] || '' //empty string for edge case when not entered yet
    let dayString = inputValues[formatFields.indexOf('dd')] || ''
    let yearString = inputValues[formatFields.indexOf('yyyy')] || ''
    
    let pastMaxDate;
    let beforeMinDate;
    let isproperDateFormat;
    
    if(nextStateDate.length === this.dateFormat.length){
      isproperDateFormat = checkForProperDateFormat(nextStateDate,this.dateFormat)
      if(!isproperDateFormat) {
        this.setState({error: this.props.invalidFormatError || errorMessages.invalidFormat + this.dateFormat});
        return;
      }
    }
    // determine if the date entered is greater thatn the max date and save to variable
    if(this.props.maxDate && nextStateDate.length === this.dateFormat.length){
      pastMaxDate = isGreaterThanMaxDate(nextStateDate,this.props.maxDate, this.dateFormat);

    }
    //determine if the date entered in less than the min date and save it rot a variable
    if(this.props.minDate && nextStateDate.length === this.dateFormat.length){
      beforeMinDate = isLessThanMinDate(nextStateDate,this.props.minDate, this.dateFormat);
    }
    
    if(month>12 || (monthString.length==2 &&month ===0)){ 
      // this.setState({ error: this.props.invalidMonthErrorMessage || errorMessages.invalidMonth})
      if(this.props.errorHandlingCallback){this.props.errorHandlingCallback("invalidMonthErrorMessage")}
      else this.setState({ error: this.props.invalidMonthErrorMessage || errorMessages.invalidMonth})
    }
    else if (dayString.length==2 && day === 0 ||  day>31) {
      // this.setState({error: this.props.invalidDateErrorMessage || errorMessages.invalidDate})
      if(this.props.errorHandlingCallback){this.props.errorHandlingCallback("invalidDateErrorMessage")}
      else this.setState({error: this.props.invalidDateErrorMessage || errorMessages.invalidDate})
      }
    else if (monthString.length===2 && yearString.length===4 && day){
     
      let daysInMonth = getDaysInMonth(month,year)
      console.log('DAYS IN MONTH', daysInMonth);
      if(day>daysInMonth){
        console.log('DAY GREATER THAN DAY IN MONTH');
        if(this.props.errorHandlingCallback){this.props.errorHandlingCallback("invalidDateErrorMessage")}
        else this.setState({error: this.props.invalidDateErrorMessage || errorMessages.invalidDate})
      }
    }
    else if (pastMaxDate){ 
      // this.setState({error: this.props.pastMaxDateErrorMessage || errorMessages.pastMaxDate})
      if(this.props.errorHandlingCallback){this.props.errorHandlingCallback("pastMaxDateErrorMessage")}
      else this.setState({error: this.props.pastMaxDateErrorMessage || errorMessages.pastMaxDate})
      ;}
    else if(beforeMinDate) {
      // this.setState({error: this.props.minDateErrorMessage || errorMessages.beforeMinDate});
      if(this.props.errorHandlingCallback){this.props.errorHandlingCallback("minDateErrorMessage")}
      else  this.setState({error: this.props.minDateErrorMessage || errorMessages.beforeMinDate});
    }
    else {
      // this.setState({error: null})
      if(this.props.errorHandlingCallback){this.props.errorHandlingCallback(null)}
      else this.setState({error: null})
    };
  };


  autoFormatDateBox(e){
    let recursiveString;
    if( typeof e ==="string") recursiveString=e

    let stateDate = this.state.stateDate;
    let targetVal = recursiveString || e.target.value 
    let targetString =  recursiveString || e.target.value;
    let dateFormat = this.dateFormat;

    let i = targetString.length-1
    
    // console.log('type of target', typeof e.target.value);
    console.log('stateDate--->',stateDate);
    console.log('target string--->', targetString);
    console.log('index -->', i);

    e.preventDefault && e.preventDefault() || null;

    // If input is not a number, does nothing 
    const re = /^[0-9]*$/
    if(!re.test(targetVal[targetVal.length-1]) && stateDate.length<targetVal.length) return;

    // Funtion to check if input at char[i] is a delineator 
    const isDelin = (dateFormatChar)=>isDelineator.test(dateFormatChar)

    // cycle through the input value
    if(targetString>stateDate){

      if(isDelin(dateFormat[i])){
        //if the targtString[i] isDelin, do nothing
        console.log('wwe should have an insertion....');
        if(isDelin(targetString[i])){
          console.log('END OF FUNC!!!!!!!!!');
          targetString=targetString
        }
        if(!isDelin(targetString[i])){
          console.log('~~~~~~NOT DELIN~~~~~~');
          console.log('THE SLICE', targetString.slice(-1));
          console.log('THE PIE', targetString.slice(0,-1));
          let newEntry = targetString.slice(-1)
          targetString= targetString.slice(0,-1) + dateFormat[i];
          console.log('target string',targetString);
          if(isDelin(dateFormat[i+1])) {
            console.log('HIT IT BIGG!! ! !');
            targetString = targetString + dateFormat[i+1]
          }
          targetString = targetString+ newEntry;
        }
      }

      else if(isDelin(dateFormat[i+1])){
        console.log('%%%%%%%%%%%%%%%% hitting alt insert');
        //if the targetString[i+1] is not delin we have to slice it in and call this function on the new string
        // if(!isDelin(targetString[i+1])){
          
          targetString=targetString+dateFormat[i+1]
          if(isDelin(dateFormat[i+2])) targetString=targetString+dateFormat[i+2]
          this.setState({stateDate: targetString})
          console.log('LAST TARGETSTRIGN BEFORE RECURSION', targetString);
          this.autoFormatDateBox(targetString)
        // }
      }

      
    }
    else{
      //if we are going backwards, we do nothing 
      console.log('hitting the else conditional');
    }

    this.setState({stateDate: targetString})
    console.log('TARGET STING AT END',targetString);
    this.handleInputErrors(dateFormat, targetString)
}

  handleChange(e){
    e.preventDefault()
    
    if(this.props.autoFormatting!==false) this.autoFormatDateBox(e)
    else{
      this.setState({stateDate: event.target.value})
    }
  }


  handleBlur(){
    console.log('BLUR CALLED FROM ..');
    let dateFormat = this.dateFormat;
    let inputBoxDate = this.state.stateDate

    let invalidFormatError = this.props.invalidFormatError || errorMessages.invalidFormat + this.dateFormat

    if(this.state.error && this.state.error!==invalidFormatError) return;

   let isproperDateFormat =  checkForProperDateFormat(inputBoxDate, dateFormat) && (inputBoxDate.length===dateFormat.length)
    
 
    if(!isproperDateFormat) {
      this.setState({error: invalidFormatError});
      return;
    }
    else if (isproperDateFormat){
      this.setState({error:null})
    }
  }
  handleFocus(e){
   console.log('HANDLE FOCUS TARGET', e.target.id)
   console.log('Preset error from state', this.state.error);
   if(e.target.id==='mainCalButton' 
   && (this.state.error===this.props.invalidFormatError
   || errorMessages.invalidFormat + this.dateFormat)) this.setState({error:null})
  }


  render(){
    console.log('ERROR TYPE --->', this.state.error);
    const dateFormat = this.dateFormat;
    let autoFormatting= true
    if(this.props.autoFormatting===false) {autoFormatting=false}
    const {themeColor, minDate, maxDate, inputBoxLabel,inputBoxOnChange, buttonInlineStyle, buttonClassNames, inputBoxLabelContent, dateButtonClasses,tableClasses} = this.props;
    let inputBoxClassNames = this.props
    if(this.props.autoFormatting!==false) inputBoxClassNames = inputBoxClassNames + " disableCssHighlight"
 
    let customInputBox = this.props.customInputBox;
    console.log('custpmInputBOx', customInputBox);
    let extendedCustomInputBox;
    if(this.props.customInputBox){
       extendedCustomInputBox =  React.cloneElement(this.props.customInputBox,{
        id: customInputBox && !customInputBox.props.id ? "id-textbox-1": customInputBox.props.id,
        onChange: this.handleChange,
        value: this.state.stateDate,
        maxLength: dateFormat.length,
        placeholder: dateFormat,
        // onBlur: this.handleBlur,
        "aria-describedby": customInputBox.props["aria-describedby"] || null,
      })
      customInputBox = extendedCustomInputBox
    }
    else customInputBox = this.props.customInputBox;

    
    return(
       // this is the inputBox hello
       <div id="myDatepicker" className="datepicker" >
        
       <div className="date" >
       {inputBoxLabel!== false ? 
         <label htmlFor={customInputBox? customInputBox.props.id:"id-textbox-1"}>{inputBoxLabel|| "Date"}</label>
         :
         null
     }
       <span onBlur = {this.handleBlur} onFocus ={this.handleFocus}>
      { customInputBox ? 
       customInputBox
       :
       <input type="text"
             placeholder={dateFormat}
             id="id-textbox-1"
             aria-autocomplete="none"
             className ={inputBoxClassNames}
            //  onKeyDown={this.stopKeyDown}
            onChange={this.handleChange}
            // onBlur = {this.handleBlur}
            value={this.state.stateDate}
            maxLength={dateFormat.length}
            onMouseUp={this.moveCursorToEnd}
               />
     }
       <button id='mainCalButton' className={`icon ${buttonClassNames? buttonClassNames: "buttonDefault"}`} aria-label="Choose Date" attribute="testing . ." style={{"color" : themeColor}, buttonInlineStyle} >
         <FontAwesomeIcon icon={faCalendar} className="fa-2x" />
       </button>
       </span>
       {
         (!this.props.errorHandlingCallback) ?
         <div id="inputBoxError">
         <div id="error-message" htmlFor={customInputBox? customInputBox.props.id:"id-textbox-1"}>
          {this.state.error? this.state.error:null}
         </div>
       </div>
       :null 
       }
     </div>  
       

 {/* Calendar grid starts here */}
     <Grid tableClasses={tableClasses} dateButtonClasses={dateButtonClasses}/>
</div>
    );
  }
}
export default CalControls;

