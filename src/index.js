
import React,{Component,Fragment} from "react";
import CalControls from './CalControls';
import DatePicker from './DatePicker';
import Grid from './GridHTML'
import styles from './Datepicker.scss'
import {createTodaysDateAsDataDate,checkIfIsDataDate} from './Utilities'

class ReactColorSquare extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      backgroundColor: null,
    }
    this.minDate = this.props.minDate || null;
      if(this.minDate && this.minDate.toLowerCase()==="today") this.minDate = createTodaysDateAsDataDate();
    this.maxDate = this.props.maxDate || null;
      if(this.maxDate && this.maxDate.toLowerCase()==="today") this.maxDate = createTodaysDateAsDataDate();

  }
  componentWillMount(){
    console.log('v 1.2.11');
  }

  componentDidMount(){


    const themeColor = this.props.themeColor || null;
    const minDate = this.minDate
    checkIfIsDataDate(minDate)

    const maxDate = this.maxDate
    checkIfIsDataDate(maxDate)
    
    const dateButtonClasses = this.props.dateButtonClasses || null;
    const dateFormat = this.props.dateFormat || "mm/dd/yyyy";
    const focusDate = this.props.focusDate ||null;
    const specifiedFocusDate = this.props.specifiedFocusDate;

    if(themeColor) document.documentElement.style.setProperty("--defaultTheme", themeColor);
 
    var datePickers = document.querySelectorAll('.datepicker');
  
   

    datePickers.forEach(function (dp) {
      var inputNode   = dp.querySelector('input');
      var buttonNode  = dp.querySelector('button');
      var dialogNode  = dp.querySelector('[role=dialog]');

    var datePicker = new DatePicker(inputNode, buttonNode, dialogNode,dateFormat, minDate, maxDate, specifiedFocusDate, dateButtonClasses );
    datePicker.init();
    })
  }

  render(){
    return(
      <Fragment>
         <CalControls {...this.props} 
         minDate={this.minDate}
         maxDate={this.maxDate}
         callBack = {this.props.callBack}
         />
      </Fragment>
    )
  }
}
export default ReactColorSquare;