import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee , faCalendar, faAngleDoubleLeft, faAngleLeft, faAngleDoubleRight,faAngleRight} from '@fortawesome/free-solid-svg-icons'
import { format } from 'util';
import Grid from './Grid'
import {errorMessages, splitByDelineator,convertFormatedDateToDataDate, 
  isGreaterThanMaxDate, createDateFieldMapObj, dataDateFormat,
  isLessThanMinDate, constValue, createTodaysDateAsDataDate, 
  checkForProperDateFormat, isDelineator, disableHighlightingInInputBox} from './Utilities.js'
// import { threadId } from 'worker_threads';


class CalControls extends Component{
  constructor(props){
    super(props);
    this.state ={
      stateDate: "",
      error: null,
      formDirty: false
    }
    this.autoFormatDateBox = this.autoFormatDateBox.bind(this);
    this.handleBlur = this.handleBlur.bind(this)
    this.dateFormat = this.props.dateFormat? this.props.dateFormat.toLowerCase() :"mm/dd/yyyy";
    this.handleChange = this.handleChange.bind(this);
    this.customInputBox;
    
  }

 moveCursorToEnd() {
   console.log('CALLING MOVE CURSOR TO END');
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
    console.log('COmponent did Moutn Props', this.props);
    // this must be adapted to take in custom boxes
    let inputBox = document.getElementById("id-textbox-1") || document.getElementById(this.props.customInputBox.props.id)


    //custom event handler that allows ties together DOM manipulation and React
    inputBox.addEventListener('DOMinputBoxValueChange', ()=> {
      this.setState({stateDate: inputBox.value});
      this.handleInputErrors(this.dateFormat,inputBox.value);
        })
    
    // disable the select feature ont he inputBox to make for easier autoFormatting
    console.log('this.props.autoFormatting', this.props.autoFormatting);
    if(this.props.autoFormatting!== false) disableHighlightingInInputBox(inputBox);
  
  }

  handleInputErrors(dateFormat, nextStateDate){
 
    let formatFields =  splitByDelineator(dateFormat)       
    let inputValues =   splitByDelineator(nextStateDate)                 


    let month = parseInt(inputValues[formatFields.indexOf('mm')])
    let year = parseInt(inputValues[formatFields.indexOf('yyyy')]) 
    let day = parseInt(inputValues[formatFields.indexOf('dd')])
    
    
    let pastMaxDate;
    let beforeMinDate;
    let isproperDateFormat;
    
    if(nextStateDate.length === this.dateFormat.length){
      isproperDateFormat = checkForProperDateFormat(nextStateDate,this.dateFormat)
      if(!isproperDateFormat) {
        this.setState({error: this.props.invalidFormatError ||  `Please check date format. Format should be ${this.dateFormat}`});
        return;
      }
    }
   
    // determine if the date entered is greater thatn the max date and save to variable
    if(this.props.maxDate && nextStateDate.length === this.dateFormat.length){
      pastMaxDate = isGreaterThanMaxDate(nextStateDate,this.props.maxDate, this.dateFormat);

    }
    //determine if the date entered in less than the min date and save it to a variable
    // merge again to see diff 
    if(this.props.minDate && nextStateDate.length === this.dateFormat.length){
      beforeMinDate = isLessThanMinDate(nextStateDate,this.props.minDate, this.dateFormat);
    }

    if(month>12 || month ===0 ){ 
      this.setState({ error: this.props.invalidMonthErrorMessage || errorMessages.invalidMonth})
      if(this.props.errorHandlingCallback){this.props.errorHandlingCallback("invalidMonthErrorMessage")}
    }
    else if (day>31|| day === 0) {
      this.setState({error: this.props.invalidDateErrorMessage || errorMessages.invalidDate})
      if(this.props.errorHandlingCallback){this.props.errorHandlingCallback("invalidDateErrorMessage")};
      }
    else if (pastMaxDate){ 
      this.setState({error: this.props.pastMaxDateErrorMessage || errorMessages.pastMaxDate})
      if(this.props.errorHandlingCallback){this.props.errorHandlingCallback("pastMaxDateErrorMessage")};
      ;}
    else if(beforeMinDate) {
      this.setState({error: this.props.minDateErrorMessage || errorMessages.beforeMinDate});
      if(this.props.errorHandlingCallback){this.props.errorHandlingCallback("minDateErrorMessage")};
    }
    else {
      this.setState({error: null})
      if(this.props.errorHandlingCallback){this.props.errorHandlingCallback("no Error")};
    };
  };

  // ALTERNATE AUTOFORMATTING WITH DIRTY FORM VARIABLE 
  // autoFormatDateBox(e){
  //   let stateDate = this.state.stateDate;
  //   let targetVal = e.target.value;
  //   let dateFormat = this.dateFormat;
  //   let nextStateDate = e.target.value;
  //   e.preventDefault();


