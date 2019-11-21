# React-ADA-Keyboard-Accessible-Datepicker

React-ADA-Keyboard-Accessible-Datepicker is an easy to implement date picker compliant with the standards set out by the Americans with Disabilities Act, including features such as full keyboard accessibility and aria labeling. The package builds upon the date picker developed by w3.org ( https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html ) and and adds several options for customization and easy React integrations. 

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
  Dates will be formatted to mm/dd/yyyy by default, but custom formats may be passed in as a string. The month field must be repressed by mm, the date by ddd, and the year by yyyy. Fields may be separated by forward slashes, commas or spaces[/ , ]. User input will be automatically formatted unless autoFormat={false} is passed in as a prop. 

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
 

  **inputBoxOnChange** <br />
  Callback that will be executed on input box change (*under development*)


  **inputBoxOnBlur** <br/>
  Callback that will be executed on input box blur (*under development*)

  **autoFormat** <br/>
  Auto formatting of user input can be turned off by passing in autoFormat={false}. (*under development*)

  



