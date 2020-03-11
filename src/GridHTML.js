import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleLeft, faAngleDoubleRight,faAngleRight} from '@fortawesome/free-solid-svg-icons';


const Grid = (props) =>{
    const tableClasses = props.tableClasses;
    const dateButtonClasses = props.dateButtonClasses;
    
    return(
        <div id="id-datepicker-1"
        className="datepickerDialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="id-dialog-label">
     <div className="header">
       <button className="prevYear" aria-label="previous year">
         {/* <span className="fas fa-angle-double-left fa-lg"></span> */}
         <FontAwesomeIcon icon={faAngleDoubleLeft} />
       </button>
       <button className="prevMonth" aria-label="previous month">
         {/* <span className="fas fa-angle-left fa-lg"></span> */}
         <FontAwesomeIcon icon={faAngleLeft} />
       </button>
       <h2 id="id-dialog-label"
           className="monthYear"
           aria-live="polite">
         Month Year
       </h2>
       <button className="nextMonth" aria-label="next month">
         {/* <span className="fas fa-angle-right fa-lg"></span> */}
         <FontAwesomeIcon icon={faAngleRight} />
       </button>
       <button className="nextYear" aria-label="next year">
         {/* <span className="fas fa-angle-double-right fa-lg"></span> */}
         <FontAwesomeIcon icon={faAngleDoubleRight} />
       </button>
     </div>
     <table id="myDatepickerGrid"
            className={`dates ${tableClasses}`}
            role="grid"
            aria-labelledby="id-dialog-label">
       <thead>
         <tr>
           <th scope="col" abbr="Sunday">
             Su
           </th>
           <th scope="col" abbr="Monday">
             Mo
           </th>
           <th scope="col" abbr="Tuesday">
             Tu
           </th>
           <th scope="col" abbr="Wednesday">
             We
           </th>
           <th scope="col" abbr="Thursday">
             Th
           </th>
           <th scope="col" abbr="Friday">
             Fr
           </th>
           <th scope="col" abbr="Saturday">
             Sa
           </th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`}
                     tabIndex="-1"
                     disabled="">
               25
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`}
                     tabIndex="-1"
                     disabled="">
               26
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`}
                     tabIndex="-1"
                     disabled="">
               27
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`}
                     tabIndex="-1"
                     disabled="">
               28
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`}
                     tabIndex="-1"
                     disabled="">
               29
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`}
                     tabIndex="-1"
                     disabled="">
               30
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses} HELLOOOOO`} tabIndex="-1">
               1
             </button>
           </td>
         </tr>
         <tr>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               2
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               3
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               4
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               5
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               6
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               7
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               8
             </button>
           </td>
         </tr>
         <tr>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               9
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               10
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               11
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               12
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               13
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="0">
               14
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               15
             </button>
           </td>
         </tr>
         <tr>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               16
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               17
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               18
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               19
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               20
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               21
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               22
             </button>
           </td>
         </tr>
         <tr>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               23
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               24
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               25
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               26
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               27
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               28
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               29
             </button>
           </td>
         </tr>
         <tr>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               30
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`} tabIndex="-1">
               31
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`}
                     tabIndex="-1"
                     disabled="">
               1
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`}
                     tabIndex="-1"
                     disabled="">
               2
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`}
                     tabIndex="-1"
                     disabled="">
               3
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`}
                     tabIndex="-1"
                     disabled="">
               4
             </button>
           </td>
           <td className="dateCell">
             <button className= {`dateButton ${dateButtonClasses}`}
                     tabIndex="-1"
                     disabled="">
               5
             </button>
           </td>
         </tr>
       </tbody>
     </table>
     <div className="dialogButtonGroup">
       <button className="dialogButton" value="cancel">
         Cancel
       </button>
       <button className="dialogButton" value="ok">
         OK
       </button>
     </div>
     <div className="message" aria-live="polite">
       {/* Test */}
     </div>
   </div>
    );
};

export default Grid;