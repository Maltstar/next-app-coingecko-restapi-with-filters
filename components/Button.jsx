import { useEffect, useState } from "react";


export default function Button({className,currency,onClick,style,gridmountedForAllCoins}) 
{
    
// time for disabling the button to avoid going over the request number limitation for free api
    // see https://www.coingecko.com/en/api/documentation
    const delay = 40; // in s
    const [timeremaining,SetTimeRemaining] = useState(delay); 
    const [timeractivated,SetTimerActivated] = useState(false); 
    const [buttondisable, SetButtonDisable]= useState(false); // user flag requesting to load all the results
    const [first_timer, SetFirstTimer] = useState(null);
    const [second_timer, SetSecondTimer] = useState(null);

    //let second_timer;

    useEffect(()=>
    {
        if(gridmountedForAllCoins && !timeractivated)
        {
          SetButtonDisable(true);
        }


    },[gridmountedForAllCoins,timeractivated]);

    useEffect(()=>{

        if(buttondisable)
        {
            SetTimerActivated(true);
            SetFirstTimer((prevfirstTimer) => ( prevfirstTimer=setTimeout(() => {
                SetButtonDisable(false);
                }, delay*1000))); // ms unit)     
        }
        return () => {
            SetFirstTimer((prevfirstTimer) => (clearTimeout(prevfirstTimer)));
          };
        

    },[buttondisable])


    useEffect(() => {

        
        if(timeremaining>0 && buttondisable)
        {
            SetSecondTimer((prevsecondTimer) => ( prevsecondTimer = setTimeout(() => {
            SetTimeRemaining(timeremaining-1);
            }, 1000))); //  time execution: 143537 = 1436 ms per request per test to fecth 53*250 coins
        }

        return () => {
            SetSecondTimer((prevsecondTimer) => (clearTimeout(prevsecondTimer)));
          };

    },[timeremaining,buttondisable]);

    return(
        <button
        className={className}
        onClick={onClick}
        style={style}
        disabled={buttondisable}
      >
        {   // display either currency or time remaining when button is disabled
            buttondisable ? timeremaining : currency ? '€' : '$'
        } 
      </button>
    )

}