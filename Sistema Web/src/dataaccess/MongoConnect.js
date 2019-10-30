const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/instawhat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

module.exports = mongoose;