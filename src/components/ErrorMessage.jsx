
function ErrorMessage({ message }) {
  return (
    <div style={{ color: "red", marginTop: "1rem" }}>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;