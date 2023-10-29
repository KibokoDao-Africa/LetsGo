import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = "https://nfticketsv2.buynance.org";

export const EventsApi = createApi({
  reducerPath: "EventsApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getEvent: builder.query({
      query: () => "/events",
    }),
    createEvent: builder.mutation({
      query: (body) => ({
        url: "/events",
        method: "POST",
        body,
      }),
    }),
    getEventDetail: builder.query({
      query: (event_id) => ({
        url: `/events/${event_id}`,
      }),
    }),
  }),
});

export const {
  useGetEventQuery,
  useCreateEventMutation,
  useGetEventDetailQuery,
} = EventsApi;
