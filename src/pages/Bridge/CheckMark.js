function CheckMark() {
    return (
        <div className="check-container">
            <svg className="circle">
                <circle className="bg" cx="65" cy="65" r="60"/>
                <circle className="meter-1" cx="65" cy="65" r="60"/>
            </svg>
            <div id="checkMarkIcon" className="overlay">

            </div>
        </div>
    )
}

export default CheckMark;