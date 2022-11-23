import React from 'react';
import { useEffect, useState, useRef } from 'react';



// code adapted from https://www.geeksforgeeks.org/how-to-create-a-custom-progress-bar-component-in-react-js/
// class Progress_bar extends React.Component{
//     constructor(...props) {
//         super(...props);
//         this.state = {
//             progress: 0,
//             //charts:<Charts coinsData={coinsData} search={mykeyword}/>
//           };
//         }
//const Progress_bar = ({bgcolor,progress=0,height}) => {
export default function Progressbar({height,isLoaded,bgcolor}) {
    const delay = 150; // time execution for fetching request per test: between 143537 and 190 000 ms
    const [init,SetInit] = useState(false);
    const [progress,SetProgress] = useState(0);
    const [timeremaining,SetTimeRemaining] = useState(delay); // time execution for fetching request per test: between 143537 and 190 000 ms
    const [first_timer, SetFirstTimer] = useState(null);
    const [second_timer, SetSecondTimer] = useState(null);
    const idRef = useRef();


	const Parentdiv = {
		height: height,
		width: '100%',
		backgroundColor: 'whitesmoke',
		borderRadius: 40,
		margin: 50
	}
	
	const Childdiv = {
		height: '100%',
		width: `${progress}%`,
		backgroundColor: bgcolor,
        //'margin-top': "10%",
	    borderRadius:40,
		textAlign: 'right'
	}
	
	const progresstext = {
		padding: 10,
		color: 'black',
		fontWeight: 900
	}

    const title = 
    {
        fontWeight:900,
        color: bgcolor,
        textAlign: 'center',
    }

    const para = 
    {
        fontWeight:500,
        color: bgcolor,
        textAlign: 'center',
    }

     useEffect(() => {

        if(progress<100 && !isLoaded)
        {
            SetFirstTimer((prevfirstTimer) => ( prevfirstTimer = setTimeout(() => {
            SetProgress(progress+1);
            }, delay*10))); //  time execution: 143537 = 1436 ms per request per test to fecth 53*250 coins
        }
        
        return () => {
            SetFirstTimer((prevfirstTimer) => (clearTimeout(prevfirstTimer)));
          };

    },[progress,isLoaded]);


    useEffect(() => {

        
        if(timeremaining>0 && !isLoaded)
        {
            SetSecondTimer((prevsecondTimer) => ( prevsecondTimer =  setTimeout(() => {
            SetTimeRemaining(timeremaining-1);
            }, 1000))); //  time execution: 143537 = 1436 ms per request per test to fecth 53*250 coins
        }

        return () => {
            SetSecondTimer((prevsecondTimer) => (clearTimeout(prevsecondTimer)));
          };

    },[timeremaining,isLoaded]);


    return (
                <div>
                    <h2 style={title}>Loading in Progress: time remaining {`${timeremaining}s`}</h2>
                    <p style={para}>Collecting data for more than 10000 coins</p>
                    <p style={para}>Do not refresh or click a button until the complete load to not cancel the loading process</p>
                    <div style={Parentdiv}>
                    <div style={Childdiv}>
                        <span style={progresstext}>{`${progress}%`}</span>
                    </div>
                    </div>
                </div>
            );

}


