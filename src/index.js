
import React,{Component,Fragment} from "react";
import CalControls from './CalControls';
import DatePicker from './DatePicker';
import Grid from './Grid'
import styles from './Datepicker.scss'

class ReactColorSquare extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      backgroundColor: null,
      indexStateText: "Inside the index"
    }
  }
  componentDidMount(){
    console.log(' ada-calander mounting....props--', this.props)
    console.log('STILLL CHANGINGGGGGGGGGGGGG ');
    console.log(Grid);
    // const config = this.props.config || null;
    // const { themeColor, minDate, maxDate, dateButtonClasses } = this.props.config || null;

    const themeColor = this.props.themeColor || null
    const minDate = this.props.minDate || null
    const maxDate = this.props.maxDate || null
    const dateButtonClasses = this.props.dateButtonClasses || null
    const dateFormat = this.props.dateFormat || "mm/dd/yyyy"
    const setState = this.setState;

    if(themeColor) document.documentElement.style.setProperty("--defaultTheme", themeColor);
 
    var datePickers = document.querySelectorAll('.datepicker');
  
   
    console.log('DATE BUTTON CLASSES ', dateButtonClasses);
    datePickers.forEach(function (dp) {
      var inputNode   = dp.querySelector('input');
      var buttonNode  = dp.querySelector('button');
      var dialogNode  = dp.querySelector('[role=dialog]');

    console.log('vars-->',inputNode,buttonNode,dialogNode );
    var datePicker = new DatePicker(inputNode, buttonNode, dialogNode,dateFormat, minDate,maxDate, dateButtonClasses,setState);
    datePicker.init();
    })
  }

  render(){
    console.log('index  Props', this.props)
    console.log('styles', styles[".datepicker"]);
    console.log('Props', this.props);
    console.log('MOUNTING CSS',document.documentElement.style);
  
    return(
      <Fragment>
        <div>{this.state.indexStateText}</div>
         <CalControls {...this.props}/>
      </Fragment>
    )
  }
}
export default ReactColorSquare;