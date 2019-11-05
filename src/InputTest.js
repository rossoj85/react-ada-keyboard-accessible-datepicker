import React, {Component} from 'react';
import { isDelineator, splitByDelineator } from './Utilities';

class Inputtest extends Component{
    constructor(props){
        super(props);
        this.state ={
          stateDate: "",
        }
        this.handleChange = this.handleChange.bind(this);
        // this.constructString = this.constructString.bind(this);
        this.originalGo = this.originalGo.bind(this);
    }

    handleChange(e){
        console.log('target val --- >>> ',e.target.value)
        let targetVal = e.target.value
        let stateDate = this.state.stateDate
        let dateFormat = this.props.dateFormat

        

        console.log('dateFormat', dateFormat);


        if(targetVal>stateDate){
            let largerString = ''
            for(var i = 0; i<targetVal.length; i++){
                console.log('i', i);
                largerString+=(targetVal[i])
                console.log('dateFOrmat[i]', dateFormat[i]);
                console.log( isDelineator.test(dateFormat[i+1]) )
                if( isDelineator.test(dateFormat[i+1]) && !isDelineator.test(targetVal[i+1]) ) {
                    console.log('******************HIIITTTT**************');
                    console.log('i',i);
                    console.log(dateFormat);
                    console.log(targetVal);
               
                    largerString+= dateFormat[i+1]
                }
            }
            console.log('largerString ====>', largerString)
            this.setState({stateDate: largerString})
        }
        


        else this.setState({stateDate: targetVal})
console.log('-----------------------------------------------');
    }

originalGo(e){
    let stateDate = this.state.stateDate;
    let dateFormat = this.props.dateFormat;
    let nextStateDate = e.target.value
    let targetVal = event.target.value;
        // tests to see if number 
    const re = /^[0-9]*$/
    // console.log('rE Test', re.test(e.target.value));

    //wont allow a non-numeric addition, but wil allow for backspacing
    if(!re.test(targetVal[targetVal.length-1]) && stateDate.length<targetVal.length) return;
    console.log('GOT PAST REGEX');
   

    let nextDateFormatChar = dateFormat[targetVal.length]
    let thisDateFormatChar = dateFormat[targetVal.length-1]
    let oneBehindDateFormatChar = dateFormat[targetVal.length-2]

  console.log('thisDateFormatChar',thisDateFormatChar);
  console.log('');
   if(stateDate.length<targetVal.length 
      && nextDateFormatChar!= 'y' 
      && nextDateFormatChar !='m' 
      &&nextDateFormatChar != 'd' 
      && nextDateFormatChar!= undefined) nextStateDate = nextStateDate + nextDateFormatChar
   if( thisDateFormatChar!='y'&& thisDateFormatChar!='m' && thisDateFormatChar!='d' && targetVal[targetVal.length-1]!==thisDateFormatChar ) nextStateDate = stateDate + thisDateFormatChar + targetVal[targetVal.length-1]
   console.log('---------------');
   this.setState({stateDate: nextStateDate})
//    this.handleInputErrors(dateFormat, nextStateDate)
}

//   constructString(e){
//     console.log('handleINput construct string called');
//     let nextStateDate = e.target.value;
//     let dateFormat = this.props.dateFormat;
//     let formatFields =  splitByDelineator(dateFormat)       
//     let inputValues =   splitByDelineator(nextStateDate)                 

//     let monthIndex = formatFields.indexOf('mm');
//     let yearIndex = formatFields.indexOf('yyyy');
//     let dayIndex = formatFields.indexOf('dd')

//     let month = parseInt(inputValues[formatFields.indexOf('mm')])
//     let year = parseInt(inputValues[formatFields.indexOf('yyyy')]) 
//     let day = parseInt(inputValues[formatFields.indexOf('dd')])
//     let dateObj = {};
//     dateObj[monthIndex]=month;
//     dateObj[yearIndex]= year;
//     dateObj[dayIndex] = day;

//     console.log('*************************************');
//    console.log('handleINput nextStateDate - ', nextStateDate);
//     let delineators =[];

//     for(let char of dateFormat){
//       if ( isDelineator.test(char)) delineators.push(char);
//     }
//     console.log('handleINput Delineators', delineators );
//     console.log('**********************************');

//     console.log('handleInput Errors dateFormat',dateFormat );
    
//     console.log('handleInput Errors dd', day );
//     console.log('handleInput Errors mm', month );
//     console.log('handleInput Errors yyyy', year);

//     console.log('*****handleInput dateObj', dateObj);

//     console.log('handleINput formatFields', formatFields);
    
//     console.log('handleInput yyyy length',formatFields[formatFields.indexOf('yyyy')].length);
//     console.log('handleInput mm length',formatFields.indexOf('mm').length);
//     console.log('handleInput dd length',formatFields.indexOf('dd').length);
//     // let constructedDateString =`${dateObj[0]}-${dateObj[1]}-${dateObj[2]}`
    
//     let constructedDateString= ''
//     constructedDateString =  constructedDateString + dateObj[0]
//     if(dateObj[0].toString().length===formatFields[0].length && nextStateDate.length> this.state.stateDate.length){ 
//       console.log('handleInput ADDING DELINEATOR CALLED');
//       constructedDateString = constructedDateString +delineators[0];
//     }

//     if(dateObj[1]) constructedDateString = constructedDateString + dateObj[1]
//     if(dateObj[1].toString().length===formatFields[1].length) constructedDateString = constructedDateString +delineators[1];
    
//     if(dateObj[2])constructedDateString = constructedDateString + dateObj[2]
//     // if(dateObj[2].toString().length===formatFields[2].length) constructedDateString = constructedDateString +delineators[2];




//     console.log('handleInput dateObj[0]--->', typeof (dateObj[0]+''));
//     // console.log('handleInput dateobject[0]----', dateObj[0].length, 'formatFields[0].length---', formatFields[0].length  );
//     console.log('handleInputString---->>>>', constructedDateString);
    
//     console.log('');
//     console.log('--------------------handleINput--------------------------');

//     this.setState({stateDate: constructedDateString})
//   }

    render(){
        return(
            <input onChange={this.originalGo} value={this.state.stateDate} style={{"marginTop": "150px"}} maxLength={this.props.dateFormat.length}></input>
        );
    }

}

export default Inputtest;