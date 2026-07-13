import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

try {
    // CONNECT the Client with Server
    await client.connect();
    // SEND ping for Successful Connection Confirmation (SCC)
    await client.db("admin").command({ ping: 1 });
    // SHOW log of SCC 
    console.log(
        "Ping SUCCESS.. MongoDB Connection SUCCESS!!"
    );
} catch(err) {
    // SHOW log of Failure Connection Error (FCE)
    console.error(err);
}

let db = client.db("employees");

export default db; 