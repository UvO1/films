import React from "react";
import { Header } from "../header/component";

interface ILayout{
    children:  React.ReactNode
}

export const Layout = (props: ILayout) => {
    return (
        <div>
            <Header/>
            <main>{props.children}</main>
            <footer></footer>
        </div>
    );
};