import { apiSlice } from "./apiSlice";
import { USER_AUTHENTICATION_URL, USER_LOGOUT_URL, USER_REGISTRATION_URL, USER_PROFILE_URL, USER_DISPLAY_SELECTION_URL, USER_AGENDA_DISPLAY_URL, USER_PLAYERS_DATA_FETCH_URL } from '../utils/constants.js';

const USER_AUTH_URL = USER_AUTHENTICATION_URL; 

export const usersApiSlice = apiSlice.injectEndpoints({
    
    endpoints: (builder) => ({
        
        login: builder.mutation({
            
            query: (data) => ({
                url: USER_AUTH_URL,
                method: 'POST',
                body: data
            })

        }),
        logout: builder.mutation({
            
            query: () => ({
                url: USER_LOGOUT_URL,
                method: 'POST'
            })

        }),
        register: builder.mutation({
            
            query: (data) => ({
                url: USER_REGISTRATION_URL,
                method: 'POST',
                body: data
            })

        }),
        updateUser: builder.mutation({
            
            query: (data) => ({
                url: USER_PROFILE_URL,
                method: 'PUT',
                body: data
            })

        }),
        displaySelectionUser: builder.mutation({
            
            query: () => ({
                url: USER_DISPLAY_SELECTION_URL,
                method: 'POST',
            })

        }),
        displayAgendaUser: builder.mutation({
            
            query: () => ({
                url: USER_AGENDA_DISPLAY_URL,
                method: 'POST',
            })

        }),
        getUserPlayersData: builder.mutation({
            
            query: () => ({
                url: USER_PLAYERS_DATA_FETCH_URL,
                method: 'POST'
            })

        })

    })
})


export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation, useDisplaySelectionUserMutation, useDisplayAgendaUserMutation, useGetUserPlayersDataMutation } = usersApiSlice;