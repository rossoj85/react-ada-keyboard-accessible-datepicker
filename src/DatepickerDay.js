/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   File:   datepickerDay.js
*/

var DatePickerDay = function (domNode, datepicker, index, row, column) {

    this.index = index;
    this.row = row;
    this.column = column;
  
    this.day = new Date();
  
    this.domNode = domNode;
    this.datepicker = datepicker;
  
    this.keyCode = Object.freeze({
      'TAB': 9,
      'ENTER': 13,
      'ESC': 27,
      'SPACE': 32,
      'PAGEUP': 33,
      'PAGEDOWN': 34,
      'END': 35,
      'HOME': 36,
      'LEFT': 37,
      'UP': 38,
      'RIGHT': 39,
      'DOWN': 40
    });
  };
  
  DatePickerDay.prototype.init = function () {
    this.domNode.setAttribute('tabindex', '-1');
    this.domNode.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.domNode.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.domNode.addEventListener('focus', this.handleFocus.bind(this));
  
    this.domNode.innerHTML = '-1';
  
  };
  
  DatePickerDay.prototype.isDisabled = function () {
    return this.domNode.classList.contains('disabled');
  };
  
  DatePickerDay.prototype.updateDay = function (disable, day, minDate=null, maxDate=null) {
    console.log('DatepickerDay updateDay called...');
    console.log('diable- ', disable);
    console.log('day - ', day);
    console.log('args', arguments);
    // console.log('datepickerDay update Day this.domNode',this.domNode)
    if (disable) {
      this.domNode.classList.add('disabled');
    }
    else {
      this.domNode.classList.remove('disabled');
    }
  
    this.day = new Date(day);
  
    this.domNode.innerHTML = this.day.getDate();
    this.domNode.setAttribute('tabindex', '-1');
    this.domNode.removeAttribute('aria-selected');
  
    var d = this.day.getDate().toString();
    if (this.day.getDate() < 9) {
      d = '0' + d;
    }
  
    var m = this.day.getMonth() + 1;
    if (this.day.getMonth() < 9) {
      m = '0' + m;
    }
    var today = new Date()
    var thisDayNodeDate  = this.day.getFullYear() + '-' + m + '-' + d;
    var dateToday = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`

    this.domNode.setAttribute('data-date', this.day.getFullYear() + '-' + m + '-' + d);
    // if(this.isNodeDateGreaterThanSelectedDay(thisDayNodeDate,dateToday)){
    //   this.domNode.classList.add('disabled')
    // }


    // console.log('this dayNode date', thisDayNodeDate);
    // console.log('today date', dateToday, typeof dateToday );
    console.log('date today', dateToday);
    console.log('max date', maxDate);

    if(maxDate){
     const  pastMaxDate = this.isNodeDateGreaterThanMaxDate(thisDayNodeDate,maxDate);
     const beforeMinDate = this.isNodeDateLessThanMinDate(thisDayNodeDate,minDate);
      if(pastMaxDate) {
        this.domNode.setAttribute('isGreaterThanMaxDate',true)
        this.domNode.setAttribute('todayDate' ,dateToday)
        this.domNode.classList.add('disabled')
      }
      if(!pastMaxDate && !beforeMinDate) {
        this.domNode.classList.remove('disabled')
        this.domNode.setAttribute('isGreaterThanMaxDate',false)
        this.domNode.setAttribute('todayDate' ,dateToday)
      }
    } 
   if(minDate){
     const beforeMinDate = this.isNodeDateLessThanMinDate(thisDayNodeDate, minDate)
     const  pastMaxDate = this.isNodeDateGreaterThanMaxDate(thisDayNodeDate,maxDate);

     if(beforeMinDate){
      this.domNode.setAttribute('isBeforeMinDate',true)
      this.domNode.setAttribute('todayDate' ,dateToday)
      this.domNode.classList.add('disabled')
     }
     if(!beforeMinDate && !pastMaxDate){
      this.domNode.classList.remove('disabled')
      this.domNode.setAttribute('isBeforeMinDate',false)
      this.domNode.setAttribute('todayDate' ,dateToday)
     }
   }

  };
  DatePickerDay.prototype.disableDayNode =function(reason, node){
    node.setAttribute(reason, true);
    node.classList.add('disabled')
    node.disabled=true
    
  }

  DatePickerDay.prototype.isNodeDateGreaterThanMaxDate = function(nodeDate, selectedDate){
    const selectedDateArray = selectedDate.split('-')
    const nodeDateArray = nodeDate.split('-')
    let result = false;
  
    for(let i = 0; i<3; i++){
      console.log(`${nodeDateArray[i]}>${selectedDateArray[i]}`);
     if (parseInt(nodeDateArray[i])>parseInt(selectedDateArray[i])) return true;
     if (parseInt(nodeDateArray[i])<parseInt(selectedDateArray[i])) return false;
    }
    return false;
  }
  DatePickerDay.prototype.isNodeDateLessThanMinDate = function(nodeDate, selectedDate){
    const selectedDateArray = selectedDate.split('-')
    const nodeDateArray = nodeDate.split('-')
  
    for(let i = 0; i<3; i++){
      console.log(`${nodeDateArray[i]}<${selectedDateArray[i]}`);
     if (parseInt(nodeDateArray[i])>parseInt(selectedDateArray[i])) return false;
     if (parseInt(nodeDateArray[i])<parseInt(selectedDateArray[i])) return true;
    }
    return false;
  }

  DatePickerDay.prototype.handleKeyDown = function (event) {
    var flag = false;
  
    switch (event.keyCode) {
  
      case this.keyCode.ESC:
        this.datepicker.hide();
        break;
  
      case this.keyCode.TAB:
        this.datepicker.cancelButtonNode.focus();
        if (event.shiftKey) {
          this.datepicker.nextYearNode.focus();
        }
        this.datepicker.setMessage('');
        flag = true;
        break;
  
      case this.keyCode.ENTER:
      case this.keyCode.SPACE:
        this.datepicker.setTextboxDate(this.day);
        this.datepicker.hide();
        flag = true;
        break;
  
      case this.keyCode.RIGHT:
        this.datepicker.moveFocusToNextDay();
        flag = true;
        break;
  
      case this.keyCode.LEFT:
        this.datepicker.moveFocusToPreviousDay();
        flag = true;
        break;
  
      case this.keyCode.DOWN:
        this.datepicker.moveFocusToNextWeek();
        flag = true;
        break;
  
      case this.keyCode.UP:
        this.datepicker.moveFocusToPreviousWeek();
        flag = true;
        break;
  
      case this.keyCode.PAGEUP:
        if (event.shiftKey) {
          this.datepicker.moveToPreviousYear();
        }
        else {
          this.datepicker.moveToPreviousMonth();
        }
        flag = true;
        break;
  
      case this.keyCode.PAGEDOWN:
        if (event.shiftKey) {
          this.datepicker.moveToNextYear();
        }
        else {
          this.datepicker.moveToNextMonth();
        }
        flag = true;
        break;
  
      case this.keyCode.HOME:
        this.datepicker.moveFocusToFirstDayOfWeek();
        flag = true;
        break;
  
      case this.keyCode.END:
        this.datepicker.moveFocusToLastDayOfWeek();
        flag = true;
        break;
    }
  
    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  
  };
  
  DatePickerDay.prototype.handleMouseDown = function (event) {
  
    if (this.isDisabled()) {
      this.datepicker.moveFocusToDay(this.date);
    }
    else {
      this.datepicker.setTextboxDate(this.day);
      this.datepicker.hide();
    }
  
    event.stopPropagation();
    event.preventDefault();
  
  };
  
  DatePickerDay.prototype.handleFocus = function () {
    this.datepicker.setMessage(this.datepicker.messageCursorKeys);
  };

  export default DatePickerDay;