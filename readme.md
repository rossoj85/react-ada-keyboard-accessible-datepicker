# React-ADA-Keyboard-Accessible-Datepicker

React-ADA-Keyboard-Accessible-Datepicker is an easy to implement date picker compliant with the standards set out by the Americans with Disabilities Act, including features such as full keyboard accessibility and aria labeling. The package builds upon the date picker developed by w3.org ( https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html ) and and adds several options for customization and easy React integrations. 

![alt text](https://raw.githubusercontent.com/rossoj85/react-ada-keyboard-accessible-datepicker/master/datePickerScreenShot.png)

## Keyboard Controls
 **Choose Date Button**
 
| Key         	| Function                                                                                                                                                                          	|
|-------------	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| Space,Enter 	| * Open the date picker dialog.<br><br> * Move focus to selected date, i.e.,  the date displayed in the date input text field. If no date has been selected,  places focus on the current date. 	|                                                    
 
 **Date Picker Dialog**

| Key 	| Function                                                                                                                                                                                                                                                                                	|
|-----	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| ESC 	| Closes the dialog and returns focus to the Choose Date button.                                                                                                                                                                                                                          	|
| Tab 	| * Moves focus to next element in the dialog Tab sequence.<br><br> * Note that, as specified in the grid design pattern, only one button in the calendar grid is in the Tab sequence.<br><br> * If focus is on the last button (i.e., OK), moves focus to the first button (i.e. Previous Year). 	|

 **Date Picker Dialog: Month/Year Buttons**

 | Key         	| Function                                                     	|
|-------------	|--------------------------------------------------------------	|
| Space,Enter 	| Change the month and/or year displayed in the calendar grid. 	|

 **Date Picker Dialog: Date Grid**

| Key             	| Function                                                                                                                                                                                                                                               	|
|-----------------	|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| Space,<br>Enter 	| * Select the date, close the dialog, and move focus to the Choose Date button.<br><br><br>* Update the value of the Date input with the selected date.<br><br><br>* Update the accessible name of the Choose Date button to include the selected date. 	|

 **Date Picker Dialog: OK and Cancel Buttons**
 **Date Picker Dialog: Date Grid**
 **Date Picker Dialog: Date Grid**
 **Date Picker Dialog: Date Grid**
 **Date Picker Dialog: Date Grid**
 **Date Picker Dialog: Date Grid**
 **Date Picker Dialog: Date Grid**
 **Date Picker Dialog: Date Grid**
 



## Installation
Use npm to install React-ADA-Keyboard-Accessible-Datepicker

```bash
npm install react-ada-keyboard-accessible-datepicker
```

## Accessibility Features 
React-ADA-Keyboard-Accessible-Datepicker includes several features to help make its use more accessible to all. 
* When a date is chosen, the accessible name of the “Choose Date” button is updated to include the selected date. So, when the dialog closes and focus returns to the “Choose Date” button, screen reader users hear confirmation of the selected date in the button name.
* When the month or year of the calendar grid changes as users navigate the calendar or activate the buttons for next or previous month or year, a live region enables screen readers to announce the new month and year.
* The calendar grid provides hotkeys for changing the year and month as well as support for normal grid navigation keys.
* When the dialog opens and a date in the calendar grid receives focus, a live region enables screen readers to announce keyboard instructions for navigating the calendar grid. The instructions are also visible at the bottom of the dialog box.

## Usage

```python
import React from 'react';
import Datepicker from 'react-ada-keyboard-accessible-datepicker'

const DatePickerContainer = () =>{

    return(
        <div>
            <Datepicker  />
        </div>
    )
}
```



## Customization and Formatting 
The date picker allows several levels of customization to acccomodate developers needs. Customizations are generally passed into the <Datepicker /> component as props. Additional levels of customization will be available in future releases. 

  **themeColor** <br/>
  Applies a selected color to the calendar button and calendar borders

 ```python
const DatePickerContainer = () =>{

    return(
        <div>
            < Datepicker themeColor={"#B41C1C"} />
        </div>
    )
}
```

  **dateFormat** <br/>
  Dates will be formatted to mm/dd/yyyy by default, but custom formats may be passed in as a string. The month field must be repressed by mm, the date by dd, and the year by yyyy. Fields may be separated by forward slashes, commas or spaces[/ , ]. User input will be automatically formatted unless autoFormatting={false} is passed in as a prop. 

```python
const DatePickerContainer = () =>{

    return(
        <div>
            < Datepicker dateFormat={"yyyy,mm,dd"} />
        </div>
    )
}
```
  

  **minDate** <br/>
  -Sets the earliest day that the user may choose by using the datepicker. All date cells before the minDate will be disabled. Combing the minDate prop with maxDate will create a date range. Users will not be able to naviagate to the dates outside of the range.  ***minDate must be passed in with the “yyyy-mm-dd” format***. To set the min date to the current date pass in `minDate={“today”}`

  ```python
const DatePickerContainer = () =>{

    return(
        <div>
            < Datepicker
               minDate={"2019-12-25"} 
              # ----- OR -------
              minDate={"today"}
            />
        </div>
    )
}
```

  **maxDate** <br/>
  Sets the latest date that the user may choose by using the date picker. All date cells after the maxDate will be disabled. Combining the maxDate with mandate will create a date range. Users will not be able to naviagate to the dates outside of the range.  ***maxDate must be passed in with the “yyyy-mm-dd” format***. To set the min date to the current date pass in `maxDate={“today”}`

  ```python
const DatePickerContainer = () =>{

    return(
        <div>
            < Datepicker
               maxDate={"2017-10-12"} 
              # ----- OR -------
              maxDate={"today"}
            />
        </div>
    )
}
```
**specifiedFocusDate** <br />
You can specifiy which date that the datepicker will open to by passing in specifiedFocusDate={"yyyy-mm-dd"}

  ```python
const DatePickerContainer = () =>{

    return(
        <div>
            < Datepicker
               specifiedFocusDate={"2019-10-15"}
            />
        </div>
    )
}
```


  **buttonInlineStyle** <br/> 
  Customized styling can be passed to the calendar button as a style object. Object keys follow JSX conventions. Alternatively, class names from your own stylesheet can be passed to the calendar button with the buttonClassNames prop. 

   
```python
const buttonInlineStyle = {"color": "orange", "marginLeft": "30px"} 

const DatePickerContainer = () =>{

    return(
        <div>
            < Datepicker
               buttonInlineStyle={buttonInlineStyle} 
            />
        </div>
    )
}
```

  **buttonClassNames** <br/>
  One of more classes can be passed to the calendar button through the buttonClassNames prop as a string. Seperate the classes by a space Be sure to pass in names without a prepending period. 

  ```python
const DatePickerContainer = () =>{

    return(
        <div>
            < Datepicker
              buttonClassNames={"cssClass1 cssClass2 cssClass3"}
            />
        </div>
    )
}
```
  

  **customInputBox** <br/>
  Save a custom input box as a variable and pass it in as a prob. Note, you will have ot provide your own ARIA labels. 

  ```python
const DatePickerContainer = () =>{

const customInputBox = <input id="Custom-Box" placeholder="this is a custom inputBox" style={{'backgroundColor': 'red'}}></input>

    return(
        <div>
            < Datepicker
                customInputBox={customInputBox}
            />
        </div>
    )
}
```
  


  **inputBoxLabel** <br />
  Pass in a string for a custom input box label, or pass in false to remove the default label. 
  
  ```python
const DatePickerContainer = () =>{

const customInputBox = <input id="Custom-Box" placeholder="this is a custom inputBox" style={{'backgroundColor': 'red'}}></input>

    return(
        <div>
            < Datepicker
              inputBoxLabel={"This is a custom label"}
              # OR
              inputBoxLabel={false}
            />
        </div>
    )
}
```

  **inputBoxClassNames** <br /> 
  One of more classes can be passed as strings  to the input box through the inputBoxClassNames prop. Be sure to pass in names without a prepending period. 

 ```python
const DatePickerContainer = () =>{

    return(
        <div>
            < Datepicker
              inputBoxClassNames={"cssClass1 cssClass2 cssClass3"}
            />
        </div>
    )
}
```
  **Error Handling** <br />
 The datepicker comes with default internal error handling, but it is possible to passs in custom error messages through props. all of the following must be passed in as strings
 
  <br />

 invalidFormatError - This message will be displated when a user enters the date in an invaliud format 

 invalidMonthErrorMessage - This message will be displayed when a user enters a mm(month) value greater than 12 <br />

 invalidDateErrorMessage - This message will be displayed when a user enters a dd(day) value greater than 31 <br />

 pastMaxDateErrorMessage -  This message will be displayted when there is a Maximum date prop passed into the datepicker and the user enters a date past that  <br />

minDateErrorMessage - This message will be displayted when there is a minimum date prop passed into the datepicker and the user enters a date before that  <br />

 ```python
const DatePickerContainer = () =>{

    return(
        <div>
            < Datepicker
              invalidDateErrorMessage={" Month invalid, please check the month"}
            />
        </div>
    )
}
```

If you would prefer to handle error on your application level rather than internally through the datepicker, and alternative can be to pass in the errorHandlingCallback. and wrapping the datepicker in its own component with its own state. Set a field on the state called errorType.  Write a function that will invoke this.setState and pass it into the errorHandlingCallback. An example can be seen below. Passing in errorHandlingCallback will disable the internally generated error messages. <br />

For Class Based Components : 
 ```python
import React,{useState, Fragment, Component} from 'react';
import Datepicker from 'react-ada-keyboard-accessible-datepicker';
import './testStyle.css'

class ClassBasedCalContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            errorType: null
        }
        this.setStateCallBack = this.setStateCallBack.bind(this);
    }

    setStateCallBack(messageType){
        this.setState({errorType: messageType})
    }

render(){
    return(
        <div>
            <h1>CLASS BASED COMPONENT CONTAINER</h1>
            <h2>{`The State message is ${this.state.errorType}`}</h2>
            <Datepicker 
            
            errorHandlingCallback ={this.setStateCallBack}
            minDate={"today"} //eventually make this so it follows format
            maxDate={"2019-12-25"}

            />

        </div>
    )
}

}
}
```

For Functional Components: 

 ```python
const CalendarContainer = () =>{

     const [errorType, setErrorType] = useState(null)
    return(
        <div>
            <h1 >CALANDER CONTAINER APP</h1>
            <h2>{`The errorType is ${errorType}`}</h2>
      
            <Datepicker 
                specifiedFocusDate={"2019-10-15"}
                dateFormat ={"mm dd, yyyy"}
                minDate={"today"} 
                maxDate={"2019-12-25"}
                errorHandlingCallback ={setErrorType}
                            />
        </div>
    )
}
```
You can use the errorType const to write the logic for determining your errorType messages and errorHandling behavior. 

  **inputBoxOnChange** <br />
  Callback that will be executed on input box change (*under development*)


  **inputBoxOnBlur** <br/>
  Callback that will be executed on input box blur (*under development*)

  **autoFormat** <br/>
  Auto formatting of user input can be turned off by passing in autoFormatting={false}. (*under development*)

  

History 

v1.2.0 
* input box now calculates latest day of each month and throws error if entered date is beyond that 
* simplified autoformating that allows for easier revisions to input date 
* updated documentation with screenshots and keyboard controls 

v1.1.4  
* custom iput boxs without ids are automatically assigned id of "id-textbox-1" 
* error messages nor use the htmlFor attribute and point ot inputBox
* inputBox ariaDescribedby pointsx to the error message
* updates to documentation 