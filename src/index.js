
import React,{Component,Fragment} from "react";
import CalControls from './CalControls';
import DatePicker from './DatePicker';
import Grid from './Grid'
import styles from './Datepicker.scss'
import {createTodaysDateAsDataDate} from './Utilities'

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


  componentDidMount(){
    // console.log('STILLL CHANGINGGGGGGGGGGGGG ');

    const themeColor = this.props.themeColor || null;
    const minDate = this.minDate
    const maxDate = this.maxDate
    const dateButtonClasses = this.props.dateButtonClasses || null;
    const dateFormat = this.props.dateFormat || "mm/dd/yyyy";
    const focusDate = this.props.focusDate;
    const specifiedFocusDate = this.props.specifiedFocusDate;

    if(themeColor) document.documentElement.style.setProperty("--defaultTheme", themeColor);
 
    var datePickers = document.querySelectorAll('.datepicker');
  
   
    console.log('DATE BUTTON CLASSES ', dateButtonClasses);
    datePickers.forEach(function (dp) {
      var inputNode   = dp.querySelector('input');
      var buttonNode  = dp.querySelector('button');
      var dialogNode  = dp.querySelector('[role=dialog]');

    console.log('vars-->',inputNode,buttonNode,dialogNode, minDate, maxDate );
    var datePicker = new DatePicker(inputNode, buttonNode, dialogNode,dateFormat, minDate, maxDate, specifiedFocusDate, dateButtonClasses );
    datePicker.init();
    })
  }

  render(){
    console.log('index  Props', this.props);
    console.log('styles', styles[".datepicker"]);
    console.log('MOUNTING CSS',document.documentElement.style);
  
    return(
      <Fragment>
         <CalControls {...this.props} 
         minDate={this.minDate}
         maxDate={this.maxDate}
         />
      </Fragment>
    )
  }
}
export default ReactColorSquare;