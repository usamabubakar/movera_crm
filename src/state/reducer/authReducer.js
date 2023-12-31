import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    LOGOUT_SUCCESS,
    SECRET_KEY_SUCCESS,
    TOKEN_VERIFICATION_FAIL,
    SECRET_KEY_FAIL,
    FETCH_SINGLE_USER_SUCCESS
  } from "../actions/types";

  const token = localStorage.getItem("token");
  const isAuthenticated = token ? true : false;
  const userData = JSON.parse(localStorage.getItem("userData"));

  const initialState = {
    isAuthenticated: isAuthenticated,
    isAdmin: false,
    isAgent: false,
    user: {},
    token: token,
    errorMessage: null,
    emailpassword:null,
    singleuser:{}
  };

  // Rest of your code...


const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN_SUCCESS:
            const { id, name, email, isAdmin, isAgent ,img, emailpassword} = action.payload.user;

            const token = action.payload.token;
            const isAdminn = isAdmin;
            const isAgentt = isAgent;
            localStorage.setItem("token", token);
            localStorage.setItem(
                "userData",
                JSON.stringify({
                    id: id,
                    name: name,
                    email: email
                })
            );

            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                isAdmin: isAdminn,
                isAgent: isAgentt,
                token: token,
                img:img,
                emailpassword:emailpassword
            };
        case USER_LOADED:

            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                // user: action.payload.user,
                user : {
                    id  : action.payload.user._id,
                    name: action.payload.user.name,
                    email: action.payload.user.email,
                    img: action.payload.user.img,
                    emailpassword:action.payload.user.emailpassword
                },
                isAdmin: action.payload.user.isAdmin,
                isAgent: action.payload.user.isAgent

            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loginFail: false
            };

        case SECRET_KEY_SUCCESS:
            console.log("secret key success")
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                secretKey: action.payload
            }
            case SECRET_KEY_FAIL:
                console.log("secret key wrong")
                return {
                    ...state,
                    isAuthenticated: false,
                    user: null,
                    secretKey: action.payload
                }
        case LOGIN_FAIL:
            return {
                ...state,
                errorMessage: action.payload.message
            }

        case TOKEN_VERIFICATION_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case FETCH_SINGLE_USER_SUCCESS:
            return{
                ...state,
                singleuser:action.payload
            }
        default:
            return state;
    }
};
export default authReducer