import React, { useEffect } from 'react'


function Test2() {
    console.log('Child render');
    useEffect(() => {
        console.log('Child useEffect');
    }, []);
    return <div>Child Component</div>;
}

export default Test2


