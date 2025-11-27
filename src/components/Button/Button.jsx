function Button({ buttonText, buttonOnClickHandler }) {
  return (
    <>
      <input type="button" value={buttonText} onClick={() => buttonOnClickHandler(buttonText)} />
    </>
  );
}

export default Button;
