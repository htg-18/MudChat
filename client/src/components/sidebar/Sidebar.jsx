import "./sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faRss,faComment,faCirclePlay,faPeopleGroup,faBookmark,faQuestionCircle, faSuitcase, faCalendarDays, faGraduationCap} from '@fortawesome/free-solid-svg-icons'
import { Users } from "../../dummyData"
export default function Sidebar()
{
   const PF=process.env.REACT_APP_PUBLIC_FOLDER
    return ( 
         <div className="sidebar">
           <div className="sidebarWrapper">
               <ul className="sidebarList">
                  <li className="sidebarListItem">
                     <FontAwesomeIcon className="sidebarItem" icon={faRss} />
                     <span className="sidebarListItemText">Feeds</span>
                  </li>
                  <li className="sidebarListItem">
                     <FontAwesomeIcon className="sidebarItem" icon={faComment} />
                     <span className="sidebarListItemText">Chats</span>
                  </li>
                  <li className="sidebarListItem">
                     <FontAwesomeIcon className="sidebarItem" icon={faCirclePlay} />
                     <span className="sidebarListItemText">Videos</span>
                  </li>
                  <li className="sidebarListItem">
                     <FontAwesomeIcon className="sidebarItem" icon={faPeopleGroup} />
                     <span className="sidebarListItemText">Groups</span>
                  </li>
                  <li className="sidebarListItem">
                     <FontAwesomeIcon className="sidebarItem" icon={faBookmark} />
                     <span className="sidebarListItemText">Bookmarks</span>
                  </li>
                  <li className="sidebarListItem">
                     <FontAwesomeIcon className="sidebarItem" icon={faQuestionCircle} />
                     <span className="sidebarListItemText">Questions</span>
                  </li>
                  <li className="sidebarListItem">
                     <FontAwesomeIcon className="sidebarItem" icon={faSuitcase} />
                     <span className="sidebarListItemText">Jobs</span>
                  </li>
                  <li className="sidebarListItem">
                     <FontAwesomeIcon className="sidebarItem" icon={faCalendarDays} />
                     <span className="sidebarListItemText">Events</span>
                  </li>
                  <li className="sidebarListItem">
                     <FontAwesomeIcon className="sidebarItem" icon={faGraduationCap} />
                     <span className="sidebarListItemText">Courses</span>
                  </li>
               </ul>
               <button className="sidebarListButton">Show More..</button>
               <hr className="sidebarHr"/>
               <ul className="sidebarFriends">
               {Users.map((u)=>(
                <li className="sidebarFriend">
                     <img   className="FriendImage" src={PF+u.profilePicture}/>
                     <span className="FriendName">{u.username}</span>
                   </li>
                    )) }
                  
               </ul>
              
           </div>
        </div>
    )
       
    
}