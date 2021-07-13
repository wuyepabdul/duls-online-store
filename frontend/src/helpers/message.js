//alert
export const errorMessage = (msg) => (
  <div>
    <div className="alert alert-danger">{msg}</div>
  </div>
);

export const successMessage = (msg) => (
  <div>
    <div className="alert alert-success">{msg}</div>
  </div>
);

export const infoMessage = (msg) => (
  <div>
    <div className="alert alert-info">{msg}</div>
  </div>
);
