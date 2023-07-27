import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    LOGOUT_SUCCESS,
    SECRET_KEY_SUCCESS,
    TOKEN_VERIFICATION_FAIL,
    SECRET_KEY_FAIL
  } from "../actions/types";

  const token = localStorage.getItem("token");
  const isAuthenticated = token ? true : false;
  const userData = JSON.parse(localStorage.getItem("userData"));

  const initialState = {
    isAuthenticated: isAuthenticated,
    isAdmin: false,
    isAgent: false,
    user: userData || null,
    token: token,
    errorMessage: null
  };

  // Rest of your code...


const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN_SUCCESS:
            const { id, name, email, isAdmin, isAgent ,img} = action.payload.user;
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
                user: {
                    id: id,
                    name: name,
                    email: email,
                    img:img
                },
                isAdmin: isAdminn,
                isAgent: isAgentt,
                token: token
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                // user: action.payload
                user : {
                    id  : action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email,
                    img: action.payload.img
                },
                isAdmin: action.payload.isAdmin,
                isAgent: action.payload.isAgentt

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
            console.log(action.payload);
            return {
                ...state,
                errorMessage: action.payload.message
            }
        
        case TOKEN_VERIFICATION_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        default:
            return state;
    }
};
export default authReducer