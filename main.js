const MongoCLient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";

const main = async () => {
    const client = await MongoCLient.connect(url, {useUnifiedTopology: true });
    const dataBase = client.db("groupGenerator");

    try {
        await dataBase.createCollection("Students");
        await dataBase.createCollection("Groups");

        
    } catch (error) {
        console.log(error);
    } finally {
        console.log("!==> Success <==!")
        client.close();
    }

}
main();