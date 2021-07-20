logger = (req, res, next) => {
    console.log("Logging request details ... ");
    next();
}

module.exports = logger;