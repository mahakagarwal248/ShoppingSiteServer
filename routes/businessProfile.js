import express from "express";
// import Validation from "../helpers/Validation.js";
// import paramValidations from "../config/param-validations.js";
import {
  addProfile,
  deleteProfile,
  getAllProfiles,
  getProfileById,
} from "../controllers/BusinessProfile.js";

const router = express.Router();

router
  .route("/")
  .post(
    //   Validation(paramValidations.addProducts),
    addProfile
  )
  .get(getProfileById)
  .delete(
    //   Validation(paramValidations.getProductsByCategory),
    deleteProfile
  );
router.route("/getAllProfiles").get(getAllProfiles);

export default router;
