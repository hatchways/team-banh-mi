const express = require("express");
const router = express.Router();
const MentionController = require("../Controllers/Mention.Controller");

router.get("/", MentionController.getAllMentions);

router.get("/:id", MentionController.getMentionById);

router.post("/", MentionController.createMention);

router.put("/:id",MentionController.updateMention);

router.delete("/:id", MentionController.deleteMention);

module.exports = router;
