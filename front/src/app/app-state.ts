const appState = {
    hostName: (location.hostname == 'localhost') ? 'http://localhost/' : '/',
    //general
    products: [],
    //header
    header: {
      isLogged: false,
      user: {
        name: '',
        _id: 'unlogged',
        role: 'user'
      },
      basket: {
        open: false
      }
    },
    //pages
    pages: {
      admin: {
        header: {
          isLogged: false,
          user: {
            name: ''
          }
        },
        products: [],
        users: [],
        newProduct: {
          // obj user
        },
        productSearchResult: [], // idea???
        userSearchResult: [] // idea???
      }
    },
  
    // for auth component
    checked_form: 'login',
    error: {
      dublicate_user: false
    }
  }
  
  
  
  export default appState;