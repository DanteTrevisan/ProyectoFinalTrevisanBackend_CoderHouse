export default function errorHandler(err,req, res, next) {
    if (err) {
        const customError = err;
        if (customError.code) {
            req.logger.error(customError.name + ": " + customError.description);
            res.setHeader("Content-Type", "application/json");
            return res.status(customError.code).json({error: customError.message });
        } else {
            res.setHeader("Content-Type", "application/json");
            return res.status(500).json({ error: "Unexpected error" });
        }
    }
    next()
}