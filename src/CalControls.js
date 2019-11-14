import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee , faCalendar, faAngleDoubleLeft, faAngleLeft, faAngleDoubleRight,faAngleRight} from '@fortawesome/free-solid-svg-icons'
import { format } from 'util';
import Grid from './Grid'
import {errorMessages, splitByDelineator,convertFormatedDateToDataDate, isGreaterThanMaxDate, createDateFieldMapObj, dataDateFormat, isLessThanMinDate, constValue, createTodaysDateAsDataDate, checkForProperDateFormat, isDelineator} from './Utilities.js'
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
    this.customInputBox;
    
  }



  componentDidMount(){
    console.log('HIIIII');
    // this must be adapted to take in custom boxes
    let inputBox = document.getElementById("id-textbox-1") || document.getElementById(this.props.customInputBox.props.id)



    inputBox.addEventListener('DOMinputBoxValueChange', ()=> {
      this.setState({stateDate: inputBox.value});
      this.handleInputErrors(this.dateFormat,inputBox.value);
        })
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
        this.setState({error: `Please check date format. Format should be ${this.dateFormat}`});
        return;
      }
    }
   

    if(this.props.maxDate && nextStateDate.length === this.dateFormat.length){
      pastMaxDate = isGreaterThanMaxDate(nextStateDate,this.props.maxDate, this.dateFormat);

    }
    if(this.props.minDate && nextStateDate.length === this.dateFormat.length){
      beforeMinDate = isLessThanMinDate(nextStateDate,this.props.minDate, this.dateFormat);
    }

    if(month>12 || month ===0 ) this.setState({ error: errorMessages.invalidMonth});
    else if (day>31|| day === 0) this.setState({error: errorMessages.invalidDate});
    else if (pastMaxDate) this.setState({error: "THe Date is too lare"});
    else if(beforeMinDate) this.setState({error: "TheDate is too early"});
    else this.setState({error: null});
  };

  autoFormatDateBox(e){
    let stateDate = this.state.stateDate;
    let targetVal = e.target.value;
    let dateFormat = this.dateFormat;
    let nextStateDate = e.target.value;
    e.preventDefault();


    const re = /^[0-9]*$/
    if(!re.test(targetVal[targetVal.length-1]) && stateDate.length<targetVal.length) return;

    const isDelin = (dateFormatChar)=>isDelineator.test(dateFormatChar)
    let formDirty = this.state.formDirty

    if(targetVal.length<stateDate.length) this.setState({formDirty:true})
    if(targetVal.length === 0) this.setState({formDirty: false})

    for(let i = 0; i<targetVal.length; i++){
      if(!formDirty && stateDate.length<targetVal.length && isDelin(dateFormat[i+1]) && ( !targetVal[i+1] || !isDelin(targetVal[i+1] ) )){
        nextStateDate= targetVal.substring(0, i+1 ) + dateFormat[i+1];
        targetVal[i+1]? nextStateDate = nextStateDate+ targetVal[i+1]: null;
        isDelin( dateFormat[i+2] )? nextStateDate = nextStateDate + dateFormat[i+2]: null
       
       
      }
    }
    
    this.setState({stateDate: nextStateDate})
    this.handleInputErrors(dateFormat, nextStateDate)

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
    const autoFormatInput = this.props.autoFormatInput || true
    const {themeColor, minDate, maxDate, inputBoxLabel, inputBoxClassNames, inputBoxOnChange, buttonInlineStyle, buttonClassNames, inputBoxLabelContent, dateButtonClasses,tableClasses} = this.props;

 
    let customInputBox = this.customInputBox;
    let extendedCustomInputBox;
    if(this.props.customInputBox && autoFormatInput!==false){
       extendedCustomInputBox =  React.cloneElement(this.props.customInputBox,{
        onChange: this.autoFormatDateBox,
        value: this.state.stateDate,
        maxLength: dateFormat.length,
        placeholder: dateFormat,
        onBlur: this.handleBlur
      })
      customInputBox = extendedCustomInputBox
    }
    else customInputBox = this.props.customInputBox

  
    
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
            onChange={this.autoFormatDateBox}
            onBlur = {this.handleBlur}
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

