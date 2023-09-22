import "./messenger.css"
import Topbar from "../../components/Topbar"
export default function Messenger()
{
    return (
        <>
             <Topbar/>
            <div className="messenger">
               <div className="chatMenu">
                    <div className="chatMenuWrapper">
                         <input placeholder="Find Friends" className="chatMenuInput"/>
                    </div>
               </div>
               <div className="chatBox">
                   <div className="chatBoxWrapper">
                      BOx
                   </div>
               </div>
               <div className="chatOnline">
                  <div className="chatOnlineWrapper">
                     Online
                  </div>
               </div>
            </div>
        </>
        
    )
}