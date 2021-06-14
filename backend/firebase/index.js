import admin from "firebase-admin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

var serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
