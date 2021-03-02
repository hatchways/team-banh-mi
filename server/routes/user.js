const express = require("express");
const router = express.Router();
const User = require("../models/user-model");

// Get all user info -----------------------------------------------------------
router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId).select(
    "-_id email companyName favoriteMentions platforms"
  );
  res.status(200).send(user);
});

// Mention Routes --------------------------------------------------------------
router.get("/:userId/favoriteMentions", async (req, res) => {
  const user = await User.findById(req.params.userId);
  const favoriteMentions = await user.getFavoriteMentions();
  if (favoriteMentions) return res.status(200).send(favoriteMentions);
  return res
    .status(404)
    .send({ ok: false, error: "Finding favorite mentions failed" });
});

router.post("/:userId/favoriteMentions", async (req, res) => {
  const user = await User.findById(req.params.userId);
  const result = await user.addFavoriteMentions(req.body.mentionId);
  if (result) return res.status(200).send(result);
  return res
    .status(404)
    .send({ ok: false, error: "Adding favorite mention failed" });
});

router.delete("/:userId/favoriteMentions", async (req, res) => {
  const user = await User.findById(req.params.userId);
  const result = await user.deleteFavoriteMentions(req.body.mentionId);
  if (result) return res.status(200).send(result);
  return res
    .status(404)
    .send({ ok: false, error: "Deleting favorite mention failed" });
});

// Platform Routes -------------------------------------------------------------
router.get("/:userId/platforms", async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (user.platforms.length) return res.status(200).send(user.platforms);
  return res
    .status(404)
    .send({ ok: false, error: "User doesn't have any active platforms." });
});

router.post("/:userId/platforms/", async (req, res) => {
  const user = await User.findById(req.params.userId);
  const result = await user.addPlatform(req.body.platform);
  if (result) return res.status(200).send(result);
  return res.status(404).send({ ok: false, error: "Adding platform failed" });
});

router.delete("/:userId/platforms", async (req, res) => {
  const user = await User.findById(req.params.userId);
  const result = await user.deletePlatform(req.body.platform);
  if (result) return res.status(200).send(result);
  return res.status(404).send({ ok: false, error: "Deleting platform failed" });
});

// CompanyName Routes ----------------------------------------------------------
router.get("/:userId/companyName", async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (user.companyName.length) return res.status(200).send(user.companyName);
  return res
    .status(404)
    .send({ ok: false, error: "User doesn't have any company names." });
});

router.post("/:userId/companyName", async (req, res) => {
  const user = await User.findById(req.params.userId);
  const result = await user.addCompanyName(req.body.companyName);
  if (result) return res.status(200).send(result);
  return res
    .status(404)
    .send({ ok: false, error: "Adding company name failed" });
});

router.delete("/:userId/companyName", async (req, res) => {
  const user = await User.findById(req.params.userId);
  const result = await user.deleteCompanyName(req.body.companyName);
  if (result) return res.status(200).send(result);
  return res.status(404).send({ ok: false, error: "Deleting platform failed" });
});

module.exports = router;