  //   const re = /^[0-9]*$/
  //   if(!re.test(targetVal[targetVal.length-1]) && stateDate.length<targetVal.length) return;

  //   const isDelin = (dateFormatChar)=>isDelineator.test(dateFormatChar)
  //   let formDirty = this.state.formDirty

  //   if(targetVal.length<stateDate.length) this.setState({formDirty:true})
  //   if(targetVal.length === 0) this.setState({formDirty: false})

  //   for(let i = 0; i<targetVal.length; i++){
  //     if(!formDirty && stateDate.length<targetVal.length && isDelin(dateFormat[i+1]) && ( !targetVal[i+1] || !isDelin(targetVal[i+1] ) )){
  //       nextStateDate= targetVal.substring(0, i+1 ) + dateFormat[i+1];
  //       targetVal[i+1]? nextStateDate = nextStateDate+ targetVal[i+1]: null;
  //       isDelin( dateFormat[i+2] )? nextStateDate = nextStateDate + dateFormat[i+2]: null
       
       
  //     }
  //   }
    
  //   this.setState({stateDate: nextStateDate})
  //   this.handleInputErrors(dateFormat, nextStateDate)

  // }
  autoFormatDateBox(e){
    console.log('NEW ON AUTOFORMAT FUCNTION');

    let stateDate = this.state.stateDate;
    let targetVal = e.target.value;
    let dateFormat = this.dateFormat;
    let nextStateDate = e.target.value;
    e.preventDefault();

    // If input is not a number, does nothing 
    const re = /^[0-9]*$/
    if(!re.test(targetVal[targetVal.length-1]) && stateDate.length<targetVal.length) return;

    // Funtion to check if input at char[i] is a delineator 
    const isDelin = (dateFormatChar)=>isDelineator.test(dateFormatChar)

    // cycle through the input value 
    for(let i = 0; i<targetVal.length; i++){
      console.log('targetVal outside condition', targetVal);
      console.log('state length', stateDate.length);
      console.log('target val length',targetVal.length);
      if(stateDate.length<targetVal.length){
        if(isDelin(dateFormat[i+1])&& ( !targetVal[i+1] || !isDelin(targetVal[i+1] ))){
          console.log('next char is delin');
          targetVal = targetVal.split('')
          let delin = dateFormat[i+1]
          //make an exceptional case if the numbers are seperated by two consecutive delineators 
          if(isDelin(dateFormat[i+2])) delin = delin+ dateFormat[i+2]
          targetVal.splice(i+1,0,delin)
          targetVal = targetVal.join('')
          nextStateDate= targetVal
        }
      }

    }
    this.setState({stateDate: nextStateDate})
    this.handleInputErrors(dateFormat, nextStateDate)
}

  handleChange(e){
    e.preventDefault()
    
    if(this.props.autoFormatting!==false) this.autoFormatDateBox(e)
    else{
      this.setState({stateDate: event.target.value})
    }
  }


  handleBlur(){
    let dateFormat = this.dateFormat;
    let inputBoxDate = this.state.stateDate

   let isproperDateFormat =  checkForProperDateFormat(inputBoxDate, dateFormat) && (inputBoxDate.length===dateFormat.length)
    if(!isproperDateFormat) {
      this.setState({error: `Please check date format. Format should be ${this.dateFormat}`});
      return;
    }
  }


  render(){
    
    const dateFormat = this.dateFormat;
    let autoFormatting= true
    if(this.props.autoFormatting===false) {autoFormatting=false}
    const {themeColor, minDate, maxDate, inputBoxLabel,inputBoxOnChange, buttonInlineStyle, buttonClassNames, inputBoxLabelContent, dateButtonClasses,tableClasses} = this.props;
    let inputBoxClassNames = this.props
    if(this.props.autoFormatting!==false) inputBoxClassNames = inputBoxClassNames + " disableCssHighlight"
 
    let customInputBox = this.customInputBox;
    let extendedCustomInputBox;
    if(this.props.customInputBox){
       extendedCustomInputBox =  React.cloneElement(this.props.customInputBox,{
        onChange: this.handleChange,
        value: this.state.stateDate,
        maxLength: dateFormat.length,
        placeholder: dateFormat,
        onBlur: this.handleBlur
      })
      customInputBox = extendedCustomInputBox
    }
    else customInputBox = this.props.customInputBox

  console.log('AUTO FORMATTING OR NOT? ', autoFormatting);
    
    return(
       // this is the inputBox
       <div id="myDatepicker" className="datepicker">
        
       <div className="date">
       {inputBoxLabel!== false ? 
         <label htmlFor={customInputBox? customInputBox.props.id:"id-textbox-1"}>{inputBoxLabel|| "Date"}</label>
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
            onChange={this.handleChange}
            onBlur = {this.handleBlur}
            value={this.state.stateDate}
            maxLength={dateFormat.length}
            onMouseUp={this.moveCursorToEnd}
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

