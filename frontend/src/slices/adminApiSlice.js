import { apiSlice } from "./apiSlice";
import { 
    ADMIN_AUTHENTICATION_URL,
    ADMIN_LOGOUT_URL,
    ADMIN_REGISTRATION_URL,
    ADMIN_PROFILE_URL,
    ADMIN_USERS_DATA_FETCH_URL,
    ADMIN_BLOCK_USER_URL,
    ADMIN_UNBLOCK_USER_URL,
    ADMIN_UPDATE_USER_URL,
    ADMIN_PLAYERS_DATA_FETCH_URL,
    ADMIN_TEAM_FORMATION_URL,
    ADMIN_FORMATION_DISPLAY_URL,
    ADMIN_SELECTION_URL,
    ADMIN_UPDATE_POSITION_URL,
    ADMIN_DELETE_USER_URL,
    ADMIN_DELETE_TEAM_URL,
    //ajout dimitri
    ADMIN_AGENDA_DISPLAY_URL,
    ADMIN_PUSH_EVENEMENT_URL,
} from '../utils/constants.js';



export const adminApiSlice = apiSlice.injectEndpoints({
    
    endpoints: (builder) => ({
        
        adminLogin: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_AUTHENTICATION_URL,
                method: 'POST',
                body: data
            })

        }),
        adminLogout: builder.mutation({
            
            query: () => ({
                url: ADMIN_LOGOUT_URL,
                method: 'POST'
            })

        }),
        adminRegister: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_REGISTRATION_URL,
                method: 'POST',
                body: data
            })

        }),
        updateAdmin: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_PROFILE_URL,
                method: 'PUT',
                body: data
            })

        }),
        getUsersData: builder.mutation({
            
            query: () => ({
                url: ADMIN_USERS_DATA_FETCH_URL,
                method: 'POST'
            })

        }),
        blockUser: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_BLOCK_USER_URL,
                method: 'PATCH',
                body: data
            })

        }),
        unblockUser: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_UNBLOCK_USER_URL,
                method: 'PATCH',
                body: data
            })

        }),
        updateUserByAdmin: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_UPDATE_USER_URL,
                method: 'PUT',
                body: data
            })

        }),
        getPlayersData: builder.mutation({
            
            query: () => ({
                url: ADMIN_PLAYERS_DATA_FETCH_URL,
                method: 'POST'
            })

        }),
        setTeamFormation: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_TEAM_FORMATION_URL,
                method: 'POST',
                body: data
            })

        }),
        getFormation: builder.mutation({
            
            query: () => ({
                url: ADMIN_FORMATION_DISPLAY_URL,
                method: 'POST'
            })

        }),
        setSelection: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_SELECTION_URL,
                method: 'POST',
                body: data
            })
        }),
        // Ajout dimitri
        getAgenda: builder.mutation({

            query: () => ({
                url: ADMIN_AGENDA_DISPLAY_URL,
                method: 'POST'
            })

        }),
        setEvenement: builder.mutation({

            query: (data) => ({
                url: ADMIN_PUSH_EVENEMENT_URL,
                method: 'POST',
                body: data
            })

        }),
        updateUserPosition: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_UPDATE_POSITION_URL,
                method: 'PATCH',
                body: data
            })

        }),
        DeleteUser: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_DELETE_USER_URL,
                method: 'DELETE',
                body: data
            })

        }),
        DeleteTeam: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_DELETE_TEAM_URL,
                method: 'DELETE',
                body: data
            })

        })

        // fin ajoute 
    })
})

export const {

    useAdminLoginMutation,
    useAdminLogoutMutation,
    useAdminRegisterMutation,
    useUpdateAdminMutation,
    useGetUsersDataMutation,
    useBlockUserMutation,
    useUnblockUserMutation,
    useUpdateUserByAdminMutation,
    useGetPlayersDataMutation,
    useSetTeamFormationMutation,
    useGetFormationMutation,
    useSetSelectionMutation,
    useUpdateUserPositionMutation,
    useDeleteUserMutation,
    useDeleteTeamMutation,
    //ajout dimitri
    useGetAgendaMutation,
    useSetEvenementMutation,

} = adminApiSlice;