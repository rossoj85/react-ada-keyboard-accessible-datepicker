import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee , faCalendar, faAngleDoubleLeft, faAngleLeft, faAngleDoubleRight,faAngleRight} from '@fortawesome/free-solid-svg-icons'


class CalandarHTML extends Component{
  constructor(props){
    super(props);
    this.state ={
      dateFormat: null,
      stateDate: "",
    }
    this.autoFormatDateBox = this.autoFormatDateBox.bind(this);
  }
  componentWillMount(){
    if(this.props.dateFormat){
      let dateFormat = this.props.dateFormat.toLowerCase();
      this.setState({ dateFormat})
    }
    else{this.setState({dateFormat: "mm/dd/yyyy"})}
  }
 
  autoFormatDateBox(e){
    let stateDate = this.state.stateDate;
    let targetVal = e.target.value
    let dateFormat = this.state.dateFormat;
    let nextStateDate;
    e.preventDefault();
    
    console.log('stateDate', stateDate);
    console.log('targetVal', targetVal);

    const re = /^[0-9]*$/
    console.log('rE Test', re.test(e.target.value));

    //wont allow a non numeric addition, but wil allow for backspacing
    if(!re.test(targetVal[targetVal.length-1]) && stateDate.length<targetVal.length) return;
    nextStateDate = e.target.value
    let nextDateFormatChar = dateFormat[targetVal.length]
    let thisDateFormatChar = dateFormat[targetVal.length-1]
    let oneBehindDateFormatChar = dateFormat[targetVal.length-2]

  console.log('thisDateFormatChar',thisDateFormatChar);
  
  //  if(stateDate.length<targetVal.length && nextDateFormatChar!= 'y' && nextDateFormatChar !='m' &&nextDateFormatChar != 'd' && nextDateFormatChar!= undefined) nextStateDate = nextStateDate + nextDateFormatChar
   if( thisDateFormatChar!='y'&& thisDateFormatChar!='m' && thisDateFormatChar!='d' && targetVal[targetVal.length-1]!==thisDateFormatChar ) nextStateDate = stateDate + thisDateFormatChar + targetVal[targetVal.length-1]
   console.log('---------------');
   this.setState({stateDate: nextStateDate})
  }

  render(){

    const dateFormat = this.state.dateFormat;

    // const {themeColor, minDate, maxDate, customInputBox, inputBoxLabel, inputBoxClassNames, 
    //   buttonInlineStyle, inputBoxLabelContent, inputBoxOnChange, dateButtonClasses, tableClasses} = config || null
    const themeColor = this.props.themeColor;
    const minDate = this.props.minDate;
    const maxDate = this.props.maxDate;
    const customInputBox = this.props.customInputBox;
    const inputBoxLabel = this.props.inputBoxLabel;
    const inputBoxClassNames = this.props.inputBoxClassNames;
    const inputBoxOnChange = this.props.inputBoxOnChange;

    const buttonInlineStyle = this.props.buttonInlineStyle;
    const inputBoxLabelContent = this.props.inputBoxLabelContent;
    const dateButtonClasses = this.props.dateButtonClasses;
    const tableClasses = this.props.tableClasses;
    
  

    
    return(
       // this is the inputBox
       <div id="myDatepicker" className="datepicker">
        
       <div className="date">
       {inputBoxLabel!== false ? 
         <label htmlFor="id-textbox-1">{inputBoxLabelContent|| "Date "}</label>
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
            onChange={this.autoFormatDateBox}
            value={this.state.stateDate}
            maxLength={dateFormat.length}
               />
     }
       <button className="icon" aria-label="Choose Date" attribute="testing . ." style={{"color" : themeColor}, buttonInlineStyle} >
         <FontAwesomeIcon icon={faCalendar} className="fa-2x" />
       </button>
       </span>
     </div>  
       

 {/* this is the calendar component */}
 <div id="id-datepicker-1"
      className="datepickerDialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="id-dialog-label">
   <div className="header">
     <button className="prevYear" aria-label="previous year">
       {/* <span className="fas fa-angle-double-left fa-lg"></span> */}
       <FontAwesomeIcon icon={faAngleDoubleLeft} />
     </button>
     <button className="prevMonth" aria-label="previous month">
       {/* <span className="fas fa-angle-left fa-lg"></span> */}
       <FontAwesomeIcon icon={faAngleLeft} />
     </button>
     <h2 id="id-dialog-label"
         className="monthYear"
         aria-live="polite">
       Month Year
     </h2>
     <button className="nextMonth" aria-label="next month">
       {/* <span className="fas fa-angle-right fa-lg"></span> */}
       <FontAwesomeIcon icon={faAngleRight} />
     </button>
     <button className="nextYear" aria-label="next year">
       {/* <span className="fas fa-angle-double-right fa-lg"></span> */}
       <FontAwesomeIcon icon={faAngleDoubleRight} />
     </button>
   </div>
   <table id="myDatepickerGrid"
          className={`dates ${tableClasses}`}
          role="grid"
          aria-labelledby="id-dialog-label">
     <thead>
       <tr>
         <th scope="col" abbr="Sunday">
           Su
         </th>
         <th scope="col" abbr="Monday">
           Mo
         </th>
         <th scope="col" abbr="Tuesday">
           Tu
         </th>
         <th scope="col" abbr="Wednesday">
           We
         </th>
         <th scope="col" abbr="Thursday">
           Th
         </th>
         <th scope="col" abbr="Friday">
           Fr
         </th>
         <th scope="col" abbr="Saturday">
           Sa
         </th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`}
                   tabIndex="-1"
                   disabled="">
             25
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`}
                   tabIndex="-1"
                   disabled="">
             26
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`}
                   tabIndex="-1"
                   disabled="">
             27
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`}
                   tabIndex="-1"
                   disabled="">
             28
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`}
                   tabIndex="-1"
                   disabled="">
             29
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`}
                   tabIndex="-1"
                   disabled="">
             30
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses} HELLOOOOO`} tabIndex="-1">
             1
           </button>
         </td>
       </tr>
       <tr>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             2
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             3
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             4
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             5
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             6
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             7
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             8
           </button>
         </td>
       </tr>
       <tr>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             9
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             10
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             11
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             12
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             13
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="0">
             14
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             15
           </button>
         </td>
       </tr>
       <tr>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             16
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             17
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             18
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             19
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             20
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             21
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             22
           </button>
         </td>
       </tr>
       <tr>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             23
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             24
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             25
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             26
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             27
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             28
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             29
           </button>
         </td>
       </tr>
       <tr>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             30
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
             31
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`}
                   tabIndex="-1"
                   disabled="">
             1
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`}
                   tabIndex="-1"
                   disabled="">
             2
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`}
                   tabIndex="-1"
                   disabled="">
             3
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`}
                   tabIndex="-1"
                   disabled="">
             4
           </button>
         </td>
         <td className="dateCell">
           <button className= {`dateButton ${dateButtonClasses}`}
                   tabIndex="-1"
                   disabled="">
             5
           </button>
         </td>
       </tr>
     </tbody>
   </table>
   <div className="dialogButtonGroup">
     <button className="dialogButton" value="cancel">
       Cancel
     </button>
     <button className="dialogButton" value="ok">
       OK
     </button>
   </div>
   <div className="message" aria-live="polite">
     Test
   </div>
 </div>
</div>
    );
  }
}
export default CalandarHTML;