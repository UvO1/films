import { createPortal } from "react-dom";

export const Modal = ({children}) => {
    return createPortal(
        <div>
            {children}
        </div>, document.body
    );
}