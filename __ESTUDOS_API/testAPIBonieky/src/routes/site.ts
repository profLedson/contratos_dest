import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.json({pong: 'pongou!!!'})
}) 

export default router;