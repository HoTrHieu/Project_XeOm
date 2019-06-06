import React from "react"
import { Redirect, Route } from "react-router-dom"
import jwt_decoded from  "jwt-decode"

export const PrivateRouteProfile = ({ component: Component, ...rest }) => (
    
    <Route
        {...rest}
        render={props =>
            jwt_decoded(localStorage.getItem("taikhoan")).LoaiTaiKhoan === "TaiXe" ?
                (<Component {...props} />) : //Profile
                (<Redirect
                    to={{
                        pathname: "/login", //home
                        state: { from: props.location }
                    }}
                />)
                    
        }
    />

)
