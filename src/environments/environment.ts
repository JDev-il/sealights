export const environment = {
  production: false,
  api: {
    url: 'http://localhost:3000',
    params: {
      get: {
        users: '/api/persons',
        countries: '/api/countries',
      },
      post: {
        city: '/api/city',
        user: '/api/person'
      }
    },
  }
}
