//import Api from '../../helpers/Api';

//const api = Api.getInstance();

export const handleError = () => {
  return dispatch => {
    window.location.href = '/oops';
  };
};

export const sendMessageToBackend = error => {
  let errorMessage = { error: error.message, stackTrace: error.stack };
  console.log(errorMessage);
  handleError();

  // Uncomment this section once you have an api to send errors to
  //	return (dispatch) => {
  //		api.post('/api/v1/error', errorMessage)
  //		.then(res=> {
  //			 dispatch(handleError());
  //		});
  //	};
};
