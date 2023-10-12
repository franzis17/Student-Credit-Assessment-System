/**
 * A helper file
 * - Automatically do http request such as GET + POST + PUT + DELETE, to make it easy
 */
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    "Content-type": "application/json",
  }
});


