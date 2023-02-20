import axios from "axios";
import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
  } from '@reduxjs/toolkit'
import { APP_STATUSES, baseUrl, token } from "../../constants";
  
const todosAdapter = createEntityAdapter()
const initialState = todosAdapter.getInitialState({
    status:{
        fetch:"idle",
        save: "idle",
        update: "idle",
        delete: "idle",
    },
    errorBag:{}
})

// Thunk functions
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axios.get(baseUrl+"/api/todos/",{
        headers: {
            Authorization: 'Bearer '+token,
        }
    })
    return response.data.data
})

export const saveNewTodo = createAsyncThunk("todos/saveNewTodo", async(data,{rejectWithValue})=>{
    try {
        const response = await axios({
            method: 'post',
            url: baseUrl+"/api/todos/create/",
            headers: {
                Authorization: 'Bearer '+token,
            },
            data:data
        })
        return response.data.data
    } catch (error) {
        return rejectWithValue("All Fields Are Required");
    }
})
// todos/saveNewTodo/rejected
const todoSlice = createSlice({
    name:"todos",
    initialState,
    reducers:{
        todoAdded(state,actions){
            
        },
        todoDeleted(state,actions){
            
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchTodos.pending, (state,action)=>{
            state.status.fetch =APP_STATUSES.PENDING;
        })
        .addCase(fetchTodos.fulfilled,(state,action)=>{
            state.status.fetch =APP_STATUSES.SUCCESS
            todosAdapter.setAll(state, action.payload)
        })
        .addCase(saveNewTodo.pending,(state,action)=>{
            state.status.save = APP_STATUSES.PENDING
        })
        .addCase(saveNewTodo.fulfilled,(state,action)=>{
            state.status.save =APP_STATUSES.SUCCESS
            todosAdapter.addOne(state, action.payload)
        })
        .addCase(saveNewTodo.rejected,(state,action)=>{
            state.status.save = APP_STATUSES.ERROR
            // console.log(action.payload)
            state.errorBag.message =  action.payload
        })
    }
});
export const {
    todoAdded,
    todoDeleted
} = todoSlice.actions
export default todoSlice.reducer

export const {
    selectAll: selectTodos,
    selectById: selectTodoById,
  } = todosAdapter.getSelectors((state) => state.todos)