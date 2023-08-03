import mongoose from "mongoose";

export class DBConnect {
  private DBURL = "mongodb://localhost:27017/library-app";
  public async init() {
    try {
      await mongoose.connect(this.DBURL);
    } catch (error) {
      console.error("DB Connection Error", error);
    }
  }
}
