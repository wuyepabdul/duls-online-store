export const loadingSpinner = () => (
  <div className="text-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export const loadingButton = () => (
  <button className="btn btn-primary" type="button" disabled>
    <span
      className="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span>
    Loading...
  </button>
);
