// IMPORTS =========================================================================================
import {range, reduce} from "ramda";
import Alert from "shared/models/alert";

// FAKE DB =========================================================================================
function makeDB() {
  if (process.env.NODE_ENV == "production") {
    return [
      Alert({
        message: "Note: this demo instance is resetted every 30 minutes",
        category: "info"
      })
    ];
  } else {
    return [];
  }
}

export default makeDB();
