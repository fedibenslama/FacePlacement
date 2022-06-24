import React from "react";

const Rank = ({ name, entries }) => {
    return (
        <div >
            <div className="f3 white ">
                {`${name} Your Number of entries is ${entries}`}
            </div>
        </div>
    )
}


export default Rank