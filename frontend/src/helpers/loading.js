export const loadingSpinner = () => (
  <div className="text-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export const loadingButton = () => (
  <button class="btn btn-primary" type="button" disabled>
    <span
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span>
    Loading...
  </button>
);
