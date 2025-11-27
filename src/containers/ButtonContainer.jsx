import { getUserAuth } from "../authCodeWithPkce";
import Button from "../components/Button/Button";
import { useAuth } from "../useAuth";

function ButtonContainer({isLoggedIn, setIsLoggedIn}) {
  function buttonOnClickHandler(buttonText) {
      if(buttonText==='Logout'){
        localStorage.removeItem('spotify_access_token');
        setIsLoggedIn(false)
        console.log(window.location.href)
        window.location.reload();
      }else{
        getUserAuth();
      }
    }

  return (
    <>
      {isLoggedIn ? (
        <Button
          buttonText='Logout'
          buttonOnClickHandler={buttonOnClickHandler}
        />
      ) : (
        <Button
          buttonText='Login'
          buttonOnClickHandler={buttonOnClickHandler}
        />
      )}
    </>
  );
}

export default ButtonContainer;
