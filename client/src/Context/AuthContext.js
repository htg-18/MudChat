import {createContext,useReducer} from "react"
import AuthReducer from "./AuthReducer"

const INITIAL_STATE={
    user:{
        _id:"6493ed2c74bbc5a7f14fc218",
        userName:"hey",
        email:"hey@gmail.com",
        password:"$2b$10$JP4YyYNevnv5PhvTxUE1kuW/66YIXZVGWnO0.AIZfABsADm2VYxK2",
        profilePicture:"person/1.jpeg",
        coverPicture:"",
        follower:[""],
        following:[""],
        isAdmin:false,
        createdAt:{"$date":{"$numberLong":"1687416108118"}},
        updatedAt:{"$date":{"$numberLong":"1688191724887"}},
        __v:{"$numberInt":"0"},
        city:"Jaipur",
        desc:"Hello!!",
        from:"Jaipur2",
        relationship:{"$numberInt":"2"},
    },
    isFecthing:false,
    error:false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE)
    return(
       <AuthContext.Provider
       value={{
        user:state.user,
                isFecthing:state.isFecthing,
                error:state.error,
                dispatch,
       }}
       >{children}
       </AuthContext.Provider>
    )
}