
import React,{Component,Fragment} from "react";
import CalendarHTML from './CalendarHTML';
import DatePicker from './DatePicker';
import './Datepicker.scss'

class ReactColorSquare extends Component{
  
  componentDidMount(){
    console.log('HELLO AFTER MOUNTING')
   
    var datePickers = document.querySelectorAll('.datepicker');
    console.log('DatePickers====>',datePickers);
    datePickers.forEach(function (dp) {
      var inputNode   = dp.querySelector('input');
      var buttonNode  = dp.querySelector('button');
      var dialogNode  = dp.querySelector('[role=dialog]');

      console.log('vars-->',inputNode,buttonNode,dialogNode );
        
      var datePicker = new DatePicker(inputNode, buttonNode, dialogNode);
    datePicker.init();
    })
  }

  render(){
    return(
      <Fragment>
         <CalendarHTML />
      </Fragment>
    )
  }
}
export default ReactColorSquare;