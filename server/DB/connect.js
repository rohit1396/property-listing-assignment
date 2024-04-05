import mongoose, { connect } from "mongoose";

mongoose
  .connect(process.env.MONGODBURL)
  .then(() => console.log("Connection established"))
  .catch((err) => console.log(err));

export default connect;
