export const state = () => ({
    dark_theme : false
  })
  
  export const getters = {
    getTheme:(state) => {
        return state.dark_theme;
    }
  }
  
  export const mutations = {
      setLightTheme(state){
          state.dark_theme = false;
      },
      setDarkTheme(state){
          state.dark_theme = true;
      }
  }
  
  export const actions = {
      setLightTheme(context){
       
      },
      setDarkTheme(context){
    
      }
  }