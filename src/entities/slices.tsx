import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";


export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3030/api/v1"}),
    keepUnusedDataFor: 1000,
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: (params) => "/search?" + params,
        }),
        getMovieInfo: builder.query({
            query: (id) => "/movie/" + id,
        }),
        getAuthorization: builder.mutation({
            query: ({user}) => ({
                url: "/login",
                method: "POST",
                body: user
            })
        })
    })
});

export const {useGetMoviesQuery, useGetAuthorizationMutation, useGetMovieInfoQuery} = apiSlice;



const initialState = {
    isAuthorized: false
};

export const authorizedSlice = createSlice({
    name: "authorized",
    initialState,
    reducers: {
        change: (state, action) => {
            const temp = action.payload;
            state["isAuthorized"] = temp;
        }
    }
});

export const selectAuthorizedInfo = (state) => state.authorized;
export const {change} = authorizedSlice.actions;
