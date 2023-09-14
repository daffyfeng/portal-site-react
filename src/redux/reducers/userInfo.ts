const initialState = {
  userid: '',
  username: '',
  permissions: [],
  sysUser: {},
  roles: [],
};

const userInfo = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case 'SET_USER':
      console.log('SET_USER', action);

      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userInfo;
