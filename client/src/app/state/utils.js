import buildUrl from "build-url";

// This is a private wrapper function that handles the error scenarios
// for fetch so that you can properly handle errors
// If expects the 3 functions -- one to do the actual fetch, a success handler
// and a failure handler
// Can provide a signal which represents an AbortController().signal that allows
// a fetch request to be cancelled as needed
export function fetchFromAPI(path, query, onSuccess, onFailure, signal) {
  return () => {
    fetch(
      buildUrl("/", {
        path,
        disableCSV: true,
        queryParams: query,
      }),
      { credentials: "same-origin", signal }
    )
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((data) => {
        onSuccess(data);
      })
      .catch((err) => {
        let msg;
        /* istanbul ignore next */
        if (err.statusText) {
          msg =
            "An error code " +
            err.status +
            " (" +
            err.statusText +
            ") has occurred";
        } else {
          msg = "An error occurred: " + err;
        }
        onFailure(err, msg);
      });
  };
}
