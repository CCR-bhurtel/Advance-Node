#!/bin/bash

I=0
MONTH=1
YEAR=2023
DAY=12






getMeDate(){
    while [[ $I -lt 365 ]]

do
    if (( DAY < 30 ))
    then
        (( DAY++ ))
    elif (( DAY == 30 ))
    then
        DAY=1
        if (( MONTH < 12 ))
        then
            (( MONTH++ ))
        elif (( MONTH == 12 ))
        then
            (( YEAR++ ))
            MONTH=1
        fi
    fi
     
    echo -e "\n$YEAR/$MONTH/$DAY:" >> date.txt
    (( I++ ))
done

}
