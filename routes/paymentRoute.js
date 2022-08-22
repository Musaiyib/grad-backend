const express = require("express");
const {
  getPayments,
  setPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");
const router = express.Router();

router.get("/", getPayments);

router.post("/", setPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
