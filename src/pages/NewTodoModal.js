import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APP_STATUSES } from "../constants";
import { saveNewTodo } from "../features/todos/TodoSlice";
import { showErrorMessage } from "../IziToast";
import AppButton from "./AppButton";
import {Modal} from 'bootstrap';

const NewTodoModal = forwardRef((props, ref)=>{
    const [title, setTile] = useState("")
    const [description, setDescription] = useState("")
    const todoSavingStatus = useSelector((state)=> state.todos.status.save)
    const errorBag = useSelector((state)=> state.todos.errorBag)
    const dispatch = useDispatch();
    const modalRef = useRef()
    const handleSaveTodo = ()=>{
        const data = {
            "title":title,
            "description":description
        };
        dispatch(saveNewTodo(data));
    }

    const openModal = () => {
        // Do something with the 
        const modalEle = modalRef.current
        var myModal = new Modal(modalEle);
        myModal.show()
    };

    useEffect(() => {
        if (todoSavingStatus===APP_STATUSES.ERROR) {
            showErrorMessage(errorBag.message);
        }else if(todoSavingStatus===APP_STATUSES.SUCCESS){
            // Create a new modal object
            const modalEle = modalRef.current
            const bsModal= Modal.getInstance(modalEle)
            bsModal.hide()
        }
    }, [todoSavingStatus,errorBag]);

    // Pass the ref to the parent component
    React.useImperativeHandle(ref, () => ({
        openModal,
    }));

    return (
        <div>
            <div className="modal fade" ref={modalRef} tabIndex="-1" >
                <div className="modal-dialog">
                    <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">New Todo</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">
                       <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input 
                                value={title}
                                onChange={(e) => setTile(e.target.value)}
                            className="form-control" type="text" />
                       </div>
                       <div className="form-group mt-3">
                            <label htmlFor="">Description</label>
                            <textarea 
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                            className="form-control" id="" cols="30" rows="5"></textarea>
                       </div>

                       <div className="form-group">
                            <AppButton showLoader={(todoSavingStatus)==='pending'} callBackFun={handleSaveTodo} className="btn btn-primary mt-3" text="Save Todo"/>
                       </div>
                    </div>

                    <div className="modal-footer">
                        <button  type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>

                    </div>
                </div>
            </div>
        </div>
    );
});
export default NewTodoModal;
