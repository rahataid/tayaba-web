import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export default function OppositeContentTimeline({timelineData}) {
    
    function checkEvenorOdd(num) {
       return num % 2 === 0;
    }

    return (
        <>
        {timelineData.map((item, index) => (
        <Timeline position={checkEvenorOdd(index) ? "alternate" : 'left'}>
        <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
            {item.date}
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{item.event}</TimelineContent>
        </TimelineItem>
        </Timeline>
        ))
        }
        </>
    );
    }