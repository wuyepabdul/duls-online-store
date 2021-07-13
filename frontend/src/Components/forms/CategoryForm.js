import React from "react";
import { loadingButton } from "../../helpers/loading";

const CategoryForm = ({ handleSubmit, setName, name, loading }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mt-4">
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-center form-control border border-top-0 border-end-0 border-start-0 border-bottom-1 border-primary "
          placeholder="Create Category"
        />
      </div>

      <div className="d-grid gap-2 mt-4">
        {loading ? (
          loadingButton()
        ) : (
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading || !name || name.length < 3}
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
