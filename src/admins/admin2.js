const express = require('express');
const router = express.Router();
router.get('/admin2/:p1?/:p2?', (req, res)=>{
    const output = {
        ...req.params,
        url: req.url,
        baseUrl: req.baseUrl,
        ...res.locals
    }
    res.json(output);
});
module.exports = router;