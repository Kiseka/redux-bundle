import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, selectTodos } from "../features/todos/TodoSlice";
import NewTodoModal from "./NewTodoModal";
var count =0;
const TodosList = () => {
    const dispatch = useDispatch();
    const modalRef = useRef();
    const todos = useSelector(selectTodos);
    const loadingStatus = useSelector((state) => state.todos.status.fetch)
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);
    console.log(count+=1)

    const createTodo = ()=>{
        // Create a new modal object
        // var modal = new Modal(document.getElementById('myModal'));
        // // Show the modal
        // modal.show();
        modalRef.current.openModal();
        // console.log(modalRef.current)
    }

    
    return (
        <div className="container">
            <div className="d-flex justify-content-end mb-3">
                <button onClick={createTodo} className="btn btn-primary">New Item</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id}>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>{todo.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {(loadingStatus === 'pending') &&
             <div className="d-flex justify-content-center"><div className="spinner-border"></div></div>
            }
            <NewTodoModal ref={modalRef}  />
        </div>
    );
};
  
export default TodosList;

