function Button({ buttonText, buttonOnClickHandler }) {
  return (
    <li>
      <a
        type="button"
        value={buttonText}
        onClick={() => buttonOnClickHandler(buttonText)}
      ></a>
    </li>
  );
}

export default Button;
