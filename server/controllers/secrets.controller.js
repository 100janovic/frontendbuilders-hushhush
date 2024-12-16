import db from "../db/db.js";

export const secrets = (req, res) => {
    const userId = +req.params.userId;
    const secrets = db.data.secrets.filter(s => s.userId === userId);

    res.status(200).json({
        secrets
    });

}