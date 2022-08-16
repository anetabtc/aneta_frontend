import react, {useState} from "react";


function Navbar() {
    const[selected, setSelected] = useState("Select Network")
    return (
        <div id="navbar_menu">
        <div id="imgLogonav">
           <img src={require('./img/logo.png')} className="imgLogo" />
           </div>
           <div id="head">
               <div><DropDown selected={selected} setSelected={setSelected}/></div>
               <div><button type="button" className="menuButton">Address</button></div>
               <div><button type="button" className="menuButton"><img src={require('./img/Vector.png')} id="Vector" /></button></div>
           </div>
        </div>


    )
}


function DropDown({selected, setSelected}) {
    const [isActive, setIsActive] = useState(false)

    function DownUp(){
        if(isActive){
            return (
                <img id="down" src={require('./img/up.png')}/>
            )
        }else{
            return (
                <img id="down" src={require('./img/down.png')}/>
            )
        }
    }
    const options = ["Ergo", "Cardano"];
    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
                {selected != "Select Network" && (
                    <img src={require('./img/' + selected + '.png')} id="Vector" />
                )}
                <p>{selected}</p>
                <DownUp/>

            </div>



            {isActive && (
                <div className="dropdown-content">
                    {options.map((option) => (
                        <div onClick={(e) => {
                            setSelected(option)
                            setIsActive(false)
                        }}
                             className="dropdown-item" >
                        <img src={require('./img/' + option + '.png')} id="Vector" />
                            {option}
                        </div>
                        ))}
                </div>
            )}
        </div>
    )
}


export default Navbar;
