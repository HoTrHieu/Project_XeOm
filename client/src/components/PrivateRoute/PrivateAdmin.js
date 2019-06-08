import React from "react"
import { Redirect, Route } from "react-router-dom"
import jwt_decoded from  "jwt-decode"

export const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
    
    <Route
        {...rest}
        render={props =>
            jwt_decoded(localStorage.getItem("taikhoan")).LoaiTaiKhoan === "admin"  ?
                (<Component {...props} />) : //bao gom list driver, InAdmin, ListDriver, Driver
                (<Redirect
                    to={{
                        pathname: "/login", //home
                        state: { from: props.location }
                    }}
                />)
                    
        }
    />

)
