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
    

    if(maxDate && minDate){
      // console.log('INSIDE MAX AND MIN');
      const  pastMaxDate = this.isNodeDateGreaterThanMaxDate(thisDayNodeDate,maxDate);
      const beforeMinDate = this.isNodeDateLessThanMinDate(thisDayNodeDate,minDate); // failing here 

      if(pastMaxDate) this.disableDayNode('isGreaterThanMaxDate',this.domNode)
      if(beforeMinDate) this.disableDayNode('isbeforeMinDate',this.domNode)
      if(!beforeMinDate && !pastMaxDate) this.removeDisabled(this.domNode)
    }
    else if(maxDate){
    //  console.log('INSIDE MAX ONLY');
     const  pastMaxDate = this.isNodeDateGreaterThanMaxDate(thisDayNodeDate,maxDate);
    //  const beforeMinDate = this.isNodeDateLessThanMinDate(thisDayNodeDate,minDate); // failing here 
    
      if(pastMaxDate) this.disableDayNode('isGreaterThanMaxDate',this.domNode)
      if(!pastMaxDate) this.removeDisabled(this.domNode)
    }
    else if (minDate){
      // console.log('INSIDE MIN ONLY');
      const beforeMinDate = this.isNodeDateLessThanMinDate(thisDayNodeDate, minDate);

      if(beforeMinDate) this.disableDayNode('isbeforeMinDate',this.domNode);
      if(!beforeMinDate) this.removeDisabled(this.domNode)
    }

  //  if(minDate){
  //    const beforeMinDate = this.isNodeDateLessThanMinDate(thisDayNodeDate, minDate)
  //    const  pastMaxDate = this.isNodeDateGreaterThanMaxDate(thisDayNodeDate,maxDate); // failing here 

  //    if(beforeMinDate) this.disableDayNode('isbeforeMinDate',this.domNode)
  //    if(!beforeMinDate && !pastMaxDate) this.removeDisabled(this.domNode)
  //  }

  };
  DatePickerDay.prototype.disableDayNode =function(reason, node){
    node.setAttribute(reason, true);
    node.classList.add('disabled')
    node.disabled=true
  }
  DatePickerDay.prototype.removeDisabled = function(node){
    node.classList.remove('disabled')
    node.disabled=false;
  }

  DatePickerDay.prototype.isNodeDateGreaterThanMaxDate = function(nodeDate, maxDate){
    // console.log('isNodeDateFreater than max date called');
    const maxDateArray = maxDate.split('-')
    const nodeDateArray = nodeDate.split('-')
    let result = false;
  
    for(let i = 0; i<3; i++){
      // console.log(`${nodeDateArray[i]}>${maxDateArray[i]}`);
     if (parseInt(nodeDateArray[i])>parseInt(maxDateArray[i])) return true;
     if (parseInt(nodeDateArray[i])<parseInt(maxDateArray[i])) return false;
    }
    return false;
  }
  DatePickerDay.prototype.isNodeDateLessThanMinDate = function(nodeDate, minDate){
    // console.log('is less than minDate called . . .');
    const minDateArray = minDate.split('-')
    const nodeDateArray = nodeDate.split('-')
  
    for(let i = 0; i<3; i++){
      // console.log(`${nodeDateArray[i]}<${minDateArray[i]}`);
     if (parseInt(nodeDateArray[i])>parseInt(minDateArray[i])) return false;
     if (parseInt(nodeDateArray[i])<parseInt(minDateArray[i])) return true;
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
    console.log('handle mousedown',this.date)
  
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
    console.log('datepickerDay handle focus called');
    this.datepicker.setMessage(this.datepicker.messageCursorKeys);
  };

  export default DatePickerDay;