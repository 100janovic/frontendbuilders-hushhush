import db from "../db/db.js";

export const secrets = (req, res) => {

    const secrets = db.data.secrets;

    res.status(200).json({
        secrets
    });

}