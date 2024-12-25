import React, { useEffect } from 'react'


function Test1() {

    console.log('Parent render');
    useEffect(() => {
        console.log('Parent useEffect');
    }, []);

    return (
        <>Testing</>
    )

}
export default Test1
