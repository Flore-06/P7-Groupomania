import { useState, useEffect, useRef } from "react";
import { faEllipsisH, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DropdownMenuPost = (props) => {

    /*Pour fermer le Dropdown menu*/
    const [open, setOpen] = useState(false);
    let menuRef = useRef();
    useEffect(() => {
        let handler = (e)=>{
            if(!menuRef.current.contains(e.target)){
                setOpen(false);
                console.log(menuRef.current);
            }
        };
        document.addEventListener("mousedown", handler);
        return() =>{
            document.removeEventListener("mousedown", handler);
        }
    });

    return (
        <div>
            {/*dropdown menu pour effectuer des actions sur un post*/}
            <div className='menu-container' ref={menuRef}>
            <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                <FontAwesomeIcon
                    icon={faEllipsisH}
                    className="icone-params-posts"
                    aria-label="Actions pour cette publication"
                />
            </div>

            <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                <ul>
                    <DropdownItem icon = {faPenToSquare} text = {"Modifier le post"}/>
                    <DropdownItem icon = {faTrash} text = {"Supprimer le post"}/>
                </ul>
            </div>
        </div>
    </div>
    )

}

/*Création de la fonction dropdown menu*/
function DropdownItem(props){
    return(
        <li className = 'dropdownItem'>
            {/*<icon src={props.icon}></icon>*/}
            <a> {props.text} </a>
        </li>
    );
}

export default DropdownMenuPost