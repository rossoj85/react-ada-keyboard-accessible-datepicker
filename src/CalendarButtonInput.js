/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   File:   calendar-button.js
*/


//for commit 
import DatePicker from './DatePicker';

console.log('hello from Calendar');
console.log('Datepicker---->', DatePicker);

//CHANGED
// var DatePicker = DatePicker || {};

var CalendarButtonInput = function(inputNode, buttonNode, datepicker,dateFormat) {
  this.inputNode    = inputNode;
  this.buttonNode   = buttonNode;
  this.imageNode    = false;

  this.datepicker = datepicker;
  this.dateFormat = dateFormat.toLowerCase();
  this.defaultLabel = 'Choose Date';

  this.keyCode = Object.freeze({
    'ENTER': 13,
    'SPACE': 32
  });
};

console.log(CalendarButtonInput.prototype);

CalendarButtonInput.prototype.init = function () {
  this.buttonNode.addEventListener('click', this.handleClick.bind(this));
  this.buttonNode.addEventListener('keydown', this.handleKeyDown.bind(this));
  this.buttonNode.addEventListener('focus', this.handleFocus.bind(this));
};

CalendarButtonInput.prototype.handleKeyDown = function (event) {
  var flag = false;

  switch (event.keyCode) {

    case this.keyCode.SPACE:
    case this.keyCode.ENTER:
      this.datepicker.show();
      this.datepicker.setFocusDay();
      flag = true;
      break;

    default:
      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

//CHANGED - put event into take in
CalendarButtonInput.prototype.handleClick = function (evt) {
  if (!this.datepicker.isOpen()) {
    this.datepicker.show();
    this.datepicker.setFocusDay();
  }
  else {
    this.datepicker.hide();
  }

  evt.stopPropagation();
  evt.preventDefault();

};

CalendarButtonInput.prototype.setLabel = function (str) {
  if (typeof str === 'string' && str.length) {
    str = ', ' + str;
  }
  this.buttonNode.setAttribute('aria-label', this.defaultLabel + str);
};

CalendarButtonInput.prototype.setFocus = function () {
  this.buttonNode.focus();
};

CalendarButtonInput.prototype.setDate = function (day) {
  console.log('inside set date ');
  let dateFormatString = this.dateFormat;
  console.log('DATE FORMAT STRING', dateFormatString)
  let newDateString = dateFormatString.replace("yyyy",day.getFullYear())
                                      .replace("mm",(day.getMonth() + 1))
                                      .replace("dd",day.getDate())
  // this.inputNode.value = (day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear();
  this.inputNode.value = newDateString
  console.log('after set value', this.inputNode.value);
};

CalendarButtonInput.prototype.getDate = function () {
  return this.inputNode.value;
};

CalendarButtonInput.prototype.getDateLabel = function () {
  console.log('getDateLabel called');
  var label = '';
 

  // console.log('inputNode Value', this.inputNode.value);
  // // if(this.inputNode.value.indexOf(',')!== -1) {
  // //   divider=','
  // //   console.log('divider - ', divider);
  // // }
  // // else if(this.inputNode.value.indexOf('/')!== -1) {
  // //   divider='/'
  // //   console.log('divider - ', divider);
  // // }
  // // else console.log('COULDNT FIND ANY DIVIDER')
// split on all commas spaces and forward slashes
  var parts = this.inputNode.value.split(/[\s,/]+/)
  var formatParts = this.dateFormat.split(/[\s,/]+/)

  console.log('parts', parts);
  console.log('date format parts', formatParts);

  if ((parts.length === 3) &&
      Number.isInteger(parseInt(parts[0])) &&
      Number.isInteger(parseInt(parts[1])) &&
      Number.isInteger(parseInt(parts[2]))) {
    // var month = parseInt(parts[0]) - 1;
    // var day = parseInt(parts[1]);
    // var year = parseInt(parts[2]);

    var month = parseInt(parts[formatParts.indexOf('mm')]) - 1;
    var day = parseInt(parts[formatParts.indexOf('dd')]);
    var year = parseInt(parts[formatParts.indexOf('yyyy')]);
    
    

    label = this.datepicker.getDateForButtonLabel(year, month, day);
  }

  return label;
};

CalendarButtonInput.prototype.handleFocus = function () {
  console.log('-------------------------------------------------------------------');
  console.log('CalendarButtonInput handle focus (selected date is...) called');
  var dateLabel = this.getDateLabel();
console.log('dateLabel', dateLabel);
  if (dateLabel) {
    this.setLabel('selected date is ' + dateLabel);
  }
  else {
    this.setLabel('');
  }
};
CalendarButtonInput.prototype.findDivider = function(){}

// Initialize menu button date picker

// window.addEventListener('load' , function () {

//   var datePickers = document.querySelectorAll('.datepicker');

//   datePickers.forEach(function (dp) {
//     var inputNode   = dp.querySelector('input');
//     var buttonNode  = dp.querySelector('button');
//     var dialogNode  = dp.querySelector('[role=dialog]');

//     var datePicker = new DatePicker(inputNode, buttonNode, dialogNode);
//     datePicker.init();
//   });

// });

export default CalendarButtonInput;