import React from 'react';
import styled from 'styled-components/native';

<<<<<<< HEAD
import StarFull from '../assets/star.svg';
import StarHalf from '../assets/star_half.svg';
import StarEmpty from '../assets/star_empty.svg';

const StarArea = styled.View`
    flex-direction: row;
`;
=======
const StarArea = styled.View`
    flex-direction: row;
`;

>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
const StarView = styled.View``;

const StarText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    margin-left: 5px;
    color: #737373;
`;

<<<<<<< HEAD
export default ({ stars, showNumber }) => {
    let s = [0,0,0,0,0];
=======
import StarFull from '../assets/star.svg';
import StarHalf from '../assets/star_half.svg';
import StarEmpty from '../assets/star_empty';

export default ({stars, showNumber}) => {

    let s = [0, 0, 0, 0, 0];
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
    let floor = Math.floor(stars);
    let left = stars - floor;

    for(var i=0;i<floor;i++) {
        s[i] = 2;
    }
    if(left > 0) {
        s[i] = 1;
    }

    return (
        <StarArea>
            {s.map((i, k)=>(
                <StarView key={k}>
                    {i === 0 && <StarEmpty width="18" height="18" fill="#FF9200" />}
                    {i === 1 && <StarHalf width="18" height="18" fill="#FF9200" />}
                    {i === 2 && <StarFull width="18" height="18" fill="#FF9200" />}
                </StarView>
<<<<<<< HEAD

=======
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
            ))}
            {showNumber && <StarText>{stars}</StarText>}
        </StarArea>
    );
<<<<<<< HEAD
}
=======
}
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
