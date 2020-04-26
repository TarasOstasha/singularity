const appState = {
    hostName: (location.hostname == 'localhost') ? 'http://localhost/' : '/',
    //general
    products: [],
    favoriteProducts: [],
    //header
    header: {
      isLogged: false,
      user: {
        userName: '',
        _id: 'unlogged',
        role: 'user',
        isLogged: false
      },
      basket: {
        open: false,
        products:[]
      }
    },
    //pages
    pages: {
      admin: {
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
    state_form: 'login',
    error: {
      dublicate_user: false
    }
  }
  
  
  
  export default appState;