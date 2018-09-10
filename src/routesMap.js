export default {
  HOME: '/'
}

// VIDEO: {
//   path: '/video/:slug',
//   thunk: async (dispatch, getState) => {
//     const { jwToken, location: { payload: { slug } } } = getState()
//     const video = await fetchData(`/api/video/${slug}`, jwToken)
//
//     if (!video) {
//       return dispatch({ type: NOT_FOUND })
//     }
//
//     dispatch({ type: 'VIDEO_FOUND', payload: { slug, video } })
//   }
// }
