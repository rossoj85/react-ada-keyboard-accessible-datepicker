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

  componentWillMount(){
    console.log('');
    console.log('calControls Props -->>>', this.props);
  };

  componentDidMount(){
    console.log('COMPonent mounted');
    // this must be adapted to take in custom boxes
    let inputBox = document.getElementById("id-textbox-1") || document.getElementById(this.props.customInputBox.props.id)

    // console.log('INPUT BOX', inputBox);

    inputBox.addEventListener('DOMinputBoxValueChange', ()=> {
      this.setState({stateDate: inputBox.value});
      this.handleInputErrors(this.dateFormat,inputBox.value);
        })
  }

  handleInputErrors(dateFormat, nextStateDate){
    console.log('CalCONTROL HANDLE INPUT ERRORS CALLED');
    let formatFields =  splitByDelineator(dateFormat)       
    let inputValues =   splitByDelineator(nextStateDate)                 


    let month = parseInt(inputValues[formatFields.indexOf('mm')])
    let year = parseInt(inputValues[formatFields.indexOf('yyyy')]) 
    let day = parseInt(inputValues[formatFields.indexOf('dd')])
    
    
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
    let formDirty = this.state.formDirty

    if(targetVal.length<stateDate.length) this.setState({formDirty:true})
    if(targetVal.length === 0) this.setState({formDirty: false})

    for(let i = 0; i<targetVal.length; i++){
      if(!formDirty && stateDate.length<targetVal.length && isDelin(dateFormat[i+1]) && ( !targetVal[i+1] || !isDelin(targetVal[i+1] ) )){
        nextStateDate= targetVal.substring(0, i+1 ) + dateFormat[i+1];
        targetVal[i+1]? nextStateDate = nextStateDate+ targetVal[i+1]: null;
        isDelin( dateFormat[i+2] )? nextStateDate = nextStateDate + dateFormat[i+2]: null
        console.log('Next state date', nextStateDate);
       
      }
    }
    console.log('OUT OF LOOP NEXT STATE DATE', nextStateDate);
    this.setState({stateDate: nextStateDate})
    this.handleInputErrors(dateFormat, nextStateDate)

  }
  handleBlur(){
    console.log('HANDLEBLUR CALLED');
    let dateFormat = this.dateFormat;
    let inputBoxDate = this.state.stateDate

   let isproperDateFormat =  checkForProperDateFormat(inputBoxDate, dateFormat) && (inputBoxDate.length===dateFormat.length)
    console.log('handleblur properDate-', isproperDateFormat);
    if(!isproperDateFormat) {
      this.setState({error: `Please check date format. Format should be ${this.dateFormat}`});
      return;
    }
  }


  render(){
    console.log('CAL CONTROL RE-RENDER');
    const dateFormat = this.dateFormat;
    console.log('dateformat', dateFormat);
    console.log('date format length', dateFormat.length);
    console.log('state date length', this.state.stateDate.length);
    const autoFormatInput = this.props.autoFormatInput || true
    const {themeColor, minDate, maxDate, inputBoxLabel, inputBoxClassNames, inputBoxOnChange, buttonInlineStyle, buttonClassNames, inputBoxLabelContent, dateButtonClasses,tableClasses} = this.props;

    // console.log('MIN NAD MAX DATES', minDate, maxDate);

    let DOMinputBox = document.getElementById("id-textbox-1")
    console.log('RENDER CUSTOM INPUT BOX', customInputBox);
    // if(DOMinputBox){
    // console.log('CAL CONTROL DOMinputBoxValue in render', DOMinputBox.value);
    // console.log('CAL CONTROL STATEDATE VALUE', this.state.stateDate);
    // console.log('cal control COMPARE',DOMinputBox.value ==this.state.stateDate);
    //     if(DOMinputBox.value && DOMinputBox.value !==this.state.stateDate){
    //       this.setState({stateDate: DOMinputBox.value})
    //     }
    // }
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
            onBLur = {this.handleBlur}
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

