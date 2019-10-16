
import React,{Component,Fragment} from "react";
import CalendarHTML from './CalendarHTML';
import DatePicker from './DatePicker';
import styles from './Datepicker.scss'

class ReactColorSquare extends Component{
  
  constructor(props){
    super(props)
  }
  componentDidMount(){
    console.log(' ada-calander mounting....props--', this.props)

    const { themeColor, minDate, maxDate } = this.props.config;
    const dateFormat = this.props.config.dateFormat || "MM/DD/YYY"

    if(themeColor) document.documentElement.style.setProperty("--themeColor", themeColor);
 
    var datePickers = document.querySelectorAll('.datepicker');
  
    // const dateFormat = this.props.dateFormat || "mm/dd/yyyy"
    // const minDate = this.props.minDate;
    // const maxDate = this.props.maxDate;

    datePickers.forEach(function (dp) {
      var inputNode   = dp.querySelector('input');
      var buttonNode  = dp.querySelector('button');
      var dialogNode  = dp.querySelector('[role=dialog]');

    console.log('vars-->',inputNode,buttonNode,dialogNode );
    var datePicker = new DatePicker(inputNode, buttonNode, dialogNode,dateFormat, minDate,maxDate);
    datePicker.init();
    })
  }

  render(){
    console.log('access calendar Props', this.props)
    console.log('styles', styles[".datepicker"]);
    console.log('Props', this.props);
    console.log('THIS INSIDE CLOLR SQUARE', this);
    console.log('MOUNTING CSS',document.documentElement.style);

    return(
      <Fragment>
         <CalendarHTML {...this.props}/>
      </Fragment>
    )
  }
}
export default ReactColorSquare;