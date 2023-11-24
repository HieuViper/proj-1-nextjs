
//redirect user to login page if user doenst have valid authorization
export async function handleNotAuthorized( funcForward, fSetErr ) {
    fSetErr('You dont have valid authorization. You will be logout of the system in 5 seconds.');
    const res = await fetch('/api/login?option=delAuth', {
      method: 'GET',
    });
    setTimeout(async () => {
      //router.push('/login');
      funcForward();
    }, 5000);

  }

  //used for call API at client component
  //res: response get from calling API
  //funcForward: the function is called to redirect when request have invalid authorization
  //fEnLoginForm:  the function enable login form when request is unauthenticated
  //fSetErr: the function is used to set Error message
  export async function callAPI ( res, funcForward, fEnLoginForm, fSetErr ) {

    let err = await res.json();
    if ( res.ok )
        switch ( res.status ) {
            case 401:
                fEnLoginForm();
                break;
            case 403:
                handleNotAuthorized( funcForward, fSetErr );
                break;
            case 400:
                fSetErr( `API's inputs are invalid` );
                break;
            case 405:
                fSetErr( 'Method is not allowed' );
                break;
            case 500:
                fSetErr( 'Internal Server Error' + err?.msg );
                break;
            default:
                fSetErr( 'Error:' + err?.msg );
        }
    return res;
  }
