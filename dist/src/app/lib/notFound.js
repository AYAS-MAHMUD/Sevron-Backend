export const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: "API NOT FOUND",
        error: {
            path: req.originalUrl,
            message: "Your requested path is't FOUND",
            method: req.method
        }
    });
};
