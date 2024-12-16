import db from "../db/db.js";
import { generateId } from "../utils/generate-id.js";

export const secrets = (req, res) => {
    const userId = +req.params.userId;
    const secrets = db.data.secrets.filter(s => s.userId === userId).reverse();

    res.status(200).json({
        secrets
    });
};

export const addSecret = (req, res) => {
    const { slug, value } = req.body;
    const userId = req.user.id;

    const newSecret = {
        id: generateId(db.data.secrets),
        slug,
        value,
        userId
    };

    db.data.secrets.push(newSecret);

    res.status(200).json({
        message: "Secret added!",
        secret: newSecret
    });
};

export const deleteSecret = (req, res) => {
    const id = +req.params.id;
    const userId = req.user.id;

    db.data.secrets = db.data.secrets.filter(s => s.id !== id && s.userId === userId);

    res.status(200).json({
        message: "Secret deleted!"
    });
}