import express from "express";

// CONNECTS to Database
import db from "../db/connection.js"; 

// CONVERTS id from Type String to Type ObjectId
import { ObjectId } from "mongodb";

// Constant router is an INSTANCE of the Express Router 
// DEFINES our Routes 
// ACTS as Middleware by taking control of Requests starting with path /record 
const router = express.Router();

// GETS ALL RECORDS - Status 200 means RECORD(S) FOUND 
router.get("/", async (req, res) => {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// GETS SINGLE RECORD by ID - Status 404 means NOT FOUND
router.get("/:id", async (req, res) => {
    let collection = await db.collection("records");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("NOT FOUND").status(404);
    else res.send(result).status(200);
});

// CREATES NEW SINGLE RECORD - Status 500 means ADDITION ERROR & Status 204 means ADDITION SUCCESS
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        };
        let collection = await db.collection("records");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("ADDITION ERROR")
    }
});

// UPDATES SINGLE RECORD by ID - Status 500 means UPDATE ERROR 
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                name: req.body.name,
                position: req.body.position,
                level: req.body.level,
            },
        };

        let collection = await db.collection("records");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("UPDATE ERROR");
    }
});

// DELTES SINGLE RECORD by ID - Status 500 means DELETION ERROR
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = db.collection("records");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("DELETION ERROR");
    }
});

export default router;